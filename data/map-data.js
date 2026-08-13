/**
 * Map Data & GPS coordinates for Days 1–5
 * Hotel: My Hotel @ Bukit Bintang [3.1436, 101.7093]
 * Stops format: [latitude, longitude, labelNumberOrText, popupTitle, isHotel]
 */
window.MAP_DATA = {
  map_d1: {
    title: "Day 1 Route Map",
    googleMapsUrl: "https://www.google.com/maps/dir/My+Hotel+Bukit+Bintang+Kuala+Lumpur/Islamic+Arts+Museum+Malaysia/My+Hotel+Bukit+Bintang+Kuala+Lumpur/KLCC+Park+KL/Petronas+Twin+Towers+KL/Jalan+Alor+Bukit+Bintang+KL/My+Hotel+Bukit+Bintang+Kuala+Lumpur",
    chipStops: [
      { num: "H", isHotel: true, name: "My Hotel @ Bukit Bintang" },
      { num: "1", name: "Islamic Arts Museum & Lunch", km: "2.3 km" },
      { num: "H", isHotel: true, name: "Hotel Check-In (3 PM)", km: "2.3 km" },
      { num: "2", name: "KLCC Park", km: "1.5 km" },
      { num: "3", name: "Petronas Towers", km: "0.1 km" },
      { num: "4", name: "KLCC Fountain Show", km: "0.1 km" },
      { num: "5", name: "Jalan Alor", km: "1.3 km" },
      { num: "H", isHotel: true, name: "My Hotel @ Bukit Bintang", km: "0.3 km" }
    ],
    stops: [
      [3.14360, 101.70930, 'H', 'My Hotel @ Bukit Bintang', true],
      [3.14220, 101.68940, '1', 'Islamic Arts Museum Malaysia + MOZA Lunch', false],
      [3.14360, 101.70930, 'H', 'My Hotel @ Bukit Bintang — Check-In & Refresh (3 PM)', true],
      [3.15574, 101.71500, '2', 'KLCC Park', false],
      [3.15780, 101.71170, '3', 'Petronas Twin Towers (4:30 PM slot)', false],
      [3.15740, 101.71200, '4', 'KLCC Fountain Show (FREE)', false],
      [3.14550, 101.70720, '5', 'Jalan Alor Food Street', false],
      [3.14360, 101.70930, 'H', 'My Hotel @ Bukit Bintang', true]
    ]
  },
  map_d2: {
    title: "Day 2 Route Map",
    googleMapsUrl: "https://www.google.com/maps/dir/My+Hotel+Bukit+Bintang+KL/KL+Forest+Eco+Park/Masjid+Wilayah+Persekutuan+KL/Thean+Hou+Temple+KL/Petaling+Street+KL/Pavilion+KL/Nasi+Lemak+Wanjo+Kampung+Baru+KL/My+Hotel+Bukit+Bintang+KL",
    chipStops: [
      { num: "H", isHotel: true, name: "My Hotel @ Bukit Bintang" },
      { num: "1", name: "Forest Eco Park", km: "1.2 km" },
      { num: "2", name: "Masjid Wilayah", km: "3.2 km" },
      { num: "3", name: "Thean Hou Temple", km: "5.5 km" },
      { num: "4", name: "Chinatown & Lunch", km: "3.2 km" },
      { num: "5", name: "Pavilion KL", km: "1.8 km" },
      { num: "6", name: "Kampung Baru (Dinner)", km: "2.2 km" },
      { num: "H", isHotel: true, name: "My Hotel @ Bukit Bintang", km: "2.0 km" }
    ],
    stops: [
      [3.14360, 101.70930, 'H', 'My Hotel @ Bukit Bintang', true],
      [3.15270, 101.70330, '1', 'KL Forest Eco Park — Canopy Walk', false],
      [3.17350, 101.68370, '2', 'Masjid Wilayah — Blue Mosque (FREE)', false],
      [3.12260, 101.68920, '3', 'Thean Hou Temple (FREE)', false],
      [3.14340, 101.69690, '4', 'Chinatown — Nanyang Lunch & Artisan Walk', false],
      [3.14950, 101.71350, '5', 'Pavilion KL Mall', false],
      [3.16330, 101.70610, '6', 'Kampung Baru — Nasi Lemak Wanjo Dinner', false],
      [3.14360, 101.70930, 'H', 'My Hotel @ Bukit Bintang', true]
    ]
  },
  map_d3: {
    title: "Day 3 Route — Batu Caves + Zoo Negara",
    googleMapsUrl: "https://www.google.com/maps/dir/My+Hotel+Bukit+Bintang+KL/Batu+Caves+Selangor/Zoo+Negara+Malaysia/My+Hotel+Bukit+Bintang+KL",
    chipStops: [
      { num: "H", isHotel: true, name: "Hotel (leave 6:45AM)" },
      { num: "1", name: "Batu Caves", km: "10.7 km" },
      { num: "2", name: "Zoo Negara", km: "8.6 km" },
      { num: "H", isHotel: true, name: "Hotel (back ~4:30PM)", km: "9.2 km" }
    ],
    stops: [
      [3.14360, 101.70930, 'H', 'My Hotel @ Bukit Bintang — Leave 6:45 AM', true],
      [3.23790, 101.68410, '1', 'Batu Caves (7:30–11:30 AM)', false],
      [3.21090, 101.75630, '2', 'Zoo Negara (12–4 PM)', false],
      [3.14360, 101.70930, 'H', 'My Hotel @ Bukit Bintang — Back ~4:30 PM', true]
    ]
  },
  map_d4: {
    title: "Day 4 Route — Genting + Aquaria",
    googleMapsUrl: "https://www.google.com/maps/dir/My+Hotel+Bukit+Bintang+KL/Awana+SkyWay+Genting/Chin+Swee+Caves+Temple/SkyAvenue+Genting/Aquaria+KLCC+KL/My+Hotel+Bukit+Bintang+KL",
    chipStops: [
      { num: "H", isHotel: true, name: "My Hotel @ Bukit Bintang" },
      { num: "1", name: "Awana SkyWay", km: "32.0 km" },
      { num: "2", name: "Chin Swee Temple", km: "1.1 km" },
      { num: "3", name: "SkyAvenue Top", km: "2.0 km" },
      { num: "4", name: "Aquaria KLCC", km: "31.7 km" },
      { num: "H", isHotel: true, name: "My Hotel @ Bukit Bintang", km: "1.2 km" }
    ],
    stops: [
      [3.14360, 101.70930, 'H', 'My Hotel @ Bukit Bintang', true],
      [3.41910, 101.79340, '1', 'Awana SkyWay Station — Cable Car', false],
      [3.40890, 101.79350, '2', 'Chin Swee Caves Temple (FREE)', false],
      [3.42700, 101.79400, '3', 'SkyAvenue — Genting Top', false],
      [3.15380, 101.71210, '4', 'Aquaria KLCC', false],
      [3.14360, 101.70930, 'H', 'My Hotel @ Bukit Bintang', true]
    ]
  },
  map_d5: {
    title: "Day 5 Route — Departure",
    googleMapsUrl: "https://www.google.com/maps/dir/My+Hotel+Bukit+Bintang+KL/Pavilion+Kuala+Lumpur/KL+Sentral/KLIA+Airport+Malaysia",
    chipStops: [
      { num: "H", isHotel: true, name: "My Hotel @ Bukit Bintang" },
      { num: "1", name: "Pavilion KL", km: "0.8 km" },
      { num: "2", name: "KL Sentral", km: "3.5 km" },
      { num: "3", name: "KLIA Airport ✈", km: "43.2 km" }
    ],
    stops: [
      [3.14360, 101.70930, 'H', 'My Hotel @ Bukit Bintang', true],
      [3.14950, 101.71350, '1', 'Pavilion KL — Last Shopping', false],
      [3.13350, 101.68610, '2', 'KL Sentral — KLIA Ekspres Train', false],
      [2.74560, 101.70990, '3', 'KLIA Airport ✈ Flight 20:25', false]
    ]
  }
};
