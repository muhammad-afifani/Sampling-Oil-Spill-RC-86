"use strict";

/* ---------------------------------------------------------------------
   Data: sampling points and grid areas, from GRID.kml and
   HYB_Sample_Point.kml (see data/ folder). Real latitude and longitude,
   used directly by Leaflet.
--------------------------------------------------------------------- */
var POINTS = [{"id":"GRID13.1","gridId":"40","lat":-0.856777,"lon":117.265093},{"id":"GRID13.2","gridId":"40","lat":-0.856722,"lon":117.265398},{"id":"GRID13.3","gridId":"40","lat":-0.856666,"lon":117.265651},{"id":"GRID13.4","gridId":"40","lat":-0.856629,"lon":117.265845},{"id":"GRID13.5","gridId":"40","lat":-0.856599,"lon":117.266055},{"id":"GRID12.5","gridId":"24","lat":-0.855836,"lon":117.265973},{"id":"GRID12.4","gridId":"24","lat":-0.855609,"lon":117.266018},{"id":"GRID12.3","gridId":"24","lat":-0.855376,"lon":117.266051},{"id":"GRID12.2","gridId":"24","lat":-0.855175,"lon":117.266076},{"id":"GRID12.1","gridId":"24","lat":-0.854924,"lon":117.266103},{"id":"GRID11.5","gridId":"25","lat":-0.85489,"lon":117.265914},{"id":"GRID11.4","gridId":"25","lat":-0.854874,"lon":117.265736},{"id":"GRID11.3","gridId":"25","lat":-0.854863,"lon":117.265579},{"id":"GRID11.2","gridId":"25","lat":-0.854857,"lon":117.26541},{"id":"GRID11.1","gridId":"25","lat":-0.85485,"lon":117.265253},{"id":"GRID7.1","gridId":"34","lat":-0.855028,"lon":117.265204},{"id":"GRID7.3","gridId":"34","lat":-0.85514,"lon":117.265209},{"id":"GRID7.2","gridId":"34","lat":-0.85506,"lon":117.265317},{"id":"GRID4.1","gridId":"33","lat":-0.855054,"lon":117.265441},{"id":"GRID4.3","gridId":"33","lat":-0.855167,"lon":117.265507},{"id":"GRID4.2","gridId":"33","lat":-0.855068,"lon":117.265612},{"id":"GRID1.1","gridId":"26","lat":-0.855068,"lon":117.265712},{"id":"GRID1.2","gridId":"26","lat":-0.855087,"lon":117.265909},{"id":"GRID1.5","gridId":"26","lat":-0.855321,"lon":117.265858},{"id":"GRID1.3","gridId":"26","lat":-0.855193,"lon":117.265772},{"id":"GRID1.4","gridId":"26","lat":-0.855298,"lon":117.265668},{"id":"GRID4.5","gridId":"33","lat":-0.855292,"lon":117.265564},{"id":"GRID4.4","gridId":"33","lat":-0.85525,"lon":117.265395},{"id":"GRID7.5","gridId":"34","lat":-0.855263,"lon":117.265273},{"id":"GRID7.4","gridId":"34","lat":-0.855249,"lon":117.265051},{"id":"GRID10.1","gridId":"37","lat":-0.855298,"lon":117.264914},{"id":"SED4.1","gridId":"38","lat":-0.855346,"lon":117.264755},{"id":"GRID8.1","gridId":"35","lat":-0.85536,"lon":117.265008},{"id":"GRID8.2","gridId":"35","lat":-0.85538,"lon":117.265243},{"id":"GRID5.1","gridId":"32","lat":-0.855374,"lon":117.265361},{"id":"GRID5.2","gridId":"32","lat":-0.855388,"lon":117.265569},{"id":"GRID2.1","gridId":"27","lat":-0.855406,"lon":117.265661},{"id":"GRID2.2","gridId":"27","lat":-0.855403,"lon":117.265858},{"id":"GRID2.3","gridId":"27","lat":-0.855505,"lon":117.265736},{"id":"GRID2.5","gridId":"27","lat":-0.855644,"lon":117.265837},{"id":"GRID2.4","gridId":"27","lat":-0.855607,"lon":117.265647},{"id":"GRID5.5","gridId":"32","lat":-0.8556,"lon":117.265507},{"id":"GRID5.3","gridId":"32","lat":-0.855486,"lon":117.265444},{"id":"GRID5.4","gridId":"32","lat":-0.855586,"lon":117.265314},{"id":"GRID8.5","gridId":"35","lat":-0.855564,"lon":117.265208},{"id":"GRID8.3","gridId":"35","lat":-0.855466,"lon":117.265139},{"id":"GRID8.4","gridId":"35","lat":-0.855555,"lon":117.265023},{"id":"GRID9.1","gridId":"36","lat":-0.855658,"lon":117.264982},{"id":"GRID10.2","gridId":"37","lat":-0.855423,"lon":117.264875},{"id":"GRID10.3","gridId":"37","lat":-0.855532,"lon":117.264832},{"id":"SED4.2","gridId":"38","lat":-0.855648,"lon":117.26459},{"id":"GRID10.4","gridId":"37","lat":-0.855674,"lon":117.264812},{"id":"GRID10.5","gridId":"37","lat":-0.855812,"lon":117.264732},{"id":"GRID9.4","gridId":"36","lat":-0.855844,"lon":117.264933},{"id":"GRID9.3","gridId":"36","lat":-0.855773,"lon":117.265065},{"id":"GRID9.5","gridId":"36","lat":-0.855843,"lon":117.26514},{"id":"GRID9.2","gridId":"36","lat":-0.855666,"lon":117.265205},{"id":"GRID6.1","gridId":"31","lat":-0.855679,"lon":117.265316},{"id":"GRID6.4","gridId":"31","lat":-0.855847,"lon":117.265257},{"id":"GRID6.3","gridId":"31","lat":-0.855766,"lon":117.265372},{"id":"GRID6.2","gridId":"31","lat":-0.855698,"lon":117.265499},{"id":"GRID3.1","gridId":"28","lat":-0.855712,"lon":117.265597},{"id":"GRID3.3","gridId":"28","lat":-0.855774,"lon":117.265686},{"id":"GRID3.2","gridId":"28","lat":-0.855722,"lon":117.265819},{"id":"GRID3.5","gridId":"28","lat":-0.855886,"lon":117.265771},{"id":"GRID3.4","gridId":"28","lat":-0.855916,"lon":117.265611},{"id":"GRID6.5","gridId":"31","lat":-0.855894,"lon":117.265447},{"id":"SED1.2","gridId":"29","lat":-0.856019,"lon":117.265653},{"id":"SED1.1","gridId":"29","lat":-0.85609,"lon":117.265547},{"id":"SED2.2","gridId":"30","lat":-0.85611,"lon":117.265411},{"id":"SED2.1","gridId":"30","lat":-0.855997,"lon":117.265297},{"id":"SED3.2","gridId":"39","lat":-0.856088,"lon":117.265065},{"id":"SED3.1","gridId":"39","lat":-0.855947,"lon":117.264874}];
var GRIDS = [{"id":"24","label":"Grid 12","ring":[[-0.854818,117.266216],[-0.854798,117.265993],[-0.855028,117.26597],[-0.855994,117.265827],[-0.855935,117.266069],[-0.854818,117.266216]],"members":["GRID12.5","GRID12.4","GRID12.3","GRID12.2","GRID12.1"]},{"id":"25","label":"Grid 11","ring":[[-0.854798,117.265993],[-0.854739,117.265191],[-0.854972,117.265191],[-0.855028,117.26597],[-0.854798,117.265993]],"members":["GRID11.5","GRID11.4","GRID11.3","GRID11.2","GRID11.1"]},{"id":"26","label":"Grid 1","ring":[[-0.855028,117.26597],[-0.855007,117.265673],[-0.855337,117.265619],[-0.855364,117.26592],[-0.855028,117.26597]],"members":["GRID1.1","GRID1.2","GRID1.5","GRID1.3","GRID1.4"]},{"id":"27","label":"Grid 2","ring":[[-0.855364,117.26592],[-0.855337,117.265619],[-0.85564,117.26557],[-0.855673,117.265874],[-0.855364,117.26592]],"members":["GRID2.1","GRID2.2","GRID2.3","GRID2.5","GRID2.4"]},{"id":"28","label":"Grid 3","ring":[[-0.855673,117.265874],[-0.85564,117.26557],[-0.855956,117.265518],[-0.855994,117.265827],[-0.855673,117.265874]],"members":["GRID3.1","GRID3.3","GRID3.2","GRID3.5","GRID3.4"]},{"id":"29","label":"Sedimen 1","ring":[[-0.856035,117.265834],[-0.855994,117.265827],[-0.855956,117.265518],[-0.856131,117.26549],[-0.856116,117.265605],[-0.856035,117.265834]],"members":["SED1.2","SED1.1"]},{"id":"30","label":"Sedimen 2","ring":[[-0.855956,117.265518],[-0.855937,117.265361],[-0.855931,117.265347],[-0.855921,117.265197],[-0.856182,117.26514],[-0.85615,117.265229],[-0.856162,117.26536],[-0.856131,117.26549],[-0.855956,117.265518]],"members":["SED2.2","SED2.1"]},{"id":"31","label":"Grid 6","ring":[[-0.85564,117.26557],[-0.855608,117.265264],[-0.855921,117.265197],[-0.855931,117.265347],[-0.855937,117.265361],[-0.855956,117.265518],[-0.85564,117.26557]],"members":["GRID6.1","GRID6.4","GRID6.3","GRID6.2","GRID6.5"]},{"id":"32","label":"Grid 5","ring":[[-0.855337,117.265619],[-0.85531,117.265327],[-0.855608,117.265264],[-0.85564,117.26557],[-0.855337,117.265619]],"members":["GRID5.1","GRID5.2","GRID5.5","GRID5.3","GRID5.4"]},{"id":"33","label":"Grid 4","ring":[[-0.855007,117.265673],[-0.854987,117.265396],[-0.85531,117.265327],[-0.855337,117.265619],[-0.855007,117.265673]],"members":["GRID4.1","GRID4.3","GRID4.2","GRID4.5","GRID4.4"]},{"id":"34","label":"Grid 7","ring":[[-0.854987,117.265396],[-0.854972,117.265191],[-0.855161,117.264989],[-0.855278,117.264972],[-0.85531,117.265327],[-0.854987,117.265396]],"members":["GRID7.1","GRID7.3","GRID7.2","GRID7.5","GRID7.4"]},{"id":"35","label":"Grid 8","ring":[[-0.85531,117.265327],[-0.855278,117.264972],[-0.855572,117.264929],[-0.855608,117.265264],[-0.85531,117.265327]],"members":["GRID8.1","GRID8.2","GRID8.5","GRID8.3","GRID8.4"]},{"id":"36","label":"Grid 9","ring":[[-0.855608,117.265264],[-0.855572,117.264929],[-0.855883,117.264884],[-0.855902,117.264955],[-0.855913,117.265039],[-0.855921,117.265197],[-0.855608,117.265264]],"members":["GRID9.1","GRID9.4","GRID9.3","GRID9.5","GRID9.2"]},{"id":"37","label":"Grid 10","ring":[[-0.855572,117.264929],[-0.855278,117.264972],[-0.855161,117.264989],[-0.855226,117.26492],[-0.855342,117.264817],[-0.855537,117.26466],[-0.85582,117.26458],[-0.855863,117.264729],[-0.855883,117.264884],[-0.855572,117.264929]],"members":["GRID10.1","GRID10.2","GRID10.3","GRID10.4","GRID10.5"]},{"id":"38","label":"Sedimen 4","ring":[[-0.855226,117.26492],[-0.855223,117.264924],[-0.855182,117.264892],[-0.855316,117.264769],[-0.855432,117.264686],[-0.855599,117.264585],[-0.855808,117.264512],[-0.855862,117.26454],[-0.85587,117.264569],[-0.85582,117.26458],[-0.855537,117.26466],[-0.855342,117.264817],[-0.855226,117.26492]],"members":["SED4.1","SED4.2"]},{"id":"39","label":"Sedimen 3","ring":[[-0.855921,117.265197],[-0.855913,117.265039],[-0.855902,117.264955],[-0.855883,117.264884],[-0.855863,117.264729],[-0.85582,117.26458],[-0.85587,117.264569],[-0.855929,117.264702],[-0.855952,117.264824],[-0.85603,117.264912],[-0.856182,117.26514],[-0.855921,117.265197]],"members":["SED3.2","SED3.1"]},{"id":"40","label":"Grid 13","ring":[[-0.856632,117.266182],[-0.856486,117.266154],[-0.856708,117.264993],[-0.856854,117.26502],[-0.856632,117.266182]],"members":["GRID13.1","GRID13.2","GRID13.3","GRID13.4","GRID13.5"]}];

var GRID_BY_ID = {};
GRIDS.forEach(function (g) { GRID_BY_ID[g.id] = g; });
var POINT_BY_ID = {};
POINTS.forEach(function (p) { POINT_BY_ID[p.id] = p; });

/* ---------------------------------------------------------------------
   Constants
--------------------------------------------------------------------- */
var STORAGE_KEY = "oilspill_sampling_v2";
var THEME_KEY = "oilspill_theme";
var LABELS_KEY = "oilspill_labels";
var COLORS = {
  done: "#3BD488", doneStroke: "#22B871",
  issue: "#F2635C", issueStroke: "#D8433C",
  pending: "#F2A93C"
};

/* ---------------------------------------------------------------------
   Photo storage (IndexedDB). Photo bytes live here instead of
   localStorage, which only holds a few megabytes; IndexedDB gives the
   app room for far more documentation photos per point.
--------------------------------------------------------------------- */
var PHOTO_DB_NAME = "oilspill_photos_db";
var PHOTO_STORE = "photos";
var photoDbPromise = null;

function openPhotoDb() {
  if (photoDbPromise) return photoDbPromise;
  photoDbPromise = new Promise(function (resolve, reject) {
    var req = indexedDB.open(PHOTO_DB_NAME, 1);
    req.onupgradeneeded = function () {
      if (!req.result.objectStoreNames.contains(PHOTO_STORE)) req.result.createObjectStore(PHOTO_STORE);
    };
    req.onsuccess = function () { resolve(req.result); };
    req.onerror = function () { reject(req.error); };
  });
  return photoDbPromise;
}
function dbPutPhoto(id, blob) {
  return openPhotoDb().then(function (db) {
    return new Promise(function (resolve, reject) {
      var tx = db.transaction(PHOTO_STORE, "readwrite");
      tx.objectStore(PHOTO_STORE).put(blob, id);
      tx.oncomplete = function () { resolve(); };
      tx.onerror = function () { reject(tx.error); };
    });
  });
}
function dbGetPhoto(id) {
  return openPhotoDb().then(function (db) {
    return new Promise(function (resolve, reject) {
      var tx = db.transaction(PHOTO_STORE, "readonly");
      var req = tx.objectStore(PHOTO_STORE).get(id);
      req.onsuccess = function () { resolve(req.result || null); };
      req.onerror = function () { reject(req.error); };
    });
  });
}
function dbDeletePhoto(id) {
  return openPhotoDb().then(function (db) {
    return new Promise(function (resolve, reject) {
      var tx = db.transaction(PHOTO_STORE, "readwrite");
      tx.objectStore(PHOTO_STORE).delete(id);
      tx.oncomplete = function () { resolve(); };
      tx.onerror = function () { reject(tx.error); };
    });
  });
}

function blobToBase64(blob) {
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();
    reader.onload = function () { resolve(reader.result); };
    reader.onerror = function () { reject(reader.error); };
    reader.readAsDataURL(blob);
  });
}
function base64ToBlob(dataUrl) {
  return fetch(dataUrl).then(function (r) { return r.blob(); });
}

/* ---------------------------------------------------------------------
   EXIF GPS extraction. Reads latitude and longitude straight from a
   JPEG's own EXIF tags (as written by field cameras and GPS camera
   apps), no library required.
--------------------------------------------------------------------- */
function extractExifGPS(buffer) {
  try {
    var view = new DataView(buffer);
    if (view.byteLength < 4 || view.getUint16(0) !== 0xFFD8) return null;
    var offset = 2;
    while (offset < view.byteLength - 2) {
      var marker = view.getUint16(offset);
      if (marker === 0xFFE1) {
        return parseExifForGPS(view, offset + 4);
      } else if ((marker & 0xFF00) !== 0xFF00) {
        break;
      } else {
        offset += 2 + view.getUint16(offset + 2);
      }
    }
  } catch (e) {}
  return null;
}
function parseExifForGPS(view, start) {
  if (view.getUint32(start) !== 0x45786966) return null;
  var tiffOffset = start + 6;
  var little = view.getUint16(tiffOffset) === 0x4949;
  function u16(o) { return view.getUint16(o, little); }
  function u32(o) { return view.getUint32(o, little); }
  if (u16(tiffOffset + 2) !== 0x002A) return null;

  var ifd0Offset = tiffOffset + u32(tiffOffset + 4);
  var gpsIfdOffset = null;
  var entries = u16(ifd0Offset);
  for (var i = 0; i < entries; i++) {
    var eo = ifd0Offset + 2 + i * 12;
    if (u16(eo) === 0x8825) { gpsIfdOffset = tiffOffset + u32(eo + 8); break; }
  }
  if (gpsIfdOffset == null) return null;

  function rational(o) { var num = u32(o), den = u32(o + 4); return den ? num / den : 0; }
  function dms(o) { return rational(o) + rational(o + 8) / 60 + rational(o + 16) / 3600; }

  var lat = null, latRef = null, lon = null, lonRef = null;
  var gpsEntries = u16(gpsIfdOffset);
  for (var j = 0; j < gpsEntries; j++) {
    var geo = gpsIfdOffset + 2 + j * 12;
    var tag = u16(geo), count = u32(geo + 4), valueOffset = geo + 8;
    if (tag === 1) latRef = String.fromCharCode(view.getUint8(valueOffset));
    else if (tag === 3) lonRef = String.fromCharCode(view.getUint8(valueOffset));
    else if (tag === 2 && count === 3) lat = dms(tiffOffset + u32(valueOffset));
    else if (tag === 4 && count === 3) lon = dms(tiffOffset + u32(valueOffset));
  }
  if (lat == null || lon == null) return null;
  if (latRef === "S") lat = -lat;
  if (lonRef === "W") lon = -lon;
  return { lat: lat, lon: lon };
}

function defaultRound() {
  return { done: false, date: "", notes: "", issue: false, photos: [], actualLat: null, actualLon: null, savedAt: 0 };
}

/* ---------------------------------------------------------------------
   Points and grids: merges the fixed KML data with custom points added
   manually, and helpers used across the app.
--------------------------------------------------------------------- */
function allPoints() { return POINTS.concat(state.customPoints); }
function getPoint(id) {
  if (POINT_BY_ID[id]) return POINT_BY_ID[id];
  for (var i = 0; i < state.customPoints.length; i++) { if (state.customPoints[i].id === id) return state.customPoints[i]; }
  return null;
}
function gridMembers(g) {
  var extra = state.customPoints.filter(function (p) { return p.gridId === g.id; }).map(function (p) { return p.id; });
  return g.members.concat(extra);
}

function polygonAreaM2(ring) {
  var R = 6378137;
  var lat0 = ring[0][0] * Math.PI / 180;
  var cosLat0 = Math.cos(lat0);
  var pts = ring.map(function (c) {
    var lat = c[0] * Math.PI / 180, lon = c[1] * Math.PI / 180;
    return [R * lon * cosLat0, R * lat];
  });
  var area = 0;
  for (var i = 0; i < pts.length - 1; i++) { area += pts[i][0] * pts[i + 1][1] - pts[i + 1][0] * pts[i][1]; }
  return Math.abs(area / 2);
}
var GRID_AREA = {};
GRIDS.forEach(function (g) { GRID_AREA[g.id] = polygonAreaM2(g.ring); });

function formatArea(m2) {
  var m2Label = Math.round(m2).toLocaleString("id-ID") + " m²";
  if (m2 >= 1000) {
    var ha = (m2 / 10000).toLocaleString("id-ID", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return m2Label + " (" + ha + " ha)";
  }
  return m2Label;
}

function distanceMeters(lat1, lon1, lat2, lon2) {
  var R = 6378137;
  var toRad = Math.PI / 180;
  var dLat = (lat2 - lat1) * toRad, dLon = (lon2 - lon1) * toRad;
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * toRad) * Math.cos(lat2 * toRad) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

var MONTHS_ID = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
function formatDateID(str) {
  if (!str) return "";
  var parts = str.split("-");
  if (parts.length !== 3) return str;
  var y = parts[0], m = parseInt(parts[1], 10) - 1, d = parseInt(parts[2], 10);
  if (!MONTHS_ID[m]) return str;
  return d + " " + MONTHS_ID[m] + " " + y;
}

/* ---------------------------------------------------------------------
   State
--------------------------------------------------------------------- */
var state = {
  round: "before",
  selectedId: null,
  selectedGridId: null,
  search: "",
  statusFilter: "all",
  lightbox: null,
  toast: null,
  theme: localStorage.getItem(THEME_KEY) || "dark",
  showGridLabels: localStorage.getItem(LABELS_KEY + "_grid") !== "off",
  showPointLabels: localStorage.getItem(LABELS_KEY + "_point") !== "off",
  showActual: localStorage.getItem(LABELS_KEY + "_actual") === "on",
  pickMode: null,
  addingPoint: false,
  newPointDraft: { code: "", type: "air", gridId: "", lat: null, lon: null },
  reports: {},
  gridNotes: {},
  customPoints: []
};

(function loadState() {
  try {
    var raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      var parsed = JSON.parse(raw);
      state.reports = parsed.reports || {};
      state.gridNotes = parsed.gridNotes || {};
      state.customPoints = parsed.customPoints || [];
    }
  } catch (e) {}
})();

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ reports: state.reports, gridNotes: state.gridNotes, customPoints: state.customPoints }));
  } catch (e) {
    showToast("warn", "Penyimpanan lokal penuh. Segera ekspor data sebagai cadangan.");
  }
}

function repOf(id, round) {
  var r = state.reports[id];
  var d = (r && r[round]) ? r[round] : null;
  return {
    done: !!(d && d.done),
    date: (d && d.date) || "",
    notes: (d && d.notes) || "",
    issue: !!(d && d.issue),
    photos: (d && d.photos) || [],
    actualLat: (d && typeof d.actualLat === "number") ? d.actualLat : null,
    actualLon: (d && typeof d.actualLon === "number") ? d.actualLon : null
  };
}

function updateReport(pointId, round, patch) {
  var existing = state.reports[pointId] ? Object.assign({}, state.reports[pointId]) : {};
  var current = existing[round] ? Object.assign({}, existing[round]) : defaultRound();
  existing[round] = Object.assign({}, current, patch, { savedAt: Date.now() });
  state.reports = Object.assign({}, state.reports, { });
  state.reports[pointId] = existing;
  persist();
  render();
}

/* ---------------------------------------------------------------------
   Map
--------------------------------------------------------------------- */
var map, gridLayers = {}, markerLayers = {}, actualLayer;
var BASEMAP_URL = "assets/basemap-drone.jpg";
var BASEMAP_ATTR = "Citra udara drone lapangan";
// Corners read from the orthomosaic's embedded georeferencing (UTM zone 50S), reprojected to WGS84.
var IMAGE_BOUNDS = [[-0.8597803, 117.2609098], [-0.8465768, 117.2760070]];
var ACTUAL_COLOR = "#B78CE8";

function allBounds() {
  var pts = allPoints().map(function (p) { return [p.lat, p.lon]; });
  return L.latLngBounds(pts);
}

function addPointMarker(p) {
  var marker = L.circleMarker([p.lat, p.lon], { radius: 5.5, weight: 1.8 }).addTo(map);
  marker.on("click", function () { selectPoint(p.id); });
  marker.bindTooltip(p.id, { permanent: true, direction: "top", offset: [0, -6], className: "point-label-tip", interactive: false });
  marker.bindPopup("", { closeButton: false, autoPan: false, className: "point-hover-popup", offset: [0, -6] });
  marker.on("mouseover", function () {
    marker.setPopupContent(pointHoverHtml(p.id));
    marker.openPopup();
  });
  marker.on("mouseout", function () { marker.closePopup(); });
  markerLayers[p.id] = marker;
}

function pointHoverHtml(id) {
  var rb = repOf(id, "before"), ra = repOf(id, "after");
  function line(label, r) {
    var status = r.issue ? "Bermasalah" : (r.done ? "Selesai" : "Belum disampling");
    var date = r.done && r.date ? " pada " + formatDateID(r.date) : "";
    return label + ": " + status + date;
  }
  return '<span class="ph-id">' + esc(id) + '</span>' + esc(line("Before", rb)) + '<br>' + esc(line("After", ra));
}

var gridGradientReady = {};
function ensureGridGradient(id) {
  if (gridGradientReady[id]) return;
  var svg = map.getPane("overlayPane") && map.getPane("overlayPane").querySelector("svg");
  if (!svg) return;
  var defs = svg.querySelector("defs");
  if (!defs) { defs = document.createElementNS("http://www.w3.org/2000/svg", "defs"); svg.insertBefore(defs, svg.firstChild); }
  var grad = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
  grad.setAttribute("id", "grid-grad-" + id);
  grad.innerHTML =
    '<stop offset="0%" stop-color="' + COLORS.done + '"/>' +
    '<stop class="gg-mid1" offset="50%" stop-color="' + COLORS.done + '"/>' +
    '<stop class="gg-mid2" offset="50%" stop-color="' + COLORS.pending + '"/>' +
    '<stop offset="100%" stop-color="' + COLORS.pending + '"/>';
  defs.appendChild(grad);
  gridGradientReady[id] = true;
}
function setGridGradientPct(id, pct) {
  var svg = map.getPane("overlayPane") && map.getPane("overlayPane").querySelector("svg");
  if (!svg) return;
  var grad = svg.querySelector("#grid-grad-" + id);
  if (!grad) return;
  var p = (pct * 100).toFixed(1) + "%";
  grad.querySelector(".gg-mid1").setAttribute("offset", p);
  grad.querySelector(".gg-mid2").setAttribute("offset", p);
}

function initMap() {
  map = L.map("map", {
    zoomControl: false, attributionControl: true,
    minZoom: 15, maxZoom: 20, maxBoundsViscosity: 1
  });
  L.imageOverlay(BASEMAP_URL, IMAGE_BOUNDS, { attribution: BASEMAP_ATTR }).addTo(map);
  map.setMaxBounds(L.latLngBounds(IMAGE_BOUNDS).pad(0.25));
  L.control.scale({ metric: true, imperial: false, position: "bottomleft" }).addTo(map);
  map.fitBounds(allBounds(), { padding: [36, 36] });
  map.on("click", onMapClick);

  GRIDS.forEach(function (g) {
    var poly = L.polygon(g.ring, { weight: 1.4, fillOpacity: 0.28 }).addTo(map);
    poly.on("click", function () { selectGrid(g.id); });
    poly.bindTooltip(g.label, { permanent: true, direction: "center", className: "grid-label-tip", interactive: false });
    gridLayers[g.id] = poly;
    ensureGridGradient(g.id);
  });

  allPoints().forEach(addPointMarker);

  actualLayer = L.layerGroup().addTo(map);
}

function gridStats(g, round) {
  var members = gridMembers(g);
  var done = 0, issue = 0;
  members.forEach(function (id) {
    var r = repOf(id, round);
    if (r.done) done++;
    if (r.issue) issue++;
  });
  var total = members.length;
  return { done: done, issue: issue, total: total, pct: total ? done / total : 0 };
}

function gridTierColor(pct) {
  if (pct <= 0) return { fill: COLORS.pending, stroke: COLORS.pending };
  if (pct < 1) return { fill: "#2FD9C7", stroke: "#2FD9C7" };
  return { fill: COLORS.done, stroke: COLORS.doneStroke };
}

function matchesFilter(r) {
  if (state.statusFilter === "done") return r.done;
  if (state.statusFilter === "pending") return !r.done;
  if (state.statusFilter === "issue") return r.issue;
  return true;
}

function updateMapStyles() {
  var round = state.round;
  var q = (state.search || "").trim().toLowerCase();

  GRIDS.forEach(function (g) {
    var stats = gridStats(g, round);
    var tier = gridTierColor(stats.pct);
    var isSel = state.selectedGridId === g.id && !state.selectedId;
    var layer = gridLayers[g.id];
    layer.setStyle({
      color: tier.stroke,
      fillColor: tier.fill,
      weight: isSel ? 3 : 1.4,
      fillOpacity: isSel ? 0.4 : 0.26
    });
    if (stats.pct > 0 && stats.pct < 1 && layer._path) {
      setGridGradientPct(g.id, stats.pct);
      layer._path.setAttribute("fill", "url(#grid-grad-" + g.id + ")");
    }
    var pctLabel = Math.round(stats.pct * 100) + "%";
    layer.setTooltipContent(esc(g.label) + '<span class="gl-pct">' + pctLabel + '</span>');
  });

  allPoints().forEach(function (p) {
    var r = repOf(p.id, round);
    var isSel = state.selectedId === p.id;
    var fill, stroke;
    if (r.issue) { fill = COLORS.issue; stroke = COLORS.issueStroke; }
    else if (r.done) { fill = COLORS.done; stroke = COLORS.doneStroke; }
    else { fill = "#16212B"; stroke = COLORS.pending; }
    var match = matchesFilter(r) && (!q || p.id.toLowerCase().indexOf(q) !== -1);
    var layer = markerLayers[p.id];
    if (!layer) return;
    layer.setStyle({
      radius: isSel ? 9 : 5.5,
      weight: isSel ? 3 : 1.8,
      color: stroke,
      fillColor: fill,
      fillOpacity: match ? 0.95 : 0.18,
      opacity: match ? 1 : 0.25
    });
  });

  updateActualLayer();
}

function updateActualLayer() {
  if (!actualLayer) return;
  actualLayer.clearLayers();
  if (!state.showActual) return;
  var round = state.round;
  allPoints().forEach(function (p) {
    var r = repOf(p.id, round);
    if (r.actualLat == null || r.actualLon == null) return;
    var line = L.polyline([[p.lat, p.lon], [r.actualLat, r.actualLon]], { color: ACTUAL_COLOR, weight: 1.6, dashArray: "4,4", opacity: 0.85 });
    var actualMarker = L.circleMarker([r.actualLat, r.actualLon], { radius: 5, weight: 2, color: ACTUAL_COLOR, fillColor: "#ffffff", fillOpacity: 1 });
    actualMarker.on("click", function () { selectPoint(p.id); });
    actualMarker.bindTooltip(p.id + " (aktual)", { className: "point-label-tip", direction: "bottom", offset: [0, 6] });
    line.addTo(actualLayer);
    actualMarker.addTo(actualLayer);
  });
}

function onMapClick(e) {
  if (!state.pickMode) return;
  var lat = e.latlng.lat, lon = e.latlng.lng;
  if (state.pickMode.type === "actual") {
    updateReport(state.pickMode.pointId, state.pickMode.round, { actualLat: lat, actualLon: lon });
    state.pickMode = null;
    renderPickBanner();
    showToast("success", "Lokasi aktual berhasil ditandai di peta.");
  } else if (state.pickMode.type === "newpoint") {
    state.newPointDraft.lat = lat;
    state.newPointDraft.lon = lon;
    state.pickMode = null;
    render();
  }
}

function focusPoint(id) {
  var p = getPoint(id);
  if (!p || !map) return;
  var targetZoom = Math.max(map.getZoom(), 19);
  map.flyTo([p.lat, p.lon], targetZoom, { duration: 0.6 });
}

function focusGrid(id) {
  var layer = gridLayers[id];
  if (!layer || !map) return;
  map.flyToBounds(layer.getBounds(), { padding: [50, 50], duration: 0.6 });
}

/* ---------------------------------------------------------------------
   Selection and navigation
--------------------------------------------------------------------- */
function selectPoint(id) {
  var p = getPoint(id);
  if (!p) return;
  state.selectedId = id;
  state.selectedGridId = p.gridId;
  state.search = "";
  render();
  focusPoint(id);
}

function selectGrid(id) {
  if (!GRID_BY_ID[id]) return;
  state.selectedId = null;
  state.selectedGridId = id;
  render();
  focusGrid(id);
}

function backToGrid() { state.selectedId = null; render(); }
function backToOverview() { state.selectedId = null; state.selectedGridId = null; render(); map.flyToBounds(allBounds(), { padding: [36, 36], duration: 0.6 }); }

/* ---------------------------------------------------------------------
   Custom points (added manually, not part of the original KML data)
--------------------------------------------------------------------- */
function saveNewPoint() {
  var draft = state.newPointDraft;
  var code = (draft.code || "").trim();
  if (!code) { showToast("warn", "Isi kode titik terlebih dahulu."); return; }
  if (getPoint(code)) { showToast("warn", "Kode titik sudah dipakai. Gunakan kode lain."); return; }
  if (draft.lat == null || draft.lon == null) { showToast("warn", "Tentukan lokasi titik terlebih dahulu, ketik koordinat atau tandai di peta."); return; }

  var point = { id: code, gridId: draft.gridId || null, type: draft.type || "air", lat: draft.lat, lon: draft.lon, custom: true, createdAt: Date.now() };
  state.customPoints.push(point);
  persist();
  if (map) addPointMarker(point);
  state.addingPoint = false;
  showToast("success", "Titik " + code + " berhasil ditambahkan.");
  selectPoint(code);
}

function deletePoint(id) {
  var p = getPoint(id);
  if (!p || !p.custom) return;
  if (!window.confirm("Hapus titik " + id + " beserta seluruh catatan sampling di dalamnya? Tindakan ini tidak dapat dibatalkan.")) return;
  state.customPoints = state.customPoints.filter(function (cp) { return cp.id !== id; });
  delete state.reports[id];
  if (markerLayers[id]) { map.removeLayer(markerLayers[id]); delete markerLayers[id]; }
  persist();
  backToOverview();
  showToast("success", "Titik " + id + " telah dihapus.");
}

/* ---------------------------------------------------------------------
   Photos
--------------------------------------------------------------------- */
var currentPhotos = [];
var photoUrlCache = {};
var MAX_PHOTO_DIM = 1600;
var PHOTO_QUALITY = 0.78;
var TRANSPARENT_PX = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

function addPhotos(pointId, round, fileList) {
  var files = fileList ? Array.prototype.slice.call(fileList) : [];
  files.forEach(function (file) { processPhotoFile(pointId, round, file); });
}

function processPhotoFile(pointId, round, file) {
  if (!file.type || file.type.indexOf("image/") !== 0) return;
  var objectUrl = URL.createObjectURL(file);
  var img = new Image();
  img.onload = function () {
    var w = img.naturalWidth, h = img.naturalHeight;
    if (w > MAX_PHOTO_DIM || h > MAX_PHOTO_DIM) {
      var s = MAX_PHOTO_DIM / Math.max(w, h);
      w = Math.round(w * s); h = Math.round(h * s);
    }
    var canvas = document.createElement("canvas");
    canvas.width = w; canvas.height = h;
    canvas.getContext("2d").drawImage(img, 0, 0, w, h);
    URL.revokeObjectURL(objectUrl);
    canvas.toBlob(function (blob) {
      if (blob) appendPhoto(pointId, round, blob);
    }, "image/jpeg", PHOTO_QUALITY);
  };
  img.onerror = function () { URL.revokeObjectURL(objectUrl); };
  img.src = objectUrl;

  if (file.arrayBuffer) {
    file.arrayBuffer().then(function (buf) {
      var gps = extractExifGPS(buf);
      if (gps) handlePhotoGPS(pointId, round, gps);
    }).catch(function () {});
  }
}

function handlePhotoGPS(pointId, round, gps) {
  var r = repOf(pointId, round);
  if (r.actualLat == null || r.actualLon == null) {
    updateReport(pointId, round, { actualLat: gps.lat, actualLon: gps.lon });
    showToast("success", "Lokasi GPS pada foto ditemukan dan dipakai sebagai lokasi sampling aktual.");
  } else {
    showToast("info", "Foto memiliki data lokasi GPS. Lokasi aktual titik ini sudah terisi, periksa manual bila perlu diperbarui.");
  }
}

function appendPhoto(pointId, round, blob) {
  var photoId = "ph" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  dbPutPhoto(photoId, blob).then(function () {
    var existing = state.reports[pointId] ? Object.assign({}, state.reports[pointId]) : {};
    var current = existing[round] ? Object.assign({}, existing[round]) : defaultRound();
    var photos = current.photos ? current.photos.slice() : [];
    photos.push({ id: photoId, addedAt: Date.now() });
    existing[round] = Object.assign({}, current, { photos: photos, savedAt: Date.now() });
    state.reports[pointId] = existing;
    persist();
    if (state.selectedId === pointId) render();
  }).catch(function () {
    showToast("warn", "Gagal menyimpan foto ke penyimpanan perangkat.");
  });
}

function removePhoto(pointId, round, photoId) {
  var existing = state.reports[pointId] ? Object.assign({}, state.reports[pointId]) : {};
  var current = existing[round] ? Object.assign({}, existing[round]) : defaultRound();
  var photos = (current.photos || []).filter(function (p) { return p.id !== photoId; });
  existing[round] = Object.assign({}, current, { photos: photos, savedAt: Date.now() });
  state.reports[pointId] = existing;
  persist();
  dbDeletePhoto(photoId);
  if (photoUrlCache[photoId]) { URL.revokeObjectURL(photoUrlCache[photoId]); delete photoUrlCache[photoId]; }
  render();
}

function ensurePhotoUrl(id) {
  if (photoUrlCache[id]) return Promise.resolve(photoUrlCache[id]);
  return dbGetPhoto(id).then(function (blob) {
    if (!blob) return null;
    var url = URL.createObjectURL(blob);
    photoUrlCache[id] = url;
    return url;
  });
}

function hydrateGalleryImages() {
  var imgs = document.querySelectorAll("#bottomPanel img[data-photo-id]");
  imgs.forEach(function (img) {
    var id = img.getAttribute("data-photo-id");
    if (photoUrlCache[id]) { img.src = photoUrlCache[id]; return; }
    ensurePhotoUrl(id).then(function (url) { if (url) img.src = url; });
  });
}

function openLightbox(photoId) {
  state.lightbox = photoId;
  renderLightbox();
}

function exportJson() {
  showToast("info", "Menyiapkan berkas ekspor, mohon tunggu sebentar.");
  var reportsCopy = {};
  var photoReads = [];

  Object.keys(state.reports).forEach(function (pid) {
    var r = state.reports[pid];
    var copy = {};
    ["before", "after"].forEach(function (round) {
      if (!r[round]) return;
      var roundCopy = Object.assign({}, r[round]);
      roundCopy.photos = (roundCopy.photos || []).map(function (ph) {
        var entry = { id: ph.id, addedAt: ph.addedAt };
        photoReads.push(dbGetPhoto(ph.id).then(function (blob) {
          if (!blob) return;
          return blobToBase64(blob).then(function (b64) { entry.data = b64; });
        }));
        return entry;
      });
      copy[round] = roundCopy;
    });
    reportsCopy[pid] = copy;
  });

  Promise.all(photoReads).then(function () {
    var payload = {
      schema: "oilspill-sampling-v2",
      exportedAt: new Date().toISOString(),
      totalPoints: allPoints().length,
      totalGrids: GRIDS.length,
      reports: reportsCopy,
      gridNotes: state.gridNotes,
      customPoints: state.customPoints
    };
    var blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "sampling-oilspill-" + new Date().toISOString().slice(0, 10) + ".json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
    showToast("success", "Data berhasil diekspor ke berkas JSON.");
  }).catch(function () {
    showToast("warn", "Gagal menyiapkan berkas ekspor.");
  });
}

/* ---------------------------------------------------------------------
   Import and export
--------------------------------------------------------------------- */
function handleImportInput(e) {
  var file = e.target.files && e.target.files[0];
  e.target.value = "";
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function (ev) {
    try {
      var data = JSON.parse(ev.target.result);
      mergeImport(data);
    } catch (err) {
      showToast("warn", "Berkas JSON tidak dapat dibaca. Periksa kembali berkas yang dipilih.");
    }
  };
  reader.readAsText(file);
}

function mergeImport(data) {
  var incoming = (data && data.reports) || {};
  var incomingNotes = (data && data.gridNotes) || {};
  var incomingCustom = (data && data.customPoints) || [];
  var updated = 0, addedPoints = 0;
  var photoWrites = [];

  var existingIds = {};
  allPoints().forEach(function (p) { existingIds[p.id] = true; });
  incomingCustom.forEach(function (p) {
    if (!p || !p.id || existingIds[p.id]) return;
    if (typeof p.lat !== "number" || typeof p.lon !== "number") return;
    state.customPoints.push({ id: p.id, gridId: p.gridId || null, type: p.type || "air", lat: p.lat, lon: p.lon, custom: true, createdAt: p.createdAt || Date.now() });
    existingIds[p.id] = true;
    addedPoints++;
    if (map) addPointMarker(state.customPoints[state.customPoints.length - 1]);
  });

  Object.keys(incoming).forEach(function (pid) {
    var inc = incoming[pid] || {};
    var cur = state.reports[pid] ? Object.assign({}, state.reports[pid]) : {};
    ["before", "after"].forEach(function (round) {
      var incR = inc[round];
      if (!incR) return;
      var curR = cur[round];
      if (!curR || (incR.savedAt || 0) > (curR.savedAt || 0)) {
        var photos = (incR.photos || []).map(function (ph) {
          if (ph.data) {
            photoWrites.push(base64ToBlob(ph.data).then(function (blob) { return dbPutPhoto(ph.id, blob); }));
          }
          return { id: ph.id, addedAt: ph.addedAt || Date.now() };
        });
        var roundCopy = Object.assign({}, incR, { photos: photos });
        delete roundCopy.data;
        cur[round] = roundCopy;
        updated++;
      }
    });
    state.reports[pid] = cur;
  });
  state.gridNotes = Object.assign({}, state.gridNotes, incomingNotes);

  Promise.all(photoWrites).then(function () { finishImport(updated, addedPoints); }).catch(function () {
    finishImport(updated, addedPoints, true);
  });
}

function finishImport(updated, addedPoints, photoFailure) {
  persist();
  render();
  var msg = "Impor selesai. " + updated + " entri diperbarui";
  if (addedPoints) msg += ", " + addedPoints + " titik tambahan baru ditambahkan";
  msg += " dari berkas.";
  if (photoFailure) msg += " Sebagian foto gagal disimpan.";
  showToast(photoFailure ? "warn" : "success", msg);
}

/* ---------------------------------------------------------------------
   Toast
--------------------------------------------------------------------- */
var toastTimer = null;
function showToast(kind, msg) {
  if (toastTimer) clearTimeout(toastTimer);
  state.toast = { kind: kind, msg: msg };
  renderToast();
  toastTimer = setTimeout(function () { state.toast = null; renderToast(); }, 3600);
}

/* ---------------------------------------------------------------------
   Theme
--------------------------------------------------------------------- */
function applyTheme() {
  document.documentElement.setAttribute("data-theme", state.theme);
  var btn = document.getElementById("themeIcon");
  if (btn) btn.innerHTML = state.theme === "light" ? ICONS.moon : ICONS.sun;
}
function toggleTheme() {
  state.theme = state.theme === "light" ? "dark" : "light";
  localStorage.setItem(THEME_KEY, state.theme);
  applyTheme();
}

/* ---------------------------------------------------------------------
   Fullscreen
--------------------------------------------------------------------- */
function toggleFullscreen() {
  var el = document.querySelector(".mapsection");
  if (!document.fullscreenElement) {
    if (el.requestFullscreen) el.requestFullscreen().catch(function () {});
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}
function onFullscreenChange() {
  var active = !!document.fullscreenElement;
  var section = document.querySelector(".mapsection");
  if (section) section.classList.toggle("is-fullscreen", active);
  var icon = document.getElementById("fullscreenIcon");
  if (icon) icon.innerHTML = active ? ICONS.collapse : ICONS.expand;
  var btn = document.getElementById("fullscreenBtn");
  if (btn) btn.setAttribute("aria-label", active ? "Keluar dari layar penuh" : "Tampilkan peta layar penuh");
  setTimeout(function () { if (map) map.invalidateSize(); }, 60);
}

/* ---------------------------------------------------------------------
   Map label visibility
--------------------------------------------------------------------- */
function applyLabelVisibility() {
  var mapEl = document.getElementById("map");
  if (mapEl) {
    mapEl.classList.toggle("hide-grid-labels", !state.showGridLabels);
    mapEl.classList.toggle("hide-point-labels", !state.showPointLabels);
  }
  var gridBtn = document.getElementById("toggleGridLabels");
  if (gridBtn) gridBtn.className = "labeltoggle" + (state.showGridLabels ? " active" : "");
  var pointBtn = document.getElementById("togglePointLabels");
  if (pointBtn) pointBtn.className = "labeltoggle" + (state.showPointLabels ? " active" : "");
}
function toggleGridLabels() {
  state.showGridLabels = !state.showGridLabels;
  localStorage.setItem(LABELS_KEY + "_grid", state.showGridLabels ? "on" : "off");
  applyLabelVisibility();
}
function togglePointLabels() {
  state.showPointLabels = !state.showPointLabels;
  localStorage.setItem(LABELS_KEY + "_point", state.showPointLabels ? "on" : "off");
  applyLabelVisibility();
}
function toggleActual() {
  state.showActual = !state.showActual;
  localStorage.setItem(LABELS_KEY + "_actual", state.showActual ? "on" : "off");
  var btn = document.getElementById("toggleActual");
  if (btn) btn.className = "labeltoggle" + (state.showActual ? " active" : "");
  updateActualLayer();
}

/* ---------------------------------------------------------------------
   Location picking (actual sampling spot, new point placement)
--------------------------------------------------------------------- */
function startPickActual(pointId, round) {
  state.pickMode = { type: "actual", pointId: pointId, round: round };
  renderPickBanner();
}
function startPickNewPoint() {
  state.pickMode = { type: "newpoint" };
  renderPickBanner();
}
function cancelPick() {
  state.pickMode = null;
  renderPickBanner();
}
function clearActual(pointId, round) {
  updateReport(pointId, round, { actualLat: null, actualLon: null });
}
function renderPickBanner() {
  var el = document.getElementById("pickBanner");
  if (!el) return;
  if (!state.pickMode) { el.style.display = "none"; el.innerHTML = ""; return; }
  var text = state.pickMode.type === "actual"
    ? "Klik pada peta untuk menandai lokasi sampling aktual titik " + esc(state.pickMode.pointId)
    : "Klik pada peta untuk menentukan lokasi titik baru";
  el.style.display = "flex";
  el.innerHTML = "<span>" + text + "</span><button type=\"button\" data-action=\"cancel-pick\">Batal</button>";
}

/* ---------------------------------------------------------------------
   Icons
--------------------------------------------------------------------- */
var ICONS = {
  sun: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="4.2" stroke="currentColor" stroke-width="1.8"/><path d="M12 2.5v2.4M12 19.1v2.4M4.2 4.2l1.7 1.7M18.1 18.1l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.2 19.8l1.7-1.7M18.1 5.9l1.7-1.7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  moon: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M20 14.2A8.5 8.5 0 1 1 9.8 4a6.6 6.6 0 0 0 10.2 10.2Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
  check: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="m5 12 5 5 9-10" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  back: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M15 5 8 12l7 7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  search: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/><path d="m20 20-3.5-3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  close: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
  upload: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 16V4m0 0-4 4m4-4 4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  download: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 4v12m0 0-4-4m4 4 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  camera: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><circle cx="12" cy="14" r="3.4" stroke="currentColor" stroke-width="1.7"/></svg>',
  trash: '<svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>',
  droplet: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 3C12 3 6 10.5 6 15a6 6 0 0 0 12 0c0-4.5-6-12-6-12Z" stroke="#2FD9C7" stroke-width="1.6" stroke-linejoin="round"/><path d="M8.6 15.4a3.4 3.4 0 0 0 3.4 3.4" stroke="#2FD9C7" stroke-width="1.4" stroke-linecap="round"/></svg>',
  expand: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M9 4H4v5M15 4h5v5M9 20H4v-5M15 20h5v-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  collapse: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M4 9h5V4M20 9h-5V4M4 15h5v5M20 15h-5v5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  plus: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
  pin: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Z" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/><circle cx="12" cy="9.5" r="2.3" stroke="currentColor" stroke-width="1.7"/></svg>'
};

function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}

/* ---------------------------------------------------------------------
   Render: dashboard, toolbar, bottom panel
--------------------------------------------------------------------- */
function render() {
  var round = state.round;
  var q = (state.search || "").trim().toLowerCase();

  var pts = allPoints();
  var doneAll = 0, issueAll = 0, beforeDone = 0, afterDone = 0;
  pts.forEach(function (p) {
    var r = repOf(p.id, round);
    if (r.done) doneAll++;
    if (r.issue) issueAll++;
    if (repOf(p.id, "before").done) beforeDone++;
    if (repOf(p.id, "after").done) afterDone++;
  });
  var total = pts.length;
  var pending = total - doneAll;
  var pctDone = total ? Math.round((doneAll / total) * 100) : 0;
  var beforePct = total ? Math.round((beforeDone / total) * 100) : 0;
  var afterPct = total ? Math.round((afterDone / total) * 100) : 0;

  document.getElementById("metaChip").textContent = total + " titik pada " + GRIDS.length + " area grid";
  document.getElementById("kpiTotal").textContent = total;
  document.getElementById("kpiTotalSub").textContent = GRIDS.length + " area grid" + (state.customPoints.length ? " termasuk " + state.customPoints.length + " titik tambahan" : "");

  document.getElementById("roundBeforeBtn").className = "roundbtn before" + (round === "before" ? " active" : "");
  document.getElementById("roundAfterBtn").className = "roundbtn after" + (round === "after" ? " active" : "");
  document.getElementById("roundTag").textContent = round === "before" ? "Before Recovery" : "After Recovery";

  document.getElementById("kpiDone").textContent = doneAll;
  document.getElementById("kpiDoneSub").textContent = pctDone + "% dari seluruh titik";
  document.getElementById("kpiPending").textContent = pending;
  document.getElementById("kpiPendingSub").textContent = (100 - pctDone) + "% tersisa dari seluruh titik";
  document.getElementById("kpiIssue").textContent = issueAll;
  document.getElementById("kpiIssueSub").textContent = issueAll > 0 ? "Perlu tindak lanjut lapangan" : "Tidak ada kendala tercatat";

  var ringColor = round === "before" ? "#2FD9C7" : "#3BD488";
  var circumference = 2 * Math.PI * 50;
  var dash = (circumference * (pctDone / 100)).toFixed(2) + " " + circumference.toFixed(2);
  document.getElementById("ringArc").setAttribute("stroke", ringColor);
  document.getElementById("ringArc").setAttribute("stroke-dasharray", dash);
  document.getElementById("ringLabel").textContent = pctDone + "%";

  document.getElementById("beforeCount").textContent = beforeDone + " dari " + total + " titik";
  document.getElementById("beforeBar").style.width = beforePct + "%";
  document.getElementById("afterCount").textContent = afterDone + " dari " + total + " titik";
  document.getElementById("afterBar").style.width = afterPct + "%";

  var gridStatsList = GRIDS.map(function (g) {
    var stats = gridStats(g, round);
    return Object.assign({ id: g.id, label: g.label }, stats);
  }).sort(function (a, b) { return a.pct - b.pct; });

  var priority = gridStatsList.filter(function (g) { return g.pct < 1; }).slice(0, 3);
  var priorityHtml = priority.length ? priority.map(function (g) {
    var tier = gridTierColor(g.pct);
    return '<li class="priority-item" data-action="select-grid" data-id="' + esc(g.id) + '">' +
      '<div class="priority-top"><span class="priority-label">' + esc(g.label) + '</span><span class="priority-pct">' + Math.round(g.pct * 100) + '%</span></div>' +
      '<div class="progressbar"><div class="progressfill" style="width:' + Math.round(g.pct * 100) + '%;background:' + tier.stroke + '"></div></div>' +
      '<div class="priority-remain">' + (g.total - g.done) + ' dari ' + g.total + ' titik belum disampling pada tahap aktif</div>' +
      '</li>';
  }).join("") : '';
  document.getElementById("priorityList").innerHTML = priorityHtml;
  document.getElementById("priorityEmpty").style.display = priority.length ? "none" : "block";

  var searchResults = [];
  if (q) {
    searchResults = pts.filter(function (p) { return p.id.toLowerCase().indexOf(q) !== -1; }).slice(0, 8);
  }
  var resultsBox = document.getElementById("searchResults");
  if (searchResults.length) {
    resultsBox.style.display = "block";
    resultsBox.innerHTML = searchResults.map(function (p) {
      var r = repOf(p.id, round);
      var statusText = r.issue ? "Bermasalah" : (r.done ? "Selesai" : "Belum");
      var dot = r.issue ? COLORS.issue : (r.done ? COLORS.done : COLORS.pending);
      return '<li class="searchresult-item" data-action="select-point" data-id="' + esc(p.id) + '">' +
        '<span class="dot" style="background:' + dot + '"></span>' +
        '<span class="sr-id">' + esc(p.id) + '</span><span class="sr-status">' + statusText + '</span></li>';
    }).join("");
  } else if (q) {
    resultsBox.style.display = "block";
    resultsBox.innerHTML = '<li style="padding:10px 6px;color:var(--text-1);font-size:12px;list-style:none;">Tidak ditemukan titik dengan kode tersebut.</li>';
  } else {
    resultsBox.style.display = "none";
    resultsBox.innerHTML = "";
  }
  document.getElementById("searchClear").style.display = q ? "flex" : "none";

  ["all", "done", "pending", "issue"].forEach(function (f) {
    document.getElementById("filter-" + f).className = "chip" + (state.statusFilter === f ? " active" : "");
  });

  renderBottomPanel(gridStatsList);
  updateMapStyles();
}

function renderBottomPanel(gridStatsList) {
  var root = document.getElementById("bottomPanel");
  var round = state.round;

  if (state.addingPoint) {
    var draft = state.newPointDraft;
    var gridOptions = '<option value="">Tanpa grid</option>' + GRIDS.map(function (g) {
      return '<option value="' + esc(g.id) + '"' + (draft.gridId === g.id ? " selected" : "") + '>' + esc(g.label) + '</option>';
    }).join("");

    root.innerHTML =
      '<button type="button" class="backbtn" data-action="cancel-newpoint">' + ICONS.back + ' Batal, kembali ke ringkasan</button>' +
      '<div class="newpointform">' +
      '<p class="panel-title">Tambah Titik Sampling</p>' +
      '<p class="panel-sub">Gunakan ini untuk titik yang belum tercatat di data grid awal, misalnya titik sampling air tambahan beserta isian sedimen.</p>' +
      '<div class="newpointform-grid">' +
      '<div class="field"><label for="newcode">Kode Titik</label><input id="newcode" type="text" placeholder="Contoh: AIR-TAMBAHAN-1" value="' + esc(draft.code) + '" data-field="newcode"/></div>' +
      '<div class="field"><label for="newtype">Jenis</label><select id="newtype" data-field="newtype">' +
      '<option value="air"' + (draft.type === "air" ? " selected" : "") + '>Air</option>' +
      '<option value="sedimen"' + (draft.type === "sedimen" ? " selected" : "") + '>Sedimen</option></select></div>' +
      '<div class="field"><label for="newgrid">Area Grid</label><select id="newgrid" data-field="newgrid">' + gridOptions + '</select></div>' +
      '<div class="field"><label>Koordinat</label><div class="tworow">' +
      '<input type="number" step="any" placeholder="Lintang" value="' + (draft.lat != null ? draft.lat : "") + '" data-field="newlat"/>' +
      '<input type="number" step="any" placeholder="Bujur" value="' + (draft.lon != null ? draft.lon : "") + '" data-field="newlon"/>' +
      '</div></div>' +
      '</div>' +
      '<div class="formactions">' +
      '<button type="button" class="btn" data-action="pick-newpoint">' + ICONS.pin + ' Tandai di Peta</button>' +
      '<button type="button" class="btn btn-primary" data-action="save-newpoint">Simpan Titik Baru</button>' +
      '</div>' +
      '</div>';
    return;
  }

  if (state.selectedId) {
    var p = getPoint(state.selectedId);
    if (!p) { backToOverview(); return; }
    var g = GRID_BY_ID[p.gridId];
    var rBefore = repOf(p.id, "before");
    var rAfter = repOf(p.id, "after");
    var active = round === "before" ? rBefore : rAfter;
    currentPhotos = active.photos;

    var badgeClass = active.issue ? "badge badge-issue" : (active.done ? "badge badge-done" : "badge badge-pending");
    var badgeLabel = active.issue ? "Bermasalah" : (active.done ? "Selesai" : "Belum selesai");
    var doneBtnClass = "donebtn" + (active.done ? " ispressed" : "");
    var toggleLabel = active.done ? "Tandai belum selesai" : "Tandai selesai";
    var hasActual = active.actualLat != null && active.actualLon != null;
    var offsetLabel = "";
    if (hasActual) {
      var offM = distanceMeters(p.lat, p.lon, active.actualLat, active.actualLon);
      offsetLabel = (offM < 10 ? (Math.round(offM * 10) / 10) : Math.round(offM)) + " m";
    }

    var gallery = active.photos.length ? active.photos.map(function (ph, idx) {
      return '<div class="thumb"><img src="' + TRANSPARENT_PX + '" data-photo-id="' + esc(ph.id) + '" data-action="open-lightbox" data-idx="' + idx + '" alt="Foto kegiatan sampling"/>' +
        '<button type="button" class="thumb-remove" data-action="remove-photo" data-photo-id="' + esc(ph.id) + '" aria-label="Hapus foto">' + ICONS.trash + '</button></div>';
    }).join("") : "";

    root.innerHTML =
      '<button type="button" class="backbtn" data-action="back-grid">' + ICONS.back + ' Kembali ke ' + esc(g ? g.label : "ringkasan") + '</button>' +
      '<div class="detailgrid">' +
      '<div class="detailcard">' +
      '<div class="pointhead"><div class="pointid">' + esc(p.id) + (p.custom ? ' <span class="roundtag">Titik tambahan</span>' : '') + '</div>' +
      '<div class="pointgrid">' + esc(g ? g.label : "Tanpa grid") + '</div>' +
      '<div class="pointcoord">Rencana: lintang ' + p.lat.toFixed(6) + ', bujur ' + p.lon.toFixed(6) + '</div></div>' +
      '<div class="crossrow">' +
      '<div class="crosschip"><div class="cc-label">Before</div><div class="cc-val" style="color:' + (rBefore.done ? "var(--green-text)" : "var(--text-1)") + '">' + (rBefore.done ? "Selesai" : "Belum") + '</div></div>' +
      '<div class="crosschip"><div class="cc-label">After</div><div class="cc-val" style="color:' + (rAfter.done ? "var(--green-text)" : "var(--text-1)") + '">' + (rAfter.done ? "Selesai" : "Belum") + '</div></div>' +
      '</div>' +
      '<div class="tabs">' +
      '<button type="button" class="tabbtn' + (round === "before" ? " active" : "") + '" data-action="set-round" data-round="before">Before Recovery</button>' +
      '<button type="button" class="tabbtn' + (round === "after" ? " active" : "") + '" data-action="set-round" data-round="after">After Recovery</button>' +
      '</div>' +
      '<div class="statusrow"><span class="' + badgeClass + '">' + badgeLabel + '</span>' +
      '<button type="button" class="' + doneBtnClass + '" data-action="toggle-done">' + ICONS.check + ' ' + toggleLabel + '</button></div>' +
      '<div class="field"><label for="pdate">Tanggal Sampling</label>' +
      '<input id="pdate" type="date" value="' + esc(active.date) + '" data-field="date"/></div>' +
      (active.done && !active.date ? '<p class="field-warn">Isi tanggal sampling untuk melengkapi catatan.</p>' : '') +
      '<div class="field"><label for="pnotes">Catatan Kendala Sampling</label>' +
      '<textarea id="pnotes" placeholder="Contoh: akses lokasi terhalang pasang air laut, alat rusak, dan sebagainya" data-field="notes">' + esc(active.notes) + '</textarea></div>' +
      '<div class="checkrow"><input id="pissue" type="checkbox" data-field="issue"' + (active.issue ? " checked" : "") + '/><label for="pissue">Tandai ada kendala pada titik ini</label></div>' +
      '<div class="field"><label>Lokasi Sampling Aktual</label>' +
      '<div class="tworow">' +
      '<input type="number" step="any" placeholder="Lintang aktual" value="' + (active.actualLat != null ? active.actualLat : "") + '" data-field="actualLat"/>' +
      '<input type="number" step="any" placeholder="Bujur aktual" value="' + (active.actualLon != null ? active.actualLon : "") + '" data-field="actualLon"/>' +
      '</div>' +
      '<div class="actualactions">' +
      '<button type="button" class="btn" data-action="pick-actual">' + ICONS.pin + ' Tandai di Peta</button>' +
      (hasActual ? '<button type="button" class="btn" data-action="clear-actual">Hapus Lokasi Aktual</button>' : '') +
      '</div>' +
      (hasActual ? '<div class="actualoffset">Bergeser sekitar <b>' + offsetLabel + '</b> dari titik rencana. Aktifkan sakelar Lokasi Aktual di atas peta untuk melihatnya.</div>' : '') +
      '</div>' +
      (p.custom ? '<button type="button" class="dangerbtn" data-action="delete-point">' + ICONS.trash + ' Hapus Titik Ini</button>' : '') +
      '</div>' +
      '<div class="detailcard photodrop" id="photoDropZone">' +
      '<div class="photohead"><div><h3>Dokumentasi Foto</h3><p>' + active.photos.length + ' foto tersimpan, seret dan lepas foto ke sini atau</p></div>' +
      '<label class="uploadlabel" for="photoInput">' + ICONS.camera + ' Tambah Foto</label></div>' +
      '<input class="hiddenfile" id="photoInput" type="file" accept="image/*" multiple data-field="photos"/>' +
      (active.photos.length ? '<div class="gallery">' + gallery + '</div>' : '<div class="emptyphoto">Belum ada foto kegiatan sampling di titik ini. Seret dan lepas foto ke area ini, atau gunakan tombol Tambah Foto.</div>') +
      '</div>' +
      '</div>';
    hydrateGalleryImages();
    return;
  }

  if (state.selectedGridId) {
    var gr = GRID_BY_ID[state.selectedGridId];
    var stats = gridStats(gr, round);
    var members = gridMembers(gr).map(function (id) {
      var r = repOf(id, round);
      var statusText = r.issue ? "Bermasalah" : (r.done ? "Selesai" : "Belum");
      var dot = r.issue ? COLORS.issue : (r.done ? COLORS.done : COLORS.pending);
      return '<li class="member-item" data-action="select-point" data-id="' + esc(id) + '">' +
        '<span class="dot" style="background:' + dot + '"></span><span class="member-id">' + esc(id) + '</span><span class="member-status">' + statusText + '</span></li>';
    }).join("");

    root.innerHTML =
      '<button type="button" class="backbtn" data-action="back-overview">' + ICONS.back + ' Kembali ke ringkasan</button>' +
      '<div class="detailgrid">' +
      '<div class="detailcard">' +
      '<div class="griddetail-head"><p class="panel-title">' + esc(gr.label) + '</p><span class="griddetail-pct">' + Math.round(stats.pct * 100) + '%</span></div>' +
      '<p class="griddetail-remain">' + (stats.total - stats.done) + ' dari ' + stats.total + ' titik belum disampling pada tahap aktif</p>' +
      '<p class="griddetail-area">Luas area: ' + formatArea(GRID_AREA[gr.id]) + '</p>' +
      '<ul class="memberlist">' + members + '</ul>' +
      '</div>' +
      '<div class="detailcard">' +
      '<div class="field"><label for="gridnote">Catatan Area</label>' +
      '<textarea id="gridnote" placeholder="Tulis catatan mengenai kondisi atau kendala pada area ini" data-field="gridnote">' + esc(state.gridNotes[gr.id] || "") + '</textarea></div>' +
      '</div>' +
      '</div>';
    return;
  }

  var rows = gridStatsList.map(function (g) {
    var tier = gridTierColor(g.pct);
    return '<div class="gridrow" data-action="select-grid" data-id="' + esc(g.id) + '">' +
      '<div class="gridrow-top"><span class="gridrow-label">' + esc(g.label) + '</span><span class="gridrow-count">' + g.done + '/' + g.total + '</span></div>' +
      '<div class="progressbar"><div class="progressfill" style="width:' + Math.round(g.pct * 100) + '%;background:' + tier.stroke + '"></div></div>' +
      '</div>';
  }).join("");

  root.innerHTML =
    '<div class="panelhead-row">' +
    '<div><p class="panel-title">Ringkasan Area Grid</p>' +
    '<p class="panel-sub">Diurutkan dari progres paling rendah pada tahap aktif. Klik salah satu area untuk melihat titik di dalamnya, atau klik langsung pada peta di atas.</p></div>' +
    '<button type="button" class="btn btn-primary" data-action="start-add-point">' + ICONS.plus + ' Tambah Titik</button>' +
    '</div>' +
    '<div class="gridgrid">' + rows + '</div>';
}

function renderToast() {
  var root = document.getElementById("toastRoot");
  if (!state.toast) { root.innerHTML = ""; return; }
  root.innerHTML = '<div class="toast toast-' + state.toast.kind + '"><span>' + esc(state.toast.msg) + '</span>' +
    '<button type="button" class="toastclose" data-action="close-toast" aria-label="Tutup notifikasi">' + ICONS.close + '</button></div>';
}

function renderLightbox() {
  var root = document.getElementById("lightboxRoot");
  if (!state.lightbox) { root.innerHTML = ""; return; }
  var photoId = state.lightbox;
  var cached = photoUrlCache[photoId];
  root.innerHTML = '<div class="lightbox-backdrop" data-action="close-lightbox">' +
    '<img src="' + (cached || TRANSPARENT_PX) + '" data-photo-id="' + esc(photoId) + '" class="lightbox-img" alt="Pratinjau foto kegiatan sampling"/>' +
    '<button type="button" class="lightbox-close" data-action="close-lightbox" aria-label="Tutup pratinjau">' + ICONS.close + '</button></div>';
  if (!cached) {
    ensurePhotoUrl(photoId).then(function (url) {
      if (!url || state.lightbox !== photoId) return;
      var img = document.querySelector('.lightbox-img[data-photo-id="' + photoId + '"]');
      if (img) img.src = url;
    });
  }
}

/* ---------------------------------------------------------------------
   Event delegation
--------------------------------------------------------------------- */
function onAction(e) {
  var el = e.target.closest("[data-action]");
  if (!el) return;
  var action = el.getAttribute("data-action");
  var id = el.getAttribute("data-id");

  if (action === "select-point") selectPoint(id);
  else if (action === "select-grid") selectGrid(id);
  else if (action === "back-grid") backToGrid();
  else if (action === "back-overview") backToOverview();
  else if (action === "toggle-theme") toggleTheme();
  else if (action === "toggle-grid-labels") toggleGridLabels();
  else if (action === "toggle-point-labels") togglePointLabels();
  else if (action === "toggle-actual") toggleActual();
  else if (action === "toggle-fullscreen") toggleFullscreen();
  else if (action === "close-toast") { state.toast = null; renderToast(); }
  else if (action === "close-lightbox") { state.lightbox = null; renderLightbox(); }
  else if (action === "clear-search") { state.search = ""; document.getElementById("searchInput").value = ""; render(); }
  else if (action === "set-filter") { state.statusFilter = el.getAttribute("data-filter"); render(); }
  else if (action === "set-round") { state.round = el.getAttribute("data-round"); render(); }
  else if (action === "toggle-done") {
    var r = repOf(state.selectedId, state.round);
    updateReport(state.selectedId, state.round, { done: !r.done });
  } else if (action === "remove-photo") {
    removePhoto(state.selectedId, state.round, el.getAttribute("data-photo-id"));
  } else if (action === "open-lightbox") {
    var idx = parseInt(el.getAttribute("data-idx"), 10);
    var photo = currentPhotos[idx];
    if (photo) openLightbox(photo.id);
  } else if (action === "export-json") {
    exportJson();
  } else if (action === "pick-actual") {
    startPickActual(state.selectedId, state.round);
  } else if (action === "clear-actual") {
    clearActual(state.selectedId, state.round);
  } else if (action === "cancel-pick") {
    cancelPick();
  } else if (action === "delete-point") {
    deletePoint(state.selectedId);
  } else if (action === "start-add-point") {
    state.addingPoint = true;
    state.newPointDraft = { code: "", type: "air", gridId: "", lat: null, lon: null };
    render();
  } else if (action === "cancel-newpoint") {
    state.addingPoint = false;
    state.pickMode = null;
    renderPickBanner();
    render();
  } else if (action === "pick-newpoint") {
    startPickNewPoint();
  } else if (action === "save-newpoint") {
    saveNewPoint();
  }
}

function parseCoord(v) {
  var n = parseFloat(v);
  return isNaN(n) ? null : n;
}

function onInput(e) {
  var t = e.target;
  var field = t.getAttribute && t.getAttribute("data-field");
  if (t.id === "searchInput") { state.search = t.value; render(); return; }
  if (!field) return;

  if (field === "newcode") { state.newPointDraft.code = t.value; return; }
  if (field === "newlat") { state.newPointDraft.lat = parseCoord(t.value); return; }
  if (field === "newlon") { state.newPointDraft.lon = parseCoord(t.value); return; }

  if (!state.selectedId) return;
  if (field === "notes") {
    var existing = state.reports[state.selectedId] ? Object.assign({}, state.reports[state.selectedId]) : {};
    var current = existing[state.round] ? Object.assign({}, existing[state.round]) : defaultRound();
    current.notes = t.value;
    existing[state.round] = current;
    state.reports[state.selectedId] = existing;
  } else if (field === "gridnote" && state.selectedGridId) {
    state.gridNotes[state.selectedGridId] = t.value;
  } else if (field === "actualLat" || field === "actualLon") {
    var val = parseCoord(t.value);
    var patch = {}; patch[field] = val;
    var ex = state.reports[state.selectedId] ? Object.assign({}, state.reports[state.selectedId]) : {};
    var cur = ex[state.round] ? Object.assign({}, ex[state.round]) : defaultRound();
    ex[state.round] = Object.assign({}, cur, patch);
    state.reports[state.selectedId] = ex;
  }
}

function onChange(e) {
  var t = e.target;
  var field = t.getAttribute && t.getAttribute("data-field");
  if (t.id === "importInput") { handleImportInput(e); return; }
  if (!field) return;

  if (field === "newtype") { state.newPointDraft.type = t.value; return; }
  if (field === "newgrid") { state.newPointDraft.gridId = t.value || ""; return; }

  if (!state.selectedId) return;
  if (field === "date") updateReport(state.selectedId, state.round, { date: t.value });
  else if (field === "issue") updateReport(state.selectedId, state.round, { issue: t.checked });
  else if (field === "photos") { addPhotos(state.selectedId, state.round, t.files); t.value = ""; }
  else if (field === "actualLat" || field === "actualLon") {
    var val = parseCoord(t.value);
    var patch = {}; patch[field] = val;
    updateReport(state.selectedId, state.round, patch);
  }
}

function onBlur(e) {
  var t = e.target;
  var field = t.getAttribute && t.getAttribute("data-field");
  if (field === "notes" || field === "gridnote") persist();
}

function onDragOver(e) {
  var zone = e.target.closest && e.target.closest(".photodrop");
  if (!zone) return;
  e.preventDefault();
  zone.classList.add("dragover");
}
function onDragLeave(e) {
  var zone = e.target.closest && e.target.closest(".photodrop");
  if (!zone) return;
  zone.classList.remove("dragover");
}
function onDrop(e) {
  var zone = e.target.closest && e.target.closest(".photodrop");
  if (!zone) return;
  e.preventDefault();
  zone.classList.remove("dragover");
  if (!state.selectedId) return;
  var files = e.dataTransfer && e.dataTransfer.files;
  if (files && files.length) addPhotos(state.selectedId, state.round, files);
}

/* ---------------------------------------------------------------------
   Boot
--------------------------------------------------------------------- */
function boot() {
  document.getElementById("brandMark").innerHTML = ICONS.droplet;
  document.getElementById("searchIcon").innerHTML = ICONS.search;
  document.getElementById("searchClear").innerHTML = ICONS.close;
  document.getElementById("importIcon").innerHTML = ICONS.upload;
  document.getElementById("exportIcon").innerHTML = ICONS.download;
  document.getElementById("fullscreenIcon").innerHTML = ICONS.expand;

  applyTheme();
  initMap();
  applyLabelVisibility();
  var actualBtn = document.getElementById("toggleActual");
  if (actualBtn) actualBtn.className = "labeltoggle" + (state.showActual ? " active" : "");
  render();

  document.body.addEventListener("click", onAction);
  document.body.addEventListener("input", onInput);
  document.body.addEventListener("change", onChange);
  document.body.addEventListener("focusout", onBlur, true);
  document.body.addEventListener("dragover", onDragOver);
  document.body.addEventListener("dragleave", onDragLeave);
  document.body.addEventListener("drop", onDrop);
  document.addEventListener("fullscreenchange", onFullscreenChange);
}

document.addEventListener("DOMContentLoaded", boot);
