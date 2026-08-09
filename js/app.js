/**
 * Main Application Controller & Event Dispatcher
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

// Accordion Toggle for All-Days Overview
function toggle(header) {
  header.classList.toggle('open');
  var body = header.nextElementSibling;
  if (!body) return;
  body.classList.toggle('open');

  if (body.classList.contains('open')) {
    var c = body.querySelector('.map-leaflet-container');
    if (!c) return;

    requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        if (c.offsetHeight === 0) {
          setTimeout(function() {
            if (!c._leafletDone) initMap(c.id);
            else if (c._mapRef) c._mapRef.invalidateSize();
          }, 200);
          return;
        }
        if (!c._leafletDone) {
          initMap(c.id);
        } else if (c._mapRef) {
          c._mapRef.invalidateSize();
        }
      });
    });
  }
}

// Switch between All Days Overview and Single Day Viewer
function switchView(viewId) {
  if (!viewId) return;
  if (window.TripStorage) {
    window.TripStorage.setActiveView(viewId);
  }

  renderDayTabs();
  renderItinerary();

  if (viewId === 'all') {
    var first = document.querySelector('.day-header');
    if (first && !first.classList.contains('open')) {
      toggle(first);
    }
  }
}

// Toggle Activity Done State
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

  renderProgressBar();
}

// Toggle Item Booking Status & Show/Hide Booking Buttons
function toggleBooked(itemId, defaultVal, event) {
  if (event) {
    event.stopPropagation();
  }
  if (!window.TripStorage) return;

  window.TripStorage.toggleItemBooked(itemId, defaultVal);

  // Find item and replace its DOM element in place to update buttons & inputs
  var itemEl = document.getElementById('item-' + itemId);
  if (itemEl && window.ITINERARY_DATA) {
    var foundItem = null;
    for (var d = 0; d < window.ITINERARY_DATA.length; d++) {
      var day = window.ITINERARY_DATA[d];
      if (day.timeline) {
        for (var t = 0; t < day.timeline.length; t++) {
          if (day.timeline[t].id === itemId) {
            foundItem = day.timeline[t];
            break;
          }
        }
      }
      if (foundItem) break;
    }
    if (foundItem) {
      var tempDiv = document.createElement('div');
      tempDiv.innerHTML = renderTimelineItem(foundItem);
      var newItemEl = tempDiv.firstElementChild;
      if (newItemEl) {
        itemEl.parentNode.replaceChild(newItemEl, itemEl);
      }
    }
  }

  // Update progress, budget table & summary ribbon
  renderProgressBar();
  renderBudgetTable();
  renderSummaryRibbon();
}

// Handle Actual Spend Edit in Input
function onActualSpendChange(itemId, value) {
  if (!window.TripStorage) return;

  window.TripStorage.setActualSpend(itemId, value);

  // Update budget calculations in real-time
  renderProgressBar();
  renderBudgetTable();
  renderSummaryRibbon();
}

// Reset Progress & Bookings
function resetTripProgress() {
  if (confirm('Are you sure you want to reset your checked items, booking statuses, and custom amounts?')) {
    if (window.TripStorage) {
      window.TripStorage.resetAll();
    }
    renderProgressBar();
    renderItinerary();
    renderBudgetTable();
    renderSummaryRibbon();
  }
}

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
  renderHero();
  renderMetaAlerts();
  renderProgressBar();
  renderFixedBookings();
  renderDayTabs();
  renderItinerary();
  renderBudgetTable();
  renderShoppingGuide();
  renderTravelTips();
  renderSummaryRibbon();

  var activeView = window.TripStorage ? window.TripStorage.getActiveView() : 'all';
  if (activeView === 'all') {
    var first = document.querySelector('.day-header');
    if (first) {
      toggle(first);
    }
  }
});
