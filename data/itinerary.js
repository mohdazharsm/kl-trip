/**
 * Structured Itinerary Data for Days 1 to 5
 * Includes category, default costs (INR & RM), payment methods, ticket flags, and Google Maps location URLs
 */
window.ITINERARY_DATA = [
  {
    id: "d1",
    dayNum: 1,
    mapId: "map_d1",
    badgeText: "Day 1",
    badgeClass: "arrival",
    title: "Arrival + Islamic Arts Museum + Petronas Towers at Dusk 🌆",
    date: "Sunday, 16 August · 2 people",
    costTotal: "~₹12,500",
    coupleTip: "<strong>💑 Couple tip:</strong> Morning rest & early check-in inquiry gives you energy, while the serene, air-conditioned Islamic Arts Museum is one of KL's most breathtaking cultural spots. Evening at Petronas Towers wraps up an unforgettable first day.",
    timeline: [
      {
        id: "d1-klia-express",
        shortName: "✈ KLIA Ekspres Arrival (Airport → City)",
        category: "ticket",
        time: "5:30 AM",
        dotClass: "tour",
        name: "🛬 Land at KLIA · Take KLIA Ekspres",
        desc: "Fast train from KLIA to KL Sentral — 28 min. Pick up a Touch 'n Go card each at the station for all public transport. <strong>Book online for small discount.</strong>",
        isTicketRequired: true,
        defaultBooked: false,
        costInr: 2563,
        costRm: 110,
        defaultPaymentMethod: "card",
        mapUrl: "https://maps.google.com/?q=KLIA+Terminal+1+Kuala+Lumpur",
        badges: [
          { text: "RM 55 × 2 = RM 110 · ₹2,563", class: "paid" },
          { text: "₹1,281/person", class: "pp" }
        ],
        buttons: [
          { text: "Book Klook ↗", url: "https://www.klook.com/en-US/activity/1101-klia-ekspres-airport-train-transfer-kuala-lumpur/", alt: false }
        ]
      },
      {
        id: "d1-hotel-rest",
        shortName: "🛏 Bag Drop, Early Check-In & Rest",
        category: "free",
        time: "8:30–11 AM",
        dotClass: "free",
        name: "🛏 Bag Drop · Request Early Check-In · Rest & Breakfast",
        desc: "Arrive at My Hotel @ Bukit Bintang (120 Jalan Pudu). Drop your bags at reception and ask if early check-in (or early room readiness) is available. Enjoy complimentary hotel breakfast for two, freshen up, and rest in the lounge/lobby to recover from the overnight flight.",
        isTicketRequired: false,
        costInr: 0,
        costRm: 0,
        defaultPaymentMethod: "cash",
        mapUrl: "https://maps.google.com/?q=My+Hotel+Bukit+Bintang+Kuala+Lumpur",
        badges: [
          { text: "FREE (breakfast for 2 included)", class: "free" }
        ],
        tipBox: "<strong>💡 Early check-in tip:</strong> If the room isn't ready right away, keep a small daypack with essentials (power bank, sunglasses, wipes) so you don't need to reopen stored luggage."
      },
      {
        id: "d1-iamm",
        shortName: "🏛 Islamic Arts Museum Malaysia (IAMM)",
        category: "ticket",
        time: "11:15 AM – 1:15 PM",
        dotClass: "tour",
        name: "🏛 Islamic Arts Museum Malaysia (IAMM)",
        desc: "10-min Grab from hotel (~RM 12–15). Southeast Asia's largest Islamic arts museum — world-class air-conditioned sanctuary with stunning turquoise mosaic domes, scale models of famous world mosques (Masjid al-Haram, Taj Mahal, Dome of the Rock), Quranic calligraphy, textiles, and jewelry. Tickets purchased directly at lobby counter.",
        isTicketRequired: true,
        defaultBooked: false,
        costInr: 932,
        costRm: 40,
        defaultPaymentMethod: "card",
        mapUrl: "https://maps.google.com/?q=Islamic+Arts+Museum+Malaysia",
        badges: [
          { text: "RM 20 × 2 = RM 40 · ₹932", class: "paid" },
          { text: "₹466/person", class: "pp" }
        ],
        buttons: [
          { text: "Official Info ↗", url: "https://www.iamm.org.my/", alt: false },
          { text: "Maps ↗", url: "https://maps.google.com/?q=Islamic+Arts+Museum+Malaysia", alt: true }
        ],
        tipBox: "<strong>🌟 Couple Highlight:</strong> Marvelous domed ceilings and peaceful ambient galleries — one of the best photo spots in KL, away from the midday heat."
      },
      {
        id: "d1-lunch-moza",
        shortName: "🍽 Lunch at MOZA Restaurant",
        category: "food",
        time: "1:15–2:30 PM",
        dotClass: "food",
        name: "🍽 Lunch — MOZA Restaurant (Middle Eastern & Malaysian)",
        desc: "Dine on the ground floor of the museum at MOZA Restaurant. Relax over Arabic mezze, grilled chicken shish taouk, Biryani/Mandi, iced mint tea, or local Malaysian specialties in a quiet, upscale setting before heading back.",
        isTicketRequired: false,
        costInr: 1631,
        costRm: 70,
        defaultPaymentMethod: "card",
        mapUrl: "https://maps.google.com/?q=MOZA+Restaurant+Islamic+Arts+Museum+Malaysia",
        badges: [
          { text: "Lunch for 2 ~RM 60–80 · ₹1,400–1,864", class: "food" }
        ]
      },
      {
        id: "d1-hotel-checkin",
        shortName: "🛏 Hotel Check-In & Freshen Up",
        category: "free",
        time: "2:45–3:30 PM",
        dotClass: "free",
        name: "🛏 Return to Hotel · Check-In & Freshen Up",
        desc: "Take a 10-min Grab back to My Hotel @ Bukit Bintang. Collect your room keys (official check-in 3 PM), head to your room, unpack, take a refreshing shower, and get energized for your evening at the Twin Towers.",
        isTicketRequired: false,
        costInr: 0,
        costRm: 0,
        defaultPaymentMethod: "cash",
        mapUrl: "https://maps.google.com/?q=My+Hotel+Bukit+Bintang+Kuala+Lumpur",
        badges: [
          { text: "FREE", class: "free" }
        ]
      },
      {
        id: "d1-klcc-park",
        shortName: "🏙 KLCC Park Stroll",
        category: "free",
        time: "3:30 PM",
        dotClass: "",
        name: "🏙 KLCC Park Stroll — Free & Gorgeous",
        desc: "15-min walk from hotel. Beautiful manicured park with the twin towers as backdrop — great couple photos here, especially in afternoon golden light. Browse Suria KLCC mall if you want AC and coffee.",
        isTicketRequired: false,
        costInr: 0,
        costRm: 0,
        defaultPaymentMethod: "cash",
        mapUrl: "https://maps.google.com/?q=KLCC+Park+Kuala+Lumpur",
        badges: [
          { text: "FREE", class: "free" }
        ]
      },
      {
        id: "d1-petronas-towers",
        shortName: "🌆 Petronas Twin Towers (Skybridge + Obs Deck)",
        category: "ticket",
        time: "4:30 PM",
        dotClass: "",
        name: "🌆 PETRONAS Twin Towers — Skybridge + Observation Deck",
        desc: "Slot recommended: <strong>4:30 PM</strong>. High-speed elevator to the 86th floor, breathtaking sunset views over KL, then walk the iconic Skybridge connecting both towers at the 41st/42nd floor. Be at the entrance <strong>by 4:15 PM</strong> — latecomers not accommodated.",
        isTicketRequired: true,
        defaultBooked: false,
        costInr: 7084,
        costRm: 304,
        defaultPaymentMethod: "card",
        mapUrl: "https://maps.google.com/?q=Petronas+Twin+Towers+Kuala+Lumpur",
        badges: [
          { text: "RM 152 × 2 = RM 304 · ₹7,084", class: "paid" },
          { text: "₹3,542/person", class: "pp" }
        ],
        buttons: [
          { text: "Book Klook ↗", url: "https://www.klook.com/en-MY/activity/1321-petronas-twin-towers-kuala-lumpur/", alt: false },
          { text: "Official ↗", url: "https://www.petronastwintowers.com.my/", alt: true }
        ],
        tipBox: "<strong>⏰ 4:15 PM at entrance</strong> — the 4:30 PM slot catches golden hour AND city lights coming on. Perfect timing for a couple."
      },
      {
        id: "d1-fountain-show",
        shortName: "⛲ KLCC Fountain Light Show",
        category: "free",
        time: "8 PM",
        dotClass: "free",
        name: "⛲ KLCC Fountain Light Show — Free!",
        desc: "Free light and music show right outside the towers — 8 PM, 9 PM, 10 PM nightly. Sit on the park lawn with a drink from a nearby stall. Perfect end to arrival night.",
        isTicketRequired: false,
        costInr: 0,
        costRm: 0,
        defaultPaymentMethod: "cash",
        mapUrl: "https://maps.google.com/?q=Lake+Symphony+KLCC+Park",
        badges: [
          { text: "FREE", class: "free" }
        ]
      },
      {
        id: "d1-jalan-alor",
        shortName: "🍜 Jalan Alor Food Street (Dinner)",
        category: "food",
        time: "9 PM",
        dotClass: "food",
        name: "🍜 First Dinner — Jalan Alor Food Street",
        desc: "10-min walk from your hotel — KL's most famous hawker street fires up at dusk. Try char kway teow, chicken wings, satay, and Hokkien mee. Order a few dishes to share. Cash preferred — small RM notes.",
        isTicketRequired: false,
        costInr: 1631,
        costRm: 70,
        defaultPaymentMethod: "cash",
        mapUrl: "https://maps.google.com/?q=Jalan+Alor+Food+Street+Bukit+Bintang",
        badges: [
          { text: "~RM 60–80 for 2 · ₹1,400–1,864", class: "food" }
        ]
      }
    ]
  },
  {
    id: "d2",
    dayNum: 2,
    mapId: "map_d2",
    badgeText: "Day 2",
    badgeClass: "",
    title: "Forest Eco Park + Blue Mosque + Thean Hou Temple + Chinatown",
    date: "Monday, 17 August · 2 people",
    costTotal: "~₹8,000",
    timeline: [
      {
        id: "d2-breakfast",
        shortName: "☕ Hotel Breakfast",
        category: "free",
        time: "9 AM",
        dotClass: "free",
        name: "☕ Breakfast at Hotel — for 2",
        desc: "Included for both of you — fuel up before a big cultural day.",
        isTicketRequired: false,
        costInr: 0,
        costRm: 0,
        defaultPaymentMethod: "cash",
        mapUrl: "https://maps.google.com/?q=My+Hotel+Bukit+Bintang+Kuala+Lumpur",
        badges: [
          { text: "FREE (included for 2)", class: "free" }
        ]
      },
      {
        id: "d2-forest-eco",
        shortName: "🌿 KL Forest Eco Park (Canopy Walk)",
        category: "activity",
        time: "10 AM",
        dotClass: "free",
        name: "🌿 KL Forest Eco Park — Canopy Walk",
        desc: "A genuine tropical rainforest INSIDE the city centre — one of the most unique things in KL that most tourists miss. A 200m suspended canopy walkway takes you above the treetops with the KL skyline visible behind you. Go early before the heat and afternoon rain. Wear proper shoes, not sandals.",
        isTicketRequired: false,
        costInr: 233,
        costRm: 10,
        defaultPaymentMethod: "cash",
        mapUrl: "https://maps.google.com/?q=KL+Forest+Eco+Park+Kuala+Lumpur",
        badges: [
          { text: "~FREE – RM 5–10 · ₹120–235", class: "free" }
        ],
        buttons: [
          { text: "Maps ↗", url: "https://maps.app.goo.gl/WurNnY1hA1ueZoXm9", alt: true }
        ],
        tipBox: "<strong>💡 Couple tip:</strong> Morning mist through jungle canopy with the KL skyline peeking behind — incredible photos that look nothing like a city trip."
      },
      {
        id: "d2-masjid-wilayah",
        shortName: "🕌 Masjid Wilayah (Blue Mosque)",
        category: "free",
        time: "11:30 AM",
        dotClass: "free",
        name: "🕌 Masjid Wilayah — KL's Blue Mosque",
        desc: "10 min Grab from the Eco Park. One of the most beautiful mosques in Southeast Asia — stunning blue domes, intricate geometric tilework, marble courtyards and a serene reflection pool. Free for non-Muslim visitors. Dress modestly — shoulders and knees covered (robes provided at entrance). Very photogenic and genuinely peaceful.",
        isTicketRequired: false,
        costInr: 0,
        costRm: 0,
        defaultPaymentMethod: "cash",
        mapUrl: "https://maps.google.com/?q=Masjid+Wilayah+Persekutuan+Kuala+Lumpur",
        badges: [
          { text: "FREE Entry", class: "free" }
        ],
        buttons: [
          { text: "Maps ↗", url: "https://maps.app.goo.gl/2aYpfjKo7NQ3gCEZ9", alt: true }
        ],
        tipBox: "<strong>⏰ Timing note:</strong> Monday 17 Aug is not a Friday — no prayer closure issue. Open 9 AM–6 PM. Spend ~45 min here."
      },
      {
        id: "d2-brickfields-lunch",
        shortName: "🍛 Brickfields Little India Lunch",
        category: "food",
        time: "1 PM",
        dotClass: "food",
        name: "🍛 Lunch — Brickfields / Little India",
        desc: "10 min Grab from the mosque — Brickfields is KL's Little India. Banana leaf rice, South Indian thali, roti canai — very familiar flavours! Try Sri Devi Annapoorna or Vishal Restaurant. Great value.",
        isTicketRequired: false,
        costInr: 932,
        costRm: 40,
        defaultPaymentMethod: "cash",
        mapUrl: "https://maps.google.com/?q=Brickfields+Little+India+Kuala+Lumpur",
        badges: [
          { text: "~RM 30–50 for 2 · ₹700–1,165", class: "food" }
        ]
      },
      {
        id: "d2-thean-hou",
        shortName: "🏮 Thean Hou Temple (Grab Return)",
        category: "transport",
        time: "2:30 PM",
        dotClass: "free",
        name: "🏮 Thean Hou Temple",
        desc: "15 min Grab from Brickfields. Six-tier Chinese temple with dragon carvings, colourful lanterns, and panoramic KL skyline views from the hilltop. Afternoon light is great for photography — the lanterns glow as dusk approaches.",
        isTicketRequired: false,
        costInr: 932,
        costRm: 40,
        defaultPaymentMethod: "card",
        mapUrl: "https://maps.google.com/?q=Thean+Hou+Temple+Kuala+Lumpur",
        badges: [
          { text: "FREE Entry", class: "free" },
          { text: "Grab both ways: ~RM 40 · ₹932", class: "paid" }
        ],
        buttons: [
          { text: "Maps ↗", url: "https://maps.app.goo.gl/6GZb5hjBjXBmMVMg6", alt: true }
        ]
      },
      {
        id: "d2-chinatown",
        shortName: "🏮 Chinatown & Petaling Street",
        category: "free",
        time: "4 PM",
        dotClass: "free",
        name: "🏮 Chinatown — Petaling Street + Central Market",
        desc: "Grab to Chinatown (~15 min). KL's old Chinese quarter — souvenirs, batik, cheap clothing, street snacks. Sri Mahamariamman Temple is right here (free, stunning). Bargain everything to 50% of asking. Then walk to Central Market — a covered artisan market with local crafts, batik, art, and regional food.",
        isTicketRequired: false,
        costInr: 0,
        costRm: 0,
        defaultPaymentMethod: "cash",
        mapUrl: "https://maps.google.com/?q=Petaling+Street+Chinatown+Kuala+Lumpur",
        badges: [
          { text: "FREE to explore", class: "free" }
        ],
        buttons: [
          { text: "Maps ↗", url: "https://maps.app.goo.gl/v1KqJcBjf7r14tcX7", alt: true }
        ]
      },
      {
        id: "d2-pavilion-mall",
        shortName: "🛍 Pavilion KL Mall Window Shopping",
        category: "free",
        time: "6 PM",
        dotClass: "tour",
        name: "🛍 Pavilion KL Mall — Shopping + Stroll",
        desc: "5 min walk or short Grab from Chinatown to Bukit Bintang. Pavilion KL is KL's most iconic mall — beautiful atrium, international brands, local fashion, great food court on Level 6. Perfect air-conditioned wind-down after a full cultural day. Window shop, pick up any last things, or just enjoy the atmosphere.",
        isTicketRequired: false,
        costInr: 0,
        costRm: 0,
        defaultPaymentMethod: "card",
        mapUrl: "https://maps.google.com/?q=Pavilion+Kuala+Lumpur",
        badges: [
          { text: "FREE to browse", class: "free" },
          { text: "Shopping from your ₹10,000 budget", class: "paid" }
        ]
      },
      {
        id: "d2-changkat-dinner",
        shortName: "🍻 Changkat Bukit Bintang Dinner",
        category: "food",
        time: "8 PM",
        dotClass: "food",
        name: "🍻 Dinner — Changkat Bukit Bintang",
        desc: "2 min walk from Pavilion, right by your hotel. KL's best bar-and-restaurant street — a relaxed way to close a full cultural day without heading back out to KLCC. Try View Rooftop Bar or Pisco Bar for skyline views with dinner, or a quieter sit-down restaurant if you'd rather wind down.",
        isTicketRequired: false,
        costInr: 1748,
        costRm: 75,
        defaultPaymentMethod: "card",
        mapUrl: "https://maps.google.com/?q=Changkat+Bukit+Bintang+Kuala+Lumpur",
        badges: [
          { text: "Dinner for 2 ~RM 60–90 · ₹1,398–2,097", class: "food" }
        ]
      }
    ]
  },
  {
    id: "d3",
    dayNum: 3,
    mapId: "map_d3",
    badgeText: "Day 3",
    badgeClass: "",
    badgeStyle: "background:#5b9cf6;",
    title: "🕌 Batu Caves + 🦁 Zoo Negara — Self-Guided Day",
    date: "Tuesday, 18 August · 2 people · Leave hotel ~6:45 AM",
    costTotal: "~₹6,800",
    coupleTip: "<strong>💑 Why this beats the Bukit Tinggi tour:</strong> Colmar Tropicale reviews were mixed (\"15 minutes is enough\", \"not worth the 3-hour round trip\"). This self-guided plan covers Batu Caves properly (well-reviewed, unmissable) + Zoo Negara (5,000+ animals, panda centre, consistently well-reviewed) — total travel is only ~28.5 km vs 68 km for the old plan, and you're back in the city with the whole evening free.",
    timeline: [
      {
        id: "d3-grab-batu",
        shortName: "🚗 Grab to Batu Caves",
        category: "transport",
        time: "6:45 AM",
        dotClass: "tour",
        name: "🚗 Leave Hotel — Grab to Batu Caves",
        desc: "Early start beats the heat, the humidity, and the tour bus crowds. ~30 min direct Grab ride, 10.7 km. Alternatively take the KTM Komuter train from KL Sentral (30–40 min, RM 2.60/person) if you want the local experience — but Grab is faster this early.",
        isTicketRequired: false,
        costInr: 815,
        costRm: 35,
        defaultPaymentMethod: "card",
        mapUrl: "https://maps.google.com/?q=Batu+Caves+Gombak+Selangor",
        badges: [
          { text: "Grab ~RM 35 · ₹815 for 2", class: "paid" }
        ]
      },
      {
        id: "d3-batu-caves",
        shortName: "🕌 Batu Caves & Ramayana Cave",
        category: "activity",
        time: "7:30–11:30 AM",
        dotClass: "free",
        name: "🕌 Batu Caves — Relaxed Full Visit",
        desc: "Climb the iconic 272 rainbow-painted steps past the 42.7m golden Lord Murugan statue into the 400-million-year-old Temple Cave. With 4 hours you can take it slow — explore the quieter Ramayana Cave and Cave Villa at ground level too, cool off with a drink, and get plenty of photos without rushing. Dress code: shoulders and knees covered (sarongs sold at entrance ~RM 10–15 if needed).",
        isTicketRequired: false,
        costInr: 466,
        costRm: 20,
        defaultPaymentMethod: "cash",
        mapUrl: "https://maps.google.com/?q=Batu+Caves+Temple+Selangor",
        badges: [
          { text: "Main Cave: FREE", class: "free" },
          { text: "Ramayana Cave/Cave Villa: ~RM 20 for 2", class: "paid" }
        ],
        tipBox: "<strong>🐒 Watch your bags:</strong> Monkeys are present and will snatch food — keep everything sealed and zipped."
      },
      {
        id: "d3-grab-zoo",
        shortName: "🚗 Grab to Zoo Negara",
        category: "transport",
        time: "11:30 AM",
        dotClass: "tour",
        name: "🚗 Grab to Zoo Negara",
        desc: "Short 20–25 min ride, 8.6 km — both attractions are roughly northeast of the city so this connects smoothly, unlike the old Colmar Tropicale detour.",
        isTicketRequired: false,
        costInr: 583,
        costRm: 25,
        defaultPaymentMethod: "card",
        mapUrl: "https://maps.google.com/?q=Zoo+Negara+Malaysia+Ulu+Klang",
        badges: [
          { text: "Grab ~RM 25 · ₹583 for 2", class: "paid" }
        ]
      },
      {
        id: "d3-zoo-negara",
        shortName: "🦁 Zoo Negara & Giant Panda Centre",
        category: "ticket",
        time: "12–4 PM",
        dotClass: "free",
        name: "🦁 Zoo Negara — Malaysia's National Zoo",
        desc: "110 acres, 5,000+ animals across 400+ species — African lions, Malayan tigers, elephants, orangutans, and the popular Giant Panda Conservation Centre. Open-concept design lets animals roam in spacious naturalistic enclosures rather than small cages. Catch the afternoon animal show (~3 PM, confirm exact time when booking) featuring sea lions and macaws before you leave.",
        isTicketRequired: true,
        defaultBooked: false,
        costInr: 3914,
        costRm: 168,
        defaultPaymentMethod: "card",
        mapUrl: "https://maps.google.com/?q=Zoo+Negara+Malaysia",
        badges: [
          { text: "~RM 84 × 2 = RM 168 · ₹3,914 for couple", class: "paid" }
        ],
        buttons: [
          { text: "Book Klook ↗", url: "https://www.klook.com/en-US/activity/3510-zoo-negara-kuala-lumpur/", alt: false }
        ]
      },
      {
        id: "d3-grab-hotel",
        shortName: "🚗 Grab from Zoo to Bukit Bintang",
        category: "transport",
        time: "4–4:30 PM",
        dotClass: "tour",
        name: "🚗 Grab Back to Bukit Bintang",
        desc: "~25 min ride, 9.2 km back to the hotel area. You're back with the whole evening free — a big improvement over the old plan's 4:30 PM hotel drop-off after a full day of driving.",
        isTicketRequired: false,
        costInr: 700,
        costRm: 30,
        defaultPaymentMethod: "card",
        mapUrl: "https://maps.google.com/?q=Bukit+Bintang+Kuala+Lumpur",
        badges: [
          { text: "Grab ~RM 30 · ₹700 for 2", class: "paid" }
        ]
      },
      {
        id: "d3-hotel-freshen",
        shortName: "🧼 Hotel Refresh",
        category: "free",
        time: "6:30 PM",
        dotClass: "free",
        name: "🧼 Freshen Up at Hotel",
        desc: "Rest, shower, change — you've earned it after a full day of walking. Quick breather before heading back out for the evening.",
        isTicketRequired: false,
        costInr: 0,
        costRm: 0,
        defaultPaymentMethod: "cash",
        mapUrl: "https://maps.google.com/?q=My+Hotel+Bukit+Bintang+Kuala+Lumpur",
        badges: [
          { text: "FREE", class: "free" }
        ]
      },
      {
        id: "d3-night-dinner",
        shortName: "🍜 Chinatown / Jalan Alor Dinner",
        category: "food",
        time: "8 PM",
        dotClass: "food",
        name: "🍜 Evening — Petaling Street / Jalan Alor",
        desc: "The \"street\" evening you wanted — pick between round two at Jalan Alor (10 min from hotel) or a night stroll through Petaling Street Chinatown for street snacks and a more local night-market feel. Either way, order a few dishes to share and enjoy the evening at a relaxed pace.",
        isTicketRequired: false,
        costInr: 1398,
        costRm: 60,
        defaultPaymentMethod: "cash",
        mapUrl: "https://maps.google.com/?q=Jalan+Alor+Night+Market+Kuala+Lumpur",
        badges: [
          { text: "Dinner for 2 ~RM 50–70 · ₹1,165–1,630", class: "food" }
        ]
      }
    ]
  },
  {
    id: "d4",
    dayNum: 4,
    mapId: "map_d4",
    badgeText: "Day 4",
    badgeClass: "",
    badgeStyle: "background:#9c6cf7;",
    title: "⛰ Genting Highlands + 🐠 Aquaria KLCC",
    date: "Wednesday, 19 August · 2 people",
    costTotal: "~₹18,000",
    coupleTip: "<strong>🌡 20°C cooler</strong> at Genting vs KL. Morning up in the mountains, evening underwater at Aquaria — a great varied final full day as a couple.",
    timeline: [
      {
        id: "d4-genting-bus",
        shortName: "🚌 Genting Return Bus Transfer",
        category: "ticket",
        time: "8:30 AM",
        dotClass: "tour",
        name: "🚌 Head to Genting from KL Sentral",
        desc: "Transnasional bus every 30 min, 1 hr ride to Awana Terminal. Or book a private Genting day tour from Klook with hotel pickup for a stress-free morning together.",
        isTicketRequired: true,
        defaultBooked: false,
        costInr: 932,
        costRm: 40,
        defaultPaymentMethod: "card",
        mapUrl: "https://maps.google.com/?q=Awana+Bus+Terminal+Genting+Highlands",
        badges: [
          { text: "Bus RT for 2: ~RM 40 · ₹932", class: "paid" }
        ],
        buttons: [
          { text: "Private Tour Klook ↗", url: "https://www.klook.com/activity/108940-private-genting-highland-day-tour-from-kuala-lumpur/", alt: false }
        ]
      },
      {
        id: "d4-cable-car",
        shortName: "🚡 Awana SkyWay Cable Car (Round-Trip)",
        category: "ticket",
        time: "10 AM",
        dotClass: "",
        name: "🚡 Awana SkyWay Cable Car — Together!",
        desc: "A 10-min ride through 130 million year old rainforest canopy — stunning views, cool mountain air, very romantic. Optional glass floor gondola for extra thrill. Stop at Chin Swee Caves Temple mid-way (free, same ticket, great photos).",
        isTicketRequired: true,
        defaultBooked: false,
        costInr: 2563,
        costRm: 110,
        defaultPaymentMethod: "card",
        mapUrl: "https://maps.google.com/?q=Awana+SkyWay+Genting+Highlands",
        badges: [
          { text: "RM 55 × 2 RT = RM 110 · ₹2,563", class: "paid" },
          { text: "₹1,281/person", class: "pp" }
        ],
        buttons: [
          { text: "Book Klook ↗", url: "https://www.klook.com/activity/15075-genting-highlands-premium-outlets-cable-car-ticket-genting-highlands/", alt: false }
        ]
      },
      {
        id: "d4-skyavenue",
        shortName: "🎢 SkyAvenue Food Court Lunch",
        category: "food",
        time: "11 AM –3 PM",
        dotClass: "tour",
        name: "🎢 SkyAvenue + Chin Swee Temple + Premium Outlets",
        desc: "SkyAvenue mall has amazing views + food. Chin Swee Temple is free and jaw-dropping in the mist. Genting Premium Outlets for Coach, MK, Tommy Hilfiger at discounts. Skytropolis indoor theme park if you want rides (pay-per-ride). Lunch at SkyAvenue food court.",
        isTicketRequired: false,
        costInr: 1398,
        costRm: 60,
        defaultPaymentMethod: "cash",
        mapUrl: "https://maps.google.com/?q=SkyAvenue+Genting+Highlands",
        badges: [
          { text: "Lunch for 2 ~RM 60 · ₹1,398", class: "food" },
          { text: "Temple + Outlets: FREE", class: "free" }
        ]
      },
      {
        id: "d4-return-kl",
        shortName: "🚌 Return Grab from KL Sentral to KLCC",
        category: "transport",
        time: "4 PM",
        dotClass: "tour",
        name: "🚌 Return to KL → KLCC",
        desc: "Bus back to KL Sentral then Grab to KLCC area.",
        isTicketRequired: false,
        costInr: 466,
        costRm: 20,
        defaultPaymentMethod: "card",
        mapUrl: "https://maps.google.com/?q=KL+Sentral+Kuala+Lumpur",
        badges: [
          { text: "~RM 20 Grab · ₹466 for 2", class: "paid" }
        ]
      },
      {
        id: "d4-aquaria-klcc",
        shortName: "🐠 Aquaria KLCC Underwater World",
        category: "ticket",
        time: "6 PM",
        dotClass: "",
        name: "🐠 Aquaria KLCC — Underwater World Together",
        desc: "One of SE Asia's largest aquariums — 5,000 creatures, 90-metre walk-through underwater tunnel with sharks and rays gliding above you both. Very immersive couple experience. Takes ~2 hours. Book online, last entry 7 PM.",
        isTicketRequired: true,
        defaultBooked: false,
        costInr: 3728,
        costRm: 160,
        defaultPaymentMethod: "card",
        mapUrl: "https://maps.google.com/?q=Aquaria+KLCC+Kuala+Lumpur",
        badges: [
          { text: "RM 80 × 2 = RM 160 · ₹3,728", class: "paid" },
          { text: "₹1,864/person", class: "pp" }
        ],
        buttons: [
          { text: "Book Klook ↗", url: "https://www.klook.com/en-MY/activity/3792-aquaria-klcc-kuala-lumpur/", alt: false },
          { text: "Official ↗", url: "https://tickets.aquariaklcc.com/", alt: true }
        ]
      },
      {
        id: "d4-special-dinner",
        shortName: "🌟 Special Last Night Dinner",
        category: "food",
        time: "9 PM",
        dotClass: "food",
        name: "🌟 Special Last Night Dinner",
        desc: "Treat yourselves — Marini's on 57 rooftop bar has cocktails with a direct Petronas towers view (splurge, ~RM 200 for 2), or a nice dinner at Atmosphere 360 revolving restaurant in KL Tower. Or keep it memorable at Jalan Alor one final time.",
        isTicketRequired: false,
        costInr: 3495,
        costRm: 150,
        defaultPaymentMethod: "card",
        mapUrl: "https://maps.google.com/?q=Marini%27s+on+57+Kuala+Lumpur",
        badges: [
          { text: "Dinner for 2 ~RM 100–200 · ₹2,330–4,660", class: "food" }
        ]
      }
    ]
  },
  {
    id: "d5",
    dayNum: 5,
    mapId: "map_d5",
    badgeText: "Day 5",
    badgeClass: "departure",
    title: "Checkout + Last Shopping + Departure ✈",
    date: "Thursday, 20 August · Flight 20:25 → Kochi",
    costTotal: "~₹7,000",
    timeline: [
      {
        id: "d5-hotel-checkout",
        shortName: "☕ Final Breakfast & Hotel Checkout",
        category: "free",
        time: "9 AM",
        dotClass: "free",
        name: "☕ Final Hotel Breakfast for 2 + Checkout by 12 PM",
        desc: "Leave both bags with hotel reception — they hold luggage post-checkout.",
        isTicketRequired: false,
        costInr: 0,
        costRm: 0,
        defaultPaymentMethod: "cash",
        mapUrl: "https://maps.google.com/?q=My+Hotel+Bukit+Bintang+Kuala+Lumpur",
        badges: [
          { text: "FREE (included for 2)", class: "free" }
        ]
      },
      {
        id: "d5-final-shopping",
        shortName: "🛍 Final Shopping (Pavilion / Lot 10)",
        category: "activity",
        time: "12–4 PM",
        dotClass: "",
        name: "🛍 Final Shopping — Pavilion + Bukit Bintang",
        desc: "Pavilion KL is 5 min walk — international brands, good prices. Lot 10 for Uniqlo/H&M. Beryl's Chocolate for gifts (cheaper than airport). Petaling Street if you want one last round of bargaining. Remember: shopping cap is ₹10,000 total for both.",
        isTicketRequired: false,
        costInr: 0,
        costRm: 0,
        defaultPaymentMethod: "card",
        mapUrl: "https://maps.google.com/?q=Pavilion+Kuala+Lumpur",
        badges: [
          { text: "Shopping: <₹10,000 total (your cap)", class: "paid" }
        ]
      },
      {
        id: "d5-klia-express",
        shortName: "✈ KLIA Ekspres Departure (City → Airport)",
        category: "ticket",
        time: "4:30 PM",
        dotClass: "tour",
        name: "✈ Head to KLIA — KLIA Ekspres from KL Sentral",
        desc: "Collect bags from hotel, Grab to KL Sentral, KLIA Ekspres to airport. Be at KLIA by 6 PM for 20:25 departure (2.5 hours ahead is safe). The train is faster and cheaper than a taxi with two bags each.",
        isTicketRequired: true,
        defaultBooked: false,
        costInr: 2563,
        costRm: 110,
        defaultPaymentMethod: "card",
        mapUrl: "https://maps.google.com/?q=Kuala+Lumpur+International+Airport",
        badges: [
          { text: "RM 55 × 2 = RM 110 · ₹2,563 for couple", class: "paid" }
        ],
        buttons: [
          { text: "Book Klook ↗", url: "https://www.klook.com/en-US/activity/1101-klia-ekspres-airport-train-transfer-kuala-lumpur/", alt: true }
        ],
        tipBox: "<strong>⏰ Leave hotel by 4:30 PM latest</strong> — KL Sentral to KLIA is 28 min but allow time for Grab + check-in + security."
      }
    ]
  }
];
