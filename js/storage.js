/**
 * State Management & localStorage Persistence with Multi-Channel Wallet (Cash, Card & Indian Bank A/C) Engine
 */

const STORAGE_KEY = 'kl_trip_planner_state_v7';

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
      expenses: {},
      customExpenses: [],
      wallet: {
        initialCashRm: 500,
        exchangeRate: 23.30
      },
      activeView: 'd1'
    };
  },

  saveState: function(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Storage save error:', e);
    }
  },

  // Exchange rate & Initial Cash
  getExchangeRate: function() {
    var state = this.getState();
    return (state.wallet && state.wallet.exchangeRate) ? Number(state.wallet.exchangeRate) : 23.30;
  },

  setExchangeRate: function(rate) {
    var state = this.getState();
    if (!state.wallet) state.wallet = {};
    state.wallet.exchangeRate = Number(rate) || 23.30;
    this.saveState(state);
  },

  getInitialCashRm: function() {
    var state = this.getState();
    return (state.wallet && typeof state.wallet.initialCashRm !== 'undefined') ? Number(state.wallet.initialCashRm) : 500;
  },

  setInitialCashRm: function(rm) {
    var state = this.getState();
    if (!state.wallet) state.wallet = {};
    state.wallet.initialCashRm = Math.max(0, Number(rm) || 0);
    this.saveState(state);
  },

  // Checklist Done state
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

  // Booking state for tickets
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

  // Item Expense (Amount in INR/RM + Payment Method: cash, card, bank)
  getItemExpense: function(item) {
    var state = this.getState();
    var rate = this.getExchangeRate();
    var saved = (state.expenses && state.expenses[item.id]) ? state.expenses[item.id] : null;

    if (saved) {
      return {
        amountInr: saved.amountInr,
        amountRm: saved.amountRm,
        paymentMethod: saved.paymentMethod || item.defaultPaymentMethod || 'cash',
        isEdited: true
      };
    }

    var defaultInr = item.costInr || 0;
    var defaultRm = item.costRm || (defaultInr > 0 ? Math.round(defaultInr / rate) : 0);

    return {
      amountInr: defaultInr,
      amountRm: defaultRm,
      paymentMethod: item.defaultPaymentMethod || (item.category === 'food' ? 'cash' : 'card'),
      isEdited: false
    };
  },

  setItemExpenseAmount: function(itemId, amount, inputCurrency) {
    var state = this.getState();
    var rate = this.getExchangeRate();
    if (!state.expenses) state.expenses = {};

    var num = Math.max(0, Number(amount) || 0);
    var amountInr = 0;
    var amountRm = 0;

    if (inputCurrency === 'RM') {
      amountRm = num;
      amountInr = Math.round(num * rate);
    } else {
      amountInr = num;
      amountRm = rate > 0 ? Math.round((num / rate) * 10) / 10 : 0;
    }

    var currentMethod = (state.expenses[itemId] && state.expenses[itemId].paymentMethod) || 'cash';

    state.expenses[itemId] = {
      amountInr: amountInr,
      amountRm: amountRm,
      paymentMethod: currentMethod,
      isEdited: true
    };

    this.saveState(state);
  },

  // Rotates: cash -> card -> bank -> cash
  toggleItemPaymentMethod: function(item) {
    var state = this.getState();
    if (!state.expenses) state.expenses = {};

    var currentExpense = this.getItemExpense(item);
    var methods = ['cash', 'card', 'bank'];
    var currentIdx = methods.indexOf(currentExpense.paymentMethod);
    if (currentIdx === -1) currentIdx = 0;
    var newMethod = methods[(currentIdx + 1) % methods.length];

    state.expenses[item.id] = {
      amountInr: currentExpense.amountInr,
      amountRm: currentExpense.amountRm,
      paymentMethod: newMethod,
      isEdited: true
    };

    this.saveState(state);
    return newMethod;
  },

  // Custom Quick Expenses on each day
  getCustomExpenses: function(dayId) {
    var state = this.getState();
    var all = state.customExpenses || [];
    if (dayId) {
      return all.filter(function(e) { return e.dayId === dayId; });
    }
    return all;
  },

  addCustomExpense: function(dayId, title, amount, currency, paymentMethod, category) {
    var state = this.getState();
    if (!state.customExpenses) state.customExpenses = [];

    var rate = this.getExchangeRate();
    var num = Math.max(0, Number(amount) || 0);
    var amountInr = 0;
    var amountRm = 0;

    if (currency === 'RM') {
      amountRm = num;
      amountInr = Math.round(num * rate);
    } else {
      amountInr = num;
      amountRm = rate > 0 ? Math.round((num / rate) * 10) / 10 : 0;
    }

    var newExp = {
      id: 'custom-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      dayId: dayId,
      title: title || 'Extra Expense',
      amountInr: amountInr,
      amountRm: amountRm,
      paymentMethod: paymentMethod || 'cash',
      category: category || 'misc',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    state.customExpenses.push(newExp);
    this.saveState(state);
    return newExp;
  },

  deleteCustomExpense: function(id) {
    var state = this.getState();
    if (state.customExpenses) {
      state.customExpenses = state.customExpenses.filter(function(e) { return e.id !== id; });
      this.saveState(state);
    }
  },

  // Active Tab View
  getActiveView: function() {
    var state = this.getState();
    return state.activeView || 'd1';
  },

  setActiveView: function(viewId) {
    var state = this.getState();
    state.activeView = viewId;
    this.saveState(state);
  },

  // Comprehensive Multi-Channel Wallet Calculations (Cash, Card, Indian Bank A/C)
  getWalletStats: function() {
    var state = this.getState();
    var rate = this.getExchangeRate();
    var initialCashRm = this.getInitialCashRm();
    var initialCashInr = Math.round(initialCashRm * rate);

    var cashSpentRm = 0;
    var cardSpentInr = 0;
    var bankSpentInr = 0;

    // Sum from itinerary timeline items:
    // Only counted as actually spent if marked Booked (for tickets) or Done (for meals/transport)
    if (window.ITINERARY_DATA) {
      window.ITINERARY_DATA.forEach(function(day) {
        if (day.timeline) {
          day.timeline.forEach(function(item) {
            var isActuallySpent = false;
            if (item.isTicketRequired) {
              isActuallySpent = window.TripStorage.isItemBooked(item.id, item.defaultBooked);
            } else if (item.costInr > 0 || item.costRm > 0) {
              isActuallySpent = window.TripStorage.isItemDone(item.id);
            }

            if (isActuallySpent) {
              var exp = window.TripStorage.getItemExpense(item);
              if (exp.paymentMethod === 'cash') {
                cashSpentRm += exp.amountRm;
              } else if (exp.paymentMethod === 'bank') {
                bankSpentInr += exp.amountInr;
              } else {
                cardSpentInr += exp.amountInr;
              }
            }
          });
        }
      });
    }

    // Sum from custom logged expenses
    var customList = state.customExpenses || [];
    customList.forEach(function(ce) {
      if (ce.paymentMethod === 'cash') {
        cashSpentRm += (ce.amountRm || 0);
      } else if (ce.paymentMethod === 'bank') {
        bankSpentInr += (ce.amountInr || 0);
      } else {
        cardSpentInr += (ce.amountInr || 0);
      }
    });

    var cashSpentInr = Math.round(cashSpentRm * rate);
    var remainingCashRm = Math.max(0, Math.round((initialCashRm - cashSpentRm) * 10) / 10);
    var remainingCashInr = Math.round(remainingCashRm * rate);

    return {
      initialCashRm: initialCashRm,
      initialCashInr: initialCashInr,
      cashSpentRm: Math.round(cashSpentRm * 10) / 10,
      cashSpentInr: cashSpentInr,
      remainingCashRm: remainingCashRm,
      remainingCashInr: remainingCashInr,
      cardSpentInr: cardSpentInr,
      cardSpentRm: rate > 0 ? Math.round((cardSpentInr / rate) * 10) / 10 : 0,
      bankSpentInr: bankSpentInr,
      bankSpentRm: rate > 0 ? Math.round((bankSpentInr / rate) * 10) / 10 : 0,
      exchangeRate: rate
    };
  },

  getDynamicBudgetTotals: function() {
    var fixedPaid = 69200; // Flights ₹55,000 + Hotel ₹14,200

    var ticketsTotal = 0;
    var ticketsPaid = 0;
    var totalTicketed = 0;
    var bookedTicketed = 0;

    var foodTotal = 0;
    var transportTotal = 0;
    var activitiesOtherTotal = 0;

    if (window.ITINERARY_DATA) {
      window.ITINERARY_DATA.forEach(function(day) {
        if (day.timeline) {
          day.timeline.forEach(function(item) {
            var exp = window.TripStorage.getItemExpense(item);

            if (item.isTicketRequired) {
              totalTicketed++;
              var isBooked = window.TripStorage.isItemBooked(item.id, item.defaultBooked);
              ticketsTotal += exp.amountInr;
              if (isBooked) {
                bookedTicketed++;
                ticketsPaid += exp.amountInr;
              }
            } else if (item.category === 'food') {
              foodTotal += exp.amountInr;
            } else if (item.category === 'transport') {
              transportTotal += exp.amountInr;
            } else if (item.category === 'activity') {
              activitiesOtherTotal += exp.amountInr;
            }
          });
        }
      });
    }

    // Add extra custom expenses
    var customList = this.getState().customExpenses || [];
    var customTotalInr = 0;
    customList.forEach(function(ce) {
      customTotalInr += (ce.amountInr || 0);
    });

    var shoppingTotal = 10000;
    var miscTotal = 3495;

    var additionalSpend = ticketsTotal + foodTotal + transportTotal + activitiesOtherTotal + shoppingTotal + miscTotal + customTotalInr;
    var grandTotal = fixedPaid + additionalSpend;

    // Paid so far = Flights & Hotel (Fixed) + all logged cash, card, and Indian bank spend
    var walletStats = this.getWalletStats();
    var paidSoFar = fixedPaid + walletStats.cashSpentInr + walletStats.cardSpentInr + walletStats.bankSpentInr;
    var remainingToSpend = Math.max(0, grandTotal - paidSoFar);

    return {
      fixedPaid: fixedPaid,
      ticketsTotal: ticketsTotal,
      ticketsPaid: ticketsPaid,
      foodTotal: foodTotal,
      transportTotal: transportTotal,
      activitiesOtherTotal: activitiesOtherTotal,
      shoppingTotal: shoppingTotal,
      miscTotal: miscTotal,
      customTotalInr: customTotalInr,
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
