/**
 * Dynamic DOM Renderer for Trip Plan with Editable Actual Spend & Live Budget Engine
 */

function renderHero() {
  var heroEl = document.getElementById('hero-section');
  if (!heroEl || !window.TRIP_DATA || !window.TRIP_DATA.meta) return;
  var meta = window.TRIP_DATA.meta;

  heroEl.innerHTML = `
    <div class="hero-eyebrow">${meta.eyebrow}</div>
    <h1>${meta.title}</h1>
    <div class="hero-sub">${meta.sub}</div>
    <div class="hero-tags">
      <span class="couple-tag">${meta.coupleTag}</span>
      <span class="pwa-tag">📱 Offline &amp; PWA Ready</span>
    </div>
  `;
}

function renderMetaAlerts() {
  var alertsEl = document.getElementById('meta-alerts');
  if (!alertsEl || !window.TRIP_DATA || !window.TRIP_DATA.meta) return;
  var meta = window.TRIP_DATA.meta;

  alertsEl.innerHTML = `
    <div class="rate-pill-container">
      <span class="rate-pill">${meta.ratePill}</span>
    </div>
    <div class="alert-box">
      ${meta.budgetAlert}
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
          <strong>${stats.done} / ${stats.total}</strong> done (${stats.percentage}%) · <strong>${budget.bookedTicketed} / ${budget.totalTicketed}</strong> booked
        </div>
      </div>
      <div class="progress-bar-track">
        <div class="progress-bar-fill" style="width: ${stats.percentage}%"></div>
      </div>
      <div class="progress-substats">
        <span>💰 Paid So Far: <strong style="color:var(--green)">₹${budget.paidSoFar.toLocaleString('en-IN')}</strong> · Remaining: <strong style="color:var(--accent)">₹${budget.remainingToSpend.toLocaleString('en-IN')}</strong></span>
        ${stats.done > 0 || budget.bookedTicketed > 1 ? '<button class="reset-btn" onclick="resetTripProgress()">Reset All</button>' : ''}
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

  window.TRIP_DATA.fixedBookings.forEach(function(b) {
    html += `
      <div class="booking-card">
        <div class="bc-label">${b.label}</div>
        <div class="bc-title">${b.title} <span class="tag-confirmed">${b.statusTag}</span></div>
        <div class="bc-detail">${b.detail}</div>
        <div class="bc-price">${b.price} <span style="font-size:13px;color:var(--muted)">${b.priceSub}</span></div>
      </div>
    `;
  });

  html += `</div>`;
  bookingsEl.innerHTML = html;
}

function renderDayTabs() {
  var container = document.getElementById('day-tabs-container');
  if (!container || !window.ITINERARY_DATA) return;

  var activeView = window.TripStorage ? window.TripStorage.getActiveView() : 'all';

  var html = `
    <div class="day-tabs-container">
      <button class="day-tab ${activeView === 'all' ? 'active' : ''}" onclick="switchView('all')">
        📅 All Days (Overview)
      </button>
  `;

  window.ITINERARY_DATA.forEach(function(day) {
    var isActive = activeView === day.id;
    html += `
      <button class="day-tab ${isActive ? 'active' : ''}" onclick="switchView('${day.id}')">
        Day ${day.dayNum} <span class="tab-badge">${day.timeline ? day.timeline.length : ''} acts</span>
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

  var metaHtml = '';

  // Booking toggle button & Editable Actual Spend for ticketed items
  if (item.isTicketRequired) {
    var badgeClass = isBooked ? 'booked' : 'unbooked';
    var badgeText = isBooked ? '✅ Booked' : '⏳ Need to Book';
    var actualSpend = window.TripStorage ? window.TripStorage.getActualSpend(item.id, item.costInr) : item.costInr;

    metaHtml += `
      <button class="book-toggle-badge ${badgeClass}" onclick="toggleBooked('${item.id}', ${!!item.defaultBooked}, event)">
        ${badgeText}
      </button>
      <div class="actual-spend-container" onclick="event.stopPropagation()">
        <span class="actual-spend-label">${isBooked ? 'Paid:' : 'Est:'}</span>
        <span class="actual-spend-prefix">₹</span>
        <input type="number" class="actual-spend-input" id="spend-${item.id}" value="${actualSpend}" oninput="onActualSpendChange('${item.id}', this.value)" title="Edit actual amount paid" />
      </div>
    `;
  }

  if (item.badges && item.badges.length) {
    item.badges.forEach(function(b) {
      metaHtml += `<span class="price-badge ${b.class}">${b.text}</span>`;
    });
  }

  // Booking / navigation buttons: hide booking button if already booked!
  if (item.buttons && item.buttons.length) {
    item.buttons.forEach(function(btn) {
      var isBookingButton = btn.text.toLowerCase().includes('book') || btn.text.toLowerCase().includes('official') || btn.text.toLowerCase().includes('klook');
      if (item.isTicketRequired && isBooked && isBookingButton) {
        return; // Don't show booking button when already booked
      }
      var btnClass = btn.alt ? 'book-btn alt' : 'book-btn';
      metaHtml += `<a class="${btnClass}" href="${btn.url}" target="_blank">${btn.text}</a>`;
    });
  }

  var tipBoxHtml = item.tipBox ? `<div class="tip-box">${item.tipBox}</div>` : '';

  return `
    <div class="tl-item ${isDone ? 'is-done' : ''}" id="item-${item.id}">
      <div class="tl-left">
        <div class="tl-time">${item.time}</div>
        <div class="tl-dot${dotClass}"></div>
      </div>
      <div class="tl-content">
        <div class="tl-top-row">
          <div class="tl-name">${item.name}</div>
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

function renderDayMap(mapId) {
  var mapData = window.MAP_DATA ? window.MAP_DATA[mapId] : null;
  if (!mapData) return '';

  var stopsHtml = '';
  if (mapData.chipStops && mapData.chipStops.length) {
    mapData.chipStops.forEach(function(s, idx) {
      if (idx > 0) {
        stopsHtml += `<span class="map-stop-arrow">→</span>`;
      }
      var numClass = s.isHotel ? 'map-stop-num hotel' : 'map-stop-num';
      var kmHtml = s.km ? ` <span class="map-stop-km">${s.km}</span>` : '';
      stopsHtml += `
        <span class="map-stop">
          <span class="${numClass}">${s.num}</span> ${s.name}${kmHtml}
        </span>
      `;
    });
  }

  return `
    <div class="day-map">
      <div class="map-header">
        <span class="map-header-title">🗺 ${mapData.title}</span>
        <a class="map-open-btn" href="${mapData.googleMapsUrl}" target="_blank">Open in Google Maps ↗</a>
      </div>
      <div class="map-stops">
        ${stopsHtml}
      </div>
      <div class="map-leaflet-container" id="${mapId}"></div>
    </div>
  `;
}

function renderItinerary() {
  var container = document.getElementById('itinerary-container');
  if (!container || !window.ITINERARY_DATA) return;

  var activeView = window.TripStorage ? window.TripStorage.getActiveView() : 'all';

  // Day Viewer Mode (Single Day)
  if (activeView !== 'all') {
    var dayIndex = window.ITINERARY_DATA.findIndex(function(d) { return d.id === activeView; });
    if (dayIndex !== -1) {
      var currentDay = window.ITINERARY_DATA[dayIndex];
      var prevDay = dayIndex > 0 ? window.ITINERARY_DATA[dayIndex - 1] : null;
      var nextDay = dayIndex < window.ITINERARY_DATA.length - 1 ? window.ITINERARY_DATA[dayIndex + 1] : null;

      var badgeClasses = 'day-badge' + (currentDay.badgeClass ? ` ${currentDay.badgeClass}` : '');
      var badgeStyleAttr = currentDay.badgeStyle ? ` style="${currentDay.badgeStyle}"` : '';
      var coupleTipHtml = currentDay.coupleTip ? `<div class="tip-box">${currentDay.coupleTip}</div>` : '';

      var timelineHtml = '';
      if (currentDay.timeline && currentDay.timeline.length) {
        currentDay.timeline.forEach(function(item) {
          timelineHtml += renderTimelineItem(item);
        });
      }

      var mapHtml = currentDay.mapId ? renderDayMap(currentDay.mapId) : '';

      container.innerHTML = `
        <div class="day-viewer-nav">
          <button class="dvn-btn" ${!prevDay ? 'disabled' : ''} onclick="switchView('${prevDay ? prevDay.id : ''}')">
            ← Day ${prevDay ? prevDay.dayNum : ''}
          </button>
          <div class="dvn-title">Day ${currentDay.dayNum} of 5</div>
          <button class="dvn-btn" ${!nextDay ? 'disabled' : ''} onclick="switchView('${nextDay ? nextDay.id : ''}')">
            Day ${nextDay ? nextDay.dayNum : ''} →
          </button>
        </div>

        <div class="day-card" id="card-${currentDay.id}">
          <div class="day-header open" style="cursor: default;">
            <div class="${badgeClasses}"${badgeStyleAttr}>${currentDay.badgeText}</div>
            <div class="day-title-block">
              <div class="day-title">${currentDay.title}</div>
              <div class="day-date">${currentDay.date}</div>
            </div>
            <div class="day-cost-total">${currentDay.costTotal}</div>
          </div>
          <div class="day-body open">
            ${coupleTipHtml}
            <div class="timeline">
              ${timelineHtml}
            </div>
            ${mapHtml}
          </div>
        </div>
      `;

      setTimeout(function() {
        if (currentDay.mapId) {
          initMap(currentDay.mapId);
        }
      }, 50);
      return;
    }
  }

  // All Days Accordion View
  var html = ``;

  window.ITINERARY_DATA.forEach(function(day) {
    var badgeClasses = 'day-badge' + (day.badgeClass ? ` ${day.badgeClass}` : '');
    var badgeStyleAttr = day.badgeStyle ? ` style="${day.badgeStyle}"` : '';
    var coupleTipHtml = day.coupleTip ? `<div class="tip-box">${day.coupleTip}</div>` : '';

    var timelineHtml = '';
    if (day.timeline && day.timeline.length) {
      day.timeline.forEach(function(item) {
        timelineHtml += renderTimelineItem(item);
      });
    }

    var mapHtml = day.mapId ? renderDayMap(day.mapId) : '';

    html += `
      <div class="day-card" id="card-${day.id}">
        <div class="day-header" onclick="toggle(this)">
          <div class="${badgeClasses}"${badgeStyleAttr}>${day.badgeText}</div>
          <div class="day-title-block">
            <div class="day-title">${day.title}</div>
            <div class="day-date">${day.date}</div>
          </div>
          <div class="day-cost-total">${day.costTotal}</div>
          <span class="chevron">▾</span>
        </div>
        <div class="day-body">
          ${coupleTipHtml}
          <div class="timeline">
            ${timelineHtml}
          </div>
          ${mapHtml}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function renderBudgetTable() {
  var container = document.getElementById('budget-container');
  if (!container || !window.TripStorage) return;

  var budget = window.TripStorage.getDynamicBudgetTotals();

  var html = `
    <div class="budget-section">
      <div class="section-title">Complete Budget — Live Cost Tracker 💑</div>
      <div class="budget-grid">
        <div class="bg-row header">
          <div>Item / Activity</div>
          <div class="bg-rm">RM (for 2)</div>
          <div class="bg-inr">₹ Total (2 pax)</div>
        </div>

        <!-- FIXED COSTS -->
        <div class="bg-row header" style="background:#12201a;">
          <div>✅ Confirmed Fixed Costs</div>
          <div></div>
          <div class="bg-inr" style="color:var(--green)">₹${budget.fixedPaid.toLocaleString('en-IN')}</div>
        </div>
        <div class="bg-row fixed-item">
          <div>✈ Flights (Kochi ↔ KL, both) · J9JSTV</div>
          <div class="bg-rm">—</div>
          <div class="bg-inr" style="color:var(--muted)">₹55,000</div>
        </div>
        <div class="bg-row fixed-item">
          <div>🏨 Hotel 4 nights (room + bfast for 2) · J9JSTV</div>
          <div class="bg-rm">—</div>
          <div class="bg-inr" style="color:var(--muted)">₹14,200</div>
        </div>

        <!-- ACTIVITIES SPLIT PER ITEM -->
        <div class="bg-row header">
          <div>🎟 Activities &amp; Ticketed Attractions (Per Activity)</div>
          <div class="bg-rm">RM</div>
          <div class="bg-inr" style="color:var(--accent)">₹${budget.activitiesTotal.toLocaleString('en-IN')}</div>
        </div>
  `;

  // Dynamically iterate over each day and render activities
  if (window.ITINERARY_DATA) {
    window.ITINERARY_DATA.forEach(function(day) {
      if (day.timeline) {
        day.timeline.forEach(function(item) {
          if (item.isTicketRequired) {
            var isBooked = window.TripStorage.isItemBooked(item.id, item.defaultBooked);
            var actualCost = window.TripStorage.getActualSpend(item.id, item.costInr);
            var statusPill = isBooked
              ? `<span class="table-status-pill booked">✅ Booked</span>`
              : `<span class="table-status-pill pending">⏳ Pending</span>`;

            html += `
              <div class="bg-row">
                <div>
                  ${item.shortName || item.name}
                  ${statusPill}
                </div>
                <div class="bg-rm">RM ${item.costRm || '—'}</div>
                <div class="bg-inr" style="color:${isBooked ? 'var(--green)' : 'var(--accent)'}">
                  ₹${actualCost.toLocaleString('en-IN')}
                </div>
              </div>
            `;
          } else if (item.costInr && item.costInr > 0 && !item.id.includes('dinner') && !item.id.includes('lunch') && !item.id.includes('grab')) {
            html += `
              <div class="bg-row">
                <div>${item.shortName || item.name}</div>
                <div class="bg-rm">~RM ${item.costRm}</div>
                <div class="bg-inr">₹${item.costInr.toLocaleString('en-IN')}</div>
              </div>
            `;
          }
        });
      }
    });
  }

  html += `
        <!-- FOOD & LOCAL TRANSPORT -->
        <div class="bg-row header">
          <div>🍜 Food &amp; Transport (4 full days)</div>
          <div class="bg-rm">RM</div>
          <div class="bg-inr">₹${(budget.foodTotal + budget.transportTotal).toLocaleString('en-IN')}</div>
        </div>
        <div class="bg-row">
          <div>Food for 2 (~RM 160/day × 4 days — hawkers + restaurants)</div>
          <div class="bg-rm">RM 640</div>
          <div class="bg-inr">₹${budget.foodTotal.toLocaleString('en-IN')}</div>
        </div>
        <div class="bg-row">
          <div>🚗 Local transport — Grab + MRT + buses (4 days, 2 pax)</div>
          <div class="bg-rm">RM 200</div>
          <div class="bg-inr">₹${budget.transportTotal.toLocaleString('en-IN')}</div>
        </div>

        <!-- SHOPPING & MISC -->
        <div class="bg-row header">
          <div>🛍 Shopping &amp; Misc</div>
          <div class="bg-rm">RM</div>
          <div class="bg-inr">₹${(budget.shoppingTotal + budget.miscTotal).toLocaleString('en-IN')}</div>
        </div>
        <div class="bg-row">
          <div>Shopping for both (hard cap as requested)</div>
          <div class="bg-rm">~RM 430</div>
          <div class="bg-inr">&lt;₹${budget.shoppingTotal.toLocaleString('en-IN')}</div>
        </div>
        <div class="bg-row">
          <div>💊 Misc — tips, water, sunscreen, Touch 'n Go, small extras</div>
          <div class="bg-rm">RM 150</div>
          <div class="bg-inr">₹${budget.miscTotal.toLocaleString('en-IN')}</div>
        </div>

        <!-- LIVE SUMMARY TOTALS -->
        <div class="bg-row header" style="background:#1a120a;">
          <div>Summary &amp; Spend Status</div>
          <div></div>
          <div></div>
        </div>
        <div class="bg-row fixed-item">
          <div>Already Paid So Far (Flights + Hotel + Booked Tickets)</div>
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
  data.items.forEach(function(item) {
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
  window.TRIP_DATA.tips.forEach(function(tip) {
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

  container.innerHTML = `
    <div class="summary-ribbon">
      <div class="sr-item">
        <div class="sr-label">Total Spend (2 people)</div>
        <div class="sr-val">₹${budget.grandTotal.toLocaleString('en-IN')}</div>
        <div class="sr-sub">flights + hotel + all acts</div>
      </div>
      <div class="sr-item">
        <div class="sr-label">Paid So Far</div>
        <div class="sr-val" style="color:var(--green)">₹${budget.paidSoFar.toLocaleString('en-IN')}</div>
        <div class="sr-sub">${budget.bookedTicketed} of ${budget.totalTicketed} tickets booked</div>
      </div>
      <div class="sr-item">
        <div class="sr-label">Remaining to Spend</div>
        <div class="sr-val" style="color:var(--accent)">₹${budget.remainingToSpend.toLocaleString('en-IN')}</div>
        <div class="sr-sub">food + transport + shopping</div>
      </div>
    </div>
    <div class="footer-text">
      ${(window.TRIP_DATA && window.TRIP_DATA.footerText) || ''}
    </div>
  `;
}
