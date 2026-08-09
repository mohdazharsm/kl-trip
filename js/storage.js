/**
 * State Management & localStorage Persistence with Dynamic Budget Calculations
 */

const STORAGE_KEY = 'kl_trip_planner_state_v3';

window.TripStorage = {
  getState: function() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Storage read error:', e);
    }
    return {
      done: {},
      booked: {},
      actualSpend: {},
      activeView: 'all'
    };
  },

  saveState: function(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Storage save error:', e);
    }
  },

  isItemDone: function(itemId) {
    var state = this.getState();
    return !!(state.done && state.done[itemId]);
  },

  setItemDone: function(itemId, isDone) {
    var state = this.getState();
    if (!state.done) state.done = {};
    state.done[itemId] = !!isDone;
    this.saveState(state);
  },

  toggleItemDone: function(itemId) {
    var current = this.isItemDone(itemId);
    this.setItemDone(itemId, !current);
    return !current;
  },

  isItemBooked: function(itemId, defaultVal) {
    var state = this.getState();
    if (state.booked && typeof state.booked[itemId] !== 'undefined') {
      return !!state.booked[itemId];
    }
    return !!defaultVal;
  },

  setItemBooked: function(itemId, isBooked) {
    var state = this.getState();
    if (!state.booked) state.booked = {};
    state.booked[itemId] = !!isBooked;
    this.saveState(state);
  },

  toggleItemBooked: function(itemId, defaultVal) {
    var current = this.isItemBooked(itemId, defaultVal);
    this.setItemBooked(itemId, !current);
    return !current;
  },

  getActualSpend: function(itemId, defaultInr) {
    var state = this.getState();
    if (state.actualSpend && typeof state.actualSpend[itemId] !== 'undefined' && state.actualSpend[itemId] !== null && state.actualSpend[itemId] !== '') {
      var num = Number(state.actualSpend[itemId]);
      return isNaN(num) ? (defaultInr || 0) : num;
    }
    return (typeof defaultInr === 'number') ? defaultInr : 0;
  },

  setActualSpend: function(itemId, amount) {
    var state = this.getState();
    if (!state.actualSpend) state.actualSpend = {};
    state.actualSpend[itemId] = (amount === '' || isNaN(Number(amount))) ? null : Number(amount);
    this.saveState(state);
  },

  getActiveView: function() {
    var state = this.getState();
    return state.activeView || 'all';
  },

  setActiveView: function(viewId) {
    var state = this.getState();
    state.activeView = viewId;
    this.saveState(state);
  },

  getDynamicBudgetTotals: function() {
    var fixedPaid = 69200; // Flights ₹55,000 + Hotel ₹14,200

    var activitiesTotal = 0;
    var activitiesPaid = 0;
    var totalTicketed = 0;
    var bookedTicketed = 0;

    if (window.ITINERARY_DATA && window.ITINERARY_DATA.length) {
      window.ITINERARY_DATA.forEach(function(day) {
        if (day.timeline && day.timeline.length) {
          day.timeline.forEach(function(item) {
            if (item.isTicketRequired) {
              totalTicketed++;
              var isBooked = window.TripStorage.isItemBooked(item.id, item.defaultBooked);
              var cost = window.TripStorage.getActualSpend(item.id, item.costInr);
              activitiesTotal += cost;
              if (isBooked) {
                bookedTicketed++;
                activitiesPaid += cost;
              }
            } else if (item.costInr && item.costInr > 0 && !item.id.includes('dinner') && !item.id.includes('lunch') && !item.id.includes('grab')) {
              // Non-ticketed small activity entries (e.g. Eco park canopy / Batu Caves Ramayana)
              activitiesTotal += item.costInr;
            }
          });
        }
      });
    }

    var foodTotal = 14912;
    var transportTotal = 4660;
    var shoppingTotal = 10000;
    var miscTotal = 3495;

    var additionalSpend = activitiesTotal + foodTotal + transportTotal + shoppingTotal + miscTotal;
    var grandTotal = fixedPaid + additionalSpend;
    var paidSoFar = fixedPaid + activitiesPaid;
    var remainingToSpend = Math.max(0, grandTotal - paidSoFar);

    return {
      fixedPaid: fixedPaid,
      activitiesTotal: activitiesTotal,
      activitiesPaid: activitiesPaid,
      foodTotal: foodTotal,
      transportTotal: transportTotal,
      shoppingTotal: shoppingTotal,
      miscTotal: miscTotal,
      additionalSpend: additionalSpend,
      grandTotal: grandTotal,
      paidSoFar: paidSoFar,
      remainingToSpend: remainingToSpend,
      totalTicketed: totalTicketed,
      bookedTicketed: bookedTicketed
    };
  },

  getProgress: function() {
    var state = this.getState();
    var totalActivities = 0;
    var completedActivities = 0;
    var budgetStats = this.getDynamicBudgetTotals();

    if (window.ITINERARY_DATA && window.ITINERARY_DATA.length) {
      window.ITINERARY_DATA.forEach(function(day) {
        if (day.timeline && day.timeline.length) {
          day.timeline.forEach(function(item) {
            totalActivities++;
            if (state.done && state.done[item.id]) {
              completedActivities++;
            }
          });
        }
      });
    }

    var percentage = totalActivities > 0 ? Math.round((completedActivities / totalActivities) * 100) : 0;

    return {
      total: totalActivities,
      done: completedActivities,
      percentage: percentage,
      totalBookable: budgetStats.totalTicketed,
      booked: budgetStats.bookedTicketed
    };
  },

  resetAll: function() {
    localStorage.removeItem(STORAGE_KEY);
  }
};
