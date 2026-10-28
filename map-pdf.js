"use strict";

/* ---------------------------------------------------------------------
   Map PDF export for both views (Progres Sampling and Hasil Pemantauan
   Lab). A dialog shows a live preview of the A3 print sheet: the map can
   be zoomed (buttons, slider, mouse wheel) and panned (drag) or matched
   to the on-screen map, and every map layer and side box can be turned
   on or off. The legend only lists layers that are actually drawn.

   Name tags (grid names, point codes and values, water, leak and wind
   labels) are placed by a small collision-avoiding layout: each tag
   tries positions around its icon and takes the first one that touches
   no icon, no other tag and no map furniture, with a thin leader line
   when it had to move away. Every tag can be dragged in the preview,
   nudged, resized or hidden; sizes are in paper millimetres, so they
   stay the same when the map zoom changes. On the lab sheet the colours
   can follow the classification (one colour per class, the default) or
   the continuous range gradient. Printing hands the finished sheet to
   the browser's own print dialog, so "Save as PDF" produces the file.
   Coordinates are plain WGS84 latitude/longitude, the same frame the
   rest of the app uses.
--------------------------------------------------------------------- */
var PDF_SHEET_W = 404, PDF_SHEET_H = 281;
var PDF_MAP_H = 271, PDF_MAP_W_KOP = 299, PDF_MAP_W_FULL = 394;
var PX_PER_MM = 96 / 25.4;
var PDF_ZOOM_MIN = 0.5, PDF_ZOOM_MAX = 16, PDF_ZOOM_STEP = 1.25;
var PDF_GRID_STROKE = "#E6007E";
var PDF_STYLE_KEY = "oilspill_pdf_style_v1";
var PDF_ND_COLOR = "#8A979D";
var PDF_LABEL_MIN = 0.5, PDF_LABEL_MAX = 3;
var pdfMemo = {};
var pdfUid = 0;
var pdfSurfaceUrl = null;
var pdfRaf = 0;
var pdfSurfaceTimer = 0;

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
    { key: "surface", label: "Warna sebaran area (interpolasi)" },
    { key: "gridLines", label: "Batas grid" },
    { key: "gridLabels", label: "Nama grid" },
    { key: "points", label: "Titik uji lab (warna klasifikasi)" },
    { key: "valueLabels", label: "Label titik uji" },
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
    { key: "grids", label: "Hasil per grid (rinci)" },
    { key: "title", label: "Kotak judul & kode QR" }
  ]
};
var PDF_SIZE_CATS = {
  progress: [
    { key: "grid", label: "Nama grid" },
    { key: "point", label: "Kode titik" },
    { key: "icon", label: "Ikon titik" }
  ],
  lab: [
    { key: "grid", label: "Nama grid" },
    { key: "point", label: "Label titik uji" },
    { key: "water", label: "Label air permukaan" },
    { key: "leak", label: "Label titik bocor" },
    { key: "wind", label: "Keterangan angin & jarak" },
    { key: "icon", label: "Ikon titik, air & bocor" }
  ]
};
// Font sizes in paper millimetres at a scale of 1.
var PDF_FONT = { grid: 4.2, point: 2.1, pointProg: 2.3, water: 2.1, leak: 2.6, wind: 2.6, ring: 2.2 };
var PDF_ORDER = ["b", "a", "r", "l", "br", "tr", "bl", "tl"];
var PDF_ORDER_RIGHT = ["r", "br", "tr", "b", "a", "l", "bl", "tl"];

function pdfDefaultColors() { return LAB_CLASS.map(function (c) { return c.color; }); }
function pdfDefaultSizes(view) {
  var s = {};
  PDF_SIZE_CATS[view].forEach(function (c) { s[c.key] = 1; });
  return s;
}

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

/* ---- Remembered look (colours, sizes) across sessions ---- */
function pdfLoadStyle() {
  try { return JSON.parse(localStorage.getItem(PDF_STYLE_KEY) || "{}") || {}; } catch (e) { return {}; }
}
function pdfSaveStyle(d) {
  var st = pdfLoadStyle();
  st.colorMode = d.colorMode; st.colors = d.colors; st.autoLayout = d.autoLayout; st.labelMode = d.labelMode;
  st.sizes = st.sizes || {};
  st.sizes[d.view] = d.sizes;
  try { localStorage.setItem(PDF_STYLE_KEY, JSON.stringify(st)); } catch (e) {}
}
function pdfValidColors(c) {
  return Array.isArray(c) && c.length === 4 && c.every(function (x) { return /^#[0-9a-f]{6}$/i.test(x); });
}

function f2(n) { return n.toFixed(2); }
function fmtX(v) { return Number(v).toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + "×"; }
function pdfTextOn(hex) {
  var c = hexToRgb(hex);
  return (0.299 * c[0] + 0.587 * c[1] + 0.114 * c[2]) > 165 ? "#111" : "#fff";
}

/* ---- Colours: one per classification, or the continuous ramp ---- */
function pdfObsColorFn(d) {
  if (d.colorMode === "ramp") return obsColor;
  return function (o) {
    if (o.inconclusive && o.nd) return PDF_ND_COLOR;
    return d.colors[o.level] || d.colors[0];
  };
}
function pdfSurfaceColorFn(d) {
  if (d.colorMode === "ramp") return rampRgb;
  var rgb = d.colors.map(hexToRgb);
  // z = 1, 2, 3 are exactly TK-C, TK-B, TK-A, so a value on a threshold stays in the lower class.
  return function (z) { return rgb[z > 3 ? 3 : z > 2 ? 2 : z > 1 ? 1 : 0]; };
}

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

function pdfInFrame(F, x, y, m) { return x > -m && x < F.w + m && y > -m && y < F.h + m; }

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

function pdfScaleBarM(F) {
  var candidates = [1, 2, 5, 10, 20, 25, 50, 100, 200, 250, 500, 1000];
  var barM = candidates[0];
  for (var i = 0; i < candidates.length; i++) {
    if (candidates[i] * F.s <= F.w * 0.22) barM = candidates[i]; else break;
  }
  return barM;
}

// Map furniture that labels must stay clear of.
function pdfFurnitureRects(F) {
  return [
    { x: F.w - 23.5, y: 0.5, w: 19, h: 22, wt: 2 },
    { x: 3.5, y: F.h - 13.5, w: pdfScaleBarM(F) * F.s + 5, h: 9, wt: 2 }
  ];
}

function pdfNorthScaleSvg(F) {
  var parts = [];
  var naX = F.w - 14, naY = 16;
  parts.push('<g transform="translate(' + naX + ',' + naY + ')">' +
    '<circle cx="0" cy="-2.5" r="9" fill="#fff" fill-opacity="0.8"/>' +
    '<polygon points="0,-9 3,4 0,1 -3,4" fill="#111"/>' +
    '<text x="0" y="-11.5" font-size="4" font-weight="700" text-anchor="middle" fill="#111" stroke="#fff" stroke-width="0.6" paint-order="stroke">N</text></g>');
  var barM = pdfScaleBarM(F);
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

/* ---------------------------------------------------------------------
   Name tags: measuring, collision-avoiding placement, drawing
--------------------------------------------------------------------- */
var pdfMeasureCtx = null, pdfMeasureCache = {};
// Width of a string in em (multiply by the font size in mm).
function pdfTextW(text, bold) {
  var key = (bold ? "b" : "n") + text;
  var v = pdfMeasureCache[key];
  if (v != null) return v;
  if (!pdfMeasureCtx) pdfMeasureCtx = document.createElement("canvas").getContext("2d");
  pdfMeasureCtx.font = (bold ? "bold " : "") + "100px Arial, Helvetica, sans-serif";
  v = pdfMeasureCtx.measureText(text).width / 100;
  pdfMeasureCache[key] = v;
  return v;
}

function pdfRectC(x, y, hw, hh, wt) { return { x: x - hw, y: y - hh, w: hw * 2, h: hh * 2, wt: wt || 2 }; }

function pdfScore(b, rects, F) {
  var mg = 2.5;
  var ix = Math.max(0, Math.min(b.x + b.w, F.w - mg) - Math.max(b.x, mg));
  var iy = Math.max(0, Math.min(b.y + b.h, F.h - mg) - Math.max(b.y, mg));
  var s = (b.w * b.h - ix * iy) * 3;
  for (var i = 0; i < rects.length; i++) {
    var r = rects[i];
    var ow = Math.min(b.x + b.w, r.x + r.w) - Math.max(b.x, r.x);
    if (ow <= 0) continue;
    var oh = Math.min(b.y + b.h, r.y + r.h) - Math.max(b.y, r.y);
    if (oh <= 0) continue;
    s += ow * oh * r.wt;
  }
  return s;
}

function pdfCandList(it) {
  var w = it.w, h = it.h, ax = it.ax, ay = it.ay, list = [];
  if (it.mode === "fixed") return [{ x: ax - w / 2, y: ay - h / 2, far: false }];
  if (it.mode === "center") {
    list.push({ x: ax - w / 2, y: ay - h / 2, far: false });
    [0.6, 1.2, 1.9].forEach(function (k) {
      [0, 180, 270, 90, 315, 225, 45, 135].forEach(function (deg) {
        var a = deg * Math.PI / 180;
        list.push({ x: ax + Math.cos(a) * k * (w * 0.5 + h) - w / 2, y: ay + Math.sin(a) * k * h * 1.1 - h / 2, far: false });
      });
    });
    return list;
  }
  var order = it.order || PDF_ORDER;
  [0.4, 1.4, 2.8, 5].forEach(function (ex, mi) {
    var d0 = it.r + ex, d1 = d0 * 0.72;
    var pos = {
      b: [ax - w / 2, ay + d0], a: [ax - w / 2, ay - d0 - h], r: [ax + d0, ay - h / 2], l: [ax - d0 - w, ay - h / 2],
      br: [ax + d1, ay + d1], tr: [ax + d1, ay - d1 - h], bl: [ax - d1 - w, ay + d1], tl: [ax - d1 - w, ay - d1 - h]
    };
    order.forEach(function (n) { list.push({ x: pos[n][0], y: pos[n][1], far: mi >= 2 }); });
  });
  return list;
}

// Places every tag; returns { key: { x, y, w, h, ax, ay, leader, text } } in sheet millimetres.
// rects are obstacles ({x,y,w,h,wt}); placed tags are appended to it as they are fixed.
function pdfPlaceLabels(F, d, items, rects) {
  var layout = {}, auto = [];
  function fix(it, b, leader) {
    layout[it.key] = { x: b.x, y: b.y, w: it.w, h: it.h, ax: it.ax, ay: it.ay, r: it.r, leader: leader, text: it.plain, it: it };
    rects.push({ x: b.x - 0.2, y: b.y - 0.2, w: it.w + 0.4, h: it.h + 0.4, wt: 1.5 });
  }
  items.forEach(function (it) {
    var ov = d.ov[it.key];
    if (ov && ov.hidden) return;
    it.sz = it.size * ((ov && ov.scale) || 1);
    var w = 0;
    it.parts.forEach(function (p) { w += pdfTextW(p.t, p.bold || it.bold); });
    it.w = w * it.sz + it.sz * 0.3;
    it.h = it.sz * 1.2;
    if (ov && ov.dx != null) {
      var b = { x: it.ax + ov.dx - it.w / 2, y: it.ay + ov.dy - it.h / 2 };
      fix(it, b, Math.sqrt(ov.dx * ov.dx + ov.dy * ov.dy) > it.r + 2.5);
    } else auto.push(it);
  });
  auto.sort(function (a, b) { return b.prio - a.prio; });
  auto.forEach(function (it) {
    var list = pdfCandList(it);
    var best = null, bestScore = Infinity;
    if (!d.autoLayout) { best = list[0]; }
    else {
      for (var i = 0; i < list.length; i++) {
        var c = list[i];
        var s = pdfScore({ x: c.x, y: c.y, w: it.w, h: it.h }, rects, F) + i * 0.001;
        if (s < bestScore) { bestScore = s; best = c; }
        if (s < 0.02) break;
      }
    }
    fix(it, best, !!best.far && it.mode !== "center");
  });
  return layout;
}

function pdfLabelsSvg(items, layout, d, preview) {
  var out = [];
  items.forEach(function (it) {
    var b = layout[it.key];
    if (!b) return;
    var cx = b.x + b.w / 2;
    if (b.leader) {
      var px = Math.max(b.x, Math.min(b.x + b.w, b.ax)), py = Math.max(b.y, Math.min(b.y + b.h, b.ay));
      var dx = px - b.ax, dy = py - b.ay, len = Math.sqrt(dx * dx + dy * dy);
      if (len > it.r + 0.6) {
        var sx = b.ax + dx / len * it.r, sy = b.ay + dy / len * it.r;
        out.push('<line x1="' + f2(sx) + '" y1="' + f2(sy) + '" x2="' + f2(px) + '" y2="' + f2(py) + '" stroke="#37474F" stroke-width="0.15"/>');
      }
    }
    var inner = it.parts.map(function (p) {
      return '<tspan' + ((p.bold || it.bold) ? ' font-weight="700"' : '') + '>' + esc(p.t) + '</tspan>';
    }).join("");
    out.push('<text x="' + f2(cx) + '" y="' + f2(b.y + it.sz * 0.93) + '" font-size="' + it.sz.toFixed(2) + '" fill="' + it.fill + '" text-anchor="middle" stroke="#fff" stroke-width="' + (it.sz * 0.28).toFixed(2) + '" paint-order="stroke" stroke-linejoin="round">' + inner + '</text>');
    if (preview) {
      if (d.sel === it.key) out.push('<rect x="' + f2(b.x - 0.3) + '" y="' + f2(b.y - 0.3) + '" width="' + f2(b.w + 0.6) + '" height="' + f2(b.h + 0.6) + '" fill="none" stroke="#00B3A6" stroke-width="0.35" stroke-dasharray="1 0.7"/>');
      out.push('<rect data-lbl="' + esc(it.key) + '" x="' + f2(b.x) + '" y="' + f2(b.y) + '" width="' + f2(b.w) + '" height="' + f2(b.h) + '" fill="#000" fill-opacity="0" pointer-events="all"/>');
    }
  });
  return out.join("");
}

function pdfItem(key, plain, parts, size, fill, mode, ax, ay, r, prio, extra) {
  var it = { key: key, plain: plain, parts: parts, size: size, fill: fill, mode: mode, ax: ax, ay: ay, r: r, prio: prio, bold: false };
  if (extra) Object.keys(extra).forEach(function (k) { it[k] = extra[k]; });
  return it;
}

function pdfGridLabelItems(F, d, items) {
  GRIDS.forEach(function (g) {
    var c = ringCentroid(g.ring.slice(0, -1));
    var xy = F.p(c[0], c[1]);
    if (!pdfInFrame(F, xy[0], xy[1], 2)) return;
    items.push(pdfItem("grid:" + g.id, g.label, [{ t: g.label }], PDF_FONT.grid * d.sizes.grid, "#111", "center", xy[0], xy[1], 0, 500, { bold: true }));
  });
}

/* ---- Progress view map ---- */
function pdfProgressShown() {
  var q = (state.search || "").trim().toLowerCase();
  return allPoints().filter(function (p) {
    return matchesFilter(repOf(p.id, state.round)) && (!q || p.id.toLowerCase().indexOf(q) !== -1);
  });
}

function pdfProgressMapSvg(d, F, preview) {
  var L = d.layers, round = state.round, isc = d.sizes.icon;
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
  var shown = pdfProgressShown();
  var rects = L.northScale ? pdfFurnitureRects(F) : [];
  var items = [];
  if (L.actual) {
    shown.forEach(function (p) {
      var r = repOf(p.id, round);
      if (r.actualLat == null || r.actualLon == null) return;
      var a = F.p(p.lat, p.lon), b = F.p(r.actualLat, r.actualLon);
      parts.push('<line x1="' + f2(a[0]) + '" y1="' + f2(a[1]) + '" x2="' + f2(b[0]) + '" y2="' + f2(b[1]) + '" stroke="' + ACTUAL_FILL + '" stroke-width="0.35" stroke-dasharray="1 0.8"/>');
      parts.push('<circle cx="' + f2(b[0]) + '" cy="' + f2(b[1]) + '" r="' + f2(1.9 * isc) + '" fill="#FFD600" fill-opacity="0.55"/>');
      parts.push('<circle cx="' + f2(b[0]) + '" cy="' + f2(b[1]) + '" r="' + f2(1.2 * isc) + '" fill="' + ACTUAL_FILL + '" stroke="#fff" stroke-width="0.35"/>');
      rects.push(pdfRectC(b[0], b[1], 1.9 * isc, 1.9 * isc, 2));
    });
  }
  var rIcon = 1.65 * isc;
  shown.forEach(function (p) {
    var r = repOf(p.id, round);
    var xy = F.p(p.lat, p.lon);
    if (!pdfInFrame(F, xy[0], xy[1], 4)) return;
    if (L.points) {
      if (r.issue) {
        parts.push('<rect x="' + f2(xy[0] - 1.3 * isc) + '" y="' + f2(xy[1] - 1.3 * isc) + '" width="' + f2(2.6 * isc) + '" height="' + f2(2.6 * isc) + '" fill="#F2635C" stroke="#7a1410" stroke-width="0.25"/>');
      } else {
        parts.push('<circle cx="' + f2(xy[0]) + '" cy="' + f2(xy[1]) + '" r="' + f2(1.4 * isc) + '" fill="' + (r.done ? "#3BD488" : "#FFD400") + '" stroke="' + (r.done ? "#fff" : "#5c4b00") + '" stroke-width="' + (r.done ? 0.4 : 0.25) + '"/>');
      }
      rects.push(pdfRectC(xy[0], xy[1], rIcon, rIcon, 2));
    }
    if (L.pointLabels) {
      items.push(pdfItem("pt:" + p.id, p.id, [{ t: p.id }], PDF_FONT.pointProg * d.sizes.point, "#0a1116", "around", xy[0], xy[1], rIcon, 100 + (r.issue ? 10 : 0)));
    }
  });
  if (L.gridLabels) pdfGridLabelItems(F, d, items);
  d.layout = pdfPlaceLabels(F, d, items, rects);
  parts.push(pdfLabelsSvg(items, d.layout, d, preview));
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

// Everything the lab sheet needs, computed once per dialog (the colour field is repainted on demand).
function pdfLabData() {
  var cfg = state.labCfg;
  var obsList = labPointObsList(cfg.param, cfg.depth);
  var sampledGrids = {}, tested = {};
  obsList.forEach(function (o) { tested[o.loc] = true; if (o.info.gridId) sampledGrids[o.info.gridId] = true; });
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
  var hasInconclusive = obsList.some(function (o) { return o.entries.some(function (e) { return e.obs.inconclusive && e.obs.nd; }); });
  return {
    obsList: obsList, sampledGrids: sampledGrids, tested: tested, field: buildLabSurfaceField(obsList, sampledGrids), surface: null, water: water,
    windR: Math.max(120, Math.min(400, maxD + 25)), kpis: labKpis(), analysis: computeLabAnalysis(), depths: labDepthOptions(), hasInconclusive: hasInconclusive
  };
}

function pdfPaintSurface(d) {
  var data = d.lab;
  if (!data || !data.field) return;
  if (pdfSurfaceTimer) { clearTimeout(pdfSurfaceTimer); pdfSurfaceTimer = 0; }
  var surf = paintLabSurface(data.field, pdfSurfaceColorFn(d));
  var url = dataUrlToObjectUrl(surf.url);
  if (pdfSurfaceUrl) URL.revokeObjectURL(pdfSurfaceUrl);
  pdfSurfaceUrl = url.indexOf("blob:") === 0 ? url : null;
  data.surface = { url: url, bounds: surf.bounds };
}

function pdfQueueSurface() {
  if (pdfSurfaceTimer) clearTimeout(pdfSurfaceTimer);
  pdfSurfaceTimer = setTimeout(function () {
    pdfSurfaceTimer = 0;
    var d = state.pdfDlg;
    if (!d) return;
    pdfPaintSurface(d);
    pdfSchedulePreview();
  }, 140);
}

function pdfSvgInner(html) { return html.slice(html.indexOf(">") + 1, html.lastIndexOf("</svg>")); }

function pdfGlyph(entries, x, y, diaMm, colorFn) {
  var g = glyphSvg(entries, false, undefined, colorFn);
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

function pdfLabelText(d, o, cfg) {
  var val = cfg.param === "index" ? LAB_CLASS[o.level].mgmt : obsDisplay(o.best.obs);
  var ex = o.level >= 1;
  if (d.labelMode === "code") return { plain: o.info.label, parts: [{ t: o.info.label, bold: true }], ex: ex };
  if (d.labelMode === "value") return { plain: val, parts: [{ t: val, bold: ex }], ex: ex };
  return { plain: o.info.label + " " + val, parts: [{ t: o.info.label, bold: true }, { t: " " + val, bold: ex }], ex: ex };
}

function pdfLabMapSvg(d, F, preview) {
  var cfg = state.labCfg, L = d.layers, data = d.lab, isc = d.sizes.icon;
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

  var rects = L.northScale ? pdfFurnitureRects(F) : [];
  var items = [];
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
    if (pdfInFrame(F, lbl[0], lbl[1], 2)) {
      var wtxt = "Angin menuju " + compassName(cfg.windTo) + (windHasSpeed() ? " · " + fmtNum(cfg.windMeta.speedKmh) + " km/jam" : "");
      items.push(pdfItem("wind", wtxt, [{ t: wtxt }], PDF_FONT.wind * d.sizes.wind, "#0D47A1", "fixed", lbl[0], lbl[1], 0, 990, { bold: true }));
    }
  }
  if (L.rings) {
    [50, 100, 150, 200, 300].forEach(function (rad) {
      if (rad > R) return;
      parts.push('<circle cx="' + f2(leak[0]) + '" cy="' + f2(leak[1]) + '" r="' + f2(rad * F.s) + '" fill="none" stroke="#fff" stroke-width="0.35" stroke-opacity="0.85"/>');
      parts.push('<circle cx="' + f2(leak[0]) + '" cy="' + f2(leak[1]) + '" r="' + f2(rad * F.s) + '" fill="none" stroke="#37474F" stroke-width="0.15" stroke-dasharray="0.8 0.8"/>');
      var lp = destPoint(cfg.leakLat, cfg.leakLon, cfg.windTo + 90, rad);
      var lpxy = F.p(lp[0], lp[1]);
      if (pdfInFrame(F, lpxy[0], lpxy[1], 2)) {
        items.push(pdfItem("ring:" + rad, rad + " m", [{ t: rad + " m" }], PDF_FONT.ring * d.sizes.wind, "#37474F", "fixed", lpxy[0], lpxy[1], 0, 980));
      }
    });
  }

  var colorFn = pdfObsColorFn(d);
  var dia = 5.2 * isc, rIcon = dia * 0.42;
  var sorted = data.obsList.slice().sort(function (a, b) { return a.z - b.z; });
  if (L.untested) {
    allPoints().forEach(function (p) {
      if (data.tested[p.id]) return;
      var xy = F.p(p.lat, p.lon);
      parts.push('<circle cx="' + f2(xy[0]) + '" cy="' + f2(xy[1]) + '" r="0.75" fill="#0A1116" fill-opacity="0.6" stroke="#D5DEE2" stroke-width="0.3"/>');
      rects.push(pdfRectC(xy[0], xy[1], 1, 1, 1.2));
    });
  }
  if (L.points) {
    sorted.forEach(function (o) {
      var xy = F.p(o.info.lat, o.info.lon);
      if (!pdfInFrame(F, xy[0], xy[1], 6)) return;
      parts.push(pdfGlyph(o.entries, xy[0], xy[1], dia, colorFn));
      rects.push(pdfRectC(xy[0], xy[1], rIcon, rIcon, 2));
    });
  }
  var waterH = 5 * isc;
  if (L.water) {
    data.water.forEach(function (s) {
      var info = locInfo(s.loc);
      var xy = F.p(info.lat, info.lon);
      if (!pdfInFrame(F, xy[0], xy[1], 6)) return;
      parts.push(pdfWaterDrop(WATER_STATUS[waterStatus(s)].color, xy[0], xy[1], waterH));
      rects.push({ x: xy[0] - waterH * 0.29, y: xy[1] - waterH * 0.7, w: waterH * 0.58, h: waterH * 0.84, wt: 2 });
    });
  }
  var rLeak = 1.8 * isc;
  if (L.leak) {
    parts.push(pdfLeakSymbol(leak[0], leak[1], rLeak));
    rects.push(pdfRectC(leak[0], leak[1], rLeak * 1.6, rLeak * 1.6, 2));
    if (pdfInFrame(F, leak[0], leak[1], 2)) {
      items.push(pdfItem("leak", "Titik bocor", [{ t: "Titik bocor" }], PDF_FONT.leak * d.sizes.leak, "#B71C1C", "around", leak[0], leak[1], rLeak * 1.6, 1000, { bold: true, order: PDF_ORDER_RIGHT }));
    }
  }
  if (L.valueLabels) {
    sorted.forEach(function (o) {
      if (L.labelsExceedOnly && o.level < 1) return;
      var xy = F.p(o.info.lat, o.info.lon);
      if (!pdfInFrame(F, xy[0], xy[1], 2)) return;
      var t = pdfLabelText(d, o, cfg);
      items.push(pdfItem("pt:" + o.loc, t.plain, t.parts, PDF_FONT.point * d.sizes.point, t.ex ? "#8B1A10" : "#0a1116", "around", xy[0], xy[1], rIcon, 100 + o.level * 30 + o.z * 5));
    });
    if (L.water) {
      data.water.forEach(function (s) {
        var info = locInfo(s.loc);
        var xy = F.p(info.lat, info.lon);
        if (!pdfInFrame(F, xy[0], xy[1], 2)) return;
        var wt = "Air " + info.label;
        items.push(pdfItem("wt:" + s.loc, wt, [{ t: wt }], PDF_FONT.water * d.sizes.water, "#0D47A1", "around", xy[0], xy[1] - waterH * 0.25, waterH * 0.45, 50, { bold: true }));
      });
    }
  }
  if (L.gridLabels) pdfGridLabelItems(F, d, items);
  d.layout = pdfPlaceLabels(F, d, items, rects);
  parts.push(pdfLabelsSvg(items, d.layout, d, preview));
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

function pdfSortedGrids() {
  return GRIDS.slice().sort(function (a, b) { return naturalCompare(a.label, b.label); });
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
    out.push(pdfBox("PROGRES PER GRID", '<div class="printkop-gridgrid">' + pdfSortedGrids().map(function (g) {
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

// Classification rows for the chosen map parameter (class 1 does not exist when TK-C is not defined).
function pdfClassRows(param) {
  var tk = param === "index" ? null : LAB_PARAMS[param].tk;
  var hasC = !tk || tk.C != null;
  var rows = [];
  [0, 1, 2, 3].forEach(function (lv) {
    if (lv === 1 && !hasC) return;
    var title = LAB_CLASS[lv].short, range = "";
    if (lv === 0 && !hasC) title = "< TK-B";
    if (tk) {
      if (lv === 0) range = "< " + fmtNum(hasC ? tk.C : tk.B);
      else if (lv === 1) range = fmtNum(tk.C) + " – " + fmtNum(tk.B);
      else if (lv === 2) range = fmtNum(tk.B) + " – " + fmtNum(tk.A);
      else range = "> " + fmtNum(tk.A);
      range += " mg/kg";
    }
    rows.push({ level: lv, title: title, mgmt: LAB_CLASS[lv].mgmt, range: range });
  });
  return rows;
}

function pdfLabLegend(d) {
  var cfg = state.labCfg, L = d.layers, data = d.lab, items = [];
  var paramTxt = labParamLabel(cfg.param) + (cfg.param !== "index" ? " (mg/kg)" : "");
  var depthTxt = cfg.depth === "max" ? "nilai tertinggi" : depthLabel(Number(cfg.depth));
  var classMode = d.colorMode !== "ramp";
  if (L.points || L.surface) {
    if (classMode) {
      items.push('<p class="printkop-legsub">Klasifikasi &amp; pengelolaan · ' + esc(paramTxt) + ' · ' + esc(depthTxt) + '</p>');
      pdfClassRows(cfg.param).forEach(function (r) {
        items.push(pdfLegItem(pdfSym('<rect x="0.3" y="0.2" width="5.4" height="3.6" rx="0.5" fill="' + d.colors[r.level] + '" stroke="#333" stroke-width="0.2"/>'),
          '<b>' + esc(r.title) + '</b> · ' + esc(r.mgmt) + (r.range ? '<span class="printkop-legrange">' + esc(r.range) + '</span>' : '')));
      });
      if (data.hasInconclusive) items.push(pdfLegItem(pdfSym('<rect x="0.3" y="0.2" width="5.4" height="3.6" rx="0.5" fill="' + PDF_ND_COLOR + '" stroke="#333" stroke-width="0.2"/>'), "Di bawah batas deteksi lab yang lebih tinggi dari ambang (belum dapat disimpulkan)"));
    } else {
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
  }
  if (L.points) {
    var colorFn = pdfObsColorFn(d);
    if (data.depths.length >= 2) {
      var lv = classMode ? [2, 0] : [0, 0];
      var gl = glyphSvg(data.depths.map(function (dd, i) { return { obs: { z: i === 0 ? 1.6 : 0.5, level: lv[i === 0 ? 0 : 1], nd: false } }; }), false, 16, colorFn);
      items.push(pdfLegItem('<svg class="printkop-sym" viewBox="0 0 ' + gl.size + ' ' + gl.size + '" width="4.6mm" height="4.6mm" xmlns="http://www.w3.org/2000/svg">' + pdfSvgInner(gl.html) + '</svg>',
        "Titik uji, lingkaran berlapis: atas " + esc(depthLabel(data.depths[0])) + ", bawah " + esc(depthLabel(data.depths[data.depths.length - 1]))));
    } else {
      items.push(pdfLegItem(pdfSym('<circle cx="3" cy="2" r="1.6" fill="#fff"/><circle cx="3" cy="2" r="1.25" fill="' + (classMode ? d.colors[0] : rampHex(0.5)) + '"/>'), "Titik uji lab, warna sesuai " + (classMode ? "klasifikasi" : "nilai")));
    }
    items.push(pdfLegItem(pdfSym('<circle cx="3" cy="2" r="1.6" fill="#fff"/><circle cx="3" cy="2" r="1.25" fill="' + (classMode ? d.colors[2] : rampHex(1.6)) + '"/><circle cx="3" cy="2" r="1.85" fill="none" stroke="#0A1116" stroke-width="0.3"/>'), "Garis tepi gelap: ada sampel melebihi TK-C"));
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
  if (L.rings) items.push(pdfLegItem(pdfSym('<circle cx="3" cy="2" r="1.7" fill="none" stroke="#37474F" stroke-width="0.25" stroke-dasharray="0.6 0.5"/>'), "Lingkaran jarak dari titik bocor (50, 100, 150 m, …)"));
  if (L.gridLines) items.push(pdfLegLine());
  if (L.basemap) items.push(pdfLegBasemap());
  if (L.surface && data.field) {
    items.push('<p class="printkop-note">' + (classMode
      ? 'Warna area: zona klasifikasi hasil interpolasi antar titik uji di dalam area grid yang memiliki sampel, makin pudar makin jauh dari titik uji.'
      : 'Gradasi warna: interpolasi antar titik uji di dalam area grid yang memiliki sampel, makin pudar makin jauh dari titik uji.') +
      ' Hasil di bawah batas deteksi lab digambar sebagai tidak terdeteksi. Ambang TK-A, TK-B, TK-C menurut PP 22/2021.</p>');
  }
  return pdfBox("LEGENDA", items.join("") || '<p class="printkop-note">Tidak ada lapisan yang ditampilkan.</p>');
}

// Per-grid results in natural grid order: tested points, count per classification (one colour each),
// highest value, and surface water status.
function pdfLabGridBox(d) {
  var cfg = state.labCfg, data = d.lab;
  var paramTxt = labParamLabel(cfg.param) + (cfg.param !== "index" ? " (mg/kg)" : "");
  var depthTxt = cfg.depth === "max" ? "nilai tertinggi" : depthLabel(Number(cfg.depth));
  var hasC = cfg.param === "index" || LAB_PARAMS[cfg.param].tk.C != null;
  var heads = hasC ? ["< C", "C–B", "B–A", "> A"] : ["< B", "–", "B–A", "> A"];
  var rows = [], empty = [], tot = [0, 0, 0, 0], totN = 0;
  function chip(n, lv) {
    if (!n) return '<span class="printkop-zero">–</span>';
    return '<span class="printkop-chip" style="background:' + d.colors[lv] + ';color:' + pdfTextOn(d.colors[lv]) + '">' + n + '</span>';
  }
  pdfSortedGrids().forEach(function (g) {
    var obs = data.obsList.filter(function (o) { return o.info.gridId === g.id; });
    var water = data.water.filter(function (s) { var i = locInfo(s.loc); return i && i.gridId === g.id; });
    if (!obs.length && !water.length) { empty.push(g.label); return; }
    var cnt = [0, 0, 0, 0], best = null;
    obs.forEach(function (o) {
      cnt[o.level]++;
      if (!best || o.z > best.z || (o.z === best.z && o.level > best.level)) best = o;
    });
    cnt.forEach(function (n, i) { tot[i] += n; });
    totN += obs.length;
    var top = "–";
    if (best) {
      var v = cfg.param === "index" ? LAB_CLASS[best.level].mgmt : (best.nd ? "tdk terdeteksi" : fmtVal(best.best.obs.val));
      var code = String(best.info.label).replace(/^GRID/i, "");
      top = '<b>' + esc(v) + '</b>' + (best.nd ? '' : ' <span class="printkop-muted">' + esc(code) + (best.best.depth != null ? ' · ' + esc(depthLabel(best.best.depth)) : '') + '</span>');
    }
    rows.push('<div class="printkop-gr"><span class="printkop-gname">' + esc(g.label) + '</span><span class="printkop-gnum">' + (obs.length || '–') + '</span>' +
      [0, 1, 2, 3].map(function (lv) { return '<span class="printkop-gnum">' + (obs.length ? chip(cnt[lv], lv) : '<span class="printkop-zero">–</span>') + '</span>'; }).join("") +
      '<span class="printkop-gtop">' + top + '</span></div>');
  });
  var head = '<div class="printkop-gr printkop-ghead"><span class="printkop-gname">Grid</span><span class="printkop-gnum">Uji</span>' +
    heads.map(function (h, lv) { return '<span class="printkop-gnum"><i class="printkop-gsw" style="background:' + d.colors[lv] + '"></i>' + esc(h) + '</span>'; }).join("") +
    '<span class="printkop-gtop">Tertinggi (titik · kedalaman)</span></div>';
  var total = '<div class="printkop-gr printkop-gtotal"><span class="printkop-gname">Total</span><span class="printkop-gnum">' + totN + '</span>' +
    [0, 1, 2, 3].map(function (lv) { return '<span class="printkop-gnum">' + tot[lv] + '</span>'; }).join("") + '<span class="printkop-gtop"></span></div>';
  var body = '<p class="printkop-note printkop-note-top">' + esc(paramTxt) + ' · ' + esc(depthTxt) + '. Jumlah titik uji menurut klasifikasi; C, B, A = TK-C, TK-B, TK-A (PP 22/2021). Diurutkan menurut nama grid.</p>' +
    (rows.length ? '<div class="printkop-gtable">' + head + rows.join("") + total + '</div>' : '<p class="printkop-note">Belum ada hasil lab.</p>');
  if (data.water.length) {
    var wr = data.water.slice().sort(function (a, b) { return naturalCompare(locLabel(a.loc), locLabel(b.loc)); }).map(function (s) {
      var st = WATER_STATUS[waterStatus(s)];
      return '<div class="printkop-wr"><span class="printkop-gname">' + esc(locLabel(s.loc)) + '</span><span><i class="printkop-gsw" style="background:' + st.color + '"></i>' + esc(st.label) + '</span></div>';
    }).join("");
    body += '<p class="printkop-subtitle">Air permukaan (baku mutu PP 22/2021)</p>' + wr;
  }
  if (empty.length) body += '<p class="printkop-note">Belum ada hasil lab: ' + esc(empty.join(", ")) + '.</p>';
  return pdfBox("HASIL PER GRID", body);
}

function pdfLabKop(d, F) {
  var cfg = state.labCfg, B = d.boxes, data = d.lab, k = data.kpis, out = [];
  var paramTxt = labParamLabel(cfg.param) + (cfg.param !== "index" ? " (mg/kg)" : "");
  var depthTxt = cfg.depth === "max" ? "nilai tertinggi" : depthLabel(Number(cfg.depth));
  if (B.legend) out.push(pdfLabLegend(d));
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
  if (B.grids) out.push(pdfLabGridBox(d));
  if (B.title) out.push(pdfTitleBox("Peta Sebaran Hasil Lab", [["Parameter", esc(paramTxt)]]));
  return out.join("");
}

function pdfSheetHtml(d, preview) {
  var F = pdfFrame(d);
  var mapSvg = d.view === "lab" ? pdfLabMapSvg(d, F, preview) : pdfProgressMapSvg(d, F, preview);
  var kop = pdfHasKop(d) ? (d.view === "lab" ? pdfLabKop(d, F) : pdfProgressKop(d, F)) : "";
  return '<div class="printsheet"' + (preview ? ' style="width:' + PDF_SHEET_W + 'mm;height:' + PDF_SHEET_H + 'mm"' : '') + '><div class="printsheet-border' + (kop ? '' : ' printsheet-nokop') + '">' +
    '<div class="printsheet-map">' + mapSvg + '</div>' +
    (kop ? '<div class="printsheet-kop"><div class="printsheet-kopin"' + (d.kopZoom && d.kopZoom < 1 ? ' style="zoom:' + d.kopZoom.toFixed(3) + '"' : '') + '>' + kop + '</div></div>' : '') +
    '</div></div>';
}

/* ---- Dialog ---- */
function openPdfDialog() {
  var view = state.view === "lab" ? "lab" : "progress";
  var memo = pdfMemo[view];
  var st = pdfLoadStyle();
  var ext = pdfBaseExtent(view);
  var sizes = pdfDefaultSizes(view);
  var savedSizes = memo ? memo.sizes : (st.sizes && st.sizes[view]) || {};
  Object.keys(sizes).forEach(function (k) {
    var v = Number(savedSizes[k]);
    if (v >= PDF_LABEL_MIN && v <= PDF_LABEL_MAX) sizes[k] = v;
  });
  var d = {
    view: view,
    layers: memo ? Object.assign({}, memo.layers) : pdfDefaultLayers(view),
    boxes: memo ? Object.assign({}, memo.boxes) : pdfDefaultBoxes(view),
    ext: ext,
    zoom: memo ? memo.zoom : 1,
    center: memo ? memo.center.slice() : [(ext.minLat + ext.maxLat) / 2, (ext.minLon + ext.maxLon) / 2],
    colorMode: memo ? memo.colorMode : (st.colorMode === "ramp" ? "ramp" : "class"),
    colors: memo ? memo.colors.slice() : (pdfValidColors(st.colors) ? st.colors.slice() : pdfDefaultColors()),
    sizes: sizes,
    autoLayout: memo ? memo.autoLayout : st.autoLayout !== false,
    labelMode: memo ? memo.labelMode : (["both", "value", "code"].indexOf(st.labelMode) !== -1 ? st.labelMode : "both"),
    ov: memo ? JSON.parse(JSON.stringify(memo.ov)) : {},
    sel: null,
    layout: {}
  };
  if (view === "lab") { d.lab = pdfLabData(); pdfPaintSurface(d); }
  state.pdfDlg = d;
  renderPdfDialog();
}

function pdfRemember() {
  var d = state.pdfDlg;
  if (!d) return;
  pdfMemo[d.view] = {
    layers: Object.assign({}, d.layers), boxes: Object.assign({}, d.boxes), zoom: d.zoom, center: d.center.slice(),
    colorMode: d.colorMode, colors: d.colors.slice(), sizes: Object.assign({}, d.sizes), autoLayout: d.autoLayout, labelMode: d.labelMode,
    ov: JSON.parse(JSON.stringify(d.ov))
  };
  pdfSaveStyle(d);
}

function closePdfDialog() {
  pdfRemember();
  if (pdfSurfaceTimer) { clearTimeout(pdfSurfaceTimer); pdfSurfaceTimer = 0; }
  state.pdfDlg = null;
  var root = document.getElementById("pdfRoot");
  if (root) root.innerHTML = "";
}

function pdfCheck(field, key, label, checked, disabled, sub) {
  return '<label class="pdfcheck' + (sub ? ' pdfcheck-sub' : '') + (disabled ? ' disabled' : '') + '"><input type="checkbox" data-field="' + field + '" data-key="' + key + '"' + (checked ? ' checked' : '') + (disabled ? ' disabled' : '') + '/><span>' + esc(label) + '</span></label>';
}

function pdfSlider(field, key, label, value, valId) {
  return '<label class="pdfslider"><span>' + esc(label) + '</span>' +
    '<input type="range" data-field="' + field + '" data-key="' + key + '" min="' + PDF_LABEL_MIN + '" max="' + PDF_LABEL_MAX + '" step="0.1" value="' + value + '" aria-label="' + esc(label) + '"/>' +
    '<b' + (valId ? ' id="' + valId + '"' : '') + '>' + fmtX(value) + '</b></label>';
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

function pdfColorSection(d) {
  var rows = pdfClassRows(state.labCfg.param);
  var classOnly = d.colorMode !== "ramp";
  return '<div class="pdfsec"><div class="pdfsec-title">Warna klasifikasi &amp; pengelolaan</div>' +
    '<label class="pdfselect"><span>Pewarnaan titik &amp; area</span><select data-field="pdf-colormode" aria-label="Cara pewarnaan">' +
    '<option value="class"' + (classOnly ? ' selected' : '') + '>Satu warna per klasifikasi</option>' +
    '<option value="ramp"' + (classOnly ? '' : ' selected') + '>Gradasi menurut rentang nilai</option></select></label>' +
    '<div id="pdfColors"' + (classOnly ? '' : ' style="display:none"') + '>' +
    rows.map(function (r) {
      return '<label class="pdfcolor"><input type="color" data-field="pdf-color" data-key="' + r.level + '" value="' + d.colors[r.level] + '" aria-label="Warna ' + esc(r.title) + '"/>' +
        '<span><b>' + esc(r.title) + '</b><small>' + esc(r.mgmt) + (r.range ? ' · ' + esc(r.range) : '') + '</small></span></label>';
    }).join("") +
    '<div class="pdfbtnrow"><button type="button" class="btn btn-sm" data-action="pdf-colors-reset">Kembalikan warna bawaan</button></div></div>' +
    '<p class="pdfsec-note">Dengan satu warna per klasifikasi, setiap titik dan area diwarnai sesuai kelasnya (di bawah TK-C, TK-C–TK-B, TK-B–TK-A, di atas TK-A), tanpa peralihan warna antar rentang.</p></div>';
}

function renderPdfDialog() {
  var root = document.getElementById("pdfRoot");
  if (!root) return;
  var d = state.pdfDlg;
  if (!d) { root.innerHTML = ""; return; }
  var lab = d.view === "lab";
  var layerHtml = PDF_LAYERS[d.view].map(function (l) {
    if (l.key === "surface" && !d.lab.field) return pdfCheck("pdf-layer", l.key, l.label + " (belum ada data)", false, true);
    return pdfCheck("pdf-layer", l.key, l.label, d.layers[l.key], l.sub && !d.layers[l.sub], !!l.sub);
  }).join("");
  var boxHtml = PDF_BOXES[d.view].map(function (b) { return pdfCheck("pdf-box", b.key, b.label, d.boxes[b.key]); }).join("");
  var sizeHtml = PDF_SIZE_CATS[d.view].map(function (c) { return pdfSlider("pdf-size", c.key, c.label, d.sizes[c.key]); }).join("");
  var modeHtml = lab ? '<label class="pdfselect"><span>Isi label titik uji</span><select data-field="pdf-labelmode" aria-label="Isi label titik uji">' +
    [["both", "Kode + nilai"], ["value", "Nilai saja"], ["code", "Kode saja"]].map(function (o) { return '<option value="' + o[0] + '"' + (d.labelMode === o[0] ? ' selected' : '') + '>' + o[1] + '</option>'; }).join("") + '</select></label>' : '';
  root.innerHTML = '<div class="modal-backdrop" data-action="pdf-backdrop">' +
    '<div class="modal modal-pdf" role="dialog" aria-modal="true" aria-labelledby="pdfTitle">' +
    '<div class="modal-head"><h3 id="pdfTitle">Ekspor PDF Peta · ' + (lab ? "Hasil Pemantauan Lab" : "Progres Sampling") + '</h3>' +
    '<button type="button" class="iconbtn" data-action="pdf-close" aria-label="Tutup">' + ICONS.close + '</button></div>' +
    '<div class="modal-body pdfdlg">' +
    '<div class="pdfdlg-prev">' +
    '<div class="pdfprev" id="pdfPrev"><div class="pdfprev-scale" id="pdfPrevScale"></div></div>' +
    '<p class="pdfprev-hint">Pratinjau lembar A3. Seret peta untuk menggeser, gulir mouse di atas peta untuk memperbesar atau memperkecil. Klik sebuah label untuk memilihnya, lalu seret untuk memindahkannya.</p>' +
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
    (lab ? pdfColorSection(d) : '') +
    '<div class="pdfsec"><div class="pdfsec-title">Label &amp; ikon</div>' +
    pdfCheck("pdf-auto", "auto", "Atur posisi label otomatis agar tidak tumpang tindih", d.autoLayout) +
    modeHtml + sizeHtml +
    '<div class="pdfsel" id="pdfSelBox"></div>' +
    '<div class="pdfbtnrow" id="pdfLblSummary"></div>' +
    '<p class="pdfsec-note">Ukuran huruf dalam milimeter di kertas, jadi tidak berubah saat peta diperbesar. Label yang dipindah atau diperbesar satu per satu tetap pada pengaturannya.</p></div>' +
    '<div class="pdfsec"><div class="pdfsec-title">Kotak di samping peta</div>' + boxHtml +
    '<p class="pdfsec-note">Bila semua kotak dimatikan, peta memenuhi seluruh lembar.</p></div>' +
    '<p class="pdfsec-note">' + esc(pdfContextNote(d)) + '</p>' +
    '</div></div>' +
    '<div class="modal-foot"><button type="button" class="btn btn-sm" data-action="pdf-reset">Kembalikan bawaan</button><div class="modal-foot-right">' +
    '<button type="button" class="btn" data-action="pdf-close">Batal</button>' +
    '<button type="button" class="btn btn-primary" data-action="pdf-print">' + ICONS.download + ' Cetak / Simpan PDF</button>' +
    '</div></div></div></div>';
  pdfBindPreview();
  pdfRenderSel();
  pdfUpdatePreview();
}

function pdfRenderSel() {
  var d = state.pdfDlg;
  var box = document.getElementById("pdfSelBox"), sum = document.getElementById("pdfLblSummary");
  if (!d || !box) return;
  var L = d.sel && d.layout[d.sel];
  if (d.sel && !L) d.sel = null;
  if (!L) {
    box.innerHTML = '<p class="pdfsec-note">Belum ada label dipilih. Klik label di pratinjau untuk mengatur ukuran dan posisinya satu per satu.</p>';
  } else {
    var sc = (d.ov[d.sel] && d.ov[d.sel].scale) || 1;
    box.innerHTML = '<div class="pdfsel-name">Label terpilih: <b>' + esc(L.text) + '</b></div>' +
      pdfSlider("pdf-lblscale", "", "Ukuran label ini", sc, "pdfLblScaleVal") +
      '<div class="pdfnudge" role="group" aria-label="Geser label">' +
      '<span>Geser</span>' +
      '<button type="button" class="iconbtn" data-action="pdf-lbl-nudge" data-dx="-0.5" data-dy="0" aria-label="Geser ke kiri">←</button>' +
      '<button type="button" class="iconbtn" data-action="pdf-lbl-nudge" data-dx="0" data-dy="-0.5" aria-label="Geser ke atas">↑</button>' +
      '<button type="button" class="iconbtn" data-action="pdf-lbl-nudge" data-dx="0" data-dy="0.5" aria-label="Geser ke bawah">↓</button>' +
      '<button type="button" class="iconbtn" data-action="pdf-lbl-nudge" data-dx="0.5" data-dy="0" aria-label="Geser ke kanan">→</button></div>' +
      '<div class="pdfbtnrow"><button type="button" class="btn btn-sm" data-action="pdf-lbl-reset">Atur ulang label ini</button>' +
      '<button type="button" class="btn btn-sm" data-action="pdf-lbl-hide">Sembunyikan label ini</button></div>';
  }
  var hidden = Object.keys(d.ov).filter(function (k) { return d.ov[k].hidden; }).length;
  var edited = Object.keys(d.ov).length;
  if (sum) {
    sum.innerHTML = (edited ? '<button type="button" class="btn btn-sm" data-action="pdf-lbls-reset">Atur ulang semua label (' + edited + ')</button>' : '') +
      (hidden ? '<button type="button" class="btn btn-sm" data-action="pdf-lbls-showall">Tampilkan ' + hidden + ' label tersembunyi</button>' : '');
  }
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
  if (d.sel && !d.layout[d.sel]) { d.sel = null; pdfRenderSel(); }
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

// A tag's override: position as an offset (mm) from its icon, plus size factor and hidden flag.
function pdfOverride(key) {
  var d = state.pdfDlg;
  if (!d.ov[key]) d.ov[key] = {};
  return d.ov[key];
}
function pdfPinOffset(key) {
  var d = state.pdfDlg, L = d.layout[key], ov = pdfOverride(key);
  if (ov.dx == null && L) { ov.dx = L.x + L.w / 2 - L.ax; ov.dy = L.y + L.h / 2 - L.ay; }
  return ov;
}

function pdfBindPreview() {
  var box = document.getElementById("pdfPrev");
  if (!box) return;
  var drag = null;
  box.addEventListener("pointerdown", function (e) {
    var d = state.pdfDlg;
    if (!d || !e.target.closest(".printsheet-map")) return;
    var pt = pdfSvgPoint(e.clientX, e.clientY);
    if (!pt) return;
    var lblEl = e.target.closest("[data-lbl]");
    drag = { id: e.pointerId, last: pt, label: lblEl ? lblEl.getAttribute("data-lbl") : null, moved: false, x0: e.clientX, y0: e.clientY };
    if (drag.label) {
      d.sel = drag.label;
      pdfRenderSel();
      pdfSchedulePreview();
    }
    box.classList.add("dragging");
    try { box.setPointerCapture(e.pointerId); } catch (err) {}
    e.preventDefault();
  });
  box.addEventListener("pointermove", function (e) {
    var d = state.pdfDlg;
    if (!drag || !d || e.pointerId !== drag.id) return;
    var pt = pdfSvgPoint(e.clientX, e.clientY);
    if (!pt) return;
    if (Math.abs(e.clientX - drag.x0) + Math.abs(e.clientY - drag.y0) > 2) drag.moved = true;
    var dx = pt[0] - drag.last[0], dy = pt[1] - drag.last[1];
    if (drag.label) {
      if (!drag.moved) return;
      var ov = pdfPinOffset(drag.label);
      if (ov.dx == null) return;
      ov.dx += dx; ov.dy += dy;
    } else {
      var F = pdfFrame(d);
      d.center = [d.center[0] + dy / (F.mLat * F.s), d.center[1] - dx / (F.mLon * F.s)];
    }
    drag.last = pt;
    pdfSchedulePreview();
  });
  function end(e) {
    var d = state.pdfDlg;
    if (!drag || e.pointerId !== drag.id) return;
    if (!drag.label && !drag.moved && d && d.sel) { d.sel = null; pdfRenderSel(); pdfSchedulePreview(); }
    if (drag.label && drag.moved) pdfRenderSel();
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
  if (d.view === "lab") pdfPaintSurface(d);
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
    var ext = d.ext, view = d.view, lab = d.lab;
    d.layers = pdfDefaultLayers(view);
    d.boxes = pdfDefaultBoxes(view);
    d.zoom = 1;
    d.center = [(ext.minLat + ext.maxLat) / 2, (ext.minLon + ext.maxLon) / 2];
    d.colorMode = "class"; d.colors = pdfDefaultColors();
    d.sizes = pdfDefaultSizes(view); d.autoLayout = true; d.labelMode = "both"; d.ov = {}; d.sel = null;
    if (lab) pdfPaintSurface(d);
    renderPdfDialog();
  }
  else if (action === "pdf-colors-reset") {
    d.colors = pdfDefaultColors();
    document.querySelectorAll('#pdfColors input[type=color]').forEach(function (inp) { inp.value = d.colors[Number(inp.getAttribute("data-key"))]; });
    pdfPaintSurface(d);
    pdfUpdatePreview();
  }
  else if (action === "pdf-lbl-reset") { if (d.sel) { delete d.ov[d.sel]; pdfRenderSel(); pdfUpdatePreview(); } }
  else if (action === "pdf-lbl-hide") { if (d.sel) { pdfOverride(d.sel).hidden = true; d.sel = null; pdfRenderSel(); pdfUpdatePreview(); } }
  else if (action === "pdf-lbl-nudge") {
    if (!d.sel) return;
    var ov = pdfPinOffset(d.sel);
    if (ov.dx == null) return;
    ov.dx += Number(el.getAttribute("data-dx")); ov.dy += Number(el.getAttribute("data-dy"));
    pdfUpdatePreview();
  }
  else if (action === "pdf-lbls-reset") { d.ov = {}; d.sel = null; pdfRenderSel(); pdfUpdatePreview(); }
  else if (action === "pdf-lbls-showall") {
    Object.keys(d.ov).forEach(function (k) { delete d.ov[k].hidden; if (!Object.keys(d.ov[k]).length) delete d.ov[k]; });
    pdfRenderSel(); pdfUpdatePreview();
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
  else if (field === "pdf-auto") d.autoLayout = t.checked;
  else if (field === "pdf-labelmode") d.labelMode = t.value;
  else if (field === "pdf-size") {
    d.sizes[key] = Number(t.value);
    var out = t.parentNode.querySelector("b");
    if (out) out.textContent = fmtX(d.sizes[key]);
  } else if (field === "pdf-lblscale") {
    if (!d.sel) return;
    var ov = pdfOverride(d.sel);
    ov.scale = Number(t.value);
    var vo = document.getElementById("pdfLblScaleVal");
    if (vo) vo.textContent = fmtX(ov.scale);
  } else if (field === "pdf-colormode") {
    d.colorMode = t.value;
    var cbox = document.getElementById("pdfColors");
    if (cbox) cbox.style.display = d.colorMode === "ramp" ? "none" : "";
    pdfPaintSurface(d);
  } else if (field === "pdf-color") {
    d.colors[Number(key)] = t.value;
    if (d.colorMode !== "ramp") pdfQueueSurface();
  }
  pdfUpdatePreview();
}

window.addEventListener("resize", function () { if (state.pdfDlg) pdfFitPreview(); });
