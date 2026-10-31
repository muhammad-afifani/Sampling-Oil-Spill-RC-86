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
  return { done: false, date: "", notes: "", personnel: "", issue: false, photos: [], actualLat: null, actualLon: null, savedAt: 0 };
}

/* ---------------------------------------------------------------------
   Points and grids: merges the fixed KML data with custom points added
   manually, and helpers used across the app.
--------------------------------------------------------------------- */
// Points of a hidden or deleted temporary grid (see grids.js) are left out everywhere.
function hiddenGridIds() {
  var h = {};
  (state.customGrids || []).forEach(function (g) { if (g.deleted || g.hidden) h[g.id] = true; });
  return h;
}
function allPoints() {
  var hidden = hiddenGridIds();
  return POINTS.concat(state.customPoints.filter(function (p) { return !p.gridId || !hidden[p.gridId]; }));
}
function getPoint(id) {
  if (POINT_BY_ID[id]) return POINT_BY_ID[id];
  for (var i = 0; i < state.customPoints.length; i++) { if (state.customPoints[i].id === id) return state.customPoints[i]; }
  return null;
}
function gridMembers(g) {
  var extra = state.customPoints.filter(function (p) { return p.gridId === g.id; }).map(function (p) { return p.id; });
  return g.members.concat(extra);
}

var SAMPLE_TYPES = {
  air: { label: "Air", short: "AIR", color: "#2FD9C7" },
  sedimen: { label: "Sedimen", short: "SED", color: "#B78CE8" },
  soil: { label: "Tanah", short: "GRID", color: "#F2A93C" }
};

function pointType(p) {
  if (p.type) return p.type;
  if (p.id.indexOf("SED") === 0) return "sedimen";
  if (p.id.indexOf("AIR") === 0) return "air";
  return "soil";
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

function naturalCompare(a, b) {
  var re = /(\d+)/;
  var am = a.match(re), bm = b.match(re);
  if (am && bm && a.slice(0, am.index) === b.slice(0, bm.index)) {
    return parseInt(am[1], 10) - parseInt(bm[1], 10);
  }
  return a < b ? -1 : a > b ? 1 : 0;
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
  aboutOpen: false,
  qrisZoom: false,
  theme: localStorage.getItem(THEME_KEY) || "dark",
  showGridLabels: localStorage.getItem(LABELS_KEY + "_grid") !== "off",
  showPointLabels: localStorage.getItem(LABELS_KEY + "_point") !== "off",
  showActual: localStorage.getItem(LABELS_KEY + "_actual") === "on",
  showGridFill: localStorage.getItem(LABELS_KEY + "_fill") !== "off",
  basemapOnly: localStorage.getItem(LABELS_KEY + "_basemaponly") === "on",
  showDataTable: localStorage.getItem(LABELS_KEY + "_datatable") !== "off",
  tableCollapsed: {},
  tableExpandedRows: {},
  pickMode: null,
  addingPoint: false,
  newPointDraft: { code: "", type: "air", gridId: "", lat: null, lon: null },
  reports: {},
  gridNotes: {},
  customPoints: [],
  customGrids: [],
  seeded: {},
  dateFilter: { mode: "all", date: "", from: "", to: "" },
  exportDlg: null,
  pdfDlg: null
};

(function loadState() {
  try {
    var raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      var parsed = JSON.parse(raw);
      state.reports = parsed.reports || {};
      state.gridNotes = parsed.gridNotes || {};
      state.customPoints = parsed.customPoints || [];
      state.customGrids = parsed.customGrids || [];
      state.seeded = parsed.seeded || {};
    }
  } catch (e) {}
})();

function migrateOldPhotos() {
  var writes = [];
  var touched = false;
  Object.keys(state.reports).forEach(function (pid) {
    var report = state.reports[pid];
    ["before", "after"].forEach(function (round) {
      var r = report[round];
      if (!r || !r.photos || !r.photos.length) return;
      var hasOld = r.photos.some(function (ph) { return ph.url; });
      if (!hasOld) return;
      touched = true;
      r.photos = r.photos.map(function (ph) {
        if (!ph.url) return ph;
        writes.push(base64ToBlob(ph.url).then(function (blob) { return dbPutPhoto(ph.id, blob); }));
        return { id: ph.id, addedAt: ph.addedAt || Date.now() };
      });
    });
  });
  if (!touched) return;
  Promise.all(writes).then(function () {
    persist();
    render();
  }).catch(function () {});
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ reports: state.reports, gridNotes: state.gridNotes, customPoints: state.customPoints, customGrids: state.customGrids, seeded: state.seeded }));
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
    personnel: (d && d.personnel) || "",
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
var ACTUAL_FILL = "#2F6FED";
var ACTUAL_PIN_SVG = '<svg width="26" height="34" viewBox="0 0 26 34" xmlns="http://www.w3.org/2000/svg">' +
  '<path d="M13 0C5.8 0 0 5.8 0 13c0 9.5 13 21 13 21s13-11.5 13-21C26 5.8 20.2 0 13 0z" fill="' + ACTUAL_FILL + '" stroke="#ffffff" stroke-width="1.6"/>' +
  '<circle cx="13" cy="13" r="5" fill="#ffffff"/></svg>';

function allBounds() {
  var pts = allPoints().map(function (p) { return [p.lat, p.lon]; });
  return L.latLngBounds(pts);
}

function addPointMarker(p) {
  var marker = L.circleMarker([p.lat, p.lon], { radius: 5.5, weight: 1.8 });
  if (state.view !== "lab") marker.addTo(map);
  marker.on("click", function (e) {
    if (state.pickMode || gridEdit) { onMapClick(e); return; }
    markMapClickHandled(e);
    showCoordReadout(L.latLng(p.lat, p.lon), true);
    selectPoint(p.id);
  });
  marker.bindTooltip(p.id, { permanent: true, direction: "top", offset: [0, -6], className: "point-label-tip", interactive: false });
  marker.bindPopup("", { closeButton: false, autoPan: false, className: "point-hover-popup", offset: [0, -6], maxWidth: 240 });
  marker.on("mouseover", function () {
    marker.setPopupContent(pointHoverHtml(p.id));
    marker.openPopup();
    hydratePopupPhotos(marker.getPopup());
  });
  marker.on("mouseout", function () { marker.closePopup(); });
  markerLayers[p.id] = marker;
}

function hydratePopupPhotos(popup) {
  var node = popup && popup._contentNode;
  if (!node) return;
  var imgs = node.querySelectorAll("img[data-photo-id]");
  for (var i = 0; i < imgs.length; i++) {
    (function (img) {
      var id = img.getAttribute("data-photo-id");
      ensurePhotoUrl(id).then(function (url) { if (url) img.src = url; else markPhotoMissing(img); });
    })(imgs[i]);
  }
}

function pointHoverHtml(id) {
  var rb = repOf(id, "before"), ra = repOf(id, "after");
  function roundBlock(label, r) {
    var status = r.issue ? "Bermasalah" : (r.done ? "Selesai" : "Belum disampling");
    var statusClass = r.issue ? "ph-status-issue" : (r.done ? "ph-status-done" : "ph-status-pending");
    var mark = r.done && !r.issue ? "✓ " : "";
    var date = r.done && r.date ? " pada " + formatDateID(r.date) : "";
    var html = '<div class="ph-round"><span class="ph-round-label">' + esc(label) + ':</span> ' +
      '<span class="' + statusClass + '">' + mark + esc(status) + '</span>' + esc(date) + '</div>';
    if (r.notes && r.notes.trim()) {
      var note = r.notes.trim();
      if (note.length > 90) note = note.slice(0, 90) + "…";
      html += '<div class="ph-notes">' + esc(note) + '</div>';
    }
    if (r.photos && r.photos.length) {
      var lastPhoto = r.photos[r.photos.length - 1];
      html += '<div class="ph-photo"><img src="' + TRANSPARENT_PX + '" data-photo-id="' + esc(lastPhoto.id) + '" alt="Foto ' + esc(label) + '"/>' +
        (r.photos.length > 1 ? '<span class="ph-photo-count">+' + (r.photos.length - 1) + '</span>' : '') + '</div>';
    }
    return html;
  }
  var pt = getPoint(id);
  return '<span class="ph-id">' + esc(id) + '</span>' + (pt ? '<div class="ph-coord">' + esc(fmtLatLon(pt.lat, pt.lon)) + '</div>' : '') +
    roundBlock("Before Recovery", rb) + roundBlock("After Recovery", ra);
}

/* Partial-progress grid fill: instead of an arbitrary left/right split,
   each member point "claims" the region of the grid closest to its own
   real location (a small nearest-point/Voronoi raster), so the done
   (green) portion of the fill actually sits where the done points are. */
function hexToRgb(hex) {
  var h = hex.replace("#", "");
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  var num = parseInt(h, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

var GRID_PATTERN_SIZE = 96;
var gridPatternReady = {};
var gridPatternCache = {};

function ensureGridPattern(id) {
  if (gridPatternReady[id]) return;
  var svg = map.getPane("overlayPane") && map.getPane("overlayPane").querySelector("svg");
  if (!svg) return;
  var defs = svg.querySelector("defs");
  if (!defs) { defs = document.createElementNS("http://www.w3.org/2000/svg", "defs"); svg.insertBefore(defs, svg.firstChild); }
  var pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
  pattern.setAttribute("id", "grid-pattern-" + id);
  pattern.setAttribute("patternUnits", "objectBoundingBox");
  pattern.setAttribute("patternContentUnits", "objectBoundingBox");
  pattern.setAttribute("width", "1");
  pattern.setAttribute("height", "1");
  var image = document.createElementNS("http://www.w3.org/2000/svg", "image");
  image.setAttribute("x", "0"); image.setAttribute("y", "0");
  image.setAttribute("width", "1"); image.setAttribute("height", "1");
  image.setAttribute("preserveAspectRatio", "none");
  pattern.appendChild(image);
  defs.appendChild(pattern);
  gridPatternReady[id] = true;
}

function gridHasHatch(g, round) {
  return gridMembers(g).some(function (id) {
    var r = repOf(id, round);
    return r.issue || (r.notes && r.notes.trim());
  });
}

function gridPatternUrl(g, round) {
  var members = gridMembers(g).map(getPoint).filter(Boolean);
  if (!members.length) return null;
  var reps = members.map(function (p) { return { p: p, r: repOf(p.id, round) }; });
  var key = g.id + "|" + round + "|" + (g.temp ? g.ring.join(";") + "|" : "") + reps.map(function (x) {
    var statusChar = x.r.issue ? "X" : (x.r.done ? "1" : "0");
    var hatchChar = (x.r.issue || (x.r.notes && x.r.notes.trim())) ? "H" : "-";
    return statusChar + hatchChar;
  }).join("");
  if (gridPatternCache[key]) return gridPatternCache[key];

  var lats = g.ring.map(function (c) { return c[0]; });
  var lons = g.ring.map(function (c) { return c[1]; });
  var minLat = Math.min.apply(null, lats), maxLat = Math.max.apply(null, lats);
  var minLon = Math.min.apply(null, lons), maxLon = Math.max.apply(null, lons);
  var latSpan = (maxLat - minLat) || 0.0001, lonSpan = (maxLon - minLon) || 0.0001;

  var pts = reps.map(function (x) {
    var color = x.r.issue ? COLORS.issue : (x.r.done ? COLORS.done : COLORS.pending);
    var hatch = !!(x.r.issue || (x.r.notes && x.r.notes.trim()));
    return {
      x: (x.p.lon - minLon) / lonSpan * GRID_PATTERN_SIZE,
      y: (1 - (x.p.lat - minLat) / latSpan) * GRID_PATTERN_SIZE,
      rgb: hexToRgb(color),
      hatch: hatch
    };
  });

  var canvas = document.createElement("canvas");
  canvas.width = GRID_PATTERN_SIZE; canvas.height = GRID_PATTERN_SIZE;
  var ctx = canvas.getContext("2d");
  var img = ctx.createImageData(GRID_PATTERN_SIZE, GRID_PATTERN_SIZE);
  for (var yy = 0; yy < GRID_PATTERN_SIZE; yy++) {
    for (var xx = 0; xx < GRID_PATTERN_SIZE; xx++) {
      var best = pts[0], bestDist = Infinity;
      for (var i = 0; i < pts.length; i++) {
        var dx = xx - pts[i].x, dy = yy - pts[i].y;
        var d = dx * dx + dy * dy;
        if (d < bestDist) { bestDist = d; best = pts[i]; }
      }
      var r0 = best.rgb[0], g0 = best.rgb[1], b0 = best.rgb[2];
      if (best.hatch && ((xx + yy) % 7) < 2) {
        r0 = Math.round(r0 * 0.2); g0 = Math.round(g0 * 0.2); b0 = Math.round(b0 * 0.2);
      }
      var idx = (yy * GRID_PATTERN_SIZE + xx) * 4;
      img.data[idx] = r0; img.data[idx + 1] = g0; img.data[idx + 2] = b0; img.data[idx + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  var url = canvas.toDataURL("image/png");
  gridPatternCache[key] = url;
  return url;
}

function applyGridPattern(g, round) {
  ensureGridPattern(g.id);
  var svg = map.getPane("overlayPane") && map.getPane("overlayPane").querySelector("svg");
  if (!svg) return null;
  var pattern = svg.querySelector("#grid-pattern-" + g.id);
  if (!pattern) return null;
  var url = gridPatternUrl(g, round);
  if (!url) return null;
  var image = pattern.querySelector("image");
  image.setAttribute("href", url);
  image.setAttributeNS("http://www.w3.org/1999/xlink", "href", url);
  return "url(#grid-pattern-" + g.id + ")";
}

function initMap() {
  map = L.map("map", {
    zoomControl: false, attributionControl: true,
    minZoom: 15, maxZoom: 24, maxBoundsViscosity: 1
  });
  L.imageOverlay(BASEMAP_URL, IMAGE_BOUNDS, { attribution: BASEMAP_ATTR }).addTo(map);
  map.setMaxBounds(L.latLngBounds(IMAGE_BOUNDS).pad(0.25));
  L.control.scale({ metric: true, imperial: false, position: "bottomleft" }).addTo(map);
  initCoordReadout();
  map.fitBounds(allBounds(), { padding: [36, 36] });
  map.on("click", onMapClick);

  GRIDS.forEach(function (g) { addGridLayer(g, false); });

  allPoints().forEach(addPointMarker);

  actualLayer = L.layerGroup().addTo(map);
}

// toBack: grids added after the point markers go underneath them so points stay clickable.
function addGridLayer(g, toBack) {
  var poly = L.polygon(g.ring, { weight: 1.4, fillOpacity: 0.28 }).addTo(map);
  poly.bindPopup("", { closeButton: true, className: "grid-info-popup" });
  poly.on("click", function (e) {
    g = GRID_BY_ID[g.id] || g;
    if (gridEdit) { onMapClick(e); return; }
    if (state.pickMode) { onMapClick(e); return; }
    markMapClickHandled(e);
    var here = coordShortHtml(e.latlng.lat, e.latlng.lng) + gridTempActionsHtml(g, true);
    if (state.view === "lab") {
      poly.setPopupContent(labGridPopupHtml(g) + here);
      poly.openPopup(e.latlng);
      showCoordReadout(e.latlng, true);
      return;
    }
    selectGrid(g.id);
    var stats = gridStats(g, state.round);
    var html = '<div class="gp-title">' + esc(g.label) + '</div>' +
      '<div class="gp-area">Luas area: ' + formatArea(GRID_AREA[g.id]) + '</div>' +
      '<div class="gp-pct">' + Math.round(stats.pct * 100) + '% disampling (' + stats.done + ' dari ' + stats.total + ' titik)</div>' + here;
    poly.setPopupContent(html);
    poly.openPopup(e.latlng);
    showCoordReadout(e.latlng, true);
  });
  poly.bindTooltip(g.label, { permanent: true, direction: "center", className: "grid-label-tip", interactive: false });
  gridLayers[g.id] = poly;
  ensureGridPattern(g.id);
  if (toBack) poly.bringToBack();
}

function gridStats(g, round) {
  var members = gridMembers(g);
  var done = 0, issue = 0, hatch = 0;
  members.forEach(function (id) {
    var r = repOf(id, round);
    if (r.done) done++;
    if (r.issue) issue++;
    if (r.issue || (r.notes && r.notes.trim())) hatch++;
  });
  var total = members.length;
  return { done: done, issue: issue, hatch: hatch, total: total, pct: total ? done / total : 0 };
}

function gridTierColor(pct) {
  if (pct <= 0) return { fill: COLORS.pending, stroke: COLORS.pending };
  if (pct < 1) return { fill: "#2FD9C7", stroke: "#2FD9C7" };
  return { fill: COLORS.done, stroke: COLORS.doneStroke };
}

function matchesFilter(r) {
  if (state.statusFilter === "done" && !r.done) return false;
  if (state.statusFilter === "pending" && r.done) return false;
  if (state.statusFilter === "issue" && !r.issue) return false;
  return matchesDateFilter(r);
}

function matchesDateFilter(r) {
  var f = state.dateFilter;
  if (f.mode === "single") return !!f.date && r.date === f.date;
  if (f.mode === "range") {
    if (!r.date) return false;
    if (f.from && r.date < f.from) return false;
    if (f.to && r.date > f.to) return false;
  }
  return true;
}

function dateFilterText() {
  var f = state.dateFilter;
  if (f.mode === "single" && f.date) return "tanggal " + formatDateID(f.date);
  if (f.mode === "range" && (f.from || f.to)) {
    if (f.from && f.to) return "tanggal " + formatDateID(f.from) + " sampai " + formatDateID(f.to);
    return f.from ? "tanggal mulai " + formatDateID(f.from) : "tanggal sampai " + formatDateID(f.to);
  }
  return "";
}

var lastDateOptsHtml = "";
function renderDateFilter() {
  var sel = document.getElementById("dateFilterSelect");
  if (!sel) return;
  var f = state.dateFilter;
  var counts = {};
  allPoints().forEach(function (p) {
    var r = repOf(p.id, state.round);
    if (r.date) counts[r.date] = (counts[r.date] || 0) + 1;
  });
  var dates = Object.keys(counts);
  if (f.mode === "single" && f.date && !counts[f.date]) dates.push(f.date);
  dates.sort();
  var value = f.mode === "single" ? "d:" + f.date : f.mode;
  var html = '<option value="all">Semua tanggal</option>' + dates.map(function (d) {
    return '<option value="d:' + esc(d) + '">' + esc(formatDateID(d)) + ' (' + (counts[d] || 0) + ' titik)</option>';
  }).join("") + '<option value="range">Rentang tanggal…</option>';
  if (html !== lastDateOptsHtml) { sel.innerHTML = html; lastDateOptsHtml = html; }
  sel.value = value;
  sel.classList.toggle("is-active", f.mode !== "all");
  var range = document.getElementById("dateRange");
  if (range) range.style.display = f.mode === "range" ? "flex" : "none";
  var from = document.getElementById("dateFrom"), to = document.getElementById("dateTo");
  if (from && document.activeElement !== from) from.value = f.from;
  if (to && document.activeElement !== to) to.value = f.to;
}

function updateMapStyles() {
  if (state.view === "lab") { labUpdateMap(); return; }
  var round = state.round;
  var q = (state.search || "").trim().toLowerCase();

  GRIDS.forEach(function (g) {
    var stats = gridStats(g, round);
    var tier = gridTierColor(stats.pct);
    var isSel = state.selectedGridId === g.id && !state.selectedId;
    var showFill = state.showGridFill || isSel;
    var layer = gridLayers[g.id];
    var baseOpacity = stats.hatch > 0 ? 0.42 : 0.26;
    if (gridEdit && gridEdit.id === g.id) {
      layer.setStyle({ color: "#FFD400", fillColor: "#FFD400", weight: 2.6, dashArray: null, fillOpacity: 0.12 });
      layer.setTooltipContent(esc(gridEdit.name || g.label));
      return;
    }
    layer.setStyle({
      color: tier.stroke,
      fillColor: tier.fill,
      weight: isSel ? 3 : 1.6,
      dashArray: g.temp ? "7 5" : null,
      fillOpacity: showFill ? (isSel ? 0.5 : baseOpacity) : 0
    });
    var needsPattern = (stats.pct > 0 && stats.pct < 1) || stats.hatch > 0;
    if (showFill && needsPattern && layer._path) {
      var patternRef = applyGridPattern(g, round);
      if (patternRef) layer._path.setAttribute("fill", patternRef);
    }
    var pctLabel = Math.round(stats.pct * 100) + "%";
    layer.setTooltipContent(esc(g.label) + '<span class="gl-pct">' + pctLabel + '</span>');
  });

  allPoints().forEach(function (p) {
    var r = repOf(p.id, round);
    var isSel = state.selectedId === p.id;
    var fill, stroke;
    if (r.issue) { fill = COLORS.issue; stroke = "#ffffff"; }
    else if (r.done) { fill = COLORS.done; stroke = "#ffffff"; }
    else { fill = "#16212B"; stroke = COLORS.pending; }
    var match = matchesFilter(r) && (!q || p.id.toLowerCase().indexOf(q) !== -1);
    var layer = markerLayers[p.id];
    if (!layer) return;
    layer.setStyle({
      radius: isSel ? 9 : 5.5,
      weight: isSel ? 3 : 2.1,
      color: stroke,
      fillColor: fill,
      fillOpacity: match ? 0.95 : 0.18,
      opacity: match ? 1 : 0.25
    });
    if (layer._path) {
      layer._path.classList.toggle("marker-pending-pulse", !r.done && !r.issue && match);
    }
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
    var line = L.polyline([[p.lat, p.lon], [r.actualLat, r.actualLon]], { color: ACTUAL_FILL, weight: 1.6, dashArray: "4,4", opacity: 0.85 });
    var actualMarker = L.marker([r.actualLat, r.actualLon], {
      icon: L.divIcon({ html: ACTUAL_PIN_SVG, className: "actual-pin", iconSize: [26, 34], iconAnchor: [13, 34] })
    });
    actualMarker.on("click", function (e) {
      if (state.pickMode) { onMapClick(e); return; }
      selectPoint(p.id);
    });
    actualMarker.bindTooltip(p.id + " (aktual)", { className: "point-label-tip", direction: "bottom", offset: [0, 6] });
    line.addTo(actualLayer);
    actualMarker.addTo(actualLayer);
  });
}

// Grid and point layers bubble their clicks up to the map; the first
// handler that deals with a click marks it so the map does not also open
// the coordinate popup on top of it.
function markMapClickHandled(e) {
  if (e && e.originalEvent) e.originalEvent._mapClickHandled = true;
}
function mapClickHandled(e) {
  return !!(e && e.originalEvent && e.originalEvent._mapClickHandled);
}

function onMapClick(e) {
  if (mapClickHandled(e)) return;
  markMapClickHandled(e);
  if (gridEdit) { gridEditMapClick(e.latlng); return; }
  if (!state.pickMode) { showCoordPopup(e.latlng); return; }
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

/* ---------------------------------------------------------------------
   Coordinates on the map: a readout in the corner follows the cursor
   (or shows the last tapped spot on touch screens), and clicking an
   empty spot opens a popup with that spot's coordinates in decimal
   degrees, degrees-minutes-seconds and UTM, the grid it falls in, the
   nearest sampling point, plus copy and Google Maps buttons. Grid and
   point popups also list the coordinates. All values are WGS 84.
--------------------------------------------------------------------- */
var coordReadoutEl = null, coordPinned = null, coordPopup = null, coordMark = null;
var NO_HOVER = !!(window.matchMedia && window.matchMedia("(hover: none)").matches);

function fmtLatLon(lat, lon) { return lat.toFixed(6) + ", " + lon.toFixed(6); }

function fmtDms(v, pos, neg) {
  var a = Math.abs(v), d = Math.floor(a), mf = (a - d) * 60, m = Math.floor(mf), sec = (mf - m) * 60;
  if (sec >= 59.95) { sec = 0; m++; }
  if (m >= 60) { m = 0; d++; }
  return d + "°" + ("0" + m).slice(-2) + "′" + (sec < 10 ? "0" : "") + sec.toFixed(1) + "″" + (v < 0 ? neg : pos);
}

// WGS 84 to UTM (Snyder's series), accurate to well under a metre within a zone.
function latLonToUtm(lat, lon) {
  var a = 6378137, f = 1 / 298.257223563, k0 = 0.9996;
  var zone = Math.floor((lon + 180) / 6) + 1;
  var lon0 = ((zone - 1) * 6 - 180 + 3) * Math.PI / 180;
  var e2 = f * (2 - f), ep2 = e2 / (1 - e2);
  var phi = lat * Math.PI / 180, lam = lon * Math.PI / 180;
  var sin = Math.sin(phi), cos = Math.cos(phi), tan = Math.tan(phi);
  var N = a / Math.sqrt(1 - e2 * sin * sin);
  var T = tan * tan, C = ep2 * cos * cos, A = cos * (lam - lon0);
  var e4 = e2 * e2, e6 = e4 * e2;
  var M = a * ((1 - e2 / 4 - 3 * e4 / 64 - 5 * e6 / 256) * phi - (3 * e2 / 8 + 3 * e4 / 32 + 45 * e6 / 1024) * Math.sin(2 * phi) +
    (15 * e4 / 256 + 45 * e6 / 1024) * Math.sin(4 * phi) - (35 * e6 / 3072) * Math.sin(6 * phi));
  var E = k0 * N * (A + (1 - T + C) * Math.pow(A, 3) / 6 + (5 - 18 * T + T * T + 72 * C - 58 * ep2) * Math.pow(A, 5) / 120) + 500000;
  var Nn = k0 * (M + N * tan * (A * A / 2 + (5 - T + 9 * C + 4 * C * C) * Math.pow(A, 4) / 24 + (61 - 58 * T + T * T + 600 * C - 330 * ep2) * Math.pow(A, 6) / 720));
  if (lat < 0) Nn += 10000000;
  return { zone: zone, hemi: lat < 0 ? "S" : "N", e: E, n: Nn };
}
function fmtUtm(lat, lon) {
  var u = latLonToUtm(lat, lon);
  return "UTM " + u.zone + u.hemi + " · E " + Math.round(u.e) + " · N " + Math.round(u.n);
}

function pointInRing(lat, lon, ring) {
  var inside = false;
  for (var i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    var yi = ring[i][0], xi = ring[i][1], yj = ring[j][0], xj = ring[j][1];
    if (((yi > lat) !== (yj > lat)) && (lon < (xj - xi) * (lat - yi) / (yj - yi) + xi)) inside = !inside;
  }
  return inside;
}
function gridAt(lat, lon) {
  for (var i = 0; i < GRIDS.length; i++) if (pointInRing(lat, lon, GRIDS[i].ring)) return GRIDS[i];
  return null;
}
function nearestPoint(lat, lon) {
  var best = null, bestD = Infinity;
  allPoints().forEach(function (p) {
    var dd = distanceMeters(lat, lon, p.lat, p.lon);
    if (dd < bestD) { bestD = dd; best = p; }
  });
  return best ? { p: best, d: bestD } : null;
}

function coordActionsHtml(lat, lon) {
  var dd = fmtLatLon(lat, lon);
  return '<div class="coord-actions">' +
    '<button type="button" class="coord-btn" data-action="copy-coord" data-text="' + esc(dd) + '">Salin koordinat</button>' +
    '<a class="coord-btn" href="https://www.google.com/maps?q=' + lat.toFixed(6) + ',' + lon.toFixed(6) + '" target="_blank" rel="noopener">Google Maps</a></div>';
}

// Short block appended to grid popups.
function coordShortHtml(lat, lon) {
  return '<div class="coord-short"><div class="coord-k">Koordinat titik yang diklik</div>' +
    '<div class="coord-v">' + esc(fmtLatLon(lat, lon)) + '</div>' +
    '<div class="coord-sub">' + esc(fmtUtm(lat, lon)) + '</div>' + coordActionsHtml(lat, lon) + '</div>';
}

function coordPopupHtml(lat, lon) {
  var g = gridAt(lat, lon), near = nearestPoint(lat, lon);
  var rows = [
    ["Lintang, bujur", fmtLatLon(lat, lon)],
    ["DMS", fmtDms(lat, "N", "S") + " " + fmtDms(lon, "E", "W")],
    ["UTM", fmtUtm(lat, lon).replace(/^UTM /, "")],
    ["Area", g ? g.label : "Di luar area grid"]
  ];
  if (near) rows.push(["Titik terdekat", near.p.id + " · " + (near.d < 10 ? near.d.toFixed(1).replace(".", ",") : Math.round(near.d)) + " m"]);
  return '<div class="gp-title">Koordinat titik</div>' +
    '<table class="coord-table">' + rows.map(function (r) { return '<tr><td>' + esc(r[0]) + '</td><td>' + esc(r[1]) + '</td></tr>'; }).join("") + '</table>' +
    coordActionsHtml(lat, lon) +
    '<div class="coord-note">WGS 84. Klik tempat lain di peta untuk koordinat lain.</div>';
}

function showCoordPopup(latlng) {
  if (!map) return;
  if (!coordPopup) {
    coordPopup = L.popup({ className: "grid-info-popup coord-popup", maxWidth: 300, autoPanPadding: [20, 20] });
    coordPopup.on("remove", function () { if (coordMark) { map.removeLayer(coordMark); coordMark = null; } });
  }
  if (coordMark) map.removeLayer(coordMark);
  coordMark = L.circleMarker(latlng, { radius: 6, color: "#FFFFFF", weight: 2, fillColor: "#E6007E", fillOpacity: 1, interactive: false }).addTo(map);
  coordPopup.setLatLng(latlng).setContent(coordPopupHtml(latlng.lat, latlng.lng)).openOn(map);
  showCoordReadout(latlng, true);
}

var CoordReadout = L.Control.extend({
  options: { position: "bottomleft" },
  onAdd: function () {
    var el = L.DomUtil.create("div", "coord-readout");
    L.DomEvent.disableClickPropagation(el);
    coordReadoutEl = el;
    showCoordReadout(null);
    return el;
  }
});

function initCoordReadout() {
  map.addControl(new CoordReadout());
  map.on("mousemove", function (e) { showCoordReadout(e.latlng, false); });
  // Leaflet's mouseout also fires when leaving a marker or popup, so watch the container itself.
  map.getContainer().addEventListener("mouseleave", function () { showCoordReadout(coordPinned, true); });
}

// pinned: a clicked/tapped spot, kept when the cursor leaves the map.
function showCoordReadout(latlng, pinned) {
  if (pinned && latlng) coordPinned = latlng;
  var el = coordReadoutEl;
  if (!el) return;
  if (!latlng) {
    el.className = "coord-readout coord-readout-empty";
    el.innerHTML = NO_HOVER ? "Ketuk peta untuk melihat koordinat" : "Arahkan kursor ke peta untuk melihat koordinat";
    return;
  }
  el.className = "coord-readout";
  el.innerHTML = '<span class="cr-k">' + (pinned ? "Titik diklik" : "Kursor") + '</span>' +
    '<span class="cr-v">' + esc(fmtLatLon(latlng.lat, latlng.lng)) + '</span>' +
    '<span class="cr-sub">' + esc(fmtUtm(latlng.lat, latlng.lng)) + '</span>';
}

function copyText(text) {
  function fallback() {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (e) {}
    document.body.removeChild(ta);
    return ok;
  }
  var p = navigator.clipboard && window.isSecureContext ? navigator.clipboard.writeText(text).then(function () { return true; }, fallback) : Promise.resolve(fallback());
  p.then(function (ok) {
    showToast(ok ? "success" : "warn", ok ? "Koordinat disalin: " + text : "Tidak dapat menyalin otomatis. Koordinat: " + text);
  });
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

  var point = { id: code, gridId: draft.gridId || null, type: draft.type || "air", lat: draft.lat, lon: draft.lon, custom: true, createdAt: Date.now(), updatedAt: Date.now() };
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

  var blobPromise = new Promise(function (resolve) {
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
      canvas.toBlob(function (blob) { resolve(blob); }, "image/jpeg", PHOTO_QUALITY);
    };
    img.onerror = function () { URL.revokeObjectURL(objectUrl); resolve(null); };
    img.src = objectUrl;
  });

  var gpsPromise = file.arrayBuffer
    ? file.arrayBuffer().then(function (buf) { return extractExifGPS(buf); }).catch(function () { return null; })
    : Promise.resolve(null);

  Promise.all([blobPromise, gpsPromise]).then(function (results) {
    var blob = results[0], gps = results[1];
    if (blob) appendPhoto(pointId, round, blob, gps);
  });
}

function handlePhotoGPS(pointId, round, gps) {
  var r = repOf(pointId, round);
  if (r.actualLat == null || r.actualLon == null) {
    updateReport(pointId, round, { actualLat: gps.lat, actualLon: gps.lon });
    showToast("success", "Lokasi GPS pada foto ditemukan dan dipakai sebagai lokasi sampling aktual.");
  } else {
    showToast("info", "Foto memiliki data lokasi GPS. Lokasi aktual titik ini sudah terisi, gunakan tombol Deteksi dari Foto bila ingin memperbaruinya.");
  }
}

function appendPhoto(pointId, round, blob, gps) {
  var photoId = "ph" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  dbPutPhoto(photoId, blob).then(function () {
    var existing = state.reports[pointId] ? Object.assign({}, state.reports[pointId]) : {};
    var current = existing[round] ? Object.assign({}, existing[round]) : defaultRound();
    var photos = current.photos ? current.photos.slice() : [];
    var photoRecord = { id: photoId, addedAt: Date.now() };
    if (gps) { photoRecord.gpsLat = gps.lat; photoRecord.gpsLon = gps.lon; }
    photos.push(photoRecord);
    existing[round] = Object.assign({}, current, { photos: photos, savedAt: Date.now() });
    state.reports[pointId] = existing;
    persist();
    if (state.selectedId === pointId) render();
    if (gps) handlePhotoGPS(pointId, round, gps);
  }).catch(function () {
    showToast("warn", "Gagal menyimpan foto ke penyimpanan perangkat.");
  });
}

function detectLocationFromPhotos(pointId, round) {
  var r = repOf(pointId, round);
  var photos = r.photos || [];
  var withGps = null;
  for (var i = photos.length - 1; i >= 0; i--) {
    if (typeof photos[i].gpsLat === "number" && typeof photos[i].gpsLon === "number") {
      withGps = photos[i];
      break;
    }
  }
  if (!withGps) {
    showToast("warn", "Tidak ada foto dengan data lokasi GPS pada titik ini.");
    return;
  }
  updateReport(pointId, round, { actualLat: withGps.gpsLat, actualLon: withGps.gpsLon });
  showToast("success", "Lokasi aktual dipakai ulang dari data GPS foto.");
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
    ensurePhotoUrl(id).then(function (url) { if (url) img.src = url; else markPhotoMissing(img); });
  });
}

function markPhotoMissing(img) {
  img.classList.add("photo-missing");
  img.title = "Foto tidak tersedia di perangkat ini (data diimpor tanpa foto)";
  img.alt = "Foto tidak tersedia";
}

function openLightbox(photoId) {
  state.lightbox = photoId;
  renderLightbox();
}

/* ---------------------------------------------------------------------
   JSON export. GitHub's browser upload rejects files over 25 MB, so the
   default "ringkas" mode re-encodes photos and, when the result would
   still be too big, keeps lowering their resolution until one file
   fits. "Dipecah" keeps the ringkas quality and instead spreads photos
   over extra -foto-N files (each under the limit) next to a data file
   that lists them, so import and repo sync can fetch only what a device
   is missing. Photo entries are always kept (id, time, GPS) so a device
   that already holds the photo keeps it.
--------------------------------------------------------------------- */
var EXPORT_MODE_KEY = "oilspill_export_mode";
var COMPACT_PHOTO_DIM = 1024;
var COMPACT_PHOTO_QUALITY = 0.55;
var MIN_AUTO_PHOTO_DIM = 320;
var GITHUB_UPLOAD_LIMIT = 25 * 1024 * 1024;
var EXPORT_TARGET_BYTES = 24 * 1024 * 1024;
var SPLIT_PART_BYTES = 23 * 1024 * 1024;
var EXPORT_MODES = ["compact", "split", "full", "none"];
var PHOTO_PART_RE = /-foto-\d+\.json$/i;

function allPhotoRefs() {
  var refs = [];
  Object.keys(state.reports).forEach(function (pid) {
    ["before", "after"].forEach(function (round) {
      var r = state.reports[pid] && state.reports[pid][round];
      if (r && r.photos) r.photos.forEach(function (ph) { refs.push(ph.id); });
    });
  });
  return refs;
}

function fmtBytes(n) {
  if (n >= 1024 * 1024) return (n / 1024 / 1024).toLocaleString("id-ID", { maximumFractionDigits: 1 }) + " MB";
  return Math.max(1, Math.round(n / 1024)).toLocaleString("id-ID") + " KB";
}

function exportBasePayload() {
  return {
    schema: "oilspill-sampling-v2",
    exportedAt: new Date().toISOString(),
    totalPoints: allPoints().length,
    totalGrids: GRIDS.length,
    customGrids: state.customGrids,
    reports: {},
    gridNotes: state.gridNotes,
    customPoints: state.customPoints,
    labSamples: labExportForJson(),
    labConfig: state.labCfg
  };
}

function openExportDialog() {
  var mode = "compact";
  try { mode = localStorage.getItem(EXPORT_MODE_KEY) || "compact"; } catch (e) {}
  if (EXPORT_MODES.indexOf(mode) === -1) mode = "compact";
  state.exportDlg = { mode: mode, stats: null, busy: false, progress: "" };
  renderExportDialog();
  var refs = allPhotoRefs();
  var stats = { count: 0, bytes: 0, compactBytes: 0, missing: 0, base: JSON.stringify(exportBasePayload()).length + JSON.stringify(state.reports).length };
  var chain = Promise.resolve();
  refs.forEach(function (id) {
    chain = chain.then(function () {
      return dbGetPhoto(id).then(function (blob) {
        if (!blob) { stats.missing++; return; }
        stats.count++;
        stats.bytes += blob.size;
        stats.compactBytes += Math.min(blob.size, 120 * 1024);
      }).catch(function () { stats.missing++; });
    });
  });
  chain.then(function () {
    if (!state.exportDlg) return;
    state.exportDlg.stats = stats;
    renderExportDialog();
  });
}

function closeExportDialog() {
  state.exportDlg = null;
  renderExportDialog();
}

function exportEstimate(mode, st) {
  if (!st) return null;
  if (mode === "none") return st.base;
  var est = st.base + Math.round((mode === "full" ? st.bytes : st.compactBytes) * 1.34);
  return mode === "compact" ? Math.min(est, EXPORT_TARGET_BYTES) : est;
}

function splitPartCount(st) {
  return st ? Math.ceil(Math.round(st.compactBytes * 1.34) / SPLIT_PART_BYTES) : 0;
}

function renderExportDialog() {
  var root = document.getElementById("exportRoot");
  if (!root) return;
  var d = state.exportDlg;
  if (!d) { root.innerHTML = ""; return; }
  var st = d.stats;
  var labCount = labAllLive().length;
  function opt(mode, title, desc, sizeText) {
    var est = exportEstimate(mode, st);
    return '<label class="expopt' + (d.mode === mode ? ' active' : '') + '">' +
      '<input type="radio" name="exportmode" value="' + mode + '" data-field="export-mode"' + (d.mode === mode ? ' checked' : '') + (d.busy ? ' disabled' : '') + '/>' +
      '<span class="expopt-body"><span class="expopt-title">' + title + '</span><span class="expopt-desc">' + desc + '</span></span>' +
      '<span class="expopt-size">' + (est == null ? '…' : sizeText || '± ' + fmtBytes(est)) + '</span></label>';
  }
  var fullCompact = st ? st.base + Math.round(st.compactBytes * 1.34) : 0;
  var willShrink = st && fullCompact > EXPORT_TARGET_BYTES;
  var parts = splitPartCount(st);
  var est = exportEstimate(d.mode, st);
  var tooBig = (d.mode === "full" || d.mode === "none") && est != null && est > GITHUB_UPLOAD_LIMIT;
  root.innerHTML = '<div class="modal-backdrop" data-action="export-backdrop">' +
    '<div class="modal" role="dialog" aria-modal="true" aria-labelledby="exportTitle">' +
    '<div class="modal-head"><h3 id="exportTitle">Ekspor Data JSON</h3>' +
    '<button type="button" class="iconbtn" data-action="export-close" aria-label="Tutup"' + (d.busy ? ' disabled' : '') + '>' + ICONS.close + '</button></div>' +
    '<div class="modal-body">' +
    '<p class="formhint">Berisi seluruh data aplikasi: progres sampling Before dan After Recovery, catatan, lokasi aktual, titik tambahan, serta ' + labCount + ' hasil uji lab. Berkas ini bisa diimpor di perangkat lain atau diunggah ke repositori GitHub untuk dibagikan ke tim. Batas unggah lewat browser di GitHub adalah 25 MB per berkas.</p>' +
    '<div class="expopts">' +
    opt("compact", "Satu berkas, otomatis di bawah 25 MB (disarankan)",
      "Foto diperkecil maksimal " + COMPACT_PHOTO_DIM + " px. Bila totalnya masih di atas 25 MB, resolusi foto diturunkan otomatis (paling kecil " + MIN_AUTO_PHOTO_DIM + " px) sampai berkas muat." +
      (willShrink ? ' <b>Foto Anda saat ini perlu diperkecil lagi agar muat.</b>' : ''),
      st ? '≤ ' + fmtBytes(est) : null) +
    opt("split", "Dipecah jadi beberapa berkas, foto tetap " + COMPACT_PHOTO_DIM + " px",
      "Satu berkas data ditambah berkas foto (-foto-1, -foto-2, …), masing-masing di bawah 25 MB. Unggah semuanya sekaligus ke GitHub; aplikasi hanya mengunduh bagian foto yang belum ada di perangkat.",
      st ? '± ' + fmtBytes(exportEstimate("split", st)) + (parts ? ' · ' + (parts + 1) + ' berkas' : '') : null) +
    opt("full", "Dengan foto, kualitas asli", "Foto seperti yang tersimpan di perangkat. Berkas paling besar; untuk cadangan pribadi, bukan untuk diunggah ke GitHub.") +
    opt("none", "Tanpa foto (paling ringan)", "Hanya data. Foto tetap aman di perangkat ini; di perangkat lain foto ditandai tidak tersedia.") +
    '</div>' +
    '<p class="expstats">' + (st ? (st.count ? st.count + ' foto tersimpan di perangkat ini (' + fmtBytes(st.bytes) + ')' : 'Belum ada foto tersimpan di perangkat ini') + (st.missing ? ', ' + st.missing + ' foto tidak tersedia di perangkat ini' : '') + '. Ukuran berkas adalah perkiraan.' : 'Menghitung ukuran foto…') + '</p>' +
    (tooBig ? '<p class="formerror">Perkiraan ukuran melebihi 25 MB, batas unggah berkas lewat browser di GitHub. Pilih Satu berkas otomatis atau Dipecah bila berkas akan diunggah ke GitHub.</p>' : '') +
    (d.progress ? '<p class="expprogress">' + esc(d.progress) + '</p>' : '') +
    '</div>' +
    '<div class="modal-foot"><span></span><div class="modal-foot-right">' +
    '<button type="button" class="btn" data-action="export-close"' + (d.busy ? ' disabled' : '') + '>Batal</button>' +
    '<button type="button" class="btn btn-primary" data-action="export-download"' + (d.busy ? ' disabled' : '') + '>' + ICONS.download + ' ' + (d.busy ? 'Menyiapkan…' : 'Unduh JSON') + '</button>' +
    '</div></div></div></div>';
}

function compressPhotoBlob(blob, dim, quality) {
  dim = dim || COMPACT_PHOTO_DIM;
  quality = quality || COMPACT_PHOTO_QUALITY;
  return new Promise(function (resolve) {
    var url = URL.createObjectURL(blob);
    var img = new Image();
    img.onload = function () {
      var w = img.naturalWidth, h = img.naturalHeight;
      var sc = Math.min(1, dim / Math.max(w, h));
      var canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(w * sc));
      canvas.height = Math.max(1, Math.round(h * sc));
      canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      canvas.toBlob(function (out) { resolve(out && out.size < blob.size ? out : blob); }, "image/jpeg", quality);
    };
    img.onerror = function () { URL.revokeObjectURL(url); resolve(blob); };
    img.src = url;
  });
}

function setExportProgress(msg) {
  if (!state.exportDlg) return;
  state.exportDlg.progress = msg;
  renderExportDialog();
}

function downloadBlob(blob, name) {
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
}

// Encodes every photo task at one resolution; dim null keeps the stored file.
function encodeExportPhotos(tasks, dim, quality, label) {
  var total = 0;
  var chain = Promise.resolve();
  tasks.forEach(function (t, i) {
    chain = chain.then(function () {
      setExportProgress("Memproses foto " + (i + 1) + " dari " + tasks.length + (label ? " (" + label + ")" : "") + "…");
      return dbGetPhoto(t.id).then(function (blob) {
        t.data = null;
        if (!blob) return;
        return (dim ? compressPhotoBlob(blob, dim, quality) : Promise.resolve(blob)).then(blobToBase64).then(function (b64) {
          t.data = b64;
          total += b64.length + t.id.length + 16;
        });
      });
    });
  });
  return chain.then(function () { return total; });
}

// Lowers photo resolution until base + photos fits under the GitHub limit.
function encodeToFit(tasks, baseBytes) {
  var dim = COMPACT_PHOTO_DIM, quality = COMPACT_PHOTO_QUALITY, pass = 0;
  function attempt() {
    pass++;
    return encodeExportPhotos(tasks, dim, quality, pass > 1 ? dim + " px" : "").then(function (photoBytes) {
      if (baseBytes + photoBytes <= EXPORT_TARGET_BYTES || dim <= MIN_AUTO_PHOTO_DIM || pass >= 5) return dim;
      // JPEG size grows roughly with pixel count, so scale the edge by the square root of the overshoot.
      var ratio = Math.max(0.05, (EXPORT_TARGET_BYTES - baseBytes) / photoBytes);
      dim = Math.max(MIN_AUTO_PHOTO_DIM, Math.floor(dim * Math.min(0.9, Math.sqrt(ratio) * 0.95)));
      quality = Math.max(0.42, quality - 0.04);
      setExportProgress("Berkas masih ± " + fmtBytes(baseBytes + photoBytes) + ", memperkecil foto ke " + dim + " px…");
      return attempt();
    });
  }
  return attempt();
}

function exportJson(mode) {
  mode = EXPORT_MODES.indexOf(mode) === -1 ? "compact" : mode;
  var d = state.exportDlg;
  if (d) { d.busy = true; d.progress = "Menyiapkan berkas…"; renderExportDialog(); }
  var payload = exportBasePayload();
  payload.photoMode = mode;
  var tasks = [];

  Object.keys(state.reports).forEach(function (pid) {
    var r = state.reports[pid];
    var copy = {};
    ["before", "after"].forEach(function (round) {
      if (!r[round]) return;
      var roundCopy = Object.assign({}, r[round]);
      roundCopy.photos = (roundCopy.photos || []).map(function (ph) {
        var entry = { id: ph.id, addedAt: ph.addedAt };
        if (typeof ph.gpsLat === "number" && typeof ph.gpsLon === "number") {
          entry.gpsLat = ph.gpsLat; entry.gpsLon = ph.gpsLon;
        }
        if (mode !== "none") tasks.push({ id: ph.id, entry: entry, data: null });
        return entry;
      });
      copy[round] = roundCopy;
    });
    payload.reports[pid] = copy;
  });

  var baseName = "sampling-oilspill-" + new Date().toISOString().slice(0, 10);
  var baseBytes = JSON.stringify(payload).length + 64 * tasks.length;
  var work;
  if (mode === "none" || !tasks.length) work = Promise.resolve(null);
  else if (mode === "full") work = encodeExportPhotos(tasks, null);
  else if (mode === "split") work = encodeExportPhotos(tasks, COMPACT_PHOTO_DIM, COMPACT_PHOTO_QUALITY);
  else work = encodeToFit(tasks, baseBytes);

  work.then(function (result) {
    var withData = tasks.filter(function (t) { return t.data; });
    var files = [];
    if (mode === "split" && withData.length) {
      var parts = [], cur = null;
      withData.forEach(function (t) {
        var size = t.data.length + t.id.length + 16;
        if (!cur || (cur.size + size > SPLIT_PART_BYTES && cur.photos.length)) { cur = { photos: [], size: 200 }; parts.push(cur); }
        cur.photos.push({ id: t.id, data: t.data });
        cur.size += size;
      });
      payload.photoParts = parts.map(function (p, i) {
        return { file: baseName + "-foto-" + (i + 1) + ".json", ids: p.photos.map(function (ph) { return ph.id; }) };
      });
      files.push({ name: baseName + ".json", blob: new Blob([JSON.stringify(payload)], { type: "application/json" }) });
      parts.forEach(function (p, i) {
        var pack = { schema: "oilspill-photos-v1", exportedAt: payload.exportedAt, mainFile: baseName + ".json", part: i + 1, parts: parts.length, photos: p.photos };
        files.push({ name: payload.photoParts[i].file, blob: new Blob([JSON.stringify(pack)], { type: "application/json" }) });
      });
    } else {
      withData.forEach(function (t) { t.entry.data = t.data; });
      if (mode === "compact" && typeof result === "number") payload.photoMaxDim = result;
      files.push({ name: baseName + ".json", blob: new Blob([JSON.stringify(payload)], { type: "application/json" }) });
    }

    // Browsers may ask once to allow several downloads; space them out so none is dropped.
    files.forEach(function (f, i) { setTimeout(function () { downloadBlob(f.blob, f.name); }, i * 700); });
    state.exportDlg = null;
    renderExportDialog();

    var biggest = files.reduce(function (m, f) { return Math.max(m, f.blob.size); }, 0);
    var totalSize = files.reduce(function (s, f) { return s + f.blob.size; }, 0);
    var photoTxt = mode === "none" ? "tanpa foto" : withData.length + " foto";
    if (mode === "compact" && typeof result === "number" && result < COMPACT_PHOTO_DIM) photoTxt += " diperkecil ke " + result + " px";
    if (biggest > GITHUB_UPLOAD_LIMIT) {
      showToast("warn", "Berkas JSON terunduh (" + fmtBytes(biggest) + ", " + photoTxt + "), tetapi melebihi batas unggah GitHub 25 MB. Ekspor ulang dengan pilihan Dipecah jadi beberapa berkas.");
    } else if (files.length > 1) {
      showToast("success", files.length + " berkas JSON terunduh (total " + fmtBytes(totalSize) + ", " + photoTxt + "). Unggah semuanya sekaligus ke GitHub tanpa mengubah namanya.");
    } else {
      showToast("success", "Berkas JSON terunduh: " + fmtBytes(totalSize) + " (" + photoTxt + ").");
    }
  }).catch(function () {
    if (state.exportDlg) { state.exportDlg.busy = false; state.exportDlg.progress = ""; renderExportDialog(); }
    showToast("warn", "Gagal menyiapkan berkas ekspor.");
  });
}

/* ---------------------------------------------------------------------
   Minimal XLSX writer: builds a valid .xlsx (a ZIP of a small OOXML
   package) from scratch in the browser, with no external library and
   no compression (the ZIP "stored" method, which is fully spec-legal
   and keeps this dependency-free like the rest of the app).
--------------------------------------------------------------------- */
var CRC32_TABLE = (function () {
  var t = [];
  for (var n = 0; n < 256; n++) {
    var c = n;
    for (var k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    t[n] = c >>> 0;
  }
  return t;
})();
function crc32(bytes) {
  var crc = 0 ^ -1;
  for (var i = 0; i < bytes.length; i++) crc = (crc >>> 8) ^ CRC32_TABLE[(crc ^ bytes[i]) & 0xFF];
  return (crc ^ -1) >>> 0;
}

function buildZip(files) {
  var localParts = [], centralParts = [];
  var offset = 0;
  var encoder = new TextEncoder();
  files.forEach(function (f) {
    var nameBytes = encoder.encode(f.name);
    var data = f.data;
    var crc = crc32(data);

    var lh = new Uint8Array(30 + nameBytes.length);
    var ldv = new DataView(lh.buffer);
    ldv.setUint32(0, 0x04034b50, true);
    ldv.setUint16(4, 20, true);
    ldv.setUint16(6, 0, true);
    ldv.setUint16(8, 0, true);
    ldv.setUint16(10, 0, true);
    ldv.setUint16(12, 0, true);
    ldv.setUint32(14, crc, true);
    ldv.setUint32(18, data.length, true);
    ldv.setUint32(22, data.length, true);
    ldv.setUint16(26, nameBytes.length, true);
    ldv.setUint16(28, 0, true);
    lh.set(nameBytes, 30);
    localParts.push(lh, data);

    var ch = new Uint8Array(46 + nameBytes.length);
    var cdv = new DataView(ch.buffer);
    cdv.setUint32(0, 0x02014b50, true);
    cdv.setUint16(4, 20, true);
    cdv.setUint16(6, 20, true);
    cdv.setUint16(8, 0, true);
    cdv.setUint16(10, 0, true);
    cdv.setUint16(12, 0, true);
    cdv.setUint16(14, 0, true);
    cdv.setUint32(16, crc, true);
    cdv.setUint32(20, data.length, true);
    cdv.setUint32(24, data.length, true);
    cdv.setUint16(28, nameBytes.length, true);
    cdv.setUint16(30, 0, true);
    cdv.setUint16(32, 0, true);
    cdv.setUint16(34, 0, true);
    cdv.setUint16(36, 0, true);
    cdv.setUint32(38, 0, true);
    cdv.setUint32(42, offset, true);
    ch.set(nameBytes, 46);
    centralParts.push(ch);

    offset += lh.length + data.length;
  });

  var centralStart = offset;
  var centralSize = centralParts.reduce(function (s, p) { return s + p.length; }, 0);

  var eocd = new Uint8Array(22);
  var edv = new DataView(eocd.buffer);
  edv.setUint32(0, 0x06054b50, true);
  edv.setUint16(8, files.length, true);
  edv.setUint16(10, files.length, true);
  edv.setUint32(12, centralSize, true);
  edv.setUint32(16, centralStart, true);

  return new Blob(localParts.concat(centralParts).concat([eocd]), { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
}

function xlsxColLetter(i) {
  var s = "";
  i++;
  while (i > 0) {
    var m = (i - 1) % 26;
    s = String.fromCharCode(65 + m) + s;
    i = Math.floor((i - 1) / 26);
  }
  return s;
}
function xlsxEscXml(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
function xlsxWorksheetXml(rows) {
  var xml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>';
  rows.forEach(function (row, ri) {
    xml += '<row r="' + (ri + 1) + '">';
    row.forEach(function (cell, ci) {
      var ref = xlsxColLetter(ci) + (ri + 1);
      var style = ri === 0 ? ' s="1"' : "";
      xml += '<c r="' + ref + '" t="inlineStr"' + style + '><is><t xml:space="preserve">' + xlsxEscXml(cell == null ? "" : cell) + '</t></is></c>';
    });
    xml += '</row>';
  });
  xml += '</sheetData></worksheet>';
  return xml;
}

function buildXlsxBlob(sheetName, rows) {
  var encoder = new TextEncoder();
  var contentTypes = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' +
    '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>' +
    '<Default Extension="xml" ContentType="application/xml"/>' +
    '<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>' +
    '<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>' +
    '<Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>' +
    '</Types>';
  var rootRels = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
    '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>' +
    '</Relationships>';
  var workbookXml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">' +
    '<sheets><sheet name="' + xlsxEscXml(sheetName) + '" sheetId="1" r:id="rId1"/></sheets></workbook>';
  var workbookRels = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
    '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>' +
    '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>' +
    '</Relationships>';
  var stylesXml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">' +
    '<fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><sz val="11"/><name val="Calibri"/><b/></font></fonts>' +
    '<fills count="1"><fill><patternFill patternType="none"/></fill></fills>' +
    '<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>' +
    '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>' +
    '<cellXfs count="2"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="1" fillId="0" borderId="0" xfId="0" applyFont="1"/></cellXfs>' +
    '</styleSheet>';

  var files = [
    { name: "[Content_Types].xml", data: encoder.encode(contentTypes) },
    { name: "_rels/.rels", data: encoder.encode(rootRels) },
    { name: "xl/workbook.xml", data: encoder.encode(workbookXml) },
    { name: "xl/_rels/workbook.xml.rels", data: encoder.encode(workbookRels) },
    { name: "xl/styles.xml", data: encoder.encode(stylesXml) },
    { name: "xl/worksheets/sheet1.xml", data: encoder.encode(xlsxWorksheetXml(rows)) }
  ];
  return buildZip(files);
}

function exportPointsExcel() {
  var round = state.round;
  var q = (state.search || "").trim().toLowerCase();
  var pts = allPoints().filter(function (p) {
    var r = repOf(p.id, round);
    return matchesFilter(r) && (!q || p.id.toLowerCase().indexOf(q) !== -1);
  });
  pts = pts.slice().sort(function (a, b) {
    var ta = TYPE_ORDER.indexOf(pointType(a)), tb = TYPE_ORDER.indexOf(pointType(b));
    if (ta !== tb) return ta - tb;
    var ga = (GRID_BY_ID[a.gridId] && GRID_BY_ID[a.gridId].label) || "Tanpa Grid";
    var gb = (GRID_BY_ID[b.gridId] && GRID_BY_ID[b.gridId].label) || "Tanpa Grid";
    if (ga !== gb) return naturalCompare(ga, gb);
    return naturalCompare(a.id, b.id);
  });

  var header = ["Kode Titik", "Jenis", "Grid", "Status Before", "Tanggal Before", "Status After", "Tanggal After", "Kendala", "Jumlah Foto"];
  var rows = [header];
  pts.forEach(function (p) {
    var g = GRID_BY_ID[p.gridId];
    var rb = repOf(p.id, "before"), ra = repOf(p.id, "after");
    var ptype = SAMPLE_TYPES[pointType(p)];
    var hasKendala = rb.issue || ra.issue || (rb.notes && rb.notes.trim()) || (ra.notes && ra.notes.trim());
    rows.push([
      p.id,
      ptype.label,
      g ? g.label : "Tanpa Grid",
      rb.issue ? "Bermasalah" : (rb.done ? "Selesai" : "Belum"),
      rb.date ? formatDateID(rb.date) : "",
      ra.issue ? "Bermasalah" : (ra.done ? "Selesai" : "Belum"),
      ra.date ? formatDateID(ra.date) : "",
      hasKendala ? "Ya" : "Tidak",
      String((rb.photos ? rb.photos.length : 0) + (ra.photos ? ra.photos.length : 0))
    ]);
  });

  if (pts.length === 0) {
    showToast("warn", "Tidak ada titik yang cocok dengan pencarian atau filter aktif untuk diekspor.");
    return;
  }

  var blob = buildXlsxBlob("Rekap Titik", rows);
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url;
  a.download = "rekap-titik-oilspill-" + new Date().toISOString().slice(0, 10) + ".xlsx";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
  showToast("success", "Rekap data berhasil diekspor ke berkas Excel (" + pts.length + " titik).");
}

/* ---------------------------------------------------------------------
   Minimal QR code encoder (ISO/IEC 18004), byte mode only, automatic
   version selection within versions 1-10 at error-correction level M.
   Used to print a scannable link to this app on the exported PDF map,
   without depending on any external library or network request.
--------------------------------------------------------------------- */
var qrEncodeMatrix = (function () {
  var BLOCK_INFO_M = {
    1: [10, 1, 16, 0, 0], 2: [16, 1, 28, 0, 0], 3: [26, 1, 44, 0, 0],
    4: [18, 2, 32, 0, 0], 5: [24, 2, 43, 0, 0], 6: [16, 4, 27, 0, 0],
    7: [18, 4, 31, 0, 0], 8: [22, 2, 38, 2, 39], 9: [22, 3, 36, 2, 37],
    10: [26, 4, 43, 1, 44]
  };
  var ALIGNMENT = {
    1: [], 2: [6, 18], 3: [6, 22], 4: [6, 26], 5: [6, 30], 6: [6, 34],
    7: [6, 22, 38], 8: [6, 24, 42], 9: [6, 26, 46], 10: [6, 28, 50]
  };

  function dataCodewordsFor(v) {
    var b = BLOCK_INFO_M[v];
    return b[1] * b[2] + b[3] * b[4];
  }

  var GF_EXP = new Array(512);
  var GF_LOG = new Array(256);
  (function () {
    var x = 1;
    for (var i = 0; i < 255; i++) {
      GF_EXP[i] = x;
      GF_LOG[x] = i;
      x = x << 1;
      if (x & 0x100) x ^= 0x11d;
    }
    for (var j = 255; j < 512; j++) GF_EXP[j] = GF_EXP[j - 255];
  })();
  function gfMul(a, b) {
    if (a === 0 || b === 0) return 0;
    return GF_EXP[GF_LOG[a] + GF_LOG[b]];
  }
  function rsGeneratorPoly(degree) {
    var poly = [1];
    for (var i = 0; i < degree; i++) {
      var next = new Array(poly.length + 1).fill(0);
      for (var j = 0; j < poly.length; j++) {
        next[j] ^= poly[j];
        next[j + 1] ^= gfMul(poly[j], GF_EXP[i]);
      }
      poly = next;
    }
    return poly;
  }
  function rsEncode(dataBytes, ecLen) {
    var gen = rsGeneratorPoly(ecLen);
    var res = dataBytes.concat(new Array(ecLen).fill(0));
    for (var i = 0; i < dataBytes.length; i++) {
      var coef = res[i];
      if (coef === 0) continue;
      for (var j = 0; j < gen.length; j++) res[i + j] ^= gfMul(gen[j], coef);
    }
    return res.slice(dataBytes.length);
  }

  function BitBuf() { this.bits = []; }
  BitBuf.prototype.push = function (val, len) {
    for (var i = len - 1; i >= 0; i--) this.bits.push((val >>> i) & 1);
  };

  function pickVersion(text) {
    var byteLen = unescape(encodeURIComponent(text)).length;
    var neededBits = 4 + 8 + byteLen * 8;
    for (var v = 1; v <= 10; v++) {
      if (neededBits <= dataCodewordsFor(v) * 8) return v;
    }
    throw new Error("QR text too long");
  }

  function buildCodewords(text, version) {
    var utf8 = unescape(encodeURIComponent(text));
    var bytes = [];
    for (var i = 0; i < utf8.length; i++) bytes.push(utf8.charCodeAt(i) & 0xff);

    var bb = new BitBuf();
    bb.push(0x4, 4);
    bb.push(bytes.length, 8);
    for (var k = 0; k < bytes.length; k++) bb.push(bytes[k], 8);

    var totalDataBits = dataCodewordsFor(version) * 8;
    var termLen = Math.min(4, totalDataBits - bb.bits.length);
    if (termLen > 0) bb.push(0, termLen);
    while (bb.bits.length % 8 !== 0) bb.bits.push(0);

    var padBytes = [0xec, 0x11], pi = 0;
    while (bb.bits.length < totalDataBits) { bb.push(padBytes[pi % 2], 8); pi++; }

    var dataCw = [];
    for (var b = 0; b < bb.bits.length; b += 8) {
      var v = 0;
      for (var bi = 0; bi < 8; bi++) v = (v << 1) | bb.bits[b + bi];
      dataCw.push(v);
    }
    return dataCw;
  }

  function interleave(dataCw, version) {
    var info = BLOCK_INFO_M[version];
    var ecLen = info[0], g1n = info[1], g1len = info[2], g2n = info[3], g2len = info[4];
    var blocks = [], idx = 0;
    for (var i = 0; i < g1n; i++) { blocks.push(dataCw.slice(idx, idx + g1len)); idx += g1len; }
    for (var j = 0; j < g2n; j++) { blocks.push(dataCw.slice(idx, idx + g2len)); idx += g2len; }
    var ecBlocks = blocks.map(function (blk) { return rsEncode(blk, ecLen); });

    var result = [];
    var maxDataLen = Math.max(g1len, g2len);
    for (var c = 0; c < maxDataLen; c++) {
      for (var bIdx = 0; bIdx < blocks.length; bIdx++) if (c < blocks[bIdx].length) result.push(blocks[bIdx][c]);
    }
    for (var ec = 0; ec < ecLen; ec++) {
      for (var bIdx2 = 0; bIdx2 < ecBlocks.length; bIdx2++) result.push(ecBlocks[bIdx2][ec]);
    }
    return result;
  }

  function makeMatrix(version) {
    var size = 17 + 4 * version;
    var m = [], isFunc = [];
    for (var r = 0; r < size; r++) { m.push(new Array(size).fill(0)); isFunc.push(new Array(size).fill(false)); }
    function set(r, c, val) {
      if (r >= 0 && r < size && c >= 0 && c < size) { m[r][c] = val; isFunc[r][c] = true; }
    }
    function setFinder(r0, c0) {
      for (var r = -1; r <= 7; r++) {
        for (var c = -1; c <= 7; c++) {
          var rr = r0 + r, cc = c0 + c;
          if (rr < 0 || cc < 0 || rr >= size || cc >= size) continue;
          var onRing = (r === -1 || r === 7 || c === -1 || c === 7);
          var dark;
          if (onRing) dark = 0;
          else if (r >= 0 && r <= 6 && c >= 0 && c <= 6 && (r === 0 || r === 6 || c === 0 || c === 6)) dark = 1;
          else if (r >= 2 && r <= 4 && c >= 2 && c <= 4) dark = 1;
          else dark = 0;
          set(rr, cc, dark);
        }
      }
    }
    setFinder(0, 0);
    setFinder(0, size - 7);
    setFinder(size - 7, 0);

    for (var i = 0; i < size; i++) {
      if (!isFunc[6][i]) set(6, i, i % 2 === 0 ? 1 : 0);
      if (!isFunc[i][6]) set(i, 6, i % 2 === 0 ? 1 : 0);
    }

    var align = ALIGNMENT[version];
    for (var ai = 0; ai < align.length; ai++) {
      for (var aj = 0; aj < align.length; aj++) {
        var cr = align[ai], cc2 = align[aj];
        if (isFunc[cr][cc2]) continue;
        for (var dr = -2; dr <= 2; dr++) {
          for (var dc = -2; dc <= 2; dc++) {
            set(cr + dr, cc2 + dc, (Math.max(Math.abs(dr), Math.abs(dc)) !== 1) ? 1 : 0);
          }
        }
      }
    }

    set(size - 8, 8, 1);
    for (var f = 0; f <= 8; f++) { if (f !== 6) { set(8, f, 0); set(f, 8, 0); } }
    for (var f2 = 0; f2 < 8; f2++) { set(size - 1 - f2, 8, 0); set(8, size - 1 - f2, 0); }
    set(8, 8, 0);

    return { size: size, m: m, isFunc: isFunc };
  }

  function placeData(mat, codewords) {
    var size = mat.size, m = mat.m, isFunc = mat.isFunc;
    var bits = [];
    for (var i = 0; i < codewords.length; i++) for (var b = 7; b >= 0; b--) bits.push((codewords[i] >>> b) & 1);
    var bitIdx = 0, col = size - 1, dir = -1;
    while (col > 0) {
      if (col === 6) col--;
      for (var rowStep = 0; rowStep < size; rowStep++) {
        var row = dir === -1 ? size - 1 - rowStep : rowStep;
        for (var cOff = 0; cOff < 2; cOff++) {
          var c = col - cOff;
          if (isFunc[row][c]) continue;
          m[row][c] = bitIdx < bits.length ? bits[bitIdx] : 0;
          bitIdx++;
        }
      }
      col -= 2;
      dir = -dir;
    }
  }

  function maskFn(idx, r, c) {
    switch (idx) {
      case 0: return (r + c) % 2 === 0;
      case 1: return r % 2 === 0;
      case 2: return c % 3 === 0;
      case 3: return (r + c) % 3 === 0;
      case 4: return (Math.floor(r / 2) + Math.floor(c / 3)) % 2 === 0;
      case 5: return (r * c) % 2 + (r * c) % 3 === 0;
      case 6: return ((r * c) % 2 + (r * c) % 3) % 2 === 0;
      case 7: return ((r + c) % 2 + (r * c) % 3) % 2 === 0;
    }
  }
  function applyMask(mat, maskIdx) {
    var size = mat.size, out = [];
    for (var r = 0; r < size; r++) {
      out.push(mat.m[r].slice());
      for (var c = 0; c < size; c++) if (!mat.isFunc[r][c] && maskFn(maskIdx, r, c)) out[r][c] ^= 1;
    }
    return out;
  }

  function penalty(grid) {
    var size = grid.length, total = 0;
    for (var r = 0; r < size; r++) {
      var runLen = 1;
      for (var c = 1; c < size; c++) {
        if (grid[r][c] === grid[r][c - 1]) runLen++;
        else { if (runLen >= 5) total += 3 + (runLen - 5); runLen = 1; }
      }
      if (runLen >= 5) total += 3 + (runLen - 5);
    }
    for (var c2 = 0; c2 < size; c2++) {
      var runLen2 = 1;
      for (var r2 = 1; r2 < size; r2++) {
        if (grid[r2][c2] === grid[r2 - 1][c2]) runLen2++;
        else { if (runLen2 >= 5) total += 3 + (runLen2 - 5); runLen2 = 1; }
      }
      if (runLen2 >= 5) total += 3 + (runLen2 - 5);
    }
    for (var r3 = 0; r3 < size - 1; r3++) {
      for (var c3 = 0; c3 < size - 1; c3++) {
        var v = grid[r3][c3];
        if (v === grid[r3][c3 + 1] && v === grid[r3 + 1][c3] && v === grid[r3 + 1][c3 + 1]) total += 3;
      }
    }
    var patt1 = [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0];
    var patt2 = [0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1];
    function matchAt(arr, patt) {
      for (var k = 0; k < patt.length; k++) if (arr[k] !== patt[k]) return false;
      return true;
    }
    for (var r4 = 0; r4 < size; r4++) {
      for (var c4 = 0; c4 <= size - 11; c4++) {
        var rowArr = grid[r4].slice(c4, c4 + 11);
        if (matchAt(rowArr, patt1) || matchAt(rowArr, patt2)) total += 40;
      }
    }
    for (var c5 = 0; c5 < size; c5++) {
      for (var r5 = 0; r5 <= size - 11; r5++) {
        var colArr = [];
        for (var k2 = 0; k2 < 11; k2++) colArr.push(grid[r5 + k2][c5]);
        if (matchAt(colArr, patt1) || matchAt(colArr, patt2)) total += 40;
      }
    }
    var dark = 0;
    for (var r6 = 0; r6 < size; r6++) for (var c6 = 0; c6 < size; c6++) if (grid[r6][c6]) dark++;
    var pct = (dark * 100) / (size * size);
    total += Math.floor(Math.abs(pct - 50) / 5) * 10;
    return total;
  }

  function bch15(data5) {
    var g = 0x537;
    var msb = function (x) { var n = 0; while (x) { x >>= 1; n++; } return n; };
    var val = data5 << 10;
    while (val >= 1024) val ^= g << (msb(val) - msb(g));
    return (data5 << 10) | val;
  }
  var FORMAT_MASK = 0x5412;

  function placeFormat(grid, size, maskIdx) {
    var data = (0 << 3) | maskIdx; // ECC level M = 0b00
    var bits15 = bch15(data) ^ FORMAT_MASK;
    function bit(i) { return (bits15 >>> i) & 1; }
    var order1 = [[0, 8], [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [7, 8], [8, 8], [8, 7], [8, 5], [8, 4], [8, 3], [8, 2], [8, 1], [8, 0]];
    for (var i = 0; i < 15; i++) grid[order1[i][0]][order1[i][1]] = bit(14 - i);
    var order2 = [];
    for (var r = size - 1; r >= size - 7; r--) order2.push([r, 8]);
    order2.push([8, size - 8]);
    for (var c = size - 7; c < size; c++) order2.push([8, c]);
    for (var j = 0; j < 15; j++) grid[order2[j][0]][order2[j][1]] = bit(14 - j);
  }

  return function qrEncodeMatrix(text) {
    var version = pickVersion(text);
    var dataCw = buildCodewords(text, version);
    var allCw = interleave(dataCw, version);
    var mat = makeMatrix(version);
    placeData(mat, allCw);

    var best = null, bestScore = Infinity, bestIdx = 0;
    for (var mi = 0; mi < 8; mi++) {
      var masked = applyMask(mat, mi);
      var score = penalty(masked);
      if (score < bestScore) { bestScore = score; best = masked; bestIdx = mi; }
    }
    placeFormat(best, mat.size, bestIdx);
    return { size: mat.size, grid: best };
  };
})();

function buildQrSvg(text, sizeMm) {
  var res = qrEncodeMatrix(text);
  var quiet = 4;
  var dim = res.size + quiet * 2;
  var scale = sizeMm / dim;
  var parts = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + sizeMm + ' ' + sizeMm + '" width="' + sizeMm + 'mm" height="' + sizeMm + 'mm" shape-rendering="crispEdges">'];
  parts.push('<rect x="0" y="0" width="' + sizeMm + '" height="' + sizeMm + '" fill="#fff"/>');
  for (var r = 0; r < res.size; r++) {
    for (var c = 0; c < res.size; c++) {
      if (res.grid[r][c]) {
        var x = (c + quiet) * scale, y = (r + quiet) * scale;
        parts.push('<rect x="' + x.toFixed(3) + '" y="' + y.toFixed(3) + '" width="' + scale.toFixed(3) + '" height="' + scale.toFixed(3) + '" fill="#111"/>');
      }
    }
  }
  parts.push('</svg>');
  return parts.join("");
}

/* ---------------------------------------------------------------------
   Map PDF export helpers shared with map-pdf.js (the export dialog and
   print sheet) and lab.js (distances around the leak point).
--------------------------------------------------------------------- */
var APP_URL = "https://muhammad-afifani.github.io/Sampling-Oil-Spill-RC-86/";
var MAP_SVG_MPERDEG_LAT = 110574;
function mPerDegLon(refLat) { return 111320 * Math.cos(refLat * Math.PI / 180); }

function ringCentroid(ring) {
  var n = ring.length, sumLat = 0, sumLon = 0;
  for (var i = 0; i < n; i++) { sumLat += ring[i][0]; sumLon += ring[i][1]; }
  return [sumLat / n, sumLon / n];
}

function onAfterPrint() {
  var root = document.getElementById("printSheetRoot");
  if (root) root.innerHTML = "";
}

/* ---------------------------------------------------------------------
   Import and export
--------------------------------------------------------------------- */
function readFileText(file) {
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();
    reader.onload = function (ev) { resolve(ev.target.result); };
    reader.onerror = function () { reject(reader.error); };
    reader.readAsText(file);
  });
}

function isPhotoPack(data) { return !!data && data.schema === "oilspill-photos-v1" && Array.isArray(data.photos); }

function mergeImportAsync(data) {
  return new Promise(function (resolve) {
    mergeImport(data, { silent: true, onDone: function (updated, addedPoints, photoFailure) { resolve({ updated: updated, addedPoints: addedPoints, photoFailure: photoFailure }); } });
  });
}

// Stores photos from a -foto-N.json file that this device does not hold yet.
function importPhotoPack(data) {
  var added = 0, failed = false;
  var chain = Promise.resolve();
  (data.photos || []).forEach(function (ph) {
    if (!ph || !ph.id || !ph.data) return;
    chain = chain.then(function () {
      return dbGetPhoto(ph.id).then(function (existing) {
        if (existing) return;
        return base64ToBlob(ph.data).then(function (blob) { return dbPutPhoto(ph.id, blob); }).then(function () { added++; });
      }).catch(function () { failed = true; });
    });
  });
  return chain.then(function () { return { added: added, failed: failed }; });
}

// Accepts one or more files at once: data files are merged first, then any
// -foto-N.json photo files fill in the photos they reference.
function handleImportInput(e) {
  var files = e.target.files ? Array.prototype.slice.call(e.target.files) : [];
  e.target.value = "";
  if (!files.length) return;
  Promise.all(files.map(function (f) {
    return readFileText(f).then(function (txt) { return { name: f.name, data: JSON.parse(txt) }; }).catch(function () { return { name: f.name, data: null }; });
  })).then(function (list) {
    var bad = list.filter(function (x) { return !x.data; });
    var packs = list.filter(function (x) { return isPhotoPack(x.data); });
    var mains = list.filter(function (x) { return x.data && !isPhotoPack(x.data); });
    mains.sort(function (a, b) { return String(a.data.exportedAt || a.name) < String(b.data.exportedAt || b.name) ? -1 : 1; });
    if (bad.length === list.length) { showToast("warn", "Berkas JSON tidak dapat dibaca. Periksa kembali berkas yang dipilih."); return; }
    var sum = { updated: 0, addedPoints: 0, photos: 0, failed: false };
    var chain = Promise.resolve();
    mains.forEach(function (m) {
      chain = chain.then(function () { return mergeImportAsync(m.data); }).then(function (r) {
        sum.updated += r.updated; sum.addedPoints += r.addedPoints; if (r.photoFailure) sum.failed = true;
      });
    });
    packs.forEach(function (pk) {
      chain = chain.then(function () { return importPhotoPack(pk.data); }).then(function (r) {
        sum.photos += r.added; if (r.failed) sum.failed = true;
      });
    });
    return chain.then(function () {
      render();
      var expected = 0;
      mains.forEach(function (m) { if (Array.isArray(m.data.photoParts)) expected = Math.max(expected, m.data.photoParts.length); });
      var msg = "Impor selesai";
      if (mains.length) msg += ". " + sum.updated + " entri diperbarui";
      if (sum.addedPoints) msg += ", " + sum.addedPoints + " titik tambahan baru";
      if (packs.length) msg += (mains.length ? ", " : ". ") + sum.photos + " foto ditambahkan dari " + packs.length + " berkas foto";
      msg += ".";
      if (expected > packs.length) msg += " Berkas ini punya " + expected + " berkas foto terpisah (-foto-1, -foto-2, …); pilih semuanya sekaligus agar fotonya ikut masuk.";
      if (bad.length) msg += " " + bad.length + " berkas tidak dapat dibaca.";
      if (sum.failed) msg += " Sebagian foto gagal disimpan.";
      showToast(sum.failed || bad.length || expected > packs.length ? "warn" : "success", msg);
    });
  });
}

function mergeImport(data, opts) {
  opts = opts || {};
  var incoming = (data && data.reports) || {};
  var incomingNotes = (data && data.gridNotes) || {};
  var incomingCustom = (data && data.customPoints) || [];
  var updated = 0, addedPoints = 0, photosFilled = 0;
  var photoWrites = [];

  updated += mergeCustomGrids(data && data.customGrids);
  var existingIds = {};
  POINTS.forEach(function (p) { existingIds[p.id] = true; });
  state.customPoints.forEach(function (p) { existingIds[p.id] = true; });
  incomingCustom.forEach(function (p) {
    if (!p || !p.id) return;
    if (typeof p.lat !== "number" || typeof p.lon !== "number") return;
    if (existingIds[p.id]) {
      // A custom point moved on another device (e.g. while editing a temporary grid) carries a newer updatedAt.
      var cur = state.customPoints.filter(function (cp) { return cp.id === p.id; })[0];
      if (cur && (p.updatedAt || 0) > (cur.updatedAt || 0)) {
        cur.lat = p.lat; cur.lon = p.lon; cur.gridId = p.gridId || null; cur.type = p.type || cur.type; cur.updatedAt = p.updatedAt;
        updated++;
      }
      return;
    }
    state.customPoints.push({ id: p.id, gridId: p.gridId || null, type: p.type || "air", lat: p.lat, lon: p.lon, custom: true, createdAt: p.createdAt || Date.now(), updatedAt: p.updatedAt || 0 });
    existingIds[p.id] = true;
    addedPoints++;
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
          var entry = { id: ph.id, addedAt: ph.addedAt || Date.now() };
          if (typeof ph.gpsLat === "number" && typeof ph.gpsLon === "number") {
            entry.gpsLat = ph.gpsLat; entry.gpsLon = ph.gpsLon;
          }
          return entry;
        });
        var roundCopy = Object.assign({}, incR, { photos: photos });
        delete roundCopy.data;
        cur[round] = roundCopy;
        updated++;
      } else {
        var known = {};
        (curR.photos || []).forEach(function (ph) { known[ph.id] = true; });
        (incR.photos || []).forEach(function (ph) {
          if (!ph.data || !known[ph.id]) return;
          photoWrites.push(dbGetPhoto(ph.id).then(function (existing) {
            if (existing) return;
            return base64ToBlob(ph.data).then(function (blob) { return dbPutPhoto(ph.id, blob); }).then(function () { photosFilled++; });
          }));
        });
      }
    });
    state.reports[pid] = cur;
  });
  state.gridNotes = Object.assign({}, state.gridNotes, incomingNotes);
  updated += labMergeSamples(data && data.labSamples);

  Promise.all(photoWrites).then(function () { finishImport(updated, addedPoints, false, opts, photosFilled); }).catch(function () {
    finishImport(updated, addedPoints, true, opts, photosFilled);
  });
}

function finishImport(updated, addedPoints, photoFailure, opts, photosFilled) {
  opts = opts || {};
  refreshGrids();
  persist();
  render();
  if (!opts.silent) {
    var msg = "Impor selesai. " + updated + " entri diperbarui";
    if (addedPoints) msg += ", " + addedPoints + " titik tambahan baru ditambahkan";
    if (photosFilled) msg += ", " + photosFilled + " foto yang belum ada di perangkat ini ditambahkan";
    msg += " dari berkas.";
    if (photoFailure) msg += " Sebagian foto gagal disimpan.";
    showToast(photoFailure ? "warn" : "success", msg);
  }
  if (opts.onDone) opts.onDone(updated, addedPoints, photoFailure);
}

/* ---------------------------------------------------------------------
   Shared data sync: on load, check the repository root on GitHub for
   the most recently named JSON export (the same auto-generated name
   Ekspor JSON produces, e.g. sampling-oilspill-2026-09-25.json) and
   merge it in, so everyone opening the page picks up the latest team
   update. A split export's -foto-N.json files are skipped when picking
   the latest file and fetched afterwards only for photos this device
   lacks. Best-effort: any failure (offline, nothing uploaded yet) is
   silent.
--------------------------------------------------------------------- */
var SYNC_OWNER = "muhammad-afifani";
var SYNC_REPO = "Sampling-Oil-Spill-RC-86";
var SYNC_BRANCH = "claude/stoic-cannon-ew2fbf";
var SYNC_NAME_RE = /^sampling-oilspill-.*\.json$/i;

function showSyncBanner(msg) {
  var el = document.getElementById("syncBanner");
  if (!el) return;
  el.innerHTML = '<span class="syncspinner"></span><span>' + esc(msg) + '</span>';
  el.style.display = "flex";
}
function hideSyncBanner() {
  var el = document.getElementById("syncBanner");
  if (!el) return;
  el.style.display = "none";
  el.innerHTML = "";
}

// Photo ids the reports reference that this device has no file for.
function missingPhotoIds() {
  var missing = {};
  return Promise.all(allPhotoRefs().map(function (id) {
    return dbGetPhoto(id).then(function (blob) { if (!blob) missing[id] = true; }).catch(function () { missing[id] = true; });
  })).then(function () { return missing; });
}

// After a split export is merged, fetch only the -foto-N files that hold
// photos this device is missing.
function syncPhotoParts(data, listing) {
  var parts = Array.isArray(data.photoParts) ? data.photoParts : [];
  if (!parts.length) return Promise.resolve(0);
  return missingPhotoIds().then(function (missing) {
    var needed = parts.filter(function (p) {
      return (p.ids || []).some(function (id) { return missing[id]; });
    }).map(function (p) {
      return listing.filter(function (f) { return f.name === p.file; })[0];
    }).filter(Boolean);
    var added = 0;
    var chain = Promise.resolve();
    needed.forEach(function (f, i) {
      chain = chain.then(function () {
        showSyncBanner("Mengunduh foto bersama (bagian " + (i + 1) + " dari " + needed.length + ")…");
        return fetch(f.download_url).then(function (res) { return res.json(); }).then(function (pack) {
          return isPhotoPack(pack) ? importPhotoPack(pack) : { added: 0 };
        }).then(function (r) { added += r.added; }).catch(function () {});
      });
    });
    return chain.then(function () { return added; });
  });
}

function syncFromRemote() {
  if (!window.fetch) return;
  showSyncBanner("Memperbarui database…");
  var listUrl = "https://api.github.com/repos/" + SYNC_OWNER + "/" + SYNC_REPO + "/contents?ref=" + SYNC_BRANCH;
  fetch(listUrl, { headers: { Accept: "application/vnd.github+json" } })
    .then(function (res) { return res.ok ? res.json() : []; })
    .then(function (list) {
      if (!Array.isArray(list)) { hideSyncBanner(); return; }
      var all = list.filter(function (f) { return f.type === "file" && SYNC_NAME_RE.test(f.name); });
      var files = all.filter(function (f) { return !PHOTO_PART_RE.test(f.name); });
      if (!files.length) { hideSyncBanner(); return; }
      files.sort(function (a, b) { return a.name < b.name ? -1 : a.name > b.name ? 1 : 0; });
      var latest = files[files.length - 1];
      return fetch(latest.download_url).then(function (res) { return res.json(); }).then(function (data) {
        mergeImport(data, {
          silent: true,
          onDone: function (updated, addedPoints) {
            syncPhotoParts(data, all).catch(function () { return 0; }).then(function (photos) {
              hideSyncBanner();
              if (photos) render();
              if (updated || addedPoints || photos) {
                showToast("success", "Database diperbarui dari repository (" + updated + " entri" + (photos ? ", " + photos + " foto" : "") + ").");
              }
            });
          }
        });
      });
    })
    .catch(function () { hideSyncBanner(); });
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
  renderLabCharts();
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
  var labGridBtn = document.getElementById("labToggleGridLabels");
  if (labGridBtn) labGridBtn.className = "labeltoggle" + (state.showGridLabels ? " active" : "");
  var pointBtn = document.getElementById("togglePointLabels");
  if (pointBtn) pointBtn.className = "labeltoggle" + (state.showPointLabels ? " active" : "");
  var fillBtn = document.getElementById("toggleGridFill");
  if (fillBtn) fillBtn.className = "labeltoggle" + (state.showGridFill ? " active" : "");
  var mapSection = document.querySelector(".mapsection");
  if (mapSection) mapSection.classList.toggle("basemap-only", state.basemapOnly);
  var basemapBtn = document.getElementById("toggleBasemapOnly");
  if (basemapBtn) basemapBtn.className = "labeltoggle" + (state.basemapOnly ? " active" : "");
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
function toggleGridFill() {
  state.showGridFill = !state.showGridFill;
  localStorage.setItem(LABELS_KEY + "_fill", state.showGridFill ? "on" : "off");
  var btn = document.getElementById("toggleGridFill");
  if (btn) btn.className = "labeltoggle" + (state.showGridFill ? " active" : "");
  updateMapStyles();
}
function toggleBasemapOnly() {
  state.basemapOnly = !state.basemapOnly;
  localStorage.setItem(LABELS_KEY + "_basemaponly", state.basemapOnly ? "on" : "off");
  applyLabelVisibility();
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
  pin: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Z" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/><circle cx="12" cy="9.5" r="2.3" stroke="currentColor" stroke-width="1.7"/></svg>',
  locate: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.9"/><path d="M12 2.5v3M12 18.5v3M21.5 12h-3M5.5 12h-3" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>'
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
  if (state.view === "lab") { renderLab(); return; }
  applyViewChrome();
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
  var extraPts = total - POINTS.length;
  document.getElementById("kpiTotalSub").textContent = GRIDS.length + " area grid" + (extraPts > 0 ? " termasuk " + extraPts + " titik tambahan" : "");
  updateGridMgrButton();

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

  var typeTotals = { air: 0, sedimen: 0, soil: 0 };
  var typeDone = { air: 0, sedimen: 0, soil: 0 };
  pts.forEach(function (p) {
    var t = pointType(p);
    typeTotals[t]++;
    if (repOf(p.id, round).done) typeDone[t]++;
  });
  ["air", "sedimen", "soil"].forEach(function (t) {
    var idPrefix = "type" + t[0].toUpperCase() + t.slice(1);
    var pct = typeTotals[t] ? Math.round((typeDone[t] / typeTotals[t]) * 100) : 0;
    document.getElementById(idPrefix + "Count").textContent = typeDone[t] + " dari " + typeTotals[t] + " titik";
    document.getElementById(idPrefix + "Bar").style.width = pct + "%";
  });

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
  renderDateFilter();

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
      '<option value="sedimen"' + (draft.type === "sedimen" ? " selected" : "") + '>Sedimen</option>' +
      '<option value="soil"' + (draft.type === "soil" ? " selected" : "") + '>Tanah</option></select></div>' +
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
    var hasPhotoGps = active.photos.some(function (ph) { return typeof ph.gpsLat === "number" && typeof ph.gpsLon === "number"; });
    var ptype = SAMPLE_TYPES[pointType(p)];
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
      '<div class="pointhead"><div class="pointid">' + esc(p.id) + ' <span class="typetag" style="border-color:' + ptype.color + ';color:' + ptype.color + '">' + ptype.label + '</span>' + (p.custom ? ' <span class="roundtag">Titik tambahan</span>' : '') + '</div>' +
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
      '<div class="field"><label for="ppersonnel">Personil Sampling</label>' +
      '<input id="ppersonnel" type="text" placeholder="Pisahkan beberapa nama dengan koma" value="' + esc(active.personnel) + '" data-field="personnel"/></div>' +
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
      (hasPhotoGps ? '<button type="button" class="btn" data-action="detect-location">' + ICONS.locate + ' Deteksi dari Foto</button>' : '') +
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
      gridTempActionsHtml(gr, false) +
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
    '<div class="gridgrid">' + rows + '</div>' +
    '<div class="panelhead-row" style="margin-top:26px;">' +
    '<div><p class="panel-title">Rekap Data Titik</p>' +
    '<p class="panel-sub">Seluruh titik sampling dikelompokkan per jenis dan grid, mengikuti pencarian dan filter status yang aktif di atas. Klik satu baris untuk pratinjau singkat.</p></div>' +
    '<div class="tblhead-actions">' +
    (state.showDataTable ? '<button type="button" class="btn" data-action="export-points-excel">' + ICONS.download + ' Ekspor Excel</button>' : '') +
    '<button type="button" class="btn" data-action="toggle-datatable">' + (state.showDataTable ? 'Sembunyikan Tabel' : 'Tampilkan Tabel') + '</button>' +
    '</div>' +
    '</div>' +
    (state.showDataTable ? pointsTableHtml(round) : '');
  if (state.showDataTable) hydrateGalleryImages();
}

var TYPE_ORDER = ["soil", "sedimen", "air"];

function isGroupCollapsed(id, forceOpen) {
  if (forceOpen) return false;
  return state.tableCollapsed.hasOwnProperty(id) ? state.tableCollapsed[id] : true;
}

function pointsTableHtml(round) {
  var q = (state.search || "").trim().toLowerCase();
  var pts = allPoints().filter(function (p) {
    var r = repOf(p.id, round);
    return matchesFilter(r) && (!q || p.id.toLowerCase().indexOf(q) !== -1);
  });
  var searching = !!q;

  function statusCell(r) {
    var cls = r.issue ? "tbl-badge tbl-issue" : (r.done ? "tbl-badge tbl-done" : "tbl-badge tbl-pending");
    var label = r.issue ? "Bermasalah" : (r.done ? "Selesai" : "Belum");
    var date = r.done && r.date ? '<span class="tbl-date">' + esc(formatDateID(r.date)) + '</span>' : "";
    return '<span class="' + cls + '">' + esc(label) + '</span>' + date;
  }

  function photoBadge(rb, ra) {
    var total = (rb.photos ? rb.photos.length : 0) + (ra.photos ? ra.photos.length : 0);
    if (!total) return "—";
    return '<span class="tbl-photo-badge">' + ICONS.camera + ' ' + total + '</span>';
  }

  function miniRound(label, r) {
    var status = r.issue ? "Bermasalah" : (r.done ? "Selesai" : "Belum disampling");
    var date = r.done && r.date ? " • " + esc(formatDateID(r.date)) : "";
    var note = (r.notes && r.notes.trim()) ? '<div class="tbl-expand-note">' + esc(r.notes.trim().slice(0, 140)) + (r.notes.trim().length > 140 ? "…" : "") + '</div>' : "";
    return '<div class="tbl-expand-round"><b>' + esc(label) + ':</b> ' + esc(status) + date + '</div>' + note;
  }

  function chevron(collapsed) {
    return '<span class="tbl-chevron' + (collapsed ? "" : " tbl-chevron-open") + '">' + ICONS.back + '</span>';
  }

  function rowHtml(p) {
    var rb = repOf(p.id, "before"), ra = repOf(p.id, "after");
    var expanded = !!state.tableExpandedRows[p.id];
    var html = '<tr class="tbl-row' + (expanded ? " tbl-row-active" : "") + '" data-action="toggle-row-expand" data-id="' + esc(p.id) + '">' +
      '<td class="tbl-code">' + esc(p.id) + (p.custom ? ' <span class="tbl-custom">tambahan</span>' : '') + '</td>' +
      '<td>' + statusCell(rb) + '</td>' +
      '<td>' + statusCell(ra) + '</td>' +
      '<td class="tbl-center">' + (rb.issue || ra.issue || (rb.notes && rb.notes.trim()) || (ra.notes && ra.notes.trim()) ? '<span class="tbl-kendala-dot" title="Ada kendala tercatat"></span>' : '—') + '</td>' +
      '<td class="tbl-center">' + photoBadge(rb, ra) + '</td>' +
      '</tr>';
    if (expanded) {
      var photos = (rb.photos || []).map(function (ph) { return { ph: ph, label: "Before" }; })
        .concat((ra.photos || []).map(function (ph) { return { ph: ph, label: "After" }; }));
      var photosHtml = photos.length ? photos.slice(0, 6).map(function (x) {
        return '<img src="' + TRANSPARENT_PX + '" data-photo-id="' + esc(x.ph.id) + '" class="tbl-expand-thumb" alt="Foto ' + esc(x.label) + '"/>';
      }).join("") : '<span class="tbl-expand-nofoto">Belum ada foto.</span>';
      html += '<tr class="tbl-expand-row"><td colspan="5"><div class="tbl-expand-content">' +
        '<div class="tbl-expand-info">' + miniRound("Before Recovery", rb) + miniRound("After Recovery", ra) + '</div>' +
        '<div class="tbl-expand-photos">' + photosHtml + '</div>' +
        '<div class="tbl-expand-actions">' +
        '<button type="button" class="btn btn-primary" data-action="select-point" data-id="' + esc(p.id) + '">Lihat Detail</button>' +
        '<button type="button" class="btn" data-action="focus-point-map" data-id="' + esc(p.id) + '">' + ICONS.pin + ' Lihat di Peta</button>' +
        '</div></div></td></tr>';
    }
    return html;
  }

  function subgroupHtml(typeKey, gridKey, gridLabel, subPts) {
    var subId = "t:" + typeKey + ":g:" + gridKey;
    var collapsed = isGroupCollapsed(subId, searching);
    var doneCount = subPts.filter(function (p) { return repOf(p.id, round).done; }).length;
    var html = '<tr class="tbl-subgroup-head" data-action="toggle-tbl-group" data-id="' + esc(subId) + '">' +
      '<td colspan="5">' + chevron(collapsed) + esc(gridLabel) +
      '<span class="tbl-group-count">' + subPts.length + ' titik · ' + doneCount + ' selesai</span></td></tr>';
    if (!collapsed) html += subPts.map(rowHtml).join("");
    return html;
  }

  function typeSectionHtml(typeKey) {
    var typePts = pts.filter(function (p) { return pointType(p) === typeKey; });
    if (!typePts.length) return "";
    var typeId = "t:" + typeKey;
    var collapsed = isGroupCollapsed(typeId, searching);
    var typeInfo = SAMPLE_TYPES[typeKey];
    var doneCount = typePts.filter(function (p) { return repOf(p.id, round).done; }).length;
    var html = '<tr class="tbl-group-head" data-action="toggle-tbl-group" data-id="' + esc(typeId) + '">' +
      '<td colspan="5">' + chevron(collapsed) +
      '<span class="tbl-group-label" style="color:' + typeInfo.color + '">' + esc(typeInfo.label) + '</span>' +
      '<span class="tbl-group-count">' + typePts.length + ' titik · ' + doneCount + ' selesai</span></td></tr>';
    if (!collapsed) {
      var byGrid = {};
      var gridOrder = [];
      typePts.forEach(function (p) {
        var g = GRID_BY_ID[p.gridId];
        var key = g ? g.id : "none";
        if (!byGrid[key]) { byGrid[key] = { label: g ? g.label : "Tanpa Grid", pts: [] }; gridOrder.push(key); }
        byGrid[key].pts.push(p);
      });
      gridOrder.sort(function (a, b) { return naturalCompare(byGrid[a].label, byGrid[b].label); });
      html += gridOrder.map(function (key) { return subgroupHtml(typeKey, key, byGrid[key].label, byGrid[key].pts); }).join("");
    }
    return html;
  }

  var body = TYPE_ORDER.map(typeSectionHtml).join("");

  return '<div class="datatable-wrap">' +
    '<table class="datatable">' +
    '<thead><tr>' +
    '<th>Kode Titik</th><th>Before Recovery</th><th>After Recovery</th><th>Kendala</th><th>Foto</th>' +
    '</tr></thead>' +
    '<tbody>' + (body || '<tr><td colspan="5" class="tbl-empty">Tidak ada titik yang cocok dengan pencarian atau filter aktif.</td></tr>') + '</tbody>' +
    '</table>' +
    '<p class="tbl-count">Menampilkan ' + pts.length + ' dari ' + allPoints().length + ' titik.</p>' +
    '</div>';
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

function renderAbout() {
  var root = document.getElementById("aboutRoot");
  if (!state.aboutOpen) { root.innerHTML = ""; return; }
  root.innerHTML = '<div class="lightbox-backdrop" data-action="close-about">' +
    '<div class="aboutcard">' +
    '<button type="button" class="lightbox-close" data-action="close-about" aria-label="Tutup">' + ICONS.close + '</button>' +
    '<img src="assets/team-photo.webp" class="about-photo" alt="Tim di balik pengembangan tools ini"/>' +
    '<p class="about-caption">Tools ini dibuat dan terus dikembangkan secara mandiri oleh Tim ENV BPN &amp; HCA.</p>' +
    '<p class="about-support">Mohon dukungan dana untuk kelanjutan update, progres, dan pengembangan tools ini.</p>' +
    '<button type="button" class="about-qrisbtn" data-action="open-qris">' +
    '<img src="assets/qris-support.jpg" class="about-qris-thumb" alt="QRIS dukungan"/>' +
    '<span>Ketuk untuk memperbesar QRIS</span>' +
    '</button>' +
    '</div></div>';
}

function renderQrisZoom() {
  var root = document.getElementById("qrisZoomRoot");
  if (!state.qrisZoom) { root.innerHTML = ""; return; }
  root.innerHTML = '<div class="lightbox-backdrop" data-action="close-qris">' +
    '<img src="assets/qris-support.jpg" class="lightbox-img" alt="QRIS dukungan"/>' +
    '<button type="button" class="lightbox-close" data-action="close-qris" aria-label="Tutup">' + ICONS.close + '</button></div>';
}

/* ---------------------------------------------------------------------
   Event delegation
--------------------------------------------------------------------- */
function onAction(e) {
  var el = e.target.closest("[data-action]");
  if (!el) return;
  var action = el.getAttribute("data-action");
  var id = el.getAttribute("data-id");

  if (action.indexOf("lab-") === 0) { labOnAction(action, el, e); return; }
  if (action.indexOf("pdf-") === 0) { pdfOnAction(action, el, e); return; }
  if (action.indexOf("gm-") === 0 || action.indexOf("ge-") === 0) { gridOnAction(action, el, e); return; }
  if (action === "set-view") { setView(el.getAttribute("data-view")); return; }
  if (action === "select-point") selectPoint(id);
  else if (action === "select-grid") selectGrid(id);
  else if (action === "back-grid") backToGrid();
  else if (action === "back-overview") backToOverview();
  else if (action === "toggle-theme") toggleTheme();
  else if (action === "toggle-grid-labels") toggleGridLabels();
  else if (action === "toggle-point-labels") togglePointLabels();
  else if (action === "toggle-grid-fill") toggleGridFill();
  else if (action === "toggle-basemap-only") toggleBasemapOnly();
  else if (action === "toggle-datatable") {
    state.showDataTable = !state.showDataTable;
    localStorage.setItem(LABELS_KEY + "_datatable", state.showDataTable ? "on" : "off");
    render();
  }
  else if (action === "toggle-tbl-group") {
    var gid = el.getAttribute("data-id");
    state.tableCollapsed[gid] = !isGroupCollapsed(gid);
    render();
  }
  else if (action === "toggle-row-expand") {
    state.tableExpandedRows[id] = !state.tableExpandedRows[id];
    render();
  }
  else if (action === "focus-point-map") {
    focusPoint(id);
    var ms = document.querySelector(".mapsection");
    if (ms) ms.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  else if (action === "export-points-excel") exportPointsExcel();
  else if (action === "export-map-pdf") openPdfDialog();
  else if (action === "copy-coord") copyText(el.getAttribute("data-text"));
  else if (action === "toggle-actual") toggleActual();
  else if (action === "toggle-fullscreen") toggleFullscreen();
  else if (action === "close-toast") { state.toast = null; renderToast(); }
  else if (action === "close-lightbox") { state.lightbox = null; renderLightbox(); }
  else if (action === "open-about") { state.aboutOpen = true; renderAbout(); }
  else if (action === "close-about") { state.aboutOpen = false; state.qrisZoom = false; renderAbout(); renderQrisZoom(); }
  else if (action === "open-qris") { state.qrisZoom = true; renderQrisZoom(); }
  else if (action === "close-qris") { state.qrisZoom = false; renderQrisZoom(); }
  else if (action === "clear-search") { state.search = ""; document.getElementById("searchInput").value = ""; render(); }
  else if (action === "set-filter") { state.statusFilter = el.getAttribute("data-filter"); render(); }
  else if (action === "set-round") { state.round = el.getAttribute("data-round"); render(); }
  else if (action === "toggle-done") {
    var r = repOf(state.selectedId, state.round);
    updateReport(state.selectedId, state.round, { done: !r.done });
  } else if (action === "remove-photo") {
    removePhoto(state.selectedId, state.round, el.getAttribute("data-photo-id"));
  } else if (action === "open-lightbox") {
    if (el.classList.contains("photo-missing")) { showToast("info", "Foto ini tidak tersedia di perangkat ini karena data diimpor tanpa foto."); return; }
    var idx = parseInt(el.getAttribute("data-idx"), 10);
    var photo = currentPhotos[idx];
    if (photo) openLightbox(photo.id);
  } else if (action === "export-json" || action === "open-export") {
    openExportDialog();
  } else if (action === "export-close") {
    closeExportDialog();
  } else if (action === "export-backdrop") {
    if (e.target === el) closeExportDialog();
  } else if (action === "export-download") {
    if (state.exportDlg && !state.exportDlg.busy) exportJson(state.exportDlg.mode);
  } else if (action === "pick-actual") {
    startPickActual(state.selectedId, state.round);
  } else if (action === "detect-location") {
    detectLocationFromPhotos(state.selectedId, state.round);
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
  if (field.indexOf("pdf-") === 0) { if (t.type === "range" || t.type === "color") pdfOnField(field, t); return; }
  if (field.indexOf("gm-") === 0 || field.indexOf("ge-") === 0) { gridOnField(field, t, "input"); return; }
  if (field.indexOf("lab-") === 0) { labOnInput(field, t); return; }

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
  } else if (field === "personnel") {
    var existingP = state.reports[state.selectedId] ? Object.assign({}, state.reports[state.selectedId]) : {};
    var currentP = existingP[state.round] ? Object.assign({}, existingP[state.round]) : defaultRound();
    currentP.personnel = t.value;
    existingP[state.round] = currentP;
    state.reports[state.selectedId] = existingP;
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
  if (t.id === "labImportInput") { labHandleImportInput(e); return; }
  if (!field) return;
  if (field.indexOf("pdf-") === 0) { if (t.type !== "range" && t.type !== "color") pdfOnField(field, t); return; }
  if (field.indexOf("gm-") === 0 || field.indexOf("ge-") === 0) { gridOnField(field, t, "change"); return; }
  if (field.indexOf("lab-") === 0) { labOnChange(field, t); return; }

  if (field === "date-filter") {
    var v = t.value;
    if (v === "all") state.dateFilter = { mode: "all", date: "", from: "", to: "" };
    else if (v === "range") state.dateFilter = { mode: "range", date: "", from: state.dateFilter.from, to: state.dateFilter.to };
    else state.dateFilter = { mode: "single", date: v.slice(2), from: "", to: "" };
    render();
    return;
  }
  if (field === "date-from" || field === "date-to") {
    state.dateFilter[field === "date-from" ? "from" : "to"] = t.value;
    render();
    return;
  }
  if (field === "export-mode") {
    if (state.exportDlg) { state.exportDlg.mode = t.value; try { localStorage.setItem(EXPORT_MODE_KEY, t.value); } catch (err) {} renderExportDialog(); }
    return;
  }
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
  if (field === "notes" || field === "personnel" || field === "gridnote") persist();
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
  seedCustomGrids();
  rebuildGrids();
  initMap();
  labBoot();
  applyLabelVisibility();
  var actualBtn = document.getElementById("toggleActual");
  if (actualBtn) actualBtn.className = "labeltoggle" + (state.showActual ? " active" : "");
  render();
  renderGridManager();
  migrateOldPhotos();
  syncFromRemote();

  document.body.addEventListener("click", onAction);
  document.body.addEventListener("input", onInput);
  document.body.addEventListener("change", onChange);
  document.body.addEventListener("focusout", onBlur, true);
  document.body.addEventListener("dragover", onDragOver);
  document.body.addEventListener("dragleave", onDragLeave);
  document.body.addEventListener("drop", onDrop);
  document.addEventListener("fullscreenchange", onFullscreenChange);
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (state.exportDlg && !state.exportDlg.busy) closeExportDialog();
    if (state.pdfDlg) closePdfDialog();
    if (gridMgrOpen) closeGridManager();
    else if (gridEdit && !(e.target && e.target.getAttribute && e.target.getAttribute("data-field") === "ge-name")) geCancel();
  });
  window.addEventListener("afterprint", onAfterPrint);
}

document.addEventListener("DOMContentLoaded", boot);
