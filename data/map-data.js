/**
 * Map Data & GPS coordinates for Days 1–5
 * Hotel: Kingston Hotel 8 @ Kuala Lumpur Bukit Bintang [3.1428, 101.7105]
 * Stops format: [latitude, longitude, labelNumberOrText, popupTitle, isHotel]
 */
window.MAP_DATA = {
  map_d1: {
    title: "Day 1 Route Map",
    googleMapsUrl: "https://www.google.com/maps/dir/Kingston+Hotel+8+Bukit+Bintang+Kuala+Lumpur/KLCC+Park+KL/Petronas+Twin+Towers+KL/Jalan+Alor+Bukit+Bintang+KL/Kingston+Hotel+8+Bukit+Bintang+Kuala+Lumpur",
    chipStops: [
      { num: "H", isHotel: true, name: "Kingston Hotel 8" },
      { num: "1", name: "KLCC Park", km: "1.5 km" },
      { num: "2", name: "Petronas Towers", km: "0.1 km" },
      { num: "3", name: "KLCC Fountain Show", km: "0.1 km" },
      { num: "4", name: "Jalan Alor", km: "1.3 km" },
      { num: "H", isHotel: true, name: "Kingston Hotel 8", km: "0.3 km" }
    ],
    stops: [
      [3.14280, 101.71050, 'H', 'Kingston Hotel 8 @ Bukit Bintang', true],
      [3.15574, 101.71500, '1', 'KLCC Park', false],
      [3.15780, 101.71170, '2', 'Petronas Twin Towers (4:30 PM slot)', false],
      [3.15740, 101.71200, '3', 'KLCC Fountain Show (FREE)', false],
      [3.14550, 101.70720, '4', 'Jalan Alor Food Street', false],
      [3.14280, 101.71050, 'H', 'Kingston Hotel 8 @ Bukit Bintang', true]
    ]
  },
  map_d2: {
    title: "Day 2 Route Map",
    googleMapsUrl: "https://www.google.com/maps/dir/Kingston+Hotel+8+Bukit+Bintang+KL/KL+Forest+Eco+Park/Masjid+Wilayah+Persekutuan+KL/Brickfields+KL/Thean+Hou+Temple+KL/Petaling+Street+KL/Pavilion+KL/Kingston+Hotel+8+Bukit+Bintang+KL",
    chipStops: [
      { num: "H", isHotel: true, name: "Kingston Hotel 8" },
      { num: "1", name: "Forest Eco Park", km: "1.2 km" },
      { num: "2", name: "Masjid Wilayah", km: "3.2 km" },
      { num: "3", name: "Brickfields", km: "4.9 km" },
      { num: "4", name: "Thean Hou Temple", km: "0.8 km" },
      { num: "5", name: "Chinatown", km: "2.5 km" },
      { num: "6", name: "Pavilion KL", km: "1.8 km" },
      { num: "H", isHotel: true, name: "Kingston Hotel 8", km: "0.4 km" }
    ],
    stops: [
      [3.14280, 101.71050, 'H', 'Kingston Hotel 8 @ Bukit Bintang', true],
      [3.15270, 101.70330, '1', 'KL Forest Eco Park — Canopy Walk', false],
      [3.17350, 101.68370, '2', 'Masjid Wilayah — Blue Mosque (FREE)', false],
      [3.12960, 101.68700, '3', 'Brickfields / Little India — Lunch', false],
      [3.12260, 101.68920, '4', 'Thean Hou Temple (FREE)', false],
      [3.14340, 101.69690, '5', 'Chinatown / Petaling Street (FREE)', false],
      [3.14950, 101.71350, '6', 'Pavilion KL Mall', false],
      [3.14280, 101.71050, 'H', 'Kingston Hotel 8 @ Bukit Bintang', true]
    ]
  },
  map_d3: {
    title: "Day 3 Route — Batu Caves + Zoo Negara",
    googleMapsUrl: "https://www.google.com/maps/dir/Kingston+Hotel+8+Bukit+Bintang+KL/Batu+Caves+Selangor/Zoo+Negara+Malaysia/Kingston+Hotel+8+Bukit+Bintang+KL",
    chipStops: [
      { num: "H", isHotel: true, name: "Hotel (leave 6:45AM)" },
      { num: "1", name: "Batu Caves", km: "10.7 km" },
      { num: "2", name: "Zoo Negara", km: "8.6 km" },
      { num: "H", isHotel: true, name: "Hotel (back ~4:30PM)", km: "9.2 km" }
    ],
    stops: [
      [3.14280, 101.71050, 'H', 'Kingston Hotel 8 — Leave 6:45 AM', true],
      [3.23790, 101.68410, '1', 'Batu Caves (7:30–11:30 AM)', false],
      [3.21090, 101.75630, '2', 'Zoo Negara (12–4 PM)', false],
      [3.14280, 101.71050, 'H', 'Kingston Hotel 8 — Back ~4:30 PM', true]
    ]
  },
  map_d4: {
    title: "Day 4 Route — Genting + Aquaria",
    googleMapsUrl: "https://www.google.com/maps/dir/Kingston+Hotel+8+Bukit+Bintang+KL/Awana+SkyWay+Genting/Chin+Swee+Caves+Temple/SkyAvenue+Genting/Aquaria+KLCC+KL/Kingston+Hotel+8+Bukit+Bintang+KL",
    chipStops: [
      { num: "H", isHotel: true, name: "Kingston Hotel 8" },
      { num: "1", name: "Awana SkyWay", km: "32.0 km" },
      { num: "2", name: "Chin Swee Temple", km: "1.1 km" },
      { num: "3", name: "SkyAvenue Top", km: "2.0 km" },
      { num: "4", name: "Aquaria KLCC", km: "31.7 km" },
      { num: "H", isHotel: true, name: "Kingston Hotel 8", km: "1.2 km" }
    ],
    stops: [
      [3.14280, 101.71050, 'H', 'Kingston Hotel 8 @ Bukit Bintang', true],
      [3.41910, 101.79340, '1', 'Awana SkyWay Station — Cable Car', false],
      [3.40890, 101.79350, '2', 'Chin Swee Caves Temple (FREE)', false],
      [3.42700, 101.79400, '3', 'SkyAvenue — Genting Top', false],
      [3.15380, 101.71210, '4', 'Aquaria KLCC', false],
      [3.14280, 101.71050, 'H', 'Kingston Hotel 8 @ Bukit Bintang', true]
    ]
  },
  map_d5: {
    title: "Day 5 Route — Departure",
    googleMapsUrl: "https://www.google.com/maps/dir/Kingston+Hotel+8+Bukit+Bintang+KL/Pavilion+Kuala+Lumpur/KL+Sentral/KLIA+Airport+Malaysia",
    chipStops: [
      { num: "H", isHotel: true, name: "Kingston Hotel 8" },
      { num: "1", name: "Pavilion KL", km: "0.8 km" },
      { num: "2", name: "KL Sentral", km: "3.5 km" },
      { num: "3", name: "KLIA Airport ✈", km: "43.2 km" }
    ],
    stops: [
      [3.14280, 101.71050, 'H', 'Kingston Hotel 8 @ Bukit Bintang', true],
      [3.14950, 101.71350, '1', 'Pavilion KL — Last Shopping', false],
      [3.13350, 101.68610, '2', 'KL Sentral — KLIA Ekspres Train', false],
      [2.74560, 101.70990, '3', 'KLIA Airport ✈ Flight 20:25', false]
    ]
  }
};
