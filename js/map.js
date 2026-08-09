/**
 * Map rendering module using Leaflet.js
 */
function initMap(id) {
  var el = document.getElementById(id);
  if (!el || el._leafletDone) return;
  el._leafletDone = true;

  var data = window.MAP_DATA ? window.MAP_DATA[id] : null;
  if (!data || !data.stops || !data.stops.length) return;

  var latlngs = data.stops.map(function(s) {
    return [s[0], s[1]];
  });
  var bounds = L.latLngBounds(latlngs);
  var m = L.map(id, {
    scrollWheelZoom: false,
    zoomControl: true
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 18
  }).addTo(m);

  // Route dashed polyline
  L.polyline(latlngs, {
    color: '#f7c948',
    weight: 3,
    dashArray: '8,5',
    opacity: 0.9
  }).addTo(m);

  // Numbered stop markers
  data.stops.forEach(function(s) {
    var bg = s[4] ? '#5ecb8a' : '#f7c948';
    var icon = L.divIcon({
      className: '',
      html: '<div style="background:' + bg + ';color:#111;width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:11px;border:2px solid rgba(0,0,0,0.4);box-shadow:0 2px 8px rgba(0,0,0,0.5);font-family:sans-serif">' + s[2] + '</div>',
      iconSize: [26, 26],
      iconAnchor: [13, 13],
      popupAnchor: [0, -14]
    });
    L.marker([s[0], s[1]], { icon: icon }).bindPopup('<b>' + s[3] + '</b>').addTo(m);
  });

  m.fitBounds(bounds.pad(0.15));
  el._mapRef = m;

  // Ensure tiles render correctly once container layout is complete
  setTimeout(function() {
    m.invalidateSize();
    m.fitBounds(bounds.pad(0.15));
  }, 250);
}
