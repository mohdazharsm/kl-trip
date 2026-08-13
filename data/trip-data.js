/**
 * General Trip Data, Bookings, Budget, Shopping, Tips & Summaries
 */
window.TRIP_DATA = {
  meta: {
    eyebrow: "✈ Kochi → Kuala Lumpur · Aug 2026",
    title: "Your <em>KL Trip</em> — Complete Plan",
    sub: "4 nights · Bukit Bintang · All prices for 2 people · Booking links included",
    coupleTag: "💑 2 People — All prices below are for the couple",
    ratePill: "💱 Live rate (8 Aug 2026): <strong>1 RM ≈ ₹23.30</strong> · All activity prices = per person × 2",
  },

  fixedBookings: [
    {
      label: "✈ Flights · Booking J9JSTV",
      title: "Kochi → KL → Kochi",
      statusTag: "Confirmed",
      detail: "15 Aug 22:40 dep · Arrives 16 Aug 05:30<br>Return: 20 Aug 20:25 → Kochi 22:00",
      price: "₹55,000",
      priceSub: "both"
    },
    {
      label: "🏨 Hotel · 4 Nights",
      title: "My Hotel @ Bukit Bintang",
      statusTag: "Confirmed",
      detail: "Check-in 16 Aug 3 PM · Check-out 20 Aug 12 PM<br>Breakfast for 2 included · Bukit Bintang, KL",
      price: "₹14,200",
      priceSub: "room"
    }
  ],

  budgetTable: [
    { type: "header", name: "✅ Already Booked & Paid", bgStyle: "background:#12201a;" },
    { type: "fixed", name: "✈ Flights (Kochi ↔ KL, both) · J9JSTV", rm: "—", inr: "₹55,000" },
    { type: "fixed", name: "🏨 Hotel 4 nights (room + bfast for 2) · J9JSTV", rm: "—", inr: "₹14,200" },

    { type: "header", name: "🎟 Activities (book on Klook / at counter)", rmHeader: "RM (×2)", inrHeader: "₹ (couple)" },
    { type: "item", name: "🌆 Petronas Twin Towers (Skybridge + Obs Deck) × 2 <span style=\"color:#5ecb8a;font-size:11px;\">✅ BOOKED · 4:30 PM slot</span>", rm: "—", inr: "₹7,084" },
    { type: "item", name: "🌿 KL Forest Eco Park Canopy Walk × 2 (Day 2)", rm: "RM 80", inr: "₹1,864" },
    { type: "item", name: "🕌 Masjid Wilayah Blue Mosque + 🏮 Thean Hou Temple (Day 2)", rm: "FREE", inr: "FREE" },
    { type: "item", name: "🕌 Batu Caves + 🦁 Zoo Negara (self-guided, incl. Grab fares) × 2", rm: "~RM 294", inr: "₹6,845" },
    { type: "item", name: "🚡 Genting Cable Car (round-trip) × 2", rm: "RM 110", inr: "₹2,563" },
    { type: "item", name: "🐠 Aquaria KLCC × 2", rm: "RM 160", inr: "₹3,728" },
    { type: "item", name: "✈ KLIA Ekspres both ways × 2 people", rm: "RM 220", inr: "₹5,126" },

    { type: "header", name: "🍜 Food & Transport (4 full days)", rmHeader: "RM", inrHeader: "₹" },
    { type: "item", name: "Food for 2 (~RM 160/day × 4 days — hawkers + restaurants)", rm: "RM 640", inr: "₹14,912" },
    { type: "item", name: "🚗 Local transport — Grab + MRT + buses (4 days, 2 pax)", rm: "RM 200", inr: "₹4,660" },

    { type: "header", name: "🛍 Shopping & Misc", rmHeader: "RM", inrHeader: "₹" },
    { type: "item", name: "Shopping for both (hard cap as requested)", rm: "~RM 430", inr: "<₹10,000" },
    { type: "item", name: "💊 Misc — tips, water, sunscreen, Touch 'n Go, small extras", rm: "RM 150", inr: "₹3,495" },

    { type: "header", name: "Summary", bgStyle: "background:#1a120a;" },
    { type: "fixed", name: "Fixed costs (flights + hotel)", rm: "—", inr: "₹69,200" },
    { type: "fixed", name: "Additional spend (activities + food + transport + shopping)", rm: "~RM 2,524", inr: "₹58,804", inrColor: "var(--accent)" },
    { type: "total", name: "💰 GRAND TOTAL — Trip for 2", rm: "", inr: "~₹1,28,004" }
  ],

  shopping: {
    subtitle: "— Under ₹10,000 total for both",
    items: [
      {
        title: "🏬 Pavilion KL",
        desc: "5 min walk from hotel. Mid-range to luxury. Good for clothes, bags, cosmetics, electronics. Many Indian brands too."
      },
      {
        title: "🏬 Lot 10 / Uniqlo / H&M",
        desc: "20–30% cheaper than India. Great basics. Fahrenheit 88 has streetwear and quirky local brands."
      },
      {
        title: "🎨 Petaling Street Chinatown",
        desc: "Batik, keychains, Petronas souvenirs, dried fruits, snacks. Start bargaining at 50% of asking — always."
      },
      {
        title: "🍫 Beryl's Chocolates",
        desc: "KL's iconic chocolate brand. Buy at any mall — much cheaper than KLIA airport. Great for gifting back home."
      },
      {
        title: "🧵 Batik (Jadi Batek — Day 3)",
        desc: "Authentic handmade batik — better quality and price than malls. Buy something together as a KL memento."
      },
      {
        title: "🛒 Genting Premium Outlets (Day 4)",
        desc: "Coach, Michael Kors, Tommy, Nike at discounts. If you spot something, it comes from the shopping budget."
      }
    ]
  },

  tips: [
    {
      title: "📱 Both Install Grab",
      desc: "Set it up before you leave India. Add your Indian card or PayPal. KL Grab is very reliable — usually arrives in 3–5 min. Share one account or both have it."
    },
    {
      title: "🎫 Book Petronas NOW",
      desc: "Only 1,000 tickets/day. August is peak season and evening slots go first. Book the Day 1 evening slot before you travel — don't risk it selling out."
    },
    {
      title: "🌧 Afternoon Showers",
      desc: "Almost daily 3–5 PM in August. Plan outdoor stuff in mornings (KL Tower, Batu Caves). Indoor activities (Aquaria, malls) are perfect afternoon backups."
    },
    {
      title: "💵 Cash for Hawkers",
      desc: "Jalan Alor and Chinatown are cash-first. Withdraw RM 300–400 from a Maybank ATM (lowest fees) at KLCC or any 7-Eleven."
    },
    {
      title: "🍜 Order to Share",
      desc: "Malaysian hawker culture is perfect for couples — order 3–4 dishes between you and share. Much better variety and value than ordering separately."
    },
    {
      title: "🚢 Seafood Trap Warning",
      desc: "Jalan Alor seafood is per 100g. Always confirm the total price before cooking starts — biggest tourist bill surprise in KL, especially for two."
    },
    {
      title: "🛂 No Visa Needed",
      desc: "Indian passports get visa-free entry to Malaysia for up to 30 days. Nothing to arrange — just your passports and the return flight proof."
    },
    {
      title: "🌙 Best Couple Moments",
      desc: "Petronas at dusk (Day 1), KLCC fountain show (nights), panda spotting at Zoo Negara (Day 3), cable car ride together (Day 4), Changkat rooftop bars (evenings)."
    }
  ],

  summaryRibbon: [
    {
      label: "Total Spend (2 people)",
      val: "₹1,28,004",
      sub: "flights + hotel + everything"
    },
    {
      label: "Additional (activities+food)",
      val: "₹58,804",
      sub: "3 of 4 attractions are FREE!"
    },
    {
      label: "Nights + Attractions",
      val: "4N · 5 acts",
      sub: "+ 1 full day tour for couple"
    }
  ],

  footerText: "All prices for 2 people · 1 RM = ₹23.30 (8 Aug 2026) · Book activities on Klook for best prices &amp; skip-the-queue · Have an amazing trip! 💑🇲🇾"
};
