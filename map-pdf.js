"use strict";

/* ---------------------------------------------------------------------
   Map PDF export for both views (Progres Sampling and Hasil Pemantauan
   Lab). A dialog shows a live preview of the A3 print sheet: the map can
   be zoomed (buttons, slider, mouse wheel) and panned (drag) or matched
   to the on-screen map, and every map layer and side box can be turned
   on or off. The legend only lists layers that are actually drawn.
   Printing hands the finished sheet to the browser's own print dialog,
   so "Save as PDF" produces the file. Coordinates are plain WGS84
   latitude/longitude, the same frame the rest of the app uses.
--------------------------------------------------------------------- */
var PDF_SHEET_W = 404, PDF_SHEET_H = 281;
var PDF_MAP_H = 271, PDF_MAP_W_KOP = 299, PDF_MAP_W_FULL = 394;
var PX_PER_MM = 96 / 25.4;
var PDF_ZOOM_MIN = 0.5, PDF_ZOOM_MAX = 16, PDF_ZOOM_STEP = 1.25;
var PDF_GRID_STROKE = "#E6007E";
var pdfMemo = {};
var pdfUid = 0;
var pdfSurfaceUrl = null;
var pdfRaf = 0;

var PDF_LAYERS = {
  progress: [
    { key: "basemap", label: "Citra udara drone (latar)" },
    { key: "gridFill", label: "Isi warna progres grid" },
    { key: "gridLines", label: "Batas grid" },
    { key: "gridLabels", label: "Nama grid" },
    { key: "points", label: "Titik sampling" },
    { key: "pointLabels", label: "Kode titik" },
    { key: "actual", label: "Lokasi sampling aktual" },
    { key: "graticule", label: "Garis koordinat" },
    { key: "northScale", label: "Panah utara & skala batang" }
  ],
  lab: [
    { key: "basemap", label: "Citra udara drone (latar)" },
    { key: "surface", label: "Gradasi sebaran (interpolasi)" },
    { key: "gridLines", label: "Batas grid" },
    { key: "gridLabels", label: "Nama grid" },
    { key: "points", label: "Titik uji lab (warna nilai)" },
    { key: "valueLabels", label: "Label kode & nilai" },
    { key: "labelsExceedOnly", label: "Label hanya titik > TK-C", sub: "valueLabels" },
    { key: "untested", label: "Titik belum diuji" },
    { key: "water", label: "Air permukaan" },
    { key: "leak", label: "Titik bocor" },
    { key: "windSector", label: "Sektor & panah arah angin" },
    { key: "rings", label: "Lingkaran jarak dari titik bocor" },
    { key: "graticule", label: "Garis koordinat" },
    { key: "northScale", label: "Panah utara & skala batang" }
  ]
};
var PDF_BOXES = {
  progress: [
    { key: "legend", label: "Legenda" },
    { key: "coords", label: "Parameter koordinat" },
    { key: "summary", label: "Ringkasan" },
    { key: "grids", label: "Progres per grid" },
    { key: "title", label: "Kotak judul & kode QR" }
  ],
  lab: [
    { key: "legend", label: "Legenda" },
    { key: "coords", label: "Parameter koordinat" },
    { key: "summary", label: "Ringkasan hasil" },
    { key: "analysis", label: "Analisis titik bocor & arah angin" },
    { key: "grids", label: "Hasil per grid" },
    { key: "title", label: "Kotak judul & kode QR" }
  ]
};

// Defaults follow what is switched on for the map on screen.
function pdfDefaultLayers(view) {
  if (view === "lab") {
    var cfg = state.labCfg;
    return {
      basemap: true, surface: cfg.showSurface, gridLines: true, gridLabels: state.showGridLabels, points: true,
      valueLabels: cfg.showLabels, labelsExceedOnly: false, untested: true, water: true,
      leak: cfg.showWind, windSector: cfg.showWind, rings: cfg.showWind, graticule: true, northScale: true
    };
  }
  return {
    basemap: true, gridFill: false, gridLines: true, gridLabels: state.showGridLabels, points: true,
    pointLabels: state.showPointLabels, actual: false, graticule: true, northScale: true
  };
}
function pdfDefaultBoxes(view) {
  var b = {};
  PDF_BOXES[view].forEach(function (x) { b[x.key] = true; });
  return b;
}

function f2(n) { return n.toFixed(2); }

/* ---- Frame: projection from lat/lon to millimetres on the sheet ---- */
function pdfBaseExtent(view) {
  var lats = [], lons = [];
  GRIDS.forEach(function (g) { g.ring.forEach(function (c) { lats.push(c[0]); lons.push(c[1]); }); });
  allPoints().forEach(function (p) { lats.push(p.lat); lons.push(p.lon); });
  if (view === "lab") { lats.push(state.labCfg.leakLat); lons.push(state.labCfg.leakLon); }
  var e = { minLat: Math.min.apply(null, lats), maxLat: Math.max.apply(null, lats), minLon: Math.min.apply(null, lons), maxLon: Math.max.apply(null, lons) };
  var padLat = (e.maxLat - e.minLat) * 0.12, padLon = (e.maxLon - e.minLon) * 0.12;
  e.minLat -= padLat; e.maxLat += padLat; e.minLon -= padLon; e.maxLon += padLon;
  return e;
}

function pdfHasKop(d) {
  return PDF_BOXES[d.view].some(function (b) { return d.boxes[b.key]; });
}

function pdfFrame(d) {
  var e = d.ext, W = pdfHasKop(d) ? PDF_MAP_W_KOP : PDF_MAP_W_FULL, H = PDF_MAP_H;
  var midLat = (e.minLat + e.maxLat) / 2;
  var mLon = mPerDegLon(midLat), mLat = MAP_SVG_MPERDEG_LAT;
  var fit = Math.min(W / ((e.maxLon - e.minLon) * mLon), H / ((e.maxLat - e.minLat) * mLat));
  var s = fit * d.zoom, c = d.center;
  return {
    w: W, h: H, s: s, fit: fit, mLon: mLon, mLat: mLat,
    minLon: c[1] - W / 2 / (mLon * s), maxLon: c[1] + W / 2 / (mLon * s),
    minLat: c[0] - H / 2 / (mLat * s), maxLat: c[0] + H / 2 / (mLat * s),
    p: function (lat, lon) { return [W / 2 + (lon - c[1]) * mLon * s, H / 2 + (c[0] - lat) * mLat * s]; }
  };
}

function pdfPrintScale(F) {
  var n = 1000 / F.s;
  return n >= 1000 ? Math.round(n / 100) * 100 : Math.max(10, Math.round(n / 10) * 10);
}

/* ---- Shared map pieces ---- */
function pdfSvgOpen(F) {
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + F.w + ' ' + F.h + '" width="' + F.w + 'mm" height="' + F.h + 'mm" font-family="Arial, sans-serif">' +
    '<rect x="0" y="0" width="' + F.w + '" height="' + F.h + '" fill="#eef1f2"/>';
}

function pdfBasemapSvg(F) {
  var tl = F.p(IMAGE_BOUNDS[1][0], IMAGE_BOUNDS[0][1]);
  var br = F.p(IMAGE_BOUNDS[0][0], IMAGE_BOUNDS[1][1]);
  return '<image href="' + BASEMAP_URL + '" x="' + f2(tl[0]) + '" y="' + f2(tl[1]) + '" width="' + f2(br[0] - tl[0]) + '" height="' + f2(br[1] - tl[1]) + '" preserveAspectRatio="none"/>';
}

function pdfGratStep(range) {
  var steps = [0.00005, 0.0001, 0.0002, 0.0005, 0.001, 0.002, 0.005, 0.01];
  for (var i = 0; i < steps.length; i++) if (range / steps[i] <= 7) return steps[i];
  return steps[steps.length - 1];
}

function pdfGraticuleSvg(F) {
  var parts = [];
  var stepLat = pdfGratStep(F.maxLat - F.minLat), stepLon = pdfGratStep(F.maxLon - F.minLon);
  var decLat = stepLat < 0.0001 ? 5 : 4, decLon = stepLon < 0.0001 ? 5 : 4;
  var gTick = 'stroke="#E6007E" stroke-width="0.25"';
  var gCross = 'stroke="#E6007E" stroke-width="0.12" stroke-opacity="0.45"';
  var gText = 'font-size="2.4" fill="#E6007E" stroke="#fff" stroke-width="0.5" paint-order="stroke"';
  var TICK = 2.2, i, y, x;
  var lats = [], lons = [];
  for (i = Math.ceil(F.minLat / stepLat); i * stepLat <= F.maxLat; i++) lats.push(i * stepLat);
  for (i = Math.ceil(F.minLon / stepLon); i * stepLon <= F.maxLon; i++) lons.push(i * stepLon);
  lats.forEach(function (la) {
    y = F.p(la, F.minLon)[1];
    parts.push('<line x1="0" y1="' + f2(y) + '" x2="' + TICK + '" y2="' + f2(y) + '" ' + gTick + '/>');
    parts.push('<line x1="' + f2(F.w - TICK) + '" y1="' + f2(y) + '" x2="' + F.w + '" y2="' + f2(y) + '" ' + gTick + '/>');
    parts.push('<text x="' + f2(TICK + 0.8) + '" y="' + f2(y - 0.6) + '" ' + gText + '>' + Math.abs(la).toFixed(decLat) + '°' + (la < 0 ? 'S' : 'N') + '</text>');
  });
  lons.forEach(function (lo) {
    x = F.p(F.minLat, lo)[0];
    var ty = F.h - TICK - 0.8;
    parts.push('<line x1="' + f2(x) + '" y1="0" x2="' + f2(x) + '" y2="' + TICK + '" ' + gTick + '/>');
    parts.push('<line x1="' + f2(x) + '" y1="' + f2(F.h - TICK) + '" x2="' + f2(x) + '" y2="' + F.h + '" ' + gTick + '/>');
    parts.push('<text x="' + f2(x + 0.6) + '" y="' + f2(ty) + '" ' + gText + ' transform="rotate(-90 ' + f2(x) + ' ' + f2(ty) + ')">' + lo.toFixed(decLon) + '°E</text>');
  });
  lats.forEach(function (la) {
    lons.forEach(function (lo) {
      var c = F.p(la, lo);
      parts.push('<line x1="' + f2(c[0] - 1.4) + '" y1="' + f2(c[1]) + '" x2="' + f2(c[0] + 1.4) + '" y2="' + f2(c[1]) + '" ' + gCross + '/>');
      parts.push('<line x1="' + f2(c[0]) + '" y1="' + f2(c[1] - 1.4) + '" x2="' + f2(c[0]) + '" y2="' + f2(c[1] + 1.4) + '" ' + gCross + '/>');
    });
  });
  return parts.join("");
}

function pdfNorthScaleSvg(F) {
  var parts = [];
  var naX = F.w - 14, naY = 16;
  parts.push('<g transform="translate(' + naX + ',' + naY + ')">' +
    '<circle cx="0" cy="-2.5" r="9" fill="#fff" fill-opacity="0.8"/>' +
    '<polygon points="0,-9 3,4 0,1 -3,4" fill="#111"/>' +
    '<text x="0" y="-11.5" font-size="4" font-weight="700" text-anchor="middle" fill="#111" stroke="#fff" stroke-width="0.6" paint-order="stroke">N</text></g>');
  var candidates = [1, 2, 5, 10, 20, 25, 50, 100, 200, 250, 500, 1000];
  var barM = candidates[0];
  for (var i = 0; i < candidates.length; i++) {
    if (candidates[i] * F.s <= F.w * 0.22) barM = candidates[i]; else break;
  }
  var barMm = barM * F.s;
  parts.push('<g transform="translate(6,' + f2(F.h - 8) + ')">' +
    '<rect x="-2" y="-5" width="' + f2(barMm + 4) + '" height="8" fill="#fff" fill-opacity="0.8"/>' +
    '<rect x="0" y="0" width="' + f2(barMm) + '" height="1.6" fill="#111"/>' +
    '<rect x="0" y="0" width="' + f2(barMm / 2) + '" height="1.6" fill="#fff" stroke="#111" stroke-width="0.2"/>' +
    '<text x="0" y="-1" font-size="2.6" fill="#111">0</text>' +
    '<text x="' + f2(barMm) + '" y="-1" font-size="2.6" fill="#111" text-anchor="end">' + barM + ' m</text></g>');
  return parts.join("");
}

function pdfRingPoints(F, ring) {
  return ring.map(function (c) { var xy = F.p(c[0], c[1]); return f2(xy[0]) + "," + f2(xy[1]); }).join(" ");
}

function pdfHaloText(x, y, size, fill, text, extra) {
  return '<text x="' + f2(x) + '" y="' + f2(y) + '" font-size="' + size + '" fill="' + fill + '" stroke="#fff" stroke-width="' + (size * 0.28).toFixed(2) + '" paint-order="stroke" stroke-linejoin="round"' + (extra || '') + '>' + esc(text) + '</text>';
}

function pdfGridLabelsSvg(F) {
  return GRIDS.map(function (g) {
    var c = ringCentroid(g.ring.slice(0, -1));
    var xy = F.p(c[0], c[1]);
    return pdfHaloText(xy[0], xy[1], 4.2, "#111", g.label, ' font-weight="700" text-anchor="middle"');
  }).join("");
}

/* ---- Progress view map ---- */
function pdfProgressShown() {
  var q = (state.search || "").trim().toLowerCase();
  return allPoints().filter(function (p) {
    return matchesFilter(repOf(p.id, state.round)) && (!q || p.id.toLowerCase().indexOf(q) !== -1);
  });
}

function pdfProgressMapSvg(d, F) {
  var L = d.layers, round = state.round;
  var parts = [pdfSvgOpen(F)];
  if (L.basemap) parts.push(pdfBasemapSvg(F));
  if (L.graticule) parts.push(pdfGraticuleSvg(F));
  GRIDS.forEach(function (g) {
    var pts = pdfRingPoints(F, g.ring);
    if (L.gridFill) {
      var tier = gridTierColor(gridStats(g, round).pct);
      parts.push('<polygon points="' + pts + '" fill="' + tier.fill + '" fill-opacity="0.4" stroke="none"/>');
    }
    if (L.gridLines) parts.push('<polygon points="' + pts + '" fill="none" stroke="' + PDF_GRID_STROKE + '" stroke-width="0.6"/>');
  });
  if (L.gridLabels) parts.push(pdfGridLabelsSvg(F));
  var shown = pdfProgressShown();
  if (L.actual) {
    shown.forEach(function (p) {
      var r = repOf(p.id, round);
      if (r.actualLat == null || r.actualLon == null) return;
      var a = F.p(p.lat, p.lon), b = F.p(r.actualLat, r.actualLon);
      parts.push('<line x1="' + f2(a[0]) + '" y1="' + f2(a[1]) + '" x2="' + f2(b[0]) + '" y2="' + f2(b[1]) + '" stroke="' + ACTUAL_FILL + '" stroke-width="0.35" stroke-dasharray="1 0.8"/>');
      parts.push('<circle cx="' + f2(b[0]) + '" cy="' + f2(b[1]) + '" r="1.9" fill="#FFD600" fill-opacity="0.55"/>');
      parts.push('<circle cx="' + f2(b[0]) + '" cy="' + f2(b[1]) + '" r="1.2" fill="' + ACTUAL_FILL + '" stroke="#fff" stroke-width="0.35"/>');
    });
  }
  if (L.points) {
    shown.forEach(function (p) {
      var r = repOf(p.id, round);
      var xy = F.p(p.lat, p.lon);
      if (r.issue) {
        parts.push('<rect x="' + f2(xy[0] - 1.3) + '" y="' + f2(xy[1] - 1.3) + '" width="2.6" height="2.6" fill="#F2635C" stroke="#7a1410" stroke-width="0.25"/>');
      } else {
        parts.push('<circle cx="' + f2(xy[0]) + '" cy="' + f2(xy[1]) + '" r="1.4" fill="' + (r.done ? "#3BD488" : "#FFD400") + '" stroke="' + (r.done ? "#fff" : "#5c4b00") + '" stroke-width="' + (r.done ? 0.4 : 0.25) + '"/>');
      }
    });
  }
  if (L.pointLabels) {
    shown.forEach(function (p) {
      var xy = F.p(p.lat, p.lon);
      parts.push(pdfHaloText(xy[0] + 1.8, xy[1] - 1.2, 2.3, "#0a1116", p.id));
    });
  }
  if (L.northScale) parts.push(pdfNorthScaleSvg(F));
  parts.push('</svg>');
  return parts.join("");
}

/* ---- Lab view map ---- */
function dataUrlToObjectUrl(u) {
  try {
    var bin = atob(u.split(",")[1]);
    var arr = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
    return URL.createObjectURL(new Blob([arr], { type: "image/png" }));
  } catch (e) { return u; }
}

// Everything the lab sheet needs, computed once per dialog.
function pdfLabData() {
  var cfg = state.labCfg;
  var obsList = labPointObsList(cfg.param, cfg.depth);
  var sampledGrids = {}, tested = {};
  obsList.forEach(function (o) { tested[o.loc] = true; if (o.info.gridId) sampledGrids[o.info.gridId] = true; });
  var surface = buildLabSurface(obsList, sampledGrids);
  if (surface) {
    if (pdfSurfaceUrl) URL.revokeObjectURL(pdfSurfaceUrl);
    pdfSurfaceUrl = dataUrlToObjectUrl(surface.url);
    if (pdfSurfaceUrl.indexOf("blob:") === 0) surface.url = pdfSurfaceUrl; else pdfSurfaceUrl = null;
  }
  var waterByLoc = {};
  labActive().forEach(function (s) {
    if (s.matrix === "air") waterByLoc[s.loc] = waterByLoc[s.loc] ? newerSample(waterByLoc[s.loc], s) : s;
  });
  var water = Object.keys(waterByLoc).map(function (loc) { return waterByLoc[loc]; }).filter(function (s) {
    var info = locInfo(s.loc);
    return info && info.exists && !tested[s.loc];
  });
  var maxD = 0;
  obsList.forEach(function (o) { maxD = Math.max(maxD, geoFromLeak(o.info.lat, o.info.lon).dist); });
  return {
    obsList: obsList, sampledGrids: sampledGrids, tested: tested, surface: surface, water: water,
    windR: Math.max(120, Math.min(400, maxD + 25)), kpis: labKpis(), analysis: computeLabAnalysis(), depths: labDepthOptions()
  };
}

function pdfSvgInner(html) { return html.slice(html.indexOf(">") + 1, html.lastIndexOf("</svg>")); }

function pdfGlyph(entries, x, y, diaMm) {
  var g = glyphSvg(entries, false);
  var k = diaMm / g.size;
  return '<g transform="translate(' + f2(x - g.size * k / 2) + ',' + f2(y - g.size * k / 2) + ') scale(' + k.toFixed(4) + ')">' + pdfSvgInner(g.html) + '</g>';
}

function pdfWaterDrop(statusColor, x, y, hMm) {
  var k = hMm / 28;
  return '<g transform="translate(' + f2(x - 12 * k) + ',' + f2(y - 22 * k) + ') scale(' + k.toFixed(4) + ')">' +
    '<path d="M12 3C12 3 4 12.4 4 17.6a8 8 0 0 0 16 0C20 12.4 12 3 12 3Z" fill="#2B8FD6" stroke="#FFFFFF" stroke-width="1.8"/>' +
    '<circle cx="12" cy="18" r="3.3" fill="' + statusColor + '" stroke="#FFFFFF" stroke-width="1"/></g>';
}

function pdfLeakSymbol(x, y, r) {
  return '<circle cx="' + f2(x) + '" cy="' + f2(y) + '" r="' + f2(r * 1.6) + '" fill="#D32F2F" fill-opacity="0.25"/>' +
    '<circle cx="' + f2(x) + '" cy="' + f2(y) + '" r="' + f2(r) + '" fill="#D32F2F" stroke="#fff" stroke-width="' + f2(r * 0.22) + '"/>' +
    '<polygon points="' + f2(x) + ',' + f2(y - r * 0.62) + ' ' + f2(x + r * 0.6) + ',' + f2(y + r * 0.45) + ' ' + f2(x - r * 0.6) + ',' + f2(y + r * 0.45) + '" fill="#fff"/>';
}

function pdfLabMapSvg(d, F) {
  var cfg = state.labCfg, L = d.layers, data = d.lab;
  var parts = [pdfSvgOpen(F)];
  if (L.basemap) parts.push(pdfBasemapSvg(F));
  if (L.surface && data.surface) {
    var b = data.surface.bounds;
    var tl = F.p(b[1][0], b[0][1]), br = F.p(b[0][0], b[1][1]);
    parts.push('<image href="' + data.surface.url + '" x="' + f2(tl[0]) + '" y="' + f2(tl[1]) + '" width="' + f2(br[0] - tl[0]) + '" height="' + f2(br[1] - tl[1]) + '" preserveAspectRatio="none"/>');
  }
  if (L.graticule) parts.push(pdfGraticuleSvg(F));
  if (L.gridLines) {
    GRIDS.forEach(function (g) {
      var sampled = !!data.sampledGrids[g.id];
      parts.push('<polygon points="' + pdfRingPoints(F, g.ring) + '" fill="none" stroke="' + PDF_GRID_STROKE + '" stroke-width="' + (sampled ? 0.6 : 0.4) + '" stroke-opacity="' + (sampled ? 1 : 0.65) + '"/>');
    });
  }

  var leak = F.p(cfg.leakLat, cfg.leakLon);
  var R = data.windR;
  if (L.windSector) {
    var cone = [leak];
    for (var a = -cfg.cone; a <= cfg.cone + 0.001; a += 3) {
      var q = destPoint(cfg.leakLat, cfg.leakLon, cfg.windTo + a, R);
      cone.push(F.p(q[0], q[1]));
    }
    parts.push('<polygon points="' + cone.map(function (c) { return f2(c[0]) + "," + f2(c[1]); }).join(" ") + '" fill="#4FB3F6" fill-opacity="0.14" stroke="#1565C0" stroke-width="0.4" stroke-dasharray="1.6 1.2"/>');
    var tipLL = destPoint(cfg.leakLat, cfg.leakLon, cfg.windTo, R * 0.9);
    var tip = F.p(tipLL[0], tipLL[1]);
    var ang = Math.atan2(tip[1] - leak[1], tip[0] - leak[0]);
    var ah = 2.6, aw = 1.4;
    var bx = tip[0] - ah * Math.cos(ang), by = tip[1] - ah * Math.sin(ang);
    parts.push('<line x1="' + f2(leak[0]) + '" y1="' + f2(leak[1]) + '" x2="' + f2(bx) + '" y2="' + f2(by) + '" stroke="#0D47A1" stroke-width="0.6"/>');
    parts.push('<polygon points="' + f2(tip[0]) + ',' + f2(tip[1]) + ' ' + f2(bx + aw * Math.sin(ang)) + ',' + f2(by - aw * Math.cos(ang)) + ' ' + f2(bx - aw * Math.sin(ang)) + ',' + f2(by + aw * Math.cos(ang)) + '" fill="#0D47A1"/>');
    var lblLL = destPoint(cfg.leakLat, cfg.leakLon, cfg.windTo, R * 0.9 + 14);
    var lbl = F.p(lblLL[0], lblLL[1]);
    parts.push(pdfHaloText(lbl[0], lbl[1], 2.6, "#0D47A1", "Angin menuju " + compassName(cfg.windTo) + (windHasSpeed() ? " · " + fmtNum(cfg.windMeta.speedKmh) + " km/jam" : ""), ' font-weight="700" text-anchor="middle"'));
  }
  if (L.rings) {
    [50, 100, 150, 200, 300].forEach(function (rad) {
      if (rad > R) return;
      parts.push('<circle cx="' + f2(leak[0]) + '" cy="' + f2(leak[1]) + '" r="' + f2(rad * F.s) + '" fill="none" stroke="#fff" stroke-width="0.35" stroke-opacity="0.85"/>');
      parts.push('<circle cx="' + f2(leak[0]) + '" cy="' + f2(leak[1]) + '" r="' + f2(rad * F.s) + '" fill="none" stroke="#37474F" stroke-width="0.15" stroke-dasharray="0.8 0.8"/>');
      var lp = destPoint(cfg.leakLat, cfg.leakLon, cfg.windTo + 90, rad);
      var lpxy = F.p(lp[0], lp[1]);
      parts.push(pdfHaloText(lpxy[0], lpxy[1] + 0.8, 2.2, "#37474F", rad + " m", ' text-anchor="middle"'));
    });
  }
  if (L.untested) {
    allPoints().forEach(function (p) {
      if (data.tested[p.id]) return;
      var xy = F.p(p.lat, p.lon);
      parts.push('<circle cx="' + f2(xy[0]) + '" cy="' + f2(xy[1]) + '" r="0.75" fill="#0A1116" fill-opacity="0.6" stroke="#D5DEE2" stroke-width="0.3"/>');
    });
  }
  var sorted = data.obsList.slice().sort(function (a, b) { return a.z - b.z; });
  if (L.points) {
    sorted.forEach(function (o) {
      var xy = F.p(o.info.lat, o.info.lon);
      parts.push(pdfGlyph(o.entries, xy[0], xy[1], 5.2));
    });
  }
  if (L.water) {
    data.water.forEach(function (s) {
      var info = locInfo(s.loc);
      var xy = F.p(info.lat, info.lon);
      parts.push(pdfWaterDrop(WATER_STATUS[waterStatus(s)].color, xy[0], xy[1], 5));
    });
  }
  if (L.leak) {
    parts.push(pdfLeakSymbol(leak[0], leak[1], 1.8));
    parts.push(pdfHaloText(leak[0] + 3, leak[1] + 0.9, 2.6, "#B71C1C", "Titik bocor", ' font-weight="700"'));
  }
  if (L.gridLabels) parts.push(pdfGridLabelsSvg(F));
  if (L.valueLabels) {
    sorted.forEach(function (o) {
      if (L.labelsExceedOnly && o.level < 1) return;
      var xy = F.p(o.info.lat, o.info.lon);
      var val = cfg.param === "index" ? LAB_CLASS[o.level].mgmt : obsDisplay(o.best.obs);
      var ex = o.level >= 1;
      parts.push('<text x="' + f2(xy[0]) + '" y="' + f2(xy[1] + 4.4) + '" font-size="2.1" text-anchor="middle" fill="' + (ex ? "#8B1A10" : "#0a1116") + '" stroke="#fff" stroke-width="0.6" paint-order="stroke" stroke-linejoin="round">' +
        '<tspan font-weight="700">' + esc(o.info.label) + '</tspan> ' + '<tspan' + (ex ? ' font-weight="700"' : '') + '>' + esc(val) + '</tspan></text>');
    });
    if (L.water) {
      data.water.forEach(function (s) {
        var info = locInfo(s.loc);
        var xy = F.p(info.lat, info.lon);
        parts.push(pdfHaloText(xy[0], xy[1] + 3.6, 2.1, "#0D47A1", "Air " + info.label, ' text-anchor="middle" font-weight="700"'));
      });
    }
  }
  if (L.northScale) parts.push(pdfNorthScaleSvg(F));
  parts.push('</svg>');
  return parts.join("");
}

/* ---- Side boxes ("kop") ---- */
function pdfSym(inner, w, h) {
  w = w || 6; h = h || 4;
  return '<svg class="printkop-sym" viewBox="0 0 ' + w + ' ' + h + '" width="' + w + 'mm" height="' + h + 'mm" xmlns="http://www.w3.org/2000/svg">' + inner + '</svg>';
}
function pdfLegItem(sym, text) {
  return '<div class="printkop-legitem">' + sym + '<span>' + text + '</span></div>';
}
function pdfLegLine() { return pdfLegItem(pdfSym('<line x1="0.3" y1="2" x2="5.7" y2="2" stroke="' + PDF_GRID_STROKE + '" stroke-width="0.6"/>'), "Batas grid (grid limit)"); }
function pdfLegBasemap() { return pdfLegItem(pdfSym('<rect x="0.3" y="0.3" width="5.4" height="3.4" fill="#7E8B6A" stroke="#555" stroke-width="0.15"/><path d="M0.3 3 2 1.6 3.4 2.6 5.7 1" fill="none" stroke="#C9C1A0" stroke-width="0.4"/>'), "Latar: citra udara drone"); }

function pdfBox(title, body) {
  return '<div class="printkop-box"><p class="printkop-boxtitle">' + title + '</p>' + body + '</div>';
}

function pdfCoordsBox(F) {
  return pdfBox("PARAMETER KOORDINAT",
    '<table class="printkop-geotable">' +
    '<tr><td>Datum</td><td>WGS 84</td></tr>' +
    '<tr><td>Sistem koordinat</td><td>Lintang / Bujur (derajat desimal)</td></tr>' +
    '<tr><td>Skala cetak</td><td>≈ 1:' + pdfPrintScale(F).toLocaleString("id-ID") + ' (kertas A3)</td></tr>' +
    '</table>' +
    '<p class="printkop-note">Koordinat pada peta ini memakai referensi WGS 84 dari data aplikasi, bukan grid lokal survei internal.</p>');
}

function pdfTitleBox(title, rows) {
  return '<div class="printkop-box printkop-title">' +
    '<p class="printkop-client">PERTAMINA HULU MAHAKAM</p>' +
    '<p class="printkop-subject">HANDIL TOPOGRAPHY SURVEY<br/>H-YB AREA</p>' +
    '<table class="printkop-titletable">' +
    '<tr><td>Judul</td><td>' + title + '</td></tr>' +
    rows.map(function (r) { return '<tr><td>' + r[0] + '</td><td>' + r[1] + '</td></tr>'; }).join("") +
    '<tr><td>Tanggal cetak</td><td>' + esc(formatDateID(new Date().toISOString().slice(0, 10))) + '</td></tr>' +
    '<tr><td>Sumber</td><td>Peta Sampling Oil Spill</td></tr>' +
    '</table>' +
    '<div class="printkop-titlebottom">' +
    '<p class="printkop-disclaimer">Dibuat otomatis oleh Peta Sampling Oil Spill (Tim ENV BPN &amp; HCA) &mdash; bukan dokumen survei resmi.</p>' +
    '<div class="printkop-qr">' + buildQrSvg(APP_URL + (state.view === "lab" ? "#lab" : "#progres"), 20) + '<span class="printkop-qrlabel">Pindai untuk membuka aplikasi</span></div>' +
    '</div></div>';
}

function pdfProgressKop(d, F) {
  var L = d.layers, B = d.boxes, round = state.round, out = [];
  if (B.legend) {
    var items = [];
    if (L.points) {
      items.push(pdfLegItem(pdfSym('<circle cx="3" cy="2" r="1.4" fill="#FFD400" stroke="#5c4b00" stroke-width="0.25"/>'), "Titik sampling (belum)"));
      items.push(pdfLegItem(pdfSym('<circle cx="3" cy="2" r="1.4" fill="#3BD488" stroke="#22B871" stroke-width="0.3"/>'), "Titik sudah disampling"));
      items.push(pdfLegItem(pdfSym('<rect x="1.7" y="0.7" width="2.6" height="2.6" fill="#F2635C" stroke="#7a1410" stroke-width="0.25"/>'), "Tidak bisa disampling / kendala"));
    }
    if (L.actual) items.push(pdfLegItem(pdfSym('<line x1="0.5" y1="3.3" x2="3.6" y2="1.8" stroke="' + ACTUAL_FILL + '" stroke-width="0.35" stroke-dasharray="0.8 0.6"/><circle cx="4.3" cy="1.6" r="1.5" fill="#FFD600" fill-opacity="0.55"/><circle cx="4.3" cy="1.6" r="1" fill="' + ACTUAL_FILL + '" stroke="#fff" stroke-width="0.3"/>'), "Lokasi sampling aktual (garis dari titik rencana)"));
    if (L.gridFill) {
      [["#F2A93C", "Grid belum mulai disampling"], ["#2FD9C7", "Grid sedang berjalan"], ["#3BD488", "Grid tuntas"]].forEach(function (x) {
        items.push(pdfLegItem(pdfSym('<rect x="0.3" y="0.3" width="5.4" height="3.4" fill="' + x[0] + '" fill-opacity="0.45" stroke="' + x[0] + '" stroke-width="0.3"/>'), x[1]));
      });
    }
    if (L.gridLines) items.push(pdfLegLine());
    if (L.basemap) items.push(pdfLegBasemap());
    out.push(pdfBox("LEGENDA", items.join("") || '<p class="printkop-note">Tidak ada lapisan yang ditampilkan.</p>'));
  }
  if (B.coords) out.push(pdfCoordsBox(F));
  if (B.summary) {
    var q = (state.search || "").trim();
    var filterLabelMap = { all: "Semua", done: "Selesai", pending: "Belum", issue: "Bermasalah" };
    var dateDesc = dateFilterText();
    var filterDesc = "Semua titik (tidak ada filter aktif)";
    if (state.statusFilter !== "all" || q || dateDesc) {
      filterDesc = "Status: " + (filterLabelMap[state.statusFilter] || "Semua") + (q ? "; Cari: “" + esc(q) + "”" : "") + (dateDesc ? "; " + esc(dateDesc) : "");
    }
    var doneAll = 0, issueAll = 0, total = allPoints().length;
    allPoints().forEach(function (p) { var r = repOf(p.id, round); if (r.done) doneAll++; if (r.issue) issueAll++; });
    out.push(pdfBox("RINGKASAN",
      '<table class="printkop-geotable">' +
      '<tr><td>Tahap</td><td>' + (round === "before" ? "Before Recovery" : "After Recovery") + '</td></tr>' +
      '<tr><td>Total titik</td><td>' + total + '</td></tr>' +
      '<tr><td>Selesai</td><td>' + doneAll + '</td></tr>' +
      '<tr><td>Kendala</td><td>' + issueAll + '</td></tr>' +
      '<tr><td>Area grid</td><td>' + GRIDS.length + '</td></tr>' +
      '<tr><td>Titik ditampilkan</td><td>' + (L.points ? pdfProgressShown().length + ' dari ' + total : 'tidak ditampilkan') + '</td></tr>' +
      '<tr><td>Filter aktif</td><td>' + filterDesc + '</td></tr>' +
      '</table>'));
  }
  if (B.grids) {
    out.push(pdfBox("PROGRES PER GRID", '<div class="printkop-gridgrid">' + GRIDS.map(function (g) {
      var st = gridStats(g, round);
      return '<div class="printkop-gridrow"><span class="printkop-gridname">' + esc(g.label) + '</span><span class="printkop-gridval">' + st.done + '/' + st.total + '</span></div>';
    }).join("") + '</div>'));
  }
  if (B.title) out.push(pdfTitleBox("Peta Titik Sampling", [["Tahap", round === "before" ? "Before Recovery" : "After Recovery"]]));
  return out.join("");
}

function pdfRampSvg(ticks) {
  var id = "pdframp" + (++pdfUid);
  var W = 84, barY = 0.5, barH = 3;
  var stops = LAB_RAMP.map(function (s) { return '<stop offset="' + (s[0] / Z_MAX).toFixed(4) + '" stop-color="' + s[1] + '"/>'; }).join("");
  var tk = ticks.map(function (t, i) {
    var x = Math.max(0.1, t[0] / Z_MAX * W);
    var anchor = i === 0 ? "start" : "middle";
    return '<line x1="' + f2(x) + '" y1="' + (barY + barH) + '" x2="' + f2(x) + '" y2="' + (barY + barH + 1) + '" stroke="#555" stroke-width="0.15"/>' +
      '<text x="' + f2(x) + '" y="' + (barY + barH + 3.4) + '" font-size="2" fill="#333" text-anchor="' + anchor + '">' + esc(t[1]) + '</text>';
  }).join("");
  return '<svg class="printkop-ramp" viewBox="0 0 ' + (W + 6) + ' 8.5" width="' + (W + 6) + 'mm" height="8.5mm" xmlns="http://www.w3.org/2000/svg" font-family="Arial, sans-serif">' +
    '<defs><linearGradient id="' + id + '" x1="0" x2="1" y1="0" y2="0">' + stops + '</linearGradient></defs>' +
    '<rect x="0" y="' + barY + '" width="' + W + '" height="' + barH + '" rx="0.6" fill="url(#' + id + ')"/>' + tk + '</svg>';
}

function pdfLabKop(d, F) {
  var cfg = state.labCfg, L = d.layers, B = d.boxes, data = d.lab, k = data.kpis, out = [];
  var paramTxt = labParamLabel(cfg.param) + (cfg.param !== "index" ? " (mg/kg)" : "");
  var depthTxt = cfg.depth === "max" ? "nilai tertinggi" : depthLabel(Number(cfg.depth));
  if (B.legend) {
    var items = [];
    if (L.points || L.surface) {
      var ticks;
      if (cfg.param === "index") ticks = [[0, "tidak terdeteksi"], [1, "TK-C"], [2, "TK-B"], [3, "TK-A"]];
      else {
        var tk = LAB_PARAMS[cfg.param].tk;
        ticks = [[0, "tidak terdeteksi"]];
        if (tk.C != null) ticks.push([1, "TK-C " + fmtNum(tk.C)]);
        ticks.push([2, "TK-B " + fmtNum(tk.B)]);
        ticks.push([3, "TK-A " + fmtNum(tk.A)]);
      }
      items.push('<p class="printkop-legsub">' + esc(paramTxt) + ' · ' + esc(depthTxt) + '</p>' + pdfRampSvg(ticks));
    }
    if (L.points) {
      if (data.depths.length >= 2) {
        var gl = glyphSvg(data.depths.map(function (dd, i) { return { obs: { z: i === 0 ? 1.6 : 0.5, level: 0, nd: false } }; }), false, 16);
        items.push(pdfLegItem('<svg class="printkop-sym" viewBox="0 0 ' + gl.size + ' ' + gl.size + '" width="4.6mm" height="4.6mm" xmlns="http://www.w3.org/2000/svg">' + pdfSvgInner(gl.html) + '</svg>',
          "Titik uji, lingkaran berlapis: atas " + esc(depthLabel(data.depths[0])) + ", bawah " + esc(depthLabel(data.depths[data.depths.length - 1]))));
      } else {
        items.push(pdfLegItem(pdfSym('<circle cx="3" cy="2" r="1.6" fill="#fff"/><circle cx="3" cy="2" r="1.25" fill="' + rampHex(0.5) + '"/>'), "Titik uji lab, warna sesuai nilai"));
      }
      items.push(pdfLegItem(pdfSym('<circle cx="3" cy="2" r="1.6" fill="#fff"/><circle cx="3" cy="2" r="1.25" fill="' + rampHex(1.6) + '"/><circle cx="3" cy="2" r="1.85" fill="none" stroke="#0A1116" stroke-width="0.3"/>'), "Garis tepi gelap: ada sampel melebihi TK-C"));
    }
    if (L.untested) items.push(pdfLegItem(pdfSym('<circle cx="3" cy="2" r="0.9" fill="#0A1116" fill-opacity="0.6" stroke="#9AA6AB" stroke-width="0.3"/>'), "Titik sampling belum diuji lab"));
    if (L.water) {
      items.push(pdfLegItem('<svg class="printkop-sym" viewBox="0 0 24 28" width="4mm" height="4.6mm" xmlns="http://www.w3.org/2000/svg"><path d="M12 3C12 3 4 12.4 4 17.6a8 8 0 0 0 16 0C20 12.4 12 3 12 3Z" fill="#2B8FD6" stroke="#fff" stroke-width="1.8"/><circle cx="12" cy="18" r="3.3" fill="#fff"/></svg>',
        "Air permukaan per area; titik tengah: " + ["ok", "exceed", "inconclusive"].map(function (st) {
          return '<span class="printkop-inl"><svg viewBox="0 0 4 4" width="2.4mm" height="2.4mm"><circle cx="2" cy="2" r="1.8" fill="' + WATER_STATUS[st].color + '"/></svg>' + esc(WATER_STATUS[st].label.toLowerCase()) + '</span>';
        }).join(" ")));
    }
    if (L.leak) items.push(pdfLegItem(pdfSym(pdfLeakSymbol(3, 2, 1.25)), "Titik bocor (" + esc(labEventText()) + ")"));
    if (L.windSector) items.push(pdfLegItem(pdfSym('<path d="M0.5 3.6 L5.6 0.4 L5.6 3.6 Z" fill="#4FB3F6" fill-opacity="0.25" stroke="#1565C0" stroke-width="0.3" stroke-dasharray="0.9 0.6"/>'), "Sektor arah angin ±" + cfg.cone + "°, angin menuju " + esc(compassName(cfg.windTo)) + " (" + esc(fmtDeg(cfg.windTo)) + ")"));
    if (L.rings) items.push(pdfLegItem(pdfSym('<circle cx="3" cy="2" r="1.7" fill="none" stroke="#37474F" stroke-width="0.25" stroke-dasharray="0.6 0.5"/>'), "Lingkaran jarak 50 m dari titik bocor"));
    if (L.gridLines) items.push(pdfLegLine());
    if (L.basemap) items.push(pdfLegBasemap());
    if (L.surface && data.surface) items.push('<p class="printkop-note">Gradasi warna: interpolasi antar titik uji di dalam area grid yang memiliki sampel, makin pudar makin jauh dari titik uji. Hasil di bawah batas deteksi lab digambar sebagai tidak terdeteksi. Ambang TK-A, TK-B, TK-C menurut PP 22/2021.</p>');
    out.push(pdfBox("LEGENDA", items.join("") || '<p class="printkop-note">Tidak ada lapisan yang ditampilkan.</p>'));
  }
  if (B.coords) out.push(pdfCoordsBox(F));
  if (B.summary) {
    var pctEx = k.soilSed.length ? Math.round(k.exceed.length / k.soilSed.length * 1000) / 10 : 0;
    var waterTxt = k.water.length ? k.water.length + " lokasi; " + (k.wst.exceed ? k.wst.exceed + " melebihi baku mutu" : "tidak ada yang melebihi baku mutu") + (k.wst.inconclusive ? ", " + k.wst.inconclusive + " belum dapat disimpulkan" : "") : "Belum ada data";
    var sources = {};
    k.pool.forEach(function (s) { if (s.source) sources[s.source] = true; });
    out.push(pdfBox("RINGKASAN HASIL",
      '<table class="printkop-geotable">' +
      '<tr><td>Parameter peta</td><td>' + esc(paramTxt) + '</td></tr>' +
      '<tr><td>Kedalaman</td><td>' + esc(depthTxt) + '</td></tr>' +
      '<tr><td>Batch</td><td>' + esc(cfg.batch === "all" ? "Semua (hasil terbaru)" : cfg.batch) + '</td></tr>' +
      '<tr><td>Sampel diuji</td><td>' + k.pool.length + ' (' + k.counts.tanah + ' tanah, ' + k.counts.sedimen + ' sedimen, ' + k.counts.air + ' air)</td></tr>' +
      '<tr><td>Titik uji di peta</td><td>' + data.obsList.length + '</td></tr>' +
      '<tr><td>Melebihi TK-C</td><td>' + k.exceed.length + ' sampel di ' + k.exceedLocs + ' titik (' + pctEx.toLocaleString("id-ID") + '%)</td></tr>' +
      '<tr><td>Konsentrasi tertinggi</td><td>' + (k.top ? esc(fmtVal(k.top.s.values[k.top.param])) + ' ' + esc(k.top.s.unit) + ', ' + esc(LAB_PARAMS[k.top.param].label) + ' di ' + esc(locLabel(k.top.s.loc)) + ' ' + esc(depthLabel(k.top.s.depth)) : 'Di bawah batas deteksi') + '</td></tr>' +
      '<tr><td>Air permukaan</td><td>' + esc(waterTxt) + '</td></tr>' +
      '<tr><td>Kejadian</td><td>' + esc(labEventText()) + '</td></tr>' +
      '<tr><td>Angin</td><td>' + esc(windSummaryText()) + '. ' + esc(windSourceText()) + '</td></tr>' +
      (Object.keys(sources).length ? '<tr><td>Sumber data lab</td><td>' + esc(Object.keys(sources).join("; ")) + '</td></tr>' : '') +
      '</table>'));
  }
  if (B.analysis) {
    var an = data.analysis;
    var mark = { yes: "✓", no: "✕", na: "–" };
    out.push(pdfBox("ANALISIS TITIK BOCOR &amp; ARAH ANGIN",
      '<p class="printkop-headline">' + esc(an.headline) + '</p>' +
      '<ul class="printkop-ev">' + an.ev.map(function (e) { return '<li><b>' + mark[e.ok] + '</b> ' + esc(e.text) + '</li>'; }).join("") + '</ul>' +
      (an.summary ? '<p class="printkop-note">' + esc(an.summary) + '</p>' : '') +
      '<p class="printkop-note">Analisis indikatif untuk ' + esc(paramTxt) + ', ' + esc(depthTxt) + '; tidak memodelkan dispersi udara, limpasan, maupun pasang surut.</p>'));
  }
  if (B.grids) {
    var per = {};
    data.obsList.forEach(function (o) {
      var gid = o.info.gridId;
      if (!gid) return;
      per[gid] = per[gid] || { n: 0, ex: 0 };
      per[gid].n++;
      if (o.level >= 1) per[gid].ex++;
    });
    var rows = GRIDS.filter(function (g) { return per[g.id]; }).map(function (g) {
      return '<div class="printkop-gridrow"><span class="printkop-gridname">' + esc(g.label) + '</span><span class="printkop-gridval">' + per[g.id].n + (per[g.id].ex ? ' · <span class="printkop-ex">' + per[g.id].ex + ' &gt; TK-C</span>' : '') + '</span></div>';
    }).join("");
    out.push(pdfBox("HASIL PER GRID", rows ? '<p class="printkop-note printkop-note-top">Jumlah titik uji · titik melebihi TK-C (' + esc(depthTxt) + ')</p><div class="printkop-gridgrid">' + rows + '</div>' : '<p class="printkop-note">Belum ada hasil lab.</p>'));
  }
  if (B.title) out.push(pdfTitleBox("Peta Sebaran Hasil Lab", [["Parameter", esc(paramTxt)]]));
  return out.join("");
}

function pdfSheetHtml(d, sized) {
  var F = pdfFrame(d);
  var mapSvg = d.view === "lab" ? pdfLabMapSvg(d, F) : pdfProgressMapSvg(d, F);
  var kop = pdfHasKop(d) ? (d.view === "lab" ? pdfLabKop(d, F) : pdfProgressKop(d, F)) : "";
  return '<div class="printsheet"' + (sized ? ' style="width:' + PDF_SHEET_W + 'mm;height:' + PDF_SHEET_H + 'mm"' : '') + '><div class="printsheet-border' + (kop ? '' : ' printsheet-nokop') + '">' +
    '<div class="printsheet-map">' + mapSvg + '</div>' +
    (kop ? '<div class="printsheet-kop"><div class="printsheet-kopin"' + (d.kopZoom && d.kopZoom < 1 ? ' style="zoom:' + d.kopZoom.toFixed(3) + '"' : '') + '>' + kop + '</div></div>' : '') +
    '</div></div>';
}

/* ---- Dialog ---- */
function openPdfDialog() {
  var view = state.view === "lab" ? "lab" : "progress";
  var memo = pdfMemo[view];
  var ext = pdfBaseExtent(view);
  var d = {
    view: view,
    layers: memo ? Object.assign({}, memo.layers) : pdfDefaultLayers(view),
    boxes: memo ? Object.assign({}, memo.boxes) : pdfDefaultBoxes(view),
    ext: ext,
    zoom: memo ? memo.zoom : 1,
    center: memo ? memo.center.slice() : [(ext.minLat + ext.maxLat) / 2, (ext.minLon + ext.maxLon) / 2]
  };
  if (view === "lab") d.lab = pdfLabData();
  state.pdfDlg = d;
  renderPdfDialog();
}

function pdfRemember() {
  var d = state.pdfDlg;
  if (d) pdfMemo[d.view] = { layers: Object.assign({}, d.layers), boxes: Object.assign({}, d.boxes), zoom: d.zoom, center: d.center.slice() };
}

function closePdfDialog() {
  pdfRemember();
  state.pdfDlg = null;
  var root = document.getElementById("pdfRoot");
  if (root) root.innerHTML = "";
}

function pdfCheck(field, key, label, checked, disabled, sub) {
  return '<label class="pdfcheck' + (sub ? ' pdfcheck-sub' : '') + (disabled ? ' disabled' : '') + '"><input type="checkbox" data-field="' + field + '" data-key="' + key + '"' + (checked ? ' checked' : '') + (disabled ? ' disabled' : '') + '/><span>' + esc(label) + '</span></label>';
}

function pdfContextNote(d) {
  if (d.view === "lab") {
    var cfg = state.labCfg;
    return "Parameter " + labParamLabel(cfg.param) + ", kedalaman " + (cfg.depth === "max" ? "nilai tertinggi" : depthLabel(Number(cfg.depth))) + ", dan batch " + (cfg.batch === "all" ? "semua" : cfg.batch) + " mengikuti pilihan di atas peta.";
  }
  var dateDesc = dateFilterText();
  var q = (state.search || "").trim();
  var active = state.statusFilter !== "all" || q || dateDesc;
  return "Tahap " + (state.round === "before" ? "Before Recovery" : "After Recovery") + ". " +
    (active ? "Titik yang dicetak mengikuti pencarian dan filter yang aktif di layar." : "Semua titik dicetak (tidak ada filter aktif).");
}

function renderPdfDialog() {
  var root = document.getElementById("pdfRoot");
  if (!root) return;
  var d = state.pdfDlg;
  if (!d) { root.innerHTML = ""; return; }
  var layerHtml = PDF_LAYERS[d.view].map(function (l) {
    if (l.key === "surface" && !d.lab.surface) return pdfCheck("pdf-layer", l.key, l.label + " (belum ada data)", false, true);
    return pdfCheck("pdf-layer", l.key, l.label, d.layers[l.key], l.sub && !d.layers[l.sub], !!l.sub);
  }).join("");
  var boxHtml = PDF_BOXES[d.view].map(function (b) { return pdfCheck("pdf-box", b.key, b.label, d.boxes[b.key]); }).join("");
  root.innerHTML = '<div class="modal-backdrop" data-action="pdf-backdrop">' +
    '<div class="modal modal-pdf" role="dialog" aria-modal="true" aria-labelledby="pdfTitle">' +
    '<div class="modal-head"><h3 id="pdfTitle">Ekspor PDF Peta · ' + (d.view === "lab" ? "Hasil Pemantauan Lab" : "Progres Sampling") + '</h3>' +
    '<button type="button" class="iconbtn" data-action="pdf-close" aria-label="Tutup">' + ICONS.close + '</button></div>' +
    '<div class="modal-body pdfdlg">' +
    '<div class="pdfdlg-prev">' +
    '<div class="pdfprev" id="pdfPrev"><div class="pdfprev-scale" id="pdfPrevScale"></div></div>' +
    '<p class="pdfprev-hint">Pratinjau lembar A3. Seret peta untuk menggeser, gulir mouse di atas peta untuk memperbesar atau memperkecil.</p>' +
    '</div>' +
    '<div class="pdfdlg-side">' +
    '<div class="pdfsec"><div class="pdfsec-title">Perbesaran &amp; area peta</div>' +
    '<div class="pdfzoom">' +
    '<button type="button" class="iconbtn" data-action="pdf-zoom-out" aria-label="Perkecil">−</button>' +
    '<input type="range" id="pdfZoomRange" data-field="pdf-zoom" min="' + Math.log2(PDF_ZOOM_MIN) + '" max="' + Math.log2(PDF_ZOOM_MAX) + '" step="0.05" value="' + Math.log2(d.zoom) + '" aria-label="Perbesaran peta"/>' +
    '<button type="button" class="iconbtn" data-action="pdf-zoom-in" aria-label="Perbesar">+</button>' +
    '<span class="pdfzoom-val" id="pdfZoomVal"></span></div>' +
    '<div class="pdfbtnrow">' +
    '<button type="button" class="btn btn-sm" data-action="pdf-fit-all">Seluruh area</button>' +
    '<button type="button" class="btn btn-sm" data-action="pdf-fit-screen" title="Pakai area dan perbesaran peta yang sedang tampil di layar">Sesuai peta di layar</button>' +
    '</div>' +
    '<p class="pdfscale" id="pdfScaleTxt"></p></div>' +
    '<div class="pdfsec"><div class="pdfsec-title">Tampilkan di peta</div>' + layerHtml +
    '<p class="pdfsec-note">Legenda otomatis hanya memuat lapisan yang ditampilkan.</p></div>' +
    '<div class="pdfsec"><div class="pdfsec-title">Kotak di samping peta</div>' + boxHtml +
    '<p class="pdfsec-note">Bila semua kotak dimatikan, peta memenuhi seluruh lembar.</p></div>' +
    '<p class="pdfsec-note">' + esc(pdfContextNote(d)) + '</p>' +
    '</div></div>' +
    '<div class="modal-foot"><button type="button" class="btn btn-sm" data-action="pdf-reset">Kembalikan bawaan</button><div class="modal-foot-right">' +
    '<button type="button" class="btn" data-action="pdf-close">Batal</button>' +
    '<button type="button" class="btn btn-primary" data-action="pdf-print">' + ICONS.download + ' Cetak / Simpan PDF</button>' +
    '</div></div></div></div>';
  pdfBindPreview();
  pdfUpdatePreview();
}

function pdfUpdatePreview() {
  var d = state.pdfDlg;
  var inner = document.getElementById("pdfPrevScale");
  if (!d || !inner) return;
  d.kopZoom = 1;
  inner.innerHTML = pdfSheetHtml(d, true);
  pdfFitKop(d, inner);
  pdfFitPreview();
  var F = pdfFrame(d);
  var zv = document.getElementById("pdfZoomVal");
  if (zv) zv.textContent = Math.round(d.zoom * 100) + "%";
  var zr = document.getElementById("pdfZoomRange");
  if (zr && document.activeElement !== zr) zr.value = Math.log2(d.zoom);
  var st = document.getElementById("pdfScaleTxt");
  if (st) st.textContent = "Skala cetak ≈ 1:" + pdfPrintScale(F).toLocaleString("id-ID") + " pada kertas A3 lanskap.";
}

// Shrinks the side boxes when they do not fit beside the map. Measured on
// the preview, which has the same layout as the printed sheet; the print
// copy reuses the factor.
function pdfFitKop(d, inner) {
  var kop = inner.querySelector(".printsheet-kop"), kin = kop && kop.firstChild;
  if (!kin) return;
  var need = kin.scrollHeight, avail = kop.clientHeight;
  if (need <= avail + 1) return;
  d.kopZoom = Math.max(0.5, avail / need * 0.98);
  kin.style.zoom = d.kopZoom.toFixed(3);
}

function pdfSchedulePreview() {
  if (pdfRaf) return;
  pdfRaf = requestAnimationFrame(function () { pdfRaf = 0; pdfUpdatePreview(); });
}

function pdfFitPreview() {
  var box = document.getElementById("pdfPrev"), inner = document.getElementById("pdfPrevScale");
  if (!box || !inner) return;
  var sc = box.clientWidth / (PDF_SHEET_W * PX_PER_MM);
  inner.style.transform = "scale(" + sc + ")";
  box.style.height = Math.round(PDF_SHEET_H * PX_PER_MM * sc) + "px";
}

function pdfClampZoom(z) { return Math.max(PDF_ZOOM_MIN, Math.min(PDF_ZOOM_MAX, z)); }

// Screen point -> millimetres inside the map SVG of the preview.
function pdfSvgPoint(clientX, clientY) {
  var svg = document.querySelector("#pdfPrev .printsheet-map svg");
  if (!svg || !svg.getScreenCTM) return null;
  var m = svg.getScreenCTM();
  if (!m) return null;
  var pt = svg.createSVGPoint();
  pt.x = clientX; pt.y = clientY;
  var r = pt.matrixTransform(m.inverse());
  return [r.x, r.y];
}

// Zoom keeping the map point under (mx, my) mm fixed; defaults to the centre.
function pdfZoomTo(z, mx, my) {
  var d = state.pdfDlg;
  if (!d) return;
  var F = pdfFrame(d);
  z = pdfClampZoom(z);
  if (mx == null) { mx = F.w / 2; my = F.h / 2; }
  var lon = d.center[1] + (mx - F.w / 2) / (F.mLon * F.s);
  var lat = d.center[0] - (my - F.h / 2) / (F.mLat * F.s);
  var s2 = F.fit * z;
  d.zoom = z;
  d.center = [lat + (my - F.h / 2) / (F.mLat * s2), lon - (mx - F.w / 2) / (F.mLon * s2)];
  pdfSchedulePreview();
}

function pdfFitScreen() {
  var d = state.pdfDlg;
  if (!d || !map) return;
  var b = map.getBounds();
  var F = pdfFrame(d);
  var spanLon = (b.getEast() - b.getWest()) * F.mLon, spanLat = (b.getNorth() - b.getSouth()) * F.mLat;
  var s = Math.min(F.w / spanLon, F.h / spanLat);
  var c = b.getCenter();
  d.center = [c.lat, c.lng];
  d.zoom = pdfClampZoom(s / F.fit);
  pdfUpdatePreview();
}

function pdfBindPreview() {
  var box = document.getElementById("pdfPrev");
  if (!box) return;
  var drag = null;
  box.addEventListener("pointerdown", function (e) {
    if (!e.target.closest(".printsheet-map")) return;
    var pt = pdfSvgPoint(e.clientX, e.clientY);
    if (!pt) return;
    drag = { id: e.pointerId, last: pt };
    box.classList.add("dragging");
    try { box.setPointerCapture(e.pointerId); } catch (err) {}
    e.preventDefault();
  });
  box.addEventListener("pointermove", function (e) {
    var d = state.pdfDlg;
    if (!drag || !d || e.pointerId !== drag.id) return;
    var pt = pdfSvgPoint(e.clientX, e.clientY);
    if (!pt) return;
    var F = pdfFrame(d);
    d.center = [d.center[0] + (pt[1] - drag.last[1]) / (F.mLat * F.s), d.center[1] - (pt[0] - drag.last[0]) / (F.mLon * F.s)];
    drag.last = pt;
    pdfSchedulePreview();
  });
  function end(e) {
    if (!drag || e.pointerId !== drag.id) return;
    drag = null;
    box.classList.remove("dragging");
  }
  box.addEventListener("pointerup", end);
  box.addEventListener("pointercancel", end);
  box.addEventListener("wheel", function (e) {
    var d = state.pdfDlg;
    if (!d || !e.target.closest(".printsheet-map")) return;
    e.preventDefault();
    var pt = pdfSvgPoint(e.clientX, e.clientY);
    var factor = e.deltaY < 0 ? 1.15 : 1 / 1.15;
    pdfZoomTo(d.zoom * factor, pt && pt[0], pt && pt[1]);
  }, { passive: false });
}

function pdfPrint() {
  var d = state.pdfDlg;
  if (!d) return;
  var html = pdfSheetHtml(d, false);
  closePdfDialog();
  var root = document.getElementById("printSheetRoot");
  root.innerHTML = html;
  setTimeout(function () { window.print(); }, 250);
}

function pdfOnAction(action, el, e) {
  var d = state.pdfDlg;
  if (action === "pdf-close") closePdfDialog();
  else if (action === "pdf-backdrop") { if (e.target === el) closePdfDialog(); }
  else if (!d) return;
  else if (action === "pdf-zoom-in") pdfZoomTo(d.zoom * PDF_ZOOM_STEP);
  else if (action === "pdf-zoom-out") pdfZoomTo(d.zoom / PDF_ZOOM_STEP);
  else if (action === "pdf-fit-all") { d.zoom = 1; d.center = [(d.ext.minLat + d.ext.maxLat) / 2, (d.ext.minLon + d.ext.maxLon) / 2]; pdfUpdatePreview(); }
  else if (action === "pdf-fit-screen") pdfFitScreen();
  else if (action === "pdf-reset") {
    delete pdfMemo[d.view];
    d.layers = pdfDefaultLayers(d.view);
    d.boxes = pdfDefaultBoxes(d.view);
    d.zoom = 1;
    d.center = [(d.ext.minLat + d.ext.maxLat) / 2, (d.ext.minLon + d.ext.maxLon) / 2];
    renderPdfDialog();
  }
  else if (action === "pdf-print") pdfPrint();
}

function pdfOnField(field, t) {
  var d = state.pdfDlg;
  if (!d) return;
  if (field === "pdf-zoom") { pdfZoomTo(Math.pow(2, Number(t.value))); return; }
  var key = t.getAttribute("data-key");
  if (field === "pdf-layer") {
    d.layers[key] = t.checked;
    PDF_LAYERS[d.view].forEach(function (l) {
      if (l.sub !== key) return;
      var sub = document.querySelector('#pdfRoot input[data-key="' + l.key + '"]');
      if (sub) { sub.disabled = !t.checked; sub.closest(".pdfcheck").classList.toggle("disabled", !t.checked); }
    });
  } else if (field === "pdf-box") d.boxes[key] = t.checked;
  pdfUpdatePreview();
}

window.addEventListener("resize", function () { if (state.pdfDlg) pdfFitPreview(); });
