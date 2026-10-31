"use strict";

/* ---------------------------------------------------------------------
   Temporary grids. The 17 grids from GRID.kml stay fixed; extra grids
   (starting with Grid 14 from drawing New_GRID_14_RC-86, sheet 1) live
   in state.customGrids and can be redrawn, moved, renamed, hidden or
   deleted from the map. A hidden grid and its points drop out of GRIDS
   and allPoints(), so the map, summaries, tables and every export skip
   them, while their data stays saved and comes back when shown again.
   Edits carry an updatedAt so Impor JSON and the repo sync keep the
   newest version; a deleted grid stays as a small tombstone so the
   deletion also reaches other devices.

   Grid 14 was placed by fitting the drawing's 73 planned sample points
   to the same points from HYB_Sample_Point.kml (affine fit, RMS 0,33 m),
   so it lines up with the existing grids; its lower corners are snapped
   to the corners it shares with Grid 11 and Grid 12.
--------------------------------------------------------------------- */
var BASE_GRIDS = GRIDS.slice();
var GRID14_SEED = {
  id: "g14", label: "Grid 14",
  ring: [[-0.8545521, 117.2651809], [-0.8546233, 117.2662633], [-0.854818, 117.266216], [-0.854798, 117.265993], [-0.854739, 117.265191], [-0.8545521, 117.2651809]]
};
var GRID14_POINTS = [
  { id: "GRID14.1", lat: -0.8546648, lon: 117.2653267 },
  { id: "GRID14.2", lat: -0.8546893, lon: 117.2655146 },
  { id: "GRID14.3", lat: -0.8546251, lon: 117.2657398 },
  { id: "GRID14.4", lat: -0.8547262, lon: 117.2659453 },
  { id: "GRID14.5", lat: -0.8547216, lon: 117.2661282 }
];
var gridEdit = null;
var gridMgrOpen = false;

function customGridById(id) {
  for (var i = 0; i < state.customGrids.length; i++) if (state.customGrids[i].id === id) return state.customGrids[i];
  return null;
}
function liveCustomGrids() { return state.customGrids.filter(function (g) { return !g.deleted; }); }
function gridPoints(id) { return state.customPoints.filter(function (p) { return p.gridId === id; }); }

function openRing(r) {
  var a = r.slice();
  if (a.length > 1 && a[0][0] === a[a.length - 1][0] && a[0][1] === a[a.length - 1][1]) a.pop();
  return a;
}
function closeRing(r) {
  var a = openRing(r).map(function (c) { return [c[0], c[1]]; });
  if (a.length) a.push([a[0][0], a[0][1]]);
  return a;
}

function normalizeCustomGrid(g) {
  if (!g || !g.id) return null;
  if (g.deleted) return { id: String(g.id), deleted: true, updatedAt: g.updatedAt || 0 };
  var ring = (g.ring || []).filter(function (c) { return Array.isArray(c) && isFinite(c[0]) && isFinite(c[1]); })
    .map(function (c) { return [Number(c[0]), Number(c[1])]; });
  ring = openRing(ring);
  if (ring.length < 3) return null;
  return {
    id: String(g.id), label: String(g.label || "Grid sementara").slice(0, 60), ring: closeRing(ring),
    hidden: !!g.hidden, temp: true, members: [], createdAt: g.createdAt || 0, updatedAt: g.updatedAt || 0
  };
}

// Adds Grid 14 and its five points once per device; later edits, hiding
// or deleting are never undone by the seed (updatedAt 0 loses every merge).
function seedCustomGrids() {
  state.customGrids = (state.customGrids || []).map(normalizeCustomGrid).filter(Boolean);
  state.seeded = state.seeded || {};
  if (state.seeded.g14) return;
  if (!customGridById("g14")) state.customGrids.push(normalizeCustomGrid(GRID14_SEED));
  GRID14_POINTS.forEach(function (p) {
    if (getPoint(p.id)) return;
    state.customPoints.push({ id: p.id, gridId: "g14", type: "soil", lat: p.lat, lon: p.lon, custom: true, createdAt: 0, updatedAt: 0 });
  });
  state.seeded.g14 = true;
  persist();
}

function rebuildGrids() {
  GRIDS.length = 0;
  BASE_GRIDS.forEach(function (g) { GRIDS.push(g); });
  state.customGrids.forEach(function (cg) { if (!cg.deleted && !cg.hidden) GRIDS.push(cg); });
  Object.keys(GRID_BY_ID).forEach(function (k) { delete GRID_BY_ID[k]; });
  GRIDS.forEach(function (g) { GRID_BY_ID[g.id] = g; GRID_AREA[g.id] = polygonAreaM2(g.ring); });
  if (typeof labDataVersion !== "undefined") labDataVersion++;
}

// Brings map layers in line with GRIDS / allPoints() after a change.
function syncMapGrids() {
  if (!map) return;
  Object.keys(gridLayers).forEach(function (id) {
    if (!GRID_BY_ID[id]) { map.removeLayer(gridLayers[id]); delete gridLayers[id]; }
  });
  GRIDS.forEach(function (g) {
    if (!gridLayers[g.id]) addGridLayer(g, true);
    else if (g.temp) gridLayers[g.id].setLatLngs(g.ring);
  });
  var live = {};
  allPoints().forEach(function (p) { live[p.id] = p; });
  Object.keys(markerLayers).forEach(function (id) {
    if (!live[id]) { map.removeLayer(markerLayers[id]); delete markerLayers[id]; }
    else markerLayers[id].setLatLng([live[id].lat, live[id].lon]);
  });
  allPoints().forEach(function (p) { if (!markerLayers[p.id]) addPointMarker(p); });
  if (typeof labMap !== "undefined") { labMap.markerKey = ""; labMap.surfaceKey = ""; labMap.windKey = ""; }
}

function refreshGrids() {
  rebuildGrids();
  if (state.selectedGridId && !GRID_BY_ID[state.selectedGridId]) state.selectedGridId = null;
  if (state.selectedId && !allPoints().some(function (p) { return p.id === state.selectedId; })) state.selectedId = null;
  syncMapGrids();
}

function commitGrids(msg) {
  persist();
  refreshGrids();
  render();
  renderGridManager();
  if (msg) showToast("success", msg);
}

function nextGridName() {
  var max = 0;
  GRIDS.concat(liveCustomGrids()).forEach(function (g) {
    var m = /^Grid\s+(\d+)/i.exec(g.label || "");
    if (m) max = Math.max(max, Number(m[1]));
  });
  return "Grid " + (max + 1);
}

/* ---- Hide, rename, delete ---- */
function setGridHidden(id, hidden) {
  var cg = customGridById(id);
  if (!cg || cg.deleted) return;
  cg.hidden = hidden;
  cg.updatedAt = Date.now();
  commitGrids(cg.label + (hidden ? " disembunyikan. Datanya tetap tersimpan." : " ditampilkan kembali."));
}

function renameGrid(id, name) {
  var cg = customGridById(id);
  name = (name || "").trim().slice(0, 60);
  if (!cg || cg.deleted || !name || name === cg.label) return;
  var clash = GRIDS.concat(liveCustomGrids()).some(function (g) { return g.id !== id && g.label.toLowerCase() === name.toLowerCase(); });
  if (clash) { showToast("warn", "Nama " + name + " sudah dipakai grid lain."); renderGridManager(); return; }
  cg.label = name;
  cg.updatedAt = Date.now();
  commitGrids("Nama grid diubah menjadi " + name + ".");
}

function deleteGrid(id) {
  var cg = customGridById(id);
  if (!cg || cg.deleted) return;
  var pts = gridPoints(id);
  if (!window.confirm("Hapus " + cg.label + (pts.length ? " beserta " + pts.length + " titik dan catatan sampling di dalamnya" : "") + "? Tindakan ini tidak dapat dibatalkan. Bila hanya ingin disimpan untuk nanti, pakai Sembunyikan.")) return;
  pts.forEach(function (p) { delete state.reports[p.id]; });
  state.customPoints = state.customPoints.filter(function (p) { return p.gridId !== id; });
  var i = state.customGrids.indexOf(cg);
  state.customGrids[i] = { id: id, deleted: true, updatedAt: Date.now() };
  commitGrids(cg.label + " telah dihapus.");
}

function focusCustomGrid(id) {
  var cg = customGridById(id);
  if (!cg || cg.deleted || !map) return;
  if (cg.hidden) { showToast("info", cg.label + " sedang disembunyikan. Tampilkan dulu untuk melihatnya di peta."); return; }
  closeGridManager();
  map.flyToBounds(L.latLngBounds(cg.ring), { padding: [80, 80], duration: 0.6, maxZoom: 21 });
  var ms = document.querySelector(".mapsection");
  if (ms) ms.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ---- Manager dialog ---- */
function openGridManager() {
  if (gridEdit) { showToast("info", "Selesaikan atau batalkan edit grid terlebih dahulu."); return; }
  gridMgrOpen = true;
  renderGridManager();
}
function closeGridManager() {
  gridMgrOpen = false;
  renderGridManager();
}

function renderGridManager() {
  updateGridMgrButton();
  var root = document.getElementById("gridMgrRoot");
  if (!root) return;
  if (!gridMgrOpen) { root.innerHTML = ""; return; }
  var list = liveCustomGrids();
  var rows = list.map(function (g) {
    var n = gridPoints(g.id).length;
    return '<div class="gm-row' + (g.hidden ? ' gm-hidden' : '') + '">' +
      '<label class="gm-vis" title="' + (g.hidden ? 'Tampilkan grid ini' : 'Sembunyikan grid ini') + '"><input type="checkbox" data-field="gm-visible" data-id="' + esc(g.id) + '"' + (g.hidden ? '' : ' checked') + '/><span>' + (g.hidden ? 'Disembunyikan' : 'Tampil') + '</span></label>' +
      '<div class="gm-main"><input type="text" class="gm-name" maxlength="60" value="' + esc(g.label) + '" data-field="gm-name" data-id="' + esc(g.id) + '" aria-label="Nama grid"/>' +
      '<div class="gm-meta">' + n + ' titik · ' + formatArea(polygonAreaM2(g.ring)) + (g.updatedAt ? ' · diubah ' + esc(formatDateID(new Date(g.updatedAt).toISOString().slice(0, 10))) : '') + '</div></div>' +
      '<div class="gm-actions">' +
      '<button type="button" class="btn btn-sm" data-action="gm-edit" data-id="' + esc(g.id) + '">Edit bentuk &amp; posisi</button>' +
      '<button type="button" class="btn btn-sm" data-action="gm-focus" data-id="' + esc(g.id) + '"' + (g.hidden ? ' disabled' : '') + '>Lihat di peta</button>' +
      '<button type="button" class="btn btn-sm gm-del" data-action="gm-delete" data-id="' + esc(g.id) + '">Hapus</button>' +
      '</div></div>';
  }).join("");
  root.innerHTML = '<div class="modal-backdrop" data-action="gm-backdrop">' +
    '<div class="modal" role="dialog" aria-modal="true" aria-labelledby="gmTitle">' +
    '<div class="modal-head"><h3 id="gmTitle">Kelola Grid Sementara</h3>' +
    '<button type="button" class="iconbtn" data-action="gm-close" aria-label="Tutup">' + ICONS.close + '</button></div>' +
    '<div class="modal-body">' +
    '<p class="formhint">Grid sementara bisa diganti nama, diubah bentuk dan posisinya, disembunyikan, atau dihapus. Grid yang disembunyikan beserta titiknya tidak tampil di peta, ringkasan, tabel, maupun ekspor PDF dan Excel, tetapi datanya tetap tersimpan dan kembali saat ditampilkan. Perubahan ikut dalam Ekspor JSON sehingga bisa dibagikan ke tim. ' + BASE_GRIDS.length + ' grid dari data KML tetap dan tidak diubah di sini.</p>' +
    (rows ? '<div class="gm-list">' + rows + '</div>' : '<p class="formhint">Belum ada grid sementara.</p>') +
    '<p class="formhint gm-tip">Untuk menambah titik ke grid sementara, pakai tombol Tambah Titik di Ringkasan Area Grid dan pilih gridnya.</p>' +
    '</div>' +
    '<div class="modal-foot"><button type="button" class="btn" data-action="gm-draw">' + ICONS.plus + ' Gambar grid baru</button>' +
    '<div class="modal-foot-right"><button type="button" class="btn btn-primary" data-action="gm-close">Selesai</button></div></div>' +
    '</div></div>';
}

function updateGridMgrButton() {
  var btn = document.getElementById("gridMgrBtn");
  if (!btn) return;
  var hidden = liveCustomGrids().filter(function (g) { return g.hidden; }).length;
  btn.innerHTML = 'Kelola Grid' + (hidden ? ' <span class="gm-count" title="Grid sementara yang disembunyikan">' + hidden + ' tersembunyi</span>' : '');
}

// Shown in a temporary grid's popup and detail panel.
function gridTempActionsHtml(g, compact) {
  if (!g || !g.temp) return "";
  return '<div class="gm-inline' + (compact ? ' gm-inline-compact' : '') + '"><span class="gm-badge">Grid sementara</span>' +
    '<button type="button" class="' + (compact ? 'coord-btn' : 'btn btn-sm') + '" data-action="gm-edit" data-id="' + esc(g.id) + '">Edit bentuk &amp; posisi</button>' +
    '<button type="button" class="' + (compact ? 'coord-btn' : 'btn btn-sm') + '" data-action="gm-hide" data-id="' + esc(g.id) + '">Sembunyikan</button>' +
    (compact ? '' : '<button type="button" class="btn btn-sm" data-action="gm-open">Ganti nama &amp; lainnya</button>') +
    '</div>';
}

/* ---------------------------------------------------------------------
   Editing on the map: square handles move corners, round handles on the
   edges add a corner (click or drag), the centre handle moves the whole
   grid (with its points unless switched off), and the grid's points can
   be dragged one by one. Nothing is saved until Simpan; Batal restores.
--------------------------------------------------------------------- */
function geIcon(cls, html, size) {
  return L.divIcon({ className: "ge-handle " + cls, html: html || "", iconSize: [size, size], iconAnchor: [size / 2, size / 2] });
}

function startGridEdit(id, isNew) {
  var cg = customGridById(id);
  if (!cg || cg.deleted || !map) return;
  if (state.pickMode) cancelPick();
  gridMgrOpen = false;
  renderGridManager();
  if (cg.hidden) { cg.hidden = false; refreshGrids(); }
  map.closePopup();
  gridEdit = {
    id: id, isNew: !!isNew, name: cg.label, ring: openRing(cg.ring).map(function (c) { return [c[0], c[1]]; }),
    origRing: closeRing(cg.ring), origPts: gridPoints(id).map(function (p) { return { id: p.id, lat: p.lat, lon: p.lon }; }),
    movePoints: true, selVertex: null, layer: L.layerGroup().addTo(map), vertexMarkers: [], midMarkers: [], center: null
  };
  map.flyToBounds(L.latLngBounds(cg.ring), { padding: [90, 90], duration: 0.5, maxZoom: 21 });
  geDrawHandles();
  renderGridEditBar();
  render();
}

function startGridDraw() {
  if (!map) return;
  if (state.pickMode) cancelPick();
  gridMgrOpen = false;
  renderGridManager();
  map.closePopup();
  map.doubleClickZoom.disable();
  gridEdit = { draw: true, ring: [], layer: L.layerGroup().addTo(map) };
  renderGridEditBar();
  var ms = document.querySelector(".mapsection");
  if (ms) ms.scrollIntoView({ behavior: "smooth", block: "start" });
}

function geDrawPreview() {
  var ge = gridEdit;
  ge.layer.clearLayers();
  if (ge.ring.length >= 2) {
    var shape = ge.ring.length >= 3 ? L.polygon(ge.ring, { color: "#FFD400", weight: 2.5, dashArray: "6 5", fillOpacity: 0.12, interactive: false })
      : L.polyline(ge.ring, { color: "#FFD400", weight: 2.5, dashArray: "6 5", interactive: false });
    shape.addTo(ge.layer);
  }
  ge.ring.forEach(function (c, i) {
    var m = L.marker(c, { draggable: true, icon: geIcon("ge-vertex", "", 14), zIndexOffset: 3000, keyboard: false });
    m.on("drag", function (ev) { ge.ring[i] = [ev.latlng.lat, ev.latlng.lng]; });
    m.on("dragend", geDrawPreview);
    m.addTo(ge.layer);
  });
}

function gePoints() { return gridEdit && gridEdit.id ? gridPoints(gridEdit.id) : []; }

function geDrawHandles() {
  var ge = gridEdit;
  ge.layer.clearLayers();
  ge.vertexMarkers = []; ge.midMarkers = [];
  ge.ring.forEach(function (c, i) {
    var m = L.marker(c, { draggable: true, icon: geIcon("ge-vertex" + (ge.selVertex === i ? " sel" : ""), "", 14), zIndexOffset: 3000, keyboard: false, title: "Seret untuk mengubah sudut, klik untuk memilih" });
    m.on("drag", function (ev) { ge.ring[i] = [ev.latlng.lat, ev.latlng.lng]; geApplyShape(); });
    m.on("dragend", geDrawHandles);
    m.on("click", function () { ge.selVertex = ge.selVertex === i ? null : i; geDrawHandles(); renderGridEditBar(); });
    m.addTo(ge.layer);
    ge.vertexMarkers.push(m);
  });
  ge.ring.forEach(function (c, i) {
    var nx = ge.ring[(i + 1) % ge.ring.length];
    var mid = [(c[0] + nx[0]) / 2, (c[1] + nx[1]) / 2];
    var m = L.marker(mid, { draggable: true, icon: geIcon("ge-mid", "", 12), zIndexOffset: 2500, keyboard: false, title: "Klik atau seret untuk menambah sudut" });
    var at = null;
    m.on("click", function () { ge.ring.splice(i + 1, 0, mid); ge.selVertex = null; geApplyShape(); geDrawHandles(); });
    m.on("dragstart", function () { at = i + 1; ge.ring.splice(at, 0, mid); });
    m.on("drag", function (ev) { if (at != null) { ge.ring[at] = [ev.latlng.lat, ev.latlng.lng]; geApplyShape(); } });
    m.on("dragend", function () { at = null; ge.selVertex = null; geDrawHandles(); });
    m.addTo(ge.layer);
    ge.midMarkers.push(m);
  });
  var cm = L.marker(ringCentroid(ge.ring), { draggable: true, icon: geIcon("ge-center", "✥", 30), zIndexOffset: 3500, keyboard: false, title: "Seret untuk memindahkan seluruh grid" });
  var start = null;
  cm.on("dragstart", function () {
    start = { ll: cm.getLatLng(), ring: ge.ring.map(function (c) { return [c[0], c[1]]; }), pts: gePoints().map(function (p) { return [p.lat, p.lon]; }) };
  });
  cm.on("drag", function (ev) {
    if (!start) return;
    var dLat = ev.latlng.lat - start.ll.lat, dLon = ev.latlng.lng - start.ll.lng;
    ge.ring = start.ring.map(function (c) { return [c[0] + dLat, c[1] + dLon]; });
    if (ge.movePoints) {
      gePoints().forEach(function (p, k) {
        p.lat = start.pts[k][0] + dLat; p.lon = start.pts[k][1] + dLon;
        if (markerLayers[p.id]) markerLayers[p.id].setLatLng([p.lat, p.lon]);
        if (ge.pointMarkers && ge.pointMarkers[p.id]) ge.pointMarkers[p.id].setLatLng([p.lat, p.lon]);
      });
    }
    geApplyShape();
    ge.vertexMarkers.forEach(function (vm, k) { vm.setLatLng(ge.ring[k]); });
  });
  cm.on("dragend", function () { start = null; geDrawHandles(); });
  cm.addTo(ge.layer);
  ge.pointMarkers = {};
  gePoints().forEach(function (p) {
    var pm = L.marker([p.lat, p.lon], { draggable: true, icon: L.divIcon({ className: "ge-handle ge-point", html: "", iconSize: [14, 14], iconAnchor: [7, 7] }), zIndexOffset: 2800, keyboard: false, title: "Seret untuk menggeser titik " + p.id });
    pm.on("drag", function (ev) {
      p.lat = ev.latlng.lat; p.lon = ev.latlng.lng;
      if (markerLayers[p.id]) markerLayers[p.id].setLatLng(ev.latlng);
    });
    pm.addTo(ge.layer);
    ge.pointMarkers[p.id] = pm;
  });
}

// Live update of the polygon while a handle is dragged (handles are rebuilt on dragend).
function geApplyShape() {
  var ge = gridEdit, cg = customGridById(ge.id);
  if (!cg) return;
  cg.ring = closeRing(ge.ring);
  if (gridLayers[ge.id]) gridLayers[ge.id].setLatLngs(cg.ring);
}

function geTeardown() {
  if (!gridEdit) return;
  if (map) { map.removeLayer(gridEdit.layer); map.doubleClickZoom.enable(); }
  gridEdit = null;
  renderGridEditBar();
}

function geSave() {
  var ge = gridEdit, cg = customGridById(ge.id);
  if (!cg) { geTeardown(); return; }
  if (ge.ring.length < 3) { showToast("warn", "Grid perlu minimal 3 sudut."); return; }
  var name = (ge.name || "").trim().slice(0, 60) || cg.label;
  var clash = GRIDS.concat(liveCustomGrids()).some(function (g) { return g.id !== cg.id && g.label.toLowerCase() === name.toLowerCase(); });
  if (clash) { showToast("warn", "Nama " + name + " sudah dipakai grid lain."); return; }
  var now = Date.now();
  cg.ring = closeRing(ge.ring);
  cg.label = name;
  cg.updatedAt = now;
  gePoints().forEach(function (p) {
    var o = ge.origPts.filter(function (x) { return x.id === p.id; })[0];
    if (!o || o.lat !== p.lat || o.lon !== p.lon) p.updatedAt = now;
  });
  geTeardown();
  commitGrids(name + " disimpan.");
}

function geCancel() {
  var ge = gridEdit;
  if (!ge) return;
  if (!ge.draw) {
    var cg = customGridById(ge.id);
    if (cg && ge.isNew) state.customGrids.splice(state.customGrids.indexOf(cg), 1);
    else if (cg) cg.ring = ge.origRing;
    ge.origPts.forEach(function (o) {
      var p = getPoint(o.id);
      if (p) { p.lat = o.lat; p.lon = o.lon; }
    });
  }
  geTeardown();
  refreshGrids();
  render();
}

function geFinishDraw() {
  var ge = gridEdit;
  if (ge.ring.length < 3) { showToast("warn", "Klik minimal 3 sudut di peta."); return; }
  var now = Date.now();
  var cg = normalizeCustomGrid({ id: "cg" + now.toString(36), label: nextGridName(), ring: ge.ring, createdAt: now, updatedAt: now });
  state.customGrids.push(cg);
  geTeardown();
  refreshGrids();
  startGridEdit(cg.id, true);
}

// Map clicks while drawing add a corner; while editing they clear the corner selection.
function gridEditMapClick(latlng) {
  var ge = gridEdit;
  if (ge.draw) { ge.ring.push([latlng.lat, latlng.lng]); geDrawPreview(); renderGridEditBar(); return; }
  if (ge.selVertex != null) { ge.selVertex = null; geDrawHandles(); renderGridEditBar(); }
}

function renderGridEditBar() {
  var el = document.getElementById("gridEditBar");
  if (!el) return;
  var ge = gridEdit;
  if (!ge) { el.style.display = "none"; el.innerHTML = ""; return; }
  el.style.display = "flex";
  if (ge.draw) {
    el.innerHTML = '<div class="ge-title">Gambar grid baru</div>' +
      '<div class="ge-hint">Klik peta untuk menambah sudut grid (minimal 3), lalu tekan Selesai. Sudut bisa diseret untuk dirapikan.</div>' +
      '<div class="ge-row"><span class="ge-count">' + ge.ring.length + ' sudut</span>' +
      '<button type="button" data-action="ge-undo"' + (ge.ring.length ? '' : ' disabled') + '>Urungkan sudut</button>' +
      '<button type="button" data-action="ge-cancel">Batal</button>' +
      '<button type="button" class="ge-primary" data-action="ge-finish"' + (ge.ring.length >= 3 ? '' : ' disabled') + '>Selesai</button></div>';
    return;
  }
  var n = gePoints().length;
  el.innerHTML = '<div class="ge-title"><span>Edit grid</span><input type="text" maxlength="60" data-field="ge-name" value="' + esc(ge.name) + '" aria-label="Nama grid"/></div>' +
    '<div class="ge-hint">Seret kotak putih untuk menggeser sudut · klik bulatan di tengah garis untuk menambah sudut · seret ✥ untuk memindahkan seluruh grid' + (n ? ' · seret titik kuning untuk menggeser titik sampling' : '') + '.</div>' +
    '<div class="ge-row">' +
    (n ? '<label class="ge-check"><input type="checkbox" data-field="ge-movepts"' + (ge.movePoints ? ' checked' : '') + '/> ' + n + ' titik ikut dipindah</label>' : '') +
    '<button type="button" data-action="ge-del-vertex"' + (ge.selVertex != null && ge.ring.length > 3 ? '' : ' disabled') + ' title="Klik salah satu sudut dulu untuk memilihnya">Hapus sudut terpilih</button>' +
    '<button type="button" data-action="ge-cancel">Batal</button>' +
    '<button type="button" class="ge-primary" data-action="ge-save">Simpan</button></div>';
}

/* ---- Event routing (called from app.js) ---- */
function gridOnAction(action, el, e) {
  var id = el.getAttribute("data-id");
  if (action === "gm-open") openGridManager();
  else if (action === "gm-close") closeGridManager();
  else if (action === "gm-backdrop") { if (e.target === el) closeGridManager(); }
  else if (action === "gm-edit") startGridEdit(id, false);
  else if (action === "gm-focus") focusCustomGrid(id);
  else if (action === "gm-delete") deleteGrid(id);
  else if (action === "gm-hide") { map && map.closePopup(); setGridHidden(id, true); }
  else if (action === "gm-draw") startGridDraw();
  else if (!gridEdit) return;
  else if (action === "ge-save") geSave();
  else if (action === "ge-cancel") geCancel();
  else if (action === "ge-finish") geFinishDraw();
  else if (action === "ge-undo") { gridEdit.ring.pop(); geDrawPreview(); renderGridEditBar(); }
  else if (action === "ge-del-vertex") {
    var ge = gridEdit;
    if (ge.selVertex == null || ge.ring.length <= 3) return;
    ge.ring.splice(ge.selVertex, 1);
    ge.selVertex = null;
    geApplyShape(); geDrawHandles(); renderGridEditBar();
  }
}

function gridOnField(field, t, evType) {
  if (field === "ge-name" && gridEdit) { gridEdit.name = t.value; return; }
  if (field === "ge-movepts" && gridEdit && evType === "change") { gridEdit.movePoints = t.checked; return; }
  if (field === "gm-visible" && evType === "change") { setGridHidden(t.getAttribute("data-id"), !t.checked); return; }
  if (field === "gm-name" && evType === "change") { renameGrid(t.getAttribute("data-id"), t.value); return; }
}

// Merges grids from an imported or synced JSON file; returns how many changed.
function mergeCustomGrids(list) {
  var changed = 0;
  (Array.isArray(list) ? list : []).forEach(function (raw) {
    var inc = normalizeCustomGrid(raw);
    if (!inc) return;
    var cur = customGridById(inc.id);
    if (gridEdit && gridEdit.id === inc.id) return;
    if (!cur) { state.customGrids.push(inc); changed++; }
    else if ((inc.updatedAt || 0) > (cur.updatedAt || 0)) { state.customGrids[state.customGrids.indexOf(cur)] = inc; changed++; }
  });
  return changed;
}
