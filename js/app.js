/**
 * Main Application Controller & Event Dispatcher with Modal Dialog & Wallet Handlers
 */

// Service Worker Registration for PWA / Offline Support
if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./sw.js')
      .then(function(reg) {
        console.log('PWA Service Worker registered:', reg.scope);
      })
      .catch(function(err) {
        console.warn('Service Worker registration failed:', err);
      });
  });
}

// Modal State Variable
var modalState = {
  currency: 'RM',
  paymentMethod: 'cash'
};

// Switch between Day Tabs (d1 to d5)
function switchView(viewId) {
  if (!viewId) return;
  if (viewId === 'all') viewId = 'd1';

  if (window.TripStorage) {
    window.TripStorage.setActiveView(viewId);
  }

  renderDayTabs();
  renderItinerary();
}

// Toggle Activity Done State (Marks as actually spent for non-ticket items)
function toggleDone(itemId, event) {
  if (event) {
    event.stopPropagation();
  }
  if (!window.TripStorage) return;

  var newState = window.TripStorage.toggleItemDone(itemId);

  var itemEl = document.getElementById('item-' + itemId);
  if (itemEl) {
    if (newState) {
      itemEl.classList.add('is-done');
    } else {
      itemEl.classList.remove('is-done');
    }
    var btn = itemEl.querySelector('.done-toggle-btn');
    if (btn) {
      btn.classList.toggle('is-done', newState);
      btn.innerText = newState ? '✓ Done' : '○ Mark Done';
    }
  }

  refreshAllBudgetViews();
}

// Toggle Item Booking Status & Show/Hide Booking Buttons
function toggleBooked(itemId, defaultVal, event) {
  if (event) {
    event.stopPropagation();
  }
  if (!window.TripStorage) return;

  window.TripStorage.toggleItemBooked(itemId, defaultVal);

  // Replace item DOM element in place to update buttons & inputs
  replaceTimelineItemDOM(itemId);

  // Update wallet, progress, budget table & summary ribbon
  refreshAllBudgetViews();
}

// Toggle Payment Method between Cash and Card
function togglePaymentMethod(itemId, event) {
  if (event) {
    event.stopPropagation();
  }
  if (!window.TripStorage || !window.ITINERARY_DATA) return;

  var foundItem = findItineraryItem(itemId);
  if (!foundItem) return;

  window.TripStorage.toggleItemPaymentMethod(foundItem);

  replaceTimelineItemDOM(itemId);
  refreshAllBudgetViews();
}

// Handle Expense Input Changes (INR or RM)
function onExpenseChange(itemId, val, currency) {
  if (!window.TripStorage) return;

  window.TripStorage.setItemExpenseAmount(itemId, val, currency);

  // Update the sibling RM equivalent text in the input box
  var itemEl = document.getElementById('item-' + itemId);
  if (itemEl) {
    var exp = window.TripStorage.getItemExpense({ id: itemId, costInr: Number(val) || 0 });
    var equivSpan = itemEl.querySelector('.expense-equiv');
    if (equivSpan) {
      equivSpan.innerText = '(RM ' + exp.amountRm + ')';
    }
  }

  refreshAllBudgetViews();
}

// Initial Cash & Exchange Rate Changes
function onInitialCashChange(val) {
  if (!window.TripStorage) return;
  window.TripStorage.setInitialCashRm(val);
  refreshAllBudgetViews();
}

function onRateChange(val) {
  if (!window.TripStorage) return;
  window.TripStorage.setExchangeRate(val);
  renderItinerary();
  refreshAllBudgetViews();
}

// ----------------------------------------------------
// Custom Expense Modal / Dialog UI Functions
// ----------------------------------------------------
function openAddExpensePrompt(dayId) {
  var modal = document.getElementById('expense-modal');
  if (!modal) return;

  var dayNum = dayId.replace('d', '');
  var titleEl = document.getElementById('modal-title');
  var subtitleEl = document.getElementById('modal-subtitle');
  var dayInput = document.getElementById('modal-day-id');
  var descInput = document.getElementById('modal-desc');
  var amountInput = document.getElementById('modal-amount');

  if (titleEl) titleEl.innerText = '➕ Log Extra Spend — Day ' + dayNum;
  if (subtitleEl) subtitleEl.innerText = 'Add transport, food, snacks, or shopping expense';
  if (dayInput) dayInput.value = dayId;
  if (descInput) descInput.value = '';
  if (amountInput) amountInput.value = '';

  modalState.currency = 'RM';
  modalState.paymentMethod = 'cash';

  var currBtn = document.getElementById('modal-curr-btn');
  if (currBtn) currBtn.innerText = 'Currency: RM';

  selectModalPaymentMethod('cash');
  updateModalConversionPreview();

  modal.classList.add('active');
  setTimeout(function() {
    if (descInput) descInput.focus();
  }, 100);
}

function closeExpenseModal(event) {
  if (event && event.target && event.target.id !== 'expense-modal') {
    return;
  }
  var modal = document.getElementById('expense-modal');
  if (modal) {
    modal.classList.remove('active');
  }
}

function quickFillExpense(desc, amount, currency, paymentMethod) {
  var descInput = document.getElementById('modal-desc');
  var amountInput = document.getElementById('modal-amount');
  var currBtn = document.getElementById('modal-curr-btn');

  if (descInput) descInput.value = desc;
  if (amountInput) amountInput.value = amount;

  modalState.currency = currency || 'RM';
  if (currBtn) currBtn.innerText = 'Currency: ' + modalState.currency;

  selectModalPaymentMethod(paymentMethod || 'cash');
  updateModalConversionPreview();
}

function toggleModalCurrency() {
  modalState.currency = modalState.currency === 'RM' ? 'INR' : 'RM';
  var currBtn = document.getElementById('modal-curr-btn');
  if (currBtn) currBtn.innerText = 'Currency: ' + (modalState.currency === 'RM' ? 'RM' : '₹ INR');
  updateModalConversionPreview();
}

function updateModalConversionPreview() {
  var amountInput = document.getElementById('modal-amount');
  var previewEl = document.getElementById('modal-conversion-preview');
  if (!previewEl || !window.TripStorage) return;

  var rate = window.TripStorage.getExchangeRate();
  var val = Number(amountInput ? amountInput.value : 0) || 0;

  if (modalState.currency === 'RM') {
    var inr = Math.round(val * rate);
    previewEl.innerText = '≈ ₹ ' + inr.toLocaleString('en-IN') + ' (Exchange rate 1 RM = ₹' + rate + ')';
  } else {
    var rm = rate > 0 ? Math.round((val / rate) * 10) / 10 : 0;
    previewEl.innerText = '≈ RM ' + rm.toLocaleString('en-IN') + ' (Exchange rate 1 RM = ₹' + rate + ')';
  }
}

function selectModalPaymentMethod(method) {
  modalState.paymentMethod = method;

  var cashTile = document.getElementById('poc-cash');
  var cardTile = document.getElementById('poc-card');
  var bankTile = document.getElementById('poc-bank');

  if (cashTile) cashTile.className = 'pay-option-card cash' + (method === 'cash' ? ' selected' : '');
  if (cardTile) cardTile.className = 'pay-option-card card' + (method === 'card' ? ' selected' : '');
  if (bankTile) bankTile.className = 'pay-option-card bank' + (method === 'bank' ? ' selected' : '');
}

function saveCustomExpense(event) {
  if (event) {
    event.preventDefault();
  }

  var dayId = document.getElementById('modal-day-id').value;
  var desc = document.getElementById('modal-desc').value;
  var amount = document.getElementById('modal-amount').value;

  if (!desc || !desc.trim() || !amount || isNaN(Number(amount))) {
    alert('Please enter a valid description and amount.');
    return;
  }

  if (window.TripStorage) {
    window.TripStorage.addCustomExpense(
      dayId,
      desc.trim(),
      Number(amount),
      modalState.currency,
      modalState.paymentMethod
    );

    closeExpenseModal();
    renderItinerary();
    refreshAllBudgetViews();
  }
}

function deleteQuickExpense(id, dayId) {
  if (confirm('Delete this extra logged expense?')) {
    if (window.TripStorage) {
      window.TripStorage.deleteCustomExpense(id);
      renderItinerary();
      refreshAllBudgetViews();
    }
  }
}

// Helper: Update active Day spend monitor and header cost in place
function updateActiveDaySpendMonitor() {
  if (!window.TripStorage || !window.ITINERARY_DATA) return;
  var activeView = window.TripStorage.getActiveView() || 'd1';
  var dayEl = document.getElementById('day-' + activeView);
  if (!dayEl) return;

  var ds = window.TripStorage.getDayStats(activeView);
  if (!ds) return;

  // 1. Update day header cost
  var costEl = dayEl.querySelector('.day-cost-total');
  if (costEl) {
    costEl.innerHTML = `
      <span class="day-spent-badge">₹${ds.totalSpentInr.toLocaleString('en-IN')} spent</span>
      <span class="day-planned-sub">of ₹${ds.plannedItineraryInr.toLocaleString('en-IN')}</span>
    `;
  }

  // 2. Update day spend monitor card
  var monitorEl = dayEl.querySelector('.day-spend-monitor-card');
  if (monitorEl) {
    var statusPillClass = ds.isOverBudget ? 'over' : (ds.totalSpentInr > 0 ? 'on-track' : 'zero');
    var statusPillText = ds.isOverBudget 
      ? `⚠️ +₹${ds.differenceInr.toLocaleString('en-IN')} Over Planned` 
      : (ds.totalSpentInr > 0 
          ? `✅ ₹${ds.remainingPlannedInr.toLocaleString('en-IN')} Remaining` 
          : `📋 ₹${ds.plannedItineraryInr.toLocaleString('en-IN')} Planned Budget`);

    var paymentsSummary = [];
    if (ds.cashSpentRm > 0) paymentsSummary.push(`💵 RM ${ds.cashSpentRm} (₹${ds.cashSpentInr.toLocaleString('en-IN')})`);
    if (ds.cardSpentInr > 0) paymentsSummary.push(`💳 ₹${ds.cardSpentInr.toLocaleString('en-IN')}`);
    if (ds.bankSpentInr > 0) paymentsSummary.push(`🏦 ₹${ds.bankSpentInr.toLocaleString('en-IN')}`);
    var paymentsHtml = paymentsSummary.length ? paymentsSummary.join(' · ') : 'No spends logged yet';

    var statusPillEl = monitorEl.querySelector('.dsm-status-pill');
    if (statusPillEl) {
      statusPillEl.className = 'dsm-status-pill ' + statusPillClass;
      statusPillEl.innerText = statusPillText;
    }

    var spentValEl = monitorEl.querySelector('.dsm-metric-card.spent .dsm-val');
    var spentSubValEl = monitorEl.querySelector('.dsm-metric-card.spent .dsm-sub-val');
    if (spentValEl) spentValEl.innerText = '₹' + ds.totalSpentInr.toLocaleString('en-IN');
    if (spentSubValEl) spentSubValEl.innerText = '≈ RM ' + ds.totalSpentRm;

    var plannedValEl = monitorEl.querySelector('.dsm-metric-card.planned .dsm-val');
    var plannedSubValEl = monitorEl.querySelector('.dsm-metric-card.planned .dsm-sub-val');
    if (plannedValEl) plannedValEl.innerText = '₹' + ds.plannedItineraryInr.toLocaleString('en-IN');
    if (plannedSubValEl) plannedSubValEl.innerText = '≈ RM ' + ds.plannedItineraryRm;

    var extraValEl = monitorEl.querySelector('.dsm-metric-card.extra .dsm-val');
    var extraSubValEl = monitorEl.querySelector('.dsm-metric-card.extra .dsm-sub-val');
    if (extraValEl) {
      extraValEl.className = 'dsm-val ' + (ds.extraSpendsInr > 0 ? 'accent' : 'muted');
      extraValEl.innerText = '+₹' + ds.extraSpendsInr.toLocaleString('en-IN');
    }
    if (extraSubValEl) extraSubValEl.innerText = '≈ RM ' + ds.extraSpendsRm + ' (' + ds.extraSpendsCount + ' logs)';

    var progValEl = monitorEl.querySelector('.dsm-metric-card.progress .dsm-val');
    var progSubValEl = monitorEl.querySelector('.dsm-metric-card.progress .dsm-sub-val');
    if (progValEl) progValEl.innerText = ds.percentageSpent + '%';
    if (progSubValEl) progSubValEl.innerText = ds.doneItemsCount + '/' + ds.totalItemsCount + ' acts done';

    var barFillEl = monitorEl.querySelector('.dsm-progress-fill');
    if (barFillEl) {
      barFillEl.className = 'dsm-progress-fill' + (ds.isOverBudget ? ' over' : '');
      barFillEl.style.width = Math.min(100, ds.percentageSpent) + '%';
    }

    var chipsEl = monitorEl.querySelector('.dsm-footer-chips');
    if (chipsEl) {
      chipsEl.innerHTML = `
        <span class="dsm-chip">🎟 Tickets: <strong>₹${ds.realizedTicketsInr.toLocaleString('en-IN')}</strong> / ₹${ds.plannedTicketsInr.toLocaleString('en-IN')} (${ds.bookedTicketsCount}/${ds.totalTicketsCount} booked)</span>
        <span class="dsm-chip">🍜 Meals/Rides: <strong>₹${(ds.realizedFoodInr + ds.realizedTransportInr + ds.realizedActivitiesInr).toLocaleString('en-IN')}</strong> / ₹${(ds.plannedFoodInr + ds.plannedTransportInr + ds.plannedActivitiesInr).toLocaleString('en-IN')}</span>
        <span class="dsm-chip">➕ Extra: <strong>₹${ds.extraSpendsInr.toLocaleString('en-IN')}</strong></span>
        <span class="dsm-chip pay-split">💳 ${paymentsHtml}</span>
      `;
    }
  }
}

// Helper: Refresh All Financial Views
function refreshAllBudgetViews() {
  updateActiveDaySpendMonitor();
  renderDayTabs();
  renderWalletDashboard();
  renderProgressBar();
  renderDayWiseSpendSummary();
  renderBudgetTable();
  renderSummaryRibbon();
}

// Helper: Find item by ID
function findItineraryItem(itemId) {
  if (!window.ITINERARY_DATA) return null;
  for (var d = 0; d < window.ITINERARY_DATA.length; d++) {
    var day = window.ITINERARY_DATA[d];
    if (day.timeline) {
      for (var t = 0; t < day.timeline.length; t++) {
        if (day.timeline[t].id === itemId) {
          return day.timeline[t];
        }
      }
    }
  }
  return null;
}

// Helper: Replace Timeline Item DOM node in place
function replaceTimelineItemDOM(itemId) {
  var itemEl = document.getElementById('item-' + itemId);
  var foundItem = findItineraryItem(itemId);
  if (itemEl && foundItem) {
    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = renderTimelineItem(foundItem);
    var newItemEl = tempDiv.firstElementChild;
    if (newItemEl) {
      itemEl.parentNode.replaceChild(newItemEl, itemEl);
    }
  }
}

// Reset Progress & Bookings
function resetTripProgress() {
  if (confirm('Are you sure you want to reset your checked items, booking statuses, wallet amounts, and custom expenses?')) {
    if (window.TripStorage) {
      window.TripStorage.resetAll();
    }
    renderWalletDashboard();
    renderProgressBar();
    renderDayTabs();
    renderItinerary();
    renderDayWiseSpendSummary();
    renderBudgetTable();
    renderSummaryRibbon();
  }
}

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
  renderHero();
  renderMetaAlerts();
  renderWalletDashboard();
  renderProgressBar();
  renderFixedBookings();
  renderDayTabs();
  renderItinerary();
  renderDayWiseSpendSummary();
  renderBudgetTable();
  renderShoppingGuide();
  renderTravelTips();
  renderSummaryRibbon();

  // Keyboard shortcut: close modal on Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeExpenseModal();
    }
  });
});
