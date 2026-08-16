/**
 * DOM Rendering Engine for KL Trip Planner with Multi-Channel Wallet (Cash, Card, Indian Bank A/C) Support
 */

function renderHero() {
  var heroEl = document.getElementById('hero-container');
  if (!heroEl || !window.TRIP_DATA || !window.TRIP_DATA.meta) return;

  var meta = window.TRIP_DATA.meta;
  heroEl.innerHTML = `
    <div class="hero">
      <div class="hero-eyebrow">${meta.eyebrow}</div>
      <h1>${meta.title}</h1>
      <div class="hero-sub">${meta.sub}</div>
      <div class="hero-tags">
        <span class="couple-tag">${meta.coupleTag}</span>
        <span class="pwa-tag">📱 Offline PWA Ready</span>
      </div>
    </div>
  `;
}

function renderMetaAlerts() {
  var alertEl = document.getElementById('meta-alerts-container');
  if (!alertEl || !window.TRIP_DATA || !window.TRIP_DATA.meta) return;

  var meta = window.TRIP_DATA.meta;
  alertEl.innerHTML = `
    <div class="rate-pill-container">
      <div class="rate-pill">${meta.ratePill}</div>
    </div>
  `;
}

function renderWalletDashboard() {
  var walletEl = document.getElementById('wallet-container');
  if (!walletEl || !window.TripStorage) return;

  var stats = window.TripStorage.getWalletStats();

  walletEl.innerHTML = `
    <div class="wallet-dashboard">
      <div class="wallet-header">
        <div class="wallet-title">
          <span>💼 Travel Wallet &amp; Payment Accounts</span>
        </div>
        <div class="wallet-rate-badge">
          💱 1 RM ≈ ₹<input type="number" step="0.1" value="${stats.exchangeRate}" onchange="onRateChange(this.value)" title="Click to adjust live exchange rate" />
        </div>
      </div>
      <div class="wallet-grid">
        <!-- 1. Cash in Hand -->
        <div class="wallet-card cash">
          <div class="wc-label">
            <span>💵 Cash in Hand</span>
            <div class="initial-cash-editor" onclick="event.stopPropagation()">
              <span>Start: RM</span>
              <input type="number" value="${stats.initialCashRm}" onchange="onInitialCashChange(this.value)" title="Edit starting cash in RM" />
            </div>
          </div>
          <div class="wc-val">RM ${stats.remainingCashRm.toLocaleString('en-IN')}</div>
          <div class="wc-sub">
            <span>≈ ₹${stats.remainingCashInr.toLocaleString('en-IN')} remaining</span>
            <span>Spent: RM ${stats.cashSpentRm}</span>
          </div>
        </div>

        <!-- 2. Card / Forex Spend -->
        <div class="wallet-card card">
          <div class="wc-label">
            <span>💳 Card / Forex</span>
            <span style="font-size:10px;color:var(--blue)">POS &amp; Swipes</span>
          </div>
          <div class="wc-val">₹${stats.cardSpentInr.toLocaleString('en-IN')}</div>
          <div class="wc-sub">
            <span>≈ RM ${stats.cardSpentRm.toLocaleString('en-IN')} charged</span>
            <span>Zero cash deducted</span>
          </div>
        </div>

        <!-- 3. Indian Bank A/C -->
        <div class="wallet-card bank">
          <div class="wc-label">
            <span>🏦 Indian Bank A/C</span>
            <span style="font-size:10px;color:var(--purple)">UPI / NetBanking</span>
          </div>
          <div class="wc-val">₹${stats.bankSpentInr.toLocaleString('en-IN')}</div>
          <div class="wc-sub">
            <span>≈ RM ${stats.bankSpentRm.toLocaleString('en-IN')} online bookings</span>
            <span>Debited in INR</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderProgressBar() {
  var progressEl = document.getElementById('progress-container');
  if (!progressEl || !window.TripStorage) return;

  var stats = window.TripStorage.getProgress();
  var budget = window.TripStorage.getDynamicBudgetTotals();

  progressEl.innerHTML = `
    <div class="progress-card">
      <div class="progress-header">
        <div class="progress-title">
          <span>🎯 Trip &amp; Booking Progress</span>
        </div>
        <div class="progress-count">
          <strong>${stats.done} / ${stats.total}</strong> done (${stats.percentage}%) · <strong>${budget.bookedTicketed} / ${budget.totalTicketed}</strong> tickets booked
        </div>
      </div>
      <div class="progress-bar-track">
        <div class="progress-bar-fill" style="width: ${stats.percentage}%"></div>
      </div>
      <div class="progress-substats">
        <span>💰 Paid So Far: <strong style="color:var(--green)">₹${budget.paidSoFar.toLocaleString('en-IN')}</strong> · Remaining: <strong style="color:var(--accent)">₹${budget.remainingToSpend.toLocaleString('en-IN')}</strong></span>
        ${stats.done > 0 || budget.bookedTicketed > 0 ? '<button class="reset-btn" onclick="resetTripProgress()">Reset All</button>' : ''}
      </div>
    </div>
  `;
}

function renderFixedBookings() {
  var bookingsEl = document.getElementById('fixed-bookings-container');
  if (!bookingsEl || !window.TRIP_DATA || !window.TRIP_DATA.fixedBookings) return;

  var html = `
    <div class="section-title">Already Booked</div>
    <div class="fixed-bookings">
  `;

  window.TRIP_DATA.fixedBookings.forEach(function (b) {
    html += `
      <div class="booking-card">
        <div class="bc-label">${b.label} <span class="tag-confirmed">${b.statusTag}</span></div>
        <div class="bc-title">${b.title}</div>
        <div class="bc-detail">${b.detail}</div>
        <div class="bc-price">${b.price} <span style="font-size:13px;color:var(--muted);font-family:'DM Sans';">· ${b.priceSub}</span></div>
      </div>
    `;
  });

  html += `</div>`;
  bookingsEl.innerHTML = html;
}

function renderDayTabs() {
  var container = document.getElementById('day-tabs-container');
  if (!container || !window.ITINERARY_DATA) return;

  var activeView = window.TripStorage ? window.TripStorage.getActiveView() : 'd1';
  if (activeView === 'all') activeView = 'd1';

  var html = `<div class="day-tabs-container">`;

  window.ITINERARY_DATA.forEach(function (day) {
    var isActive = activeView === day.id;
    var ds = window.TripStorage ? window.TripStorage.getDayStats(day.id) : null;
    var spendText = ds 
      ? `₹${ds.totalSpentInr > 0 ? (ds.totalSpentInr >= 1000 ? (ds.totalSpentInr/1000).toFixed(1) + 'k' : ds.totalSpentInr) : '0'} / ₹${(ds.plannedItineraryInr/1000).toFixed(1)}k` 
      : '';
    var spendClass = ds ? (ds.isOverBudget ? 'over' : (ds.totalSpentInr > 0 ? 'active' : '')) : '';

    html += `
      <button class="day-tab ${isActive ? 'active' : ''}" onclick="switchView('${day.id}')">
        <span class="day-tab-num">Day ${day.dayNum}</span>
        <span class="tab-badge">${day.timeline ? day.timeline.length : ''} acts</span>
        ${spendText ? `<span class="day-tab-spend-pill ${spendClass}">${spendText}</span>` : ''}
      </button>
    `;
  });

  html += `</div>`;
  container.innerHTML = html;
}

function renderTimelineItem(item) {
  var isDone = window.TripStorage ? window.TripStorage.isItemDone(item.id) : false;
  var dotClass = item.dotClass ? ` ${item.dotClass}` : '';
  var isBooked = item.isTicketRequired
    ? (window.TripStorage ? window.TripStorage.isItemBooked(item.id, item.defaultBooked) : !!item.defaultBooked)
    : false;

  var exp = window.TripStorage ? window.TripStorage.getItemExpense(item) : {
    amountInr: item.costInr || 0,
    amountRm: item.costRm || 0,
    paymentMethod: item.defaultPaymentMethod || 'cash'
  };

  var metaHtml = '';

  // 1. Booking toggle button for ticketed items
  if (item.isTicketRequired) {
    var badgeClass = isBooked ? 'booked' : 'unbooked';
    var badgeText = isBooked ? '✅ Booked' : '⏳ Need to Book';

    metaHtml += `
      <button class="book-toggle-badge ${badgeClass}" onclick="toggleBooked('${item.id}', ${!!item.defaultBooked}, event)">
        ${badgeText}
      </button>
    `;
  }

  // 2. Editable Expense Box (for paid items: tickets, food, transport, activities)
  if (item.costInr > 0 || item.costRm > 0 || item.isTicketRequired) {
    var payBtnLabel = '💵 Cash (RM)';
    if (exp.paymentMethod === 'card') payBtnLabel = '💳 Card';
    else if (exp.paymentMethod === 'bank') payBtnLabel = '🏦 Indian Bank';

    metaHtml += `
      <div class="expense-control-box" onclick="event.stopPropagation()">
        <span class="expense-label">${item.isTicketRequired ? (isBooked ? 'Paid:' : 'Est:') : 'Cost:'}</span>
        <span class="expense-currency-tag">₹</span>
        <input type="number" class="expense-input" id="spend-${item.id}" value="${exp.amountInr}" oninput="onExpenseChange('${item.id}', this.value, 'INR')" title="Type amount in INR" />
        <span class="expense-equiv">(RM ${exp.amountRm})</span>
      </div>

      <button class="pay-method-btn ${exp.paymentMethod}" onclick="togglePaymentMethod('${item.id}', event)" title="Click to rotate payment: Cash -> Card -> Indian Bank">
        ${payBtnLabel}
      </button>
    `;
  }

  if (item.badges && item.badges.length) {
    item.badges.forEach(function (b) {
      metaHtml += `<span class="price-badge ${b.class}">${b.text}</span>`;
    });
  }

  // 3. Booking buttons: hide booking button if already booked!
  if (item.buttons && item.buttons.length) {
    item.buttons.forEach(function (btn) {
      var isBookingButton = btn.text.toLowerCase().includes('book') || btn.text.toLowerCase().includes('official') || btn.text.toLowerCase().includes('klook');
      if (item.isTicketRequired && isBooked && isBookingButton) {
        return; // Don't show booking button when already booked
      }
      var btnClass = btn.alt ? 'book-btn alt' : 'book-btn';
      metaHtml += `<a class="${btnClass}" href="${btn.url}" target="_blank">${btn.text}</a>`;
    });
  }

  var tipBoxHtml = item.tipBox ? `<div class="tip-box">${item.tipBox}</div>` : '';

  var mapUrl = item.mapUrl || ('https://maps.google.com/?q=' + encodeURIComponent((item.shortName || item.name) + ' Kuala Lumpur Malaysia'));
  var mapBtnHtml = `<a class="loc-map-btn" href="${mapUrl}" target="_blank" rel="noopener" title="Open ${item.shortName || item.name} in Google Maps" onclick="event.stopPropagation()">📍</a>`;

  return `
    <div class="tl-item ${isDone ? 'is-done' : ''}" id="item-${item.id}">
      <div class="tl-left">
        <div class="tl-time">${item.time}</div>
        <div class="tl-dot${dotClass}"></div>
      </div>
      <div class="tl-content">
        <div class="tl-top-row">
          <div class="tl-name">
            ${item.name}
            ${mapBtnHtml}
          </div>
          <button class="done-toggle-btn ${isDone ? 'is-done' : ''}" onclick="toggleDone('${item.id}', event)">
            ${isDone ? '✓ Done' : '○ Mark Done'}
          </button>
        </div>
        <div class="tl-desc">${item.desc}</div>
        ${metaHtml ? `<div class="tl-meta">${metaHtml}</div>` : ''}
        ${tipBoxHtml}
      </div>
    </div>
  `;
}

function renderCustomExpenses(dayId) {
  if (!window.TripStorage) return '';
  var list = window.TripStorage.getCustomExpenses(dayId);

  var itemsHtml = '';
  if (list && list.length) {
    list.forEach(function (e) {
      var tagLabel = '💵 Cash';
      if (e.paymentMethod === 'card') tagLabel = '💳 Card';
      else if (e.paymentMethod === 'bank') tagLabel = '🏦 Indian Bank';

      itemsHtml += `
        <div class="custom-expense-item">
          <div class="cei-left">
            <span class="cei-tag ${e.paymentMethod}">${tagLabel}</span>
            <span class="cei-title">${e.title}</span>
          </div>
          <div class="cei-right">
            <span class="cei-amount">₹${e.amountInr.toLocaleString('en-IN')} (RM ${e.amountRm})</span>
            <button class="cei-delete" onclick="deleteQuickExpense('${e.id}', '${dayId}')" title="Delete expense">✕</button>
          </div>
        </div>
      `;
    });
  }

  return `
    <div class="custom-expense-section">
      <div class="custom-expense-header">
        <span class="custom-expense-title">Extra Logged Spends (Day ${dayId.replace('d', '')})</span>
        <button class="add-expense-btn" onclick="openAddExpensePrompt('${dayId}')">+ Log Extra Spend</button>
      </div>
      <div class="custom-expense-list">
        ${itemsHtml || '<div style="font-size:12px;color:var(--muted);font-style:italic;">No extra spends logged for this day yet.</div>'}
      </div>
    </div>
  `;
}

function renderItinerary() {
  var container = document.getElementById('itinerary-container');
  if (!container || !window.ITINERARY_DATA) return;

  var activeView = window.TripStorage ? window.TripStorage.getActiveView() : 'd1';
  if (activeView === 'all') activeView = 'd1';

  var dayIndex = window.ITINERARY_DATA.findIndex(function (d) { return d.id === activeView; });
  if (dayIndex === -1) dayIndex = 0;
  var day = window.ITINERARY_DATA[dayIndex];

  var dayStats = window.TripStorage ? window.TripStorage.getDayStats(day.id) : null;

  var prevDayId = dayIndex > 0 ? window.ITINERARY_DATA[dayIndex - 1].id : null;
  var nextDayId = dayIndex < window.ITINERARY_DATA.length - 1 ? window.ITINERARY_DATA[dayIndex + 1].id : null;

  var timelineHtml = '';
  if (day.timeline && day.timeline.length) {
    day.timeline.forEach(function (item) {
      timelineHtml += renderTimelineItem(item);
    });
  }

  var coupleTipHtml = day.coupleTip ? `
    <div style="background:#20172b;border:1px solid #4a2f60;border-radius:10px;padding:12px 16px;margin-bottom:16px;font-size:13px;color:#d4a8f8;">
      ${day.coupleTip}
    </div>
  ` : '';

  // Day Spend Monitor Banner
  var daySpendMonitorHtml = '';
  if (dayStats) {
    var statusPillClass = dayStats.isOverBudget ? 'over' : (dayStats.totalSpentInr > 0 ? 'on-track' : 'zero');
    var statusPillText = dayStats.isOverBudget 
      ? `⚠️ +₹${dayStats.differenceInr.toLocaleString('en-IN')} Over Planned` 
      : (dayStats.totalSpentInr > 0 
          ? `✅ ₹${dayStats.remainingPlannedInr.toLocaleString('en-IN')} Remaining` 
          : `📋 ₹${dayStats.plannedItineraryInr.toLocaleString('en-IN')} Planned Budget`);

    var paymentsSummary = [];
    if (dayStats.cashSpentRm > 0) paymentsSummary.push(`💵 RM ${dayStats.cashSpentRm} (₹${dayStats.cashSpentInr.toLocaleString('en-IN')})`);
    if (dayStats.cardSpentInr > 0) paymentsSummary.push(`💳 ₹${dayStats.cardSpentInr.toLocaleString('en-IN')}`);
    if (dayStats.bankSpentInr > 0) paymentsSummary.push(`🏦 ₹${dayStats.bankSpentInr.toLocaleString('en-IN')}`);
    var paymentsHtml = paymentsSummary.length ? paymentsSummary.join(' · ') : 'No spends logged yet';

    daySpendMonitorHtml = `
      <div class="day-spend-monitor-card">
        <div class="dsm-header">
          <div class="dsm-title-group">
            <span class="dsm-title">💳 Day ${day.dayNum} Spend vs. Plan</span>
            <span class="dsm-sub">Total Spent: Itinerary Realized + Extra Spends Logged</span>
          </div>
          <div class="dsm-status-pill ${statusPillClass}">
            ${statusPillText}
          </div>
        </div>

        <div class="dsm-metrics-grid">
          <div class="dsm-metric-card spent">
            <span class="dsm-lbl">Total Spent Today</span>
            <span class="dsm-val green">₹${dayStats.totalSpentInr.toLocaleString('en-IN')}</span>
            <span class="dsm-sub-val">≈ RM ${dayStats.totalSpentRm}</span>
          </div>
          <div class="dsm-metric-card planned">
            <span class="dsm-lbl">Planned Itinerary</span>
            <span class="dsm-val">₹${dayStats.plannedItineraryInr.toLocaleString('en-IN')}</span>
            <span class="dsm-sub-val">≈ RM ${dayStats.plannedItineraryRm}</span>
          </div>
          <div class="dsm-metric-card extra">
            <span class="dsm-lbl">Extra Logged Spends</span>
            <span class="dsm-val accent">+₹${dayStats.extraSpendsInr.toLocaleString('en-IN')}</span>
            <span class="dsm-sub-val">≈ RM ${dayStats.extraSpendsRm} (${dayStats.extraSpendsCount} logs)</span>
          </div>
          <div class="dsm-metric-card progress">
            <span class="dsm-lbl">Budget Utilized</span>
            <span class="dsm-val blue">${dayStats.percentageSpent}%</span>
            <span class="dsm-sub-val">${dayStats.doneItemsCount}/${dayStats.totalItemsCount} acts done</span>
          </div>
        </div>

        <div class="dsm-progress-track">
          <div class="dsm-progress-fill ${dayStats.isOverBudget ? 'over' : ''}" style="width: ${Math.min(100, dayStats.percentageSpent)}%"></div>
        </div>

        <div class="dsm-footer-chips">
          <span class="dsm-chip">🎟 Tickets: <strong>₹${dayStats.realizedTicketsInr.toLocaleString('en-IN')}</strong> / ₹${dayStats.plannedTicketsInr.toLocaleString('en-IN')} (${dayStats.bookedTicketsCount}/${dayStats.totalTicketsCount} booked)</span>
          <span class="dsm-chip">🍜 Meals/Rides: <strong>₹${(dayStats.realizedFoodInr + dayStats.realizedTransportInr + dayStats.realizedActivitiesInr).toLocaleString('en-IN')}</strong> / ₹${(dayStats.plannedFoodInr + dayStats.plannedTransportInr + dayStats.plannedActivitiesInr).toLocaleString('en-IN')}</span>
          <span class="dsm-chip">➕ Extra: <strong>₹${dayStats.extraSpendsInr.toLocaleString('en-IN')}</strong></span>
          <span class="dsm-chip pay-split">💳 ${paymentsHtml}</span>
        </div>
      </div>
    `;
  }

  var customExpensesHtml = renderCustomExpenses(day.id);
  var mapData = window.MAP_DATA ? window.MAP_DATA[day.mapId] : null;
  var mapHtml = '';

  if (mapData) {
    var chipStopsHtml = '';
    if (mapData.chipStops && mapData.chipStops.length) {
      mapData.chipStops.forEach(function (s, idx) {
        var numClass = s.isHotel ? ' hotel' : '';
        var kmHtml = s.km ? `<span class="map-stop-km">${s.km}</span>` : '';
        var arrowHtml = idx < mapData.chipStops.length - 1 ? `<span class="map-stop-arrow">→</span>` : '';
        chipStopsHtml += `
          <span class="map-stop">
            <span class="map-stop-num${numClass}">${s.num}</span>
            <span>${s.name}</span>
            ${kmHtml}
            ${arrowHtml}
          </span>
        `;
      });
    }

    mapHtml = `
      <div class="day-map">
        <div class="map-header">
          <span class="map-header-title">🗺 ${mapData.title.toUpperCase()}</span>
          <a class="map-open-btn" href="${mapData.googleMapsUrl}" target="_blank">Open in Google Maps ↗</a>
        </div>
        ${chipStopsHtml ? `<div class="map-stops">${chipStopsHtml}</div>` : ''}
        <div class="map-leaflet-container" id="${day.mapId}"></div>
      </div>
    `;
  }

  var headerCostHtml = dayStats
    ? `<div class="day-cost-total">
        <span class="day-spent-badge">₹${dayStats.totalSpentInr.toLocaleString('en-IN')} spent</span>
        <span class="day-planned-sub">of ₹${dayStats.plannedItineraryInr.toLocaleString('en-IN')}</span>
      </div>`
    : `<div class="day-cost-total">${day.costTotal}</div>`;

  var html = `
    <div class="day-viewer-nav">
      <button class="dvn-btn" ${!prevDayId ? 'disabled' : ''} onclick="switchView('${prevDayId || ''}')">← Prev Day</button>
      <span class="dvn-title">Day ${day.dayNum} of 5</span>
      <button class="dvn-btn" ${!nextDayId ? 'disabled' : ''} onclick="switchView('${nextDayId || ''}')">Next Day →</button>
    </div>

    <div class="day-card" id="day-${day.id}">
      <div class="day-header">
        <span class="day-badge ${day.badgeClass}" ${day.badgeStyle ? `style="${day.badgeStyle}"` : ''}>${day.badgeText}</span>
        <div class="day-title-block">
          <div class="day-title">${day.title}</div>
          <div class="day-date">${day.date}</div>
        </div>
        ${headerCostHtml}
      </div>
      <div class="day-body">
        ${daySpendMonitorHtml}
        ${coupleTipHtml}
        <div class="timeline">${timelineHtml}</div>
        ${customExpensesHtml}
        ${mapHtml}
      </div>
    </div>
  `;

  container.innerHTML = html;

  // Initialize Map for focused day
  if (mapData) {
    setTimeout(function () {
      if (window.initMap) {
        initMap(day.mapId);
      }
    }, 50);
  }
}

function renderDayWiseSpendSummary() {
  var container = document.getElementById('day-wise-summary-container');
  if (!container || !window.TripStorage || !window.ITINERARY_DATA) return;

  var allStats = window.TripStorage.getAllDaysStats();
  if (!allStats) return;

  // 1. Top 4 KPI metric cards
  var kpiHtml = `
    <div class="day-kpi-grid">
      <div class="day-kpi-card planned">
        <div class="kpi-label">📅 5-Day Planned Sum</div>
        <div class="kpi-val">₹${allStats.totalPlannedItineraryInr.toLocaleString('en-IN')}</div>
        <div class="kpi-sub">≈ RM ${allStats.totalPlannedItineraryRm.toLocaleString('en-IN')} · Itinerary items</div>
      </div>

      <div class="day-kpi-card spent">
        <div class="kpi-label">💸 Total Day-Wise Spent</div>
        <div class="kpi-val green">₹${allStats.grandTotalSpentInr.toLocaleString('en-IN')}</div>
        <div class="kpi-sub">≈ RM ${allStats.grandTotalSpentRm.toLocaleString('en-IN')} (${allStats.overallPercentageSpent}% realized)</div>
      </div>

      <div class="day-kpi-card extra">
        <div class="kpi-label">➕ Extra Logged Spends</div>
        <div class="kpi-val accent">+₹${allStats.totalExtraSpendsInr.toLocaleString('en-IN')}</div>
        <div class="kpi-sub">≈ RM ${allStats.totalExtraSpendsRm.toLocaleString('en-IN')} (${allStats.totalExtraSpendsCount} logged item${allStats.totalExtraSpendsCount === 1 ? '' : 's'})</div>
      </div>

      <div class="day-kpi-card remaining">
        <div class="kpi-label">🎯 Day Budget Balance</div>
        <div class="kpi-val ${allStats.totalDifferenceInr > 0 ? 'over' : 'blue'}">
          ${allStats.totalDifferenceInr > 0 ? '+₹' + allStats.totalDifferenceInr.toLocaleString('en-IN') : '₹' + allStats.totalRemainingInr.toLocaleString('en-IN')}
        </div>
        <div class="kpi-sub">${allStats.totalDifferenceInr > 0 ? '⚠️ Over planned budget' : 'Remaining to spend in days'}</div>
      </div>
    </div>
  `;

  // Grand Total Card (5 Days Itinerary + Extra Spends)
  var grandPayChips = [];
  if (allStats.totalCashSpentRm > 0) grandPayChips.push(`<span class="day-pay-chip cash">💵 RM ${allStats.totalCashSpentRm} (₹${allStats.totalCashSpentInr.toLocaleString('en-IN')})</span>`);
  if (allStats.totalCardSpentInr > 0) grandPayChips.push(`<span class="day-pay-chip card">💳 ₹${allStats.totalCardSpentInr.toLocaleString('en-IN')}</span>`);
  if (allStats.totalBankSpentInr > 0) grandPayChips.push(`<span class="day-pay-chip bank">🏦 ₹${allStats.totalBankSpentInr.toLocaleString('en-IN')}</span>`);
  var grandPaymentsHtml = grandPayChips.length ? grandPayChips.join(' ') : 'None yet';

  var grandStatusText = allStats.totalDifferenceInr > 0 
    ? `⚠️ +₹${allStats.totalDifferenceInr.toLocaleString('en-IN')} Over Plan` 
    : `✅ ₹${allStats.totalRemainingInr.toLocaleString('en-IN')} Remaining`;

  var grandCardHtml = `
    <div class="day-summary-card grand-total">
      <div class="dsc-header">
        <div class="dsc-left">
          <span class="day-badge-mini total">ALL</span>
          <div class="dsc-title-wrap">
            <span class="dsc-title" style="color:var(--green)">Grand Day-Wise Total (5 Days Itinerary + Extra Spends)</span>
            <span class="dsc-date">16 Aug – 20 Aug 2026 · Total 5-Day Realized + Spontaneous Spends</span>
          </div>
        </div>
        <div class="dsc-right">
          <div class="dsc-spend-block">
            <span class="dsc-spent-val green" style="font-size:1.35rem;">₹${allStats.grandTotalSpentInr.toLocaleString('en-IN')}</span>
            <span class="dsc-planned-val">/ ₹${allStats.totalPlannedItineraryInr.toLocaleString('en-IN')} plan</span>
          </div>
          <span class="day-variance-pill ${allStats.totalDifferenceInr > 0 ? 'over' : 'remaining'}">${grandStatusText}</span>
        </div>
      </div>

      <div class="dsc-progress-track">
        <div class="dsc-progress-fill ${allStats.totalDifferenceInr > 0 ? 'over' : ''}" style="width:${Math.min(100, allStats.overallPercentageSpent)}%"></div>
      </div>

      <div class="dsc-breakdown-grid">
        <div class="dsc-breakdown-item">
          <span class="dsc-bi-lbl">📋 5-Day Planned:</span>
          <span class="dsc-bi-val">₹${allStats.totalPlannedItineraryInr.toLocaleString('en-IN')} <span class="dsc-bi-sub">(RM ${allStats.totalPlannedItineraryRm})</span></span>
        </div>
        <div class="dsc-breakdown-item">
          <span class="dsc-bi-lbl">💸 Itinerary Realized:</span>
          <span class="dsc-bi-val green">₹${allStats.totalRealizedItineraryInr.toLocaleString('en-IN')} <span class="dsc-bi-sub">(RM ${allStats.totalRealizedItineraryRm})</span></span>
        </div>
        <div class="dsc-breakdown-item">
          <span class="dsc-bi-lbl">➕ Extra Spends Logged:</span>
          <span class="dsc-bi-val accent">+₹${allStats.totalExtraSpendsInr.toLocaleString('en-IN')} <span class="dsc-bi-sub">(${allStats.totalExtraSpendsCount} logs)</span></span>
        </div>
        <div class="dsc-breakdown-item">
          <span class="dsc-bi-lbl">💳 All Payments:</span>
          <span class="dsc-bi-val">${grandPaymentsHtml}</span>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = `
    <div class="day-wise-summary-section">
      <div class="section-title">
        <span>📅 Grand Day-Wise Spend vs. Planned Summary</span>
      </div>
      <div class="section-sub-desc">
        Complete 5-day financial summary combining scheduled itinerary costs (booked tickets &amp; completed meals) with all spontaneous extra spend logs.
      </div>

      ${kpiHtml}

      <div class="day-summary-deck">
        ${grandCardHtml}
      </div>
    </div>
  `;
}

function renderBudgetTable() {
  var container = document.getElementById('budget-container');
  if (!container || !window.TripStorage || !window.ITINERARY_DATA) return;

  var budget = window.TripStorage.getDynamicBudgetTotals();
  var wallet = window.TripStorage.getWalletStats();
  var rate = window.TripStorage.getExchangeRate();

  var html = `
    <div class="budget-section">
      <div class="section-title">Complete Budget &amp; Expense Breakdown</div>
      <div class="budget-grid">
        <!-- FIXED PRE-TRIP -->
        <div class="bg-row header" style="background:#12201a;">
          <div>✅ Already Booked &amp; Confirmed</div>
          <div class="bg-rm">RM</div>
          <div class="bg-inr">₹${budget.fixedPaid.toLocaleString('en-IN')}</div>
        </div>
        <div class="bg-row fixed-item">
          <div>✈ Flights (Kochi ↔ KL, 2 people) · Booking J9JSTV</div>
          <div class="bg-rm">—</div>
          <div class="bg-inr">₹55,000</div>
        </div>
        <div class="bg-row fixed-item">
          <div>🏨 My Hotel @ Bukit Bintang (4 Nights + Bfast)</div>
          <div class="bg-rm">—</div>
          <div class="bg-inr">₹14,200</div>
        </div>

        <!-- ATTRACTION TICKETS -->
        <div class="bg-row header">
          <div>🎟 Attraction Tickets (Paid vs Pending)</div>
          <div class="bg-rm">RM (couple)</div>
          <div class="bg-inr">₹ (couple)</div>
        </div>
  `;

  window.ITINERARY_DATA.forEach(function (day) {
    if (day.timeline) {
      day.timeline.forEach(function (item) {
        if (item.isTicketRequired) {
          var isBooked = window.TripStorage.isItemBooked(item.id, item.defaultBooked);
          var exp = window.TripStorage.getItemExpense(item);
          var statusPill = isBooked
            ? '<span class="table-status-pill booked">✅ Booked</span>'
            : '<span class="table-status-pill pending">⏳ Pending</span>';
          var payTag = `<span class="table-pay-tag ${exp.paymentMethod}">${exp.paymentMethod === 'cash' ? '💵 Cash' : (exp.paymentMethod === 'bank' ? '🏦 Bank' : '💳 Card')}</span>`;

          html += `
            <div class="bg-row">
              <div>${item.shortName || item.name} ${statusPill} ${payTag}</div>
              <div class="bg-rm">RM ${exp.amountRm}</div>
              <div class="bg-inr">${isBooked ? '<span style="color:var(--green)">' : ''}₹${exp.amountInr.toLocaleString('en-IN')}${isBooked ? '</span>' : ''}</div>
            </div>
          `;
        }
      });
    }
  });

  html += `
        <!-- FOOD & DINING MEALS -->
        <div class="bg-row header">
          <div>🍜 Food &amp; Dining (Itemized)</div>
          <div class="bg-rm">RM (couple)</div>
          <div class="bg-inr">₹ (couple)</div>
        </div>
  `;

  window.ITINERARY_DATA.forEach(function (day) {
    if (day.timeline) {
      day.timeline.forEach(function (item) {
        if (item.category === 'food') {
          var isDone = window.TripStorage.isItemDone(item.id);
          var exp = window.TripStorage.getItemExpense(item);
          var doneTag = isDone ? '<span class="table-status-pill booked">✓ Spent</span>' : '';
          var payTag = `<span class="table-pay-tag ${exp.paymentMethod}">${exp.paymentMethod === 'cash' ? '💵 Cash' : (exp.paymentMethod === 'bank' ? '🏦 Bank' : '💳 Card')}</span>`;

          html += `
            <div class="bg-row">
              <div>Day ${day.dayNum}: ${item.shortName || item.name} ${doneTag} ${payTag}</div>
              <div class="bg-rm">RM ${exp.amountRm}</div>
              <div class="bg-inr">${isDone ? '<span style="color:var(--green)">' : ''}₹${exp.amountInr.toLocaleString('en-IN')}${isDone ? '</span>' : ''}</div>
            </div>
          `;
        }
      });
    }
  });

  html += `
        <!-- LOCAL TRANSPORT -->
        <div class="bg-row header">
          <div>🚗 Local Transport (Grab / Buses / Trains)</div>
          <div class="bg-rm">RM (couple)</div>
          <div class="bg-inr">₹ (couple)</div>
        </div>
  `;

  window.ITINERARY_DATA.forEach(function (day) {
    if (day.timeline) {
      day.timeline.forEach(function (item) {
        if (item.category === 'transport') {
          var isDone = window.TripStorage.isItemDone(item.id);
          var exp = window.TripStorage.getItemExpense(item);
          var doneTag = isDone ? '<span class="table-status-pill booked">✓ Done</span>' : '';
          var payTag = `<span class="table-pay-tag ${exp.paymentMethod}">${exp.paymentMethod === 'cash' ? '💵 Cash' : (exp.paymentMethod === 'bank' ? '🏦 Bank' : '💳 Card')}</span>`;

          html += `
            <div class="bg-row">
              <div>Day ${day.dayNum}: ${item.shortName || item.name} ${doneTag} ${payTag}</div>
              <div class="bg-rm">RM ${exp.amountRm}</div>
              <div class="bg-inr">${isDone ? '<span style="color:var(--green)">' : ''}₹${exp.amountInr.toLocaleString('en-IN')}${isDone ? '</span>' : ''}</div>
            </div>
          `;
        }
      });
    }
  });

  // Custom Logged Expenses
  var customList = window.TripStorage.getState().customExpenses || [];
  if (customList.length) {
    html += `
        <div class="bg-row header">
          <div>➕ Extra Logged Spends</div>
          <div class="bg-rm">RM</div>
          <div class="bg-inr">₹</div>
        </div>
    `;
    customList.forEach(function (ce) {
      var payTag = `<span class="table-pay-tag ${ce.paymentMethod}">${ce.paymentMethod === 'cash' ? '💵 Cash' : (ce.paymentMethod === 'bank' ? '🏦 Bank' : '💳 Card')}</span>`;
      html += `
        <div class="bg-row">
          <div>Day ${ce.dayId.replace('d', '')}: ${ce.title} ${payTag}</div>
          <div class="bg-rm">RM ${ce.amountRm}</div>
          <div class="bg-inr" style="color:var(--green)">₹${ce.amountInr.toLocaleString('en-IN')}</div>
        </div>
      `;
    });
  }

  html += `
        <!-- SHOPPING & MISC -->
        <div class="bg-row header">
          <div>🛍 Shopping &amp; Misc</div>
          <div class="bg-rm">RM</div>
          <div class="bg-inr">₹${(budget.shoppingTotal + budget.miscTotal).toLocaleString('en-IN')}</div>
        </div>
        <div class="bg-row">
          <div>Shopping for both (hard cap)</div>
          <div class="bg-rm">~RM 430</div>
          <div class="bg-inr">&lt;₹${budget.shoppingTotal.toLocaleString('en-IN')}</div>
        </div>
        <div class="bg-row">
          <div>💊 Misc — tips, water, sunscreen, Touch 'n Go, extras</div>
          <div class="bg-rm">RM 150</div>
          <div class="bg-inr">₹${budget.miscTotal.toLocaleString('en-IN')}</div>
        </div>

        <!-- MULTI-CHANNEL WALLET & SPEND STATUS -->
        <div class="bg-row header" style="background:#1a120a;">
          <div>Multi-Channel Payment &amp; Wallet Summary</div>
          <div></div>
          <div></div>
        </div>
        <div class="bg-row fixed-item">
          <div>💵 Cash in Hand (Starting RM ${wallet.initialCashRm} · Spent RM ${wallet.cashSpentRm})</div>
          <div class="bg-rm">RM ${wallet.remainingCashRm} left</div>
          <div class="bg-inr" style="color:var(--green)">₹${wallet.remainingCashInr.toLocaleString('en-IN')} remaining</div>
        </div>
        <div class="bg-row fixed-item">
          <div>💳 Credit / Forex Card Total Spend</div>
          <div class="bg-rm">RM ${wallet.cardSpentRm}</div>
          <div class="bg-inr" style="color:var(--blue)">₹${wallet.cardSpentInr.toLocaleString('en-IN')}</div>
        </div>
        <div class="bg-row fixed-item">
          <div>🏦 Indian Bank A/C Online / NetBanking Spend</div>
          <div class="bg-rm">RM ${wallet.bankSpentRm}</div>
          <div class="bg-inr" style="color:var(--purple)">₹${wallet.bankSpentInr.toLocaleString('en-IN')}</div>
        </div>
        <div class="bg-row fixed-item">
          <div>Paid So Far (Flights + Hotel + All Confirmed Spends)</div>
          <div class="bg-rm">—</div>
          <div class="bg-inr" style="color:var(--green)">₹${budget.paidSoFar.toLocaleString('en-IN')}</div>
        </div>
        <div class="bg-row fixed-item">
          <div>Remaining to Spend in Malaysia</div>
          <div class="bg-rm">—</div>
          <div class="bg-inr" style="color:var(--accent)">₹${budget.remainingToSpend.toLocaleString('en-IN')}</div>
        </div>
        <div class="bg-row total">
          <div>💰 GRAND TOTAL — Complete Trip for 2</div>
          <div class="bg-rm"></div>
          <div class="bg-inr">~₹${budget.grandTotal.toLocaleString('en-IN')}</div>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = html;
}

function renderShoppingGuide() {
  var container = document.getElementById('shopping-container');
  if (!container || !window.TRIP_DATA || !window.TRIP_DATA.shopping) return;

  var data = window.TRIP_DATA.shopping;
  var itemsHtml = '';
  data.items.forEach(function (item) {
    itemsHtml += `
      <li>
        <strong>${item.title}</strong>
        <span>${item.desc}</span>
      </li>
    `;
  });

  container.innerHTML = `
    <hr class="divider">
    <div class="section-title">Shopping Guide 💑 <span style="font-size:14px;color:var(--muted);font-family:'DM Sans';">${data.subtitle}</span></div>
    <ul class="shop-list">
      ${itemsHtml}
    </ul>
  `;
}

function renderTravelTips() {
  var container = document.getElementById('tips-container');
  if (!container || !window.TRIP_DATA || !window.TRIP_DATA.tips) return;

  var cardsHtml = '';
  window.TRIP_DATA.tips.forEach(function (tip) {
    cardsHtml += `
      <div class="tip-card">
        <h4>${tip.title}</h4>
        <p>${tip.desc}</p>
      </div>
    `;
  });

  container.innerHTML = `
    <hr class="divider">
    <div class="section-title">Couple Travel Tips 💑</div>
    <div class="tips-grid">
      ${cardsHtml}
    </div>
  `;
}

function renderSummaryRibbon() {
  var container = document.getElementById('summary-container');
  if (!container || !window.TripStorage) return;

  var budget = window.TripStorage.getDynamicBudgetTotals();
  var wallet = window.TripStorage.getWalletStats();

  container.innerHTML = `
    <div class="summary-ribbon">
      <div class="sr-item">
        <div class="sr-label">Total Spend (2 pax)</div>
        <div class="sr-val">₹${budget.grandTotal.toLocaleString('en-IN')}</div>
        <div class="sr-sub">flights + hotel + all acts</div>
      </div>
      <div class="sr-item">
        <div class="sr-label">Cash in Hand Left</div>
        <div class="sr-val" style="color:var(--green)">RM ${wallet.remainingCashRm}</div>
        <div class="sr-sub">₹${wallet.remainingCashInr.toLocaleString('en-IN')} remaining</div>
      </div>
      <div class="sr-item">
        <div class="sr-label">Card Total Spend</div>
        <div class="sr-val" style="color:var(--blue)">₹${wallet.cardSpentInr.toLocaleString('en-IN')}</div>
        <div class="sr-sub">RM ${wallet.cardSpentRm} charged</div>
      </div>
      <div class="sr-item">
        <div class="sr-label">Indian Bank Spend</div>
        <div class="sr-val" style="color:var(--purple)">₹${wallet.bankSpentInr.toLocaleString('en-IN')}</div>
        <div class="sr-sub">Direct INR debited</div>
      </div>
    </div>
    <div class="footer-text">
      ${(window.TRIP_DATA && window.TRIP_DATA.footerText) || ''}
    </div>
  `;
}
