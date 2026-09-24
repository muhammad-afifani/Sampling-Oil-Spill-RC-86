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

function defaultRound() {
  return { done: false, date: "", notes: "", issue: false, photos: [], savedAt: 0 };
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
  reports: {},
  gridNotes: {}
};

(function loadState() {
  try {
    var raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      var parsed = JSON.parse(raw);
      state.reports = parsed.reports || {};
      state.gridNotes = parsed.gridNotes || {};
    }
  } catch (e) {}
})();

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ reports: state.reports, gridNotes: state.gridNotes }));
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
    photos: (d && d.photos) || []
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
var map, gridLayers = {}, markerLayers = {};
var BASEMAP_URL = "assets/basemap-drone.jpg";
var BASEMAP_ATTR = "Citra udara drone lapangan";
// Corners read from the orthomosaic's embedded georeferencing (UTM zone 50S), reprojected to WGS84.
var IMAGE_BOUNDS = [[-0.8597803, 117.2609098], [-0.8465768, 117.2760070]];

function allBounds() {
  var pts = POINTS.map(function (p) { return [p.lat, p.lon]; });
  return L.latLngBounds(pts);
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

  GRIDS.forEach(function (g) {
    var poly = L.polygon(g.ring, { weight: 1.4, fillOpacity: 0.28 }).addTo(map);
    poly.on("click", function () { selectGrid(g.id); });
    poly.bindTooltip(g.label, { permanent: true, direction: "center", className: "grid-label-tip", interactive: false });
    gridLayers[g.id] = poly;
  });

  POINTS.forEach(function (p) {
    var marker = L.circleMarker([p.lat, p.lon], { radius: 5.5, weight: 1.8 }).addTo(map);
    marker.on("click", function () { selectPoint(p.id); });
    marker.bindTooltip(p.id, { permanent: true, direction: "top", offset: [0, -6], className: "point-label-tip", interactive: false });
    markerLayers[p.id] = marker;
  });
}

function gridStats(g, round) {
  var done = 0, issue = 0;
  g.members.forEach(function (id) {
    var r = repOf(id, round);
    if (r.done) done++;
    if (r.issue) issue++;
  });
  var total = g.members.length;
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
    gridLayers[g.id].setStyle({
      color: tier.stroke,
      fillColor: tier.fill,
      weight: isSel ? 3 : 1.4,
      fillOpacity: isSel ? 0.4 : 0.26
    });
  });

  POINTS.forEach(function (p) {
    var r = repOf(p.id, round);
    var isSel = state.selectedId === p.id;
    var fill, stroke;
    if (r.issue) { fill = COLORS.issue; stroke = COLORS.issueStroke; }
    else if (r.done) { fill = COLORS.done; stroke = COLORS.doneStroke; }
    else { fill = "#16212B"; stroke = COLORS.pending; }
    var match = matchesFilter(r) && (!q || p.id.toLowerCase().indexOf(q) !== -1);
    markerLayers[p.id].setStyle({
      radius: isSel ? 9 : 5.5,
      weight: isSel ? 3 : 1.8,
      color: stroke,
      fillColor: fill,
      fillOpacity: match ? 0.95 : 0.18,
      opacity: match ? 1 : 0.25
    });
  });
}

function focusPoint(id) {
  var p = POINT_BY_ID[id];
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
  var p = POINT_BY_ID[id];
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
   Photos
--------------------------------------------------------------------- */
var currentPhotos = [];

function addPhotos(pointId, round, fileList) {
  var files = fileList ? Array.prototype.slice.call(fileList) : [];
  files.forEach(function (file) {
    if (!file.type || file.type.indexOf("image/") !== 0) return;
    var reader = new FileReader();
    reader.onload = function (ev) {
      var img = new Image();
      img.onload = function () {
        var maxDim = 1000;
        var w = img.naturalWidth, h = img.naturalHeight;
        if (w > maxDim || h > maxDim) {
          var s = maxDim / Math.max(w, h);
          w = Math.round(w * s); h = Math.round(h * s);
        }
        var canvas = document.createElement("canvas");
        canvas.width = w; canvas.height = h;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, w, h);
        var dataUrl;
        try { dataUrl = canvas.toDataURL("image/jpeg", 0.62); } catch (e) { dataUrl = ev.target.result; }
        appendPhoto(pointId, round, dataUrl);
      };
      img.onerror = function () {};
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  });
}

function appendPhoto(pointId, round, url) {
  var existing = state.reports[pointId] ? Object.assign({}, state.reports[pointId]) : {};
  var current = existing[round] ? Object.assign({}, existing[round]) : defaultRound();
  var photos = current.photos ? current.photos.slice() : [];
  photos.push({ id: "ph" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7), url: url });
  existing[round] = Object.assign({}, current, { photos: photos, savedAt: Date.now() });
  state.reports[pointId] = existing;
  persist();
  render();
}

function removePhoto(pointId, round, photoId) {
  var existing = state.reports[pointId] ? Object.assign({}, state.reports[pointId]) : {};
  var current = existing[round] ? Object.assign({}, existing[round]) : defaultRound();
  var photos = (current.photos || []).filter(function (p) { return p.id !== photoId; });
  existing[round] = Object.assign({}, current, { photos: photos, savedAt: Date.now() });
  state.reports[pointId] = existing;
  persist();
  render();
}

/* ---------------------------------------------------------------------
   Import and export
--------------------------------------------------------------------- */
function exportJson() {
  var payload = {
    schema: "oilspill-sampling-v2",
    exportedAt: new Date().toISOString(),
    totalPoints: POINTS.length,
    totalGrids: GRIDS.length,
    reports: state.reports,
    gridNotes: state.gridNotes
  };
  var json = JSON.stringify(payload, null, 2);
  var blob = new Blob([json], { type: "application/json" });
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url;
  a.download = "sampling-oilspill-" + new Date().toISOString().slice(0, 10) + ".json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  showToast("success", "Data berhasil diekspor ke berkas JSON.");
}

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
  var updated = 0;
  Object.keys(incoming).forEach(function (pid) {
    var inc = incoming[pid] || {};
    var cur = state.reports[pid] ? Object.assign({}, state.reports[pid]) : {};
    ["before", "after"].forEach(function (round) {
      var incR = inc[round];
      if (!incR) return;
      var curR = cur[round];
      if (!curR || (incR.savedAt || 0) > (curR.savedAt || 0)) {
        cur[round] = incR;
        updated++;
      }
    });
    state.reports[pid] = cur;
  });
  state.gridNotes = Object.assign({}, state.gridNotes, incomingNotes);
  persist();
  render();
  showToast("success", "Impor selesai. " + updated + " entri diperbarui dari berkas.");
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
  droplet: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 3C12 3 6 10.5 6 15a6 6 0 0 0 12 0c0-4.5-6-12-6-12Z" stroke="#2FD9C7" stroke-width="1.6" stroke-linejoin="round"/><path d="M8.6 15.4a3.4 3.4 0 0 0 3.4 3.4" stroke="#2FD9C7" stroke-width="1.4" stroke-linecap="round"/></svg>'
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

  var doneAll = 0, issueAll = 0, beforeDone = 0, afterDone = 0;
  POINTS.forEach(function (p) {
    var r = repOf(p.id, round);
    if (r.done) doneAll++;
    if (r.issue) issueAll++;
    if (repOf(p.id, "before").done) beforeDone++;
    if (repOf(p.id, "after").done) afterDone++;
  });
  var total = POINTS.length;
  var pending = total - doneAll;
  var pctDone = total ? Math.round((doneAll / total) * 100) : 0;
  var beforePct = total ? Math.round((beforeDone / total) * 100) : 0;
  var afterPct = total ? Math.round((afterDone / total) * 100) : 0;

  document.getElementById("roundBeforeBtn").className = "roundbtn before" + (round === "before" ? " active" : "");
  document.getElementById("roundAfterBtn").className = "roundbtn after" + (round === "after" ? " active" : "");
  document.getElementById("roundTag").textContent = round === "before" ? "Sebelum Recovery" : "Sesudah Recovery";

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
    searchResults = POINTS.filter(function (p) { return p.id.toLowerCase().indexOf(q) !== -1; }).slice(0, 8);
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

  var exportPayload = {
    schema: "oilspill-sampling-v2", exportedAt: new Date().toISOString(),
    totalPoints: total, totalGrids: GRIDS.length, reports: state.reports, gridNotes: state.gridNotes
  };
  document.getElementById("exportLink").href = "data:application/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportPayload, null, 2));
  document.getElementById("exportLink").download = "sampling-oilspill-" + new Date().toISOString().slice(0, 10) + ".json";

  renderBottomPanel(gridStatsList);
  updateMapStyles();
}

function renderBottomPanel(gridStatsList) {
  var root = document.getElementById("bottomPanel");
  var round = state.round;

  if (state.selectedId) {
    var p = POINT_BY_ID[state.selectedId];
    var g = GRID_BY_ID[p.gridId];
    var rBefore = repOf(p.id, "before");
    var rAfter = repOf(p.id, "after");
    var active = round === "before" ? rBefore : rAfter;
    currentPhotos = active.photos;

    var badgeClass = active.issue ? "badge badge-issue" : (active.done ? "badge badge-done" : "badge badge-pending");
    var badgeLabel = active.issue ? "Bermasalah" : (active.done ? "Selesai" : "Belum selesai");
    var doneBtnClass = "donebtn" + (active.done ? " ispressed" : "");
    var toggleLabel = active.done ? "Tandai belum selesai" : "Tandai selesai";

    var gallery = active.photos.length ? active.photos.map(function (ph, idx) {
      return '<div class="thumb"><img src="' + ph.url + '" data-action="open-lightbox" data-idx="' + idx + '" alt="Foto kegiatan sampling"/>' +
        '<button type="button" class="thumb-remove" data-action="remove-photo" data-photo-id="' + esc(ph.id) + '" aria-label="Hapus foto">' + ICONS.trash + '</button></div>';
    }).join("") : "";

    root.innerHTML =
      '<button type="button" class="backbtn" data-action="back-grid">' + ICONS.back + ' Kembali ke ' + esc(g ? g.label : "ringkasan") + '</button>' +
      '<div class="detailgrid">' +
      '<div class="detailcard">' +
      '<div class="pointhead"><div class="pointid">' + esc(p.id) + '</div>' +
      '<div class="pointgrid">' + esc(g ? g.label : "") + '</div>' +
      '<div class="pointcoord">Lintang ' + p.lat.toFixed(6) + ', Bujur ' + p.lon.toFixed(6) + '</div></div>' +
      '<div class="crossrow">' +
      '<div class="crosschip"><div class="cc-label">Sebelum</div><div class="cc-val" style="color:' + (rBefore.done ? "#3BD488" : "#9FB0B9") + '">' + (rBefore.done ? "Selesai" : "Belum") + '</div></div>' +
      '<div class="crosschip"><div class="cc-label">Sesudah</div><div class="cc-val" style="color:' + (rAfter.done ? "#3BD488" : "#9FB0B9") + '">' + (rAfter.done ? "Selesai" : "Belum") + '</div></div>' +
      '</div>' +
      '<div class="tabs">' +
      '<button type="button" class="tabbtn' + (round === "before" ? " active" : "") + '" data-action="set-round" data-round="before">Sebelum Recovery</button>' +
      '<button type="button" class="tabbtn' + (round === "after" ? " active" : "") + '" data-action="set-round" data-round="after">Sesudah Recovery</button>' +
      '</div>' +
      '<div class="statusrow"><span class="' + badgeClass + '">' + badgeLabel + '</span>' +
      '<button type="button" class="' + doneBtnClass + '" data-action="toggle-done">' + ICONS.check + ' ' + toggleLabel + '</button></div>' +
      '<div class="field"><label for="pdate">Tanggal Sampling</label>' +
      '<input id="pdate" type="date" value="' + esc(active.date) + '" data-field="date"/></div>' +
      (active.done && !active.date ? '<p class="field-warn">Isi tanggal sampling untuk melengkapi catatan.</p>' : '') +
      '<div class="field"><label for="pnotes">Catatan Kendala Sampling</label>' +
      '<textarea id="pnotes" placeholder="Contoh: akses lokasi terhalang pasang air laut, alat rusak, dan sebagainya" data-field="notes">' + esc(active.notes) + '</textarea></div>' +
      '<div class="checkrow"><input id="pissue" type="checkbox" data-field="issue"' + (active.issue ? " checked" : "") + '/><label for="pissue">Tandai ada kendala pada titik ini</label></div>' +
      '</div>' +
      '<div class="detailcard">' +
      '<div class="photohead"><div><h3>Dokumentasi Foto</h3><p>' + active.photos.length + ' foto tersimpan</p></div>' +
      '<label class="uploadlabel" for="photoInput">' + ICONS.camera + ' Tambah Foto</label></div>' +
      '<input class="hiddenfile" id="photoInput" type="file" accept="image/*" multiple data-field="photos"/>' +
      (active.photos.length ? '<div class="gallery">' + gallery + '</div>' : '<div class="emptyphoto">Belum ada foto kegiatan sampling di titik ini.</div>') +
      '</div>' +
      '</div>';
    return;
  }

  if (state.selectedGridId) {
    var gr = GRID_BY_ID[state.selectedGridId];
    var stats = gridStats(gr, round);
    var members = gr.members.map(function (id) {
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
    '<p class="panel-title">Ringkasan Area Grid</p>' +
    '<p class="panel-sub">Diurutkan dari progres paling rendah pada tahap aktif. Klik salah satu area untuk melihat titik di dalamnya, atau klik langsung pada peta di atas.</p>' +
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
  root.innerHTML = '<div class="lightbox-backdrop" data-action="close-lightbox">' +
    '<img src="' + state.lightbox + '" class="lightbox-img" alt="Pratinjau foto kegiatan sampling"/>' +
    '<button type="button" class="lightbox-close" data-action="close-lightbox" aria-label="Tutup pratinjau">' + ICONS.close + '</button></div>';
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
    if (photo) { state.lightbox = photo.url; renderLightbox(); }
  }
}

function onInput(e) {
  var t = e.target;
  var field = t.getAttribute && t.getAttribute("data-field");
  if (t.id === "searchInput") { state.search = t.value; render(); return; }
  if (!field || !state.selectedId) return;
  if (field === "notes") {
    var existing = state.reports[state.selectedId] ? Object.assign({}, state.reports[state.selectedId]) : {};
    var current = existing[state.round] ? Object.assign({}, existing[state.round]) : defaultRound();
    current.notes = t.value;
    existing[state.round] = current;
    state.reports[state.selectedId] = existing;
  } else if (field === "gridnote" && state.selectedGridId) {
    state.gridNotes[state.selectedGridId] = t.value;
  }
}

function onChange(e) {
  var t = e.target;
  var field = t.getAttribute && t.getAttribute("data-field");
  if (t.id === "importInput") { handleImportInput(e); return; }
  if (!field || !state.selectedId) return;
  if (field === "date") updateReport(state.selectedId, state.round, { date: t.value });
  else if (field === "issue") updateReport(state.selectedId, state.round, { issue: t.checked });
  else if (field === "photos") { addPhotos(state.selectedId, state.round, t.files); t.value = ""; }
}

function onBlur(e) {
  var t = e.target;
  var field = t.getAttribute && t.getAttribute("data-field");
  if (field === "notes" || field === "gridnote") persist();
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

  applyTheme();
  initMap();
  applyLabelVisibility();
  render();

  document.body.addEventListener("click", onAction);
  document.body.addEventListener("input", onInput);
  document.body.addEventListener("change", onChange);
  document.body.addEventListener("focusout", onBlur, true);
}

document.addEventListener("DOMContentLoaded", boot);
