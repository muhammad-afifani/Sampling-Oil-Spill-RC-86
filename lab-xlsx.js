"use strict";

/* ---------------------------------------------------------------------
   Excel (.xlsx) reading and writing for lab results, dependency-free.
   Reading needs to unpack a ZIP whose entries are usually DEFLATE
   compressed, so a small RFC 1951 inflater is included here rather
   than relying on DecompressionStream, which older phones lack.
--------------------------------------------------------------------- */
var XlsxIO = (function () {
  var LBASE = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258];
  var LEXT = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0];
  var DBASE = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577];
  var DEXT = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13];
  var CL_ORDER = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];

  function buildHuffman(lengths, n) {
    var count = new Uint16Array(16);
    var symbol = new Uint16Array(n);
    var offs = new Uint16Array(16);
    var i;
    for (i = 0; i < n; i++) count[lengths[i]]++;
    count[0] = 0;
    for (i = 1; i < 15; i++) offs[i + 1] = offs[i] + count[i];
    for (i = 0; i < n; i++) if (lengths[i]) symbol[offs[lengths[i]]++] = i;
    return { count: count, symbol: symbol };
  }

  var FIXED_LIT, FIXED_DIST;
  (function () {
    var l = new Uint8Array(288), i;
    for (i = 0; i < 144; i++) l[i] = 8;
    for (; i < 256; i++) l[i] = 9;
    for (; i < 280; i++) l[i] = 7;
    for (; i < 288; i++) l[i] = 8;
    FIXED_LIT = buildHuffman(l, 288);
    var d = new Uint8Array(30);
    for (i = 0; i < 30; i++) d[i] = 5;
    FIXED_DIST = buildHuffman(d, 30);
  })();

  function inflateRaw(data, sizeHint) {
    var pos = 0, bitBuf = 0, bitCnt = 0;
    var out = new Uint8Array(Math.max(sizeHint || 0, 1024));
    var outPos = 0;

    function grow(need) {
      if (outPos + need <= out.length) return;
      var size = out.length * 2;
      while (size < outPos + need) size *= 2;
      var next = new Uint8Array(size);
      next.set(out.subarray(0, outPos));
      out = next;
    }
    function bits(n) {
      while (bitCnt < n) {
        if (pos >= data.length) throw new Error("Data terkompresi terpotong");
        bitBuf |= data[pos++] << bitCnt;
        bitCnt += 8;
      }
      var v = bitBuf & ((1 << n) - 1);
      bitBuf >>>= n;
      bitCnt -= n;
      return v;
    }
    function decode(h) {
      var code = 0, first = 0, index = 0;
      for (var len = 1; len < 16; len++) {
        code |= bits(1);
        var c = h.count[len];
        if (code - c < first) return h.symbol[index + (code - first)];
        index += c;
        first += c;
        first <<= 1;
        code <<= 1;
      }
      throw new Error("Kode Huffman tidak valid");
    }
    function codes(lit, dist) {
      for (;;) {
        var sym = decode(lit);
        if (sym < 256) {
          grow(1);
          out[outPos++] = sym;
        } else if (sym === 256) {
          return;
        } else {
          sym -= 257;
          if (sym >= 29) throw new Error("Panjang tidak valid");
          var len = LBASE[sym] + bits(LEXT[sym]);
          var ds = decode(dist);
          if (ds >= 30) throw new Error("Jarak tidak valid");
          var d = DBASE[ds] + bits(DEXT[ds]);
          if (d > outPos) throw new Error("Jarak melebihi data");
          grow(len);
          for (var k = 0; k < len; k++) { out[outPos] = out[outPos - d]; outPos++; }
        }
      }
    }
    function dynamicBlock() {
      var nlen = bits(5) + 257, ndist = bits(5) + 1, ncode = bits(4) + 4;
      var lengths = new Uint8Array(320);
      var i;
      for (i = 0; i < ncode; i++) lengths[CL_ORDER[i]] = bits(3);
      var clh = buildHuffman(lengths, 19);
      lengths = new Uint8Array(320);
      i = 0;
      while (i < nlen + ndist) {
        var sym = decode(clh);
        if (sym < 16) { lengths[i++] = sym; continue; }
        var rep, val = 0;
        if (sym === 16) {
          if (i === 0) throw new Error("Pengulangan tanpa nilai awal");
          val = lengths[i - 1];
          rep = 3 + bits(2);
        } else if (sym === 17) rep = 3 + bits(3);
        else rep = 11 + bits(7);
        if (i + rep > nlen + ndist) throw new Error("Panjang kode berlebih");
        while (rep--) lengths[i++] = val;
      }
      var lit = buildHuffman(lengths.subarray(0, nlen), nlen);
      var dist = buildHuffman(lengths.subarray(nlen, nlen + ndist), ndist);
      codes(lit, dist);
    }

    var last;
    do {
      last = bits(1);
      var type = bits(2);
      if (type === 0) {
        bitBuf = 0; bitCnt = 0;
        if (pos + 4 > data.length) throw new Error("Blok tersimpan terpotong");
        var len = data[pos] | (data[pos + 1] << 8);
        var nlen2 = data[pos + 2] | (data[pos + 3] << 8);
        pos += 4;
        if ((len ^ 0xffff) !== nlen2) throw new Error("Blok tersimpan rusak");
        if (pos + len > data.length) throw new Error("Blok tersimpan terpotong");
        grow(len);
        out.set(data.subarray(pos, pos + len), outPos);
        outPos += len;
        pos += len;
      } else if (type === 1) {
        codes(FIXED_LIT, FIXED_DIST);
      } else if (type === 2) {
        dynamicBlock();
      } else {
        throw new Error("Jenis blok tidak valid");
      }
    } while (!last);
    return out.subarray(0, outPos);
  }

  function unzip(buffer) {
    var bytes = new Uint8Array(buffer);
    var dv = new DataView(buffer);
    var eocd = -1;
    for (var i = bytes.length - 22; i >= Math.max(0, bytes.length - 65557); i--) {
      if (dv.getUint32(i, true) === 0x06054b50) { eocd = i; break; }
    }
    if (eocd < 0) throw new Error("Bukan berkas ZIP/XLSX yang valid");
    var count = dv.getUint16(eocd + 10, true);
    var cdOffset = dv.getUint32(eocd + 16, true);
    var files = {};
    var p = cdOffset;
    var decoder = new TextDecoder("utf-8");
    for (var n = 0; n < count; n++) {
      if (dv.getUint32(p, true) !== 0x02014b50) throw new Error("Direktori ZIP rusak");
      var method = dv.getUint16(p + 10, true);
      var compSize = dv.getUint32(p + 20, true);
      var uncompSize = dv.getUint32(p + 24, true);
      var nameLen = dv.getUint16(p + 28, true);
      var extraLen = dv.getUint16(p + 30, true);
      var commentLen = dv.getUint16(p + 32, true);
      var localOffset = dv.getUint32(p + 42, true);
      var name = decoder.decode(bytes.subarray(p + 46, p + 46 + nameLen));
      files[name] = { method: method, compSize: compSize, size: uncompSize, offset: localOffset };
      p += 46 + nameLen + extraLen + commentLen;
    }
    return {
      names: Object.keys(files),
      read: function (name) {
        var f = files[name];
        if (!f) return null;
        if (dv.getUint32(f.offset, true) !== 0x04034b50) throw new Error("Entri ZIP rusak");
        var start = f.offset + 30 + dv.getUint16(f.offset + 26, true) + dv.getUint16(f.offset + 28, true);
        var raw = bytes.subarray(start, start + f.compSize);
        if (f.method === 0) return raw;
        if (f.method === 8) return inflateRaw(raw, f.size);
        throw new Error("Metode kompresi tidak didukung");
      },
      text: function (name) {
        var b = this.read(name);
        return b ? decoder.decode(b) : null;
      }
    };
  }

  function children(el, local) {
    var out = [];
    for (var c = el.firstChild; c; c = c.nextSibling) if (c.nodeType === 1 && c.localName === local) out.push(c);
    return out;
  }
  function textOf(el) {
    var ts = el.getElementsByTagNameNS("*", "t");
    var s = "";
    for (var i = 0; i < ts.length; i++) {
      var anc = ts[i].parentNode;
      var skip = false;
      while (anc && anc !== el) { if (anc.localName === "rPh") { skip = true; break; } anc = anc.parentNode; }
      if (!skip) s += ts[i].textContent;
    }
    return s;
  }
  function parseXml(str) {
    var doc = new DOMParser().parseFromString(str, "application/xml");
    if (doc.getElementsByTagName("parsererror").length) throw new Error("XML di dalam berkas rusak");
    return doc;
  }
  function colIndex(ref) {
    var m = /^([A-Z]+)/.exec(ref || "");
    if (!m) return -1;
    var n = 0;
    for (var i = 0; i < m[1].length; i++) n = n * 26 + (m[1].charCodeAt(i) - 64);
    return n - 1;
  }
  function resolvePath(base, target) {
    if (target.charAt(0) === "/") return target.slice(1);
    var parts = base.split("/");
    parts.pop();
    target.split("/").forEach(function (seg) {
      if (seg === "..") parts.pop();
      else if (seg && seg !== ".") parts.push(seg);
    });
    return parts.join("/");
  }

  // Returns { date1904, sheets: [{ name, rows: [[cell...]] }] } where a cell is a string, number, boolean or null.
  function readWorkbook(buffer) {
    var zip = unzip(buffer);
    var wbPath = "xl/workbook.xml";
    var rootRels = zip.text("_rels/.rels");
    if (rootRels) {
      var rr = parseXml(rootRels).getElementsByTagNameNS("*", "Relationship");
      for (var i = 0; i < rr.length; i++) {
        if (/officeDocument$/.test(rr[i].getAttribute("Type"))) { wbPath = resolvePath("", rr[i].getAttribute("Target")); break; }
      }
    }
    var wbXml = zip.text(wbPath);
    if (!wbXml) throw new Error("Berkas tidak berisi workbook Excel");
    var wb = parseXml(wbXml);
    var pr = wb.getElementsByTagNameNS("*", "workbookPr")[0];
    var date1904 = !!(pr && /^(1|true)$/.test(pr.getAttribute("date1904") || ""));

    var relsPath = resolvePath(wbPath, "_rels/" + wbPath.split("/").pop() + ".rels");
    var relMap = {};
    var relsXml = zip.text(relsPath);
    if (relsXml) {
      var rels = parseXml(relsXml).getElementsByTagNameNS("*", "Relationship");
      for (var r = 0; r < rels.length; r++) relMap[rels[r].getAttribute("Id")] = resolvePath(wbPath, rels[r].getAttribute("Target"));
    }

    var shared = [];
    var ssPath = null;
    Object.keys(relMap).forEach(function (id) { if (/sharedStrings\.xml$/i.test(relMap[id])) ssPath = relMap[id]; });
    if (!ssPath && zip.names.indexOf("xl/sharedStrings.xml") !== -1) ssPath = "xl/sharedStrings.xml";
    if (ssPath && zip.text(ssPath)) {
      var sis = parseXml(zip.text(ssPath)).getElementsByTagNameNS("*", "si");
      for (var s = 0; s < sis.length; s++) shared.push(textOf(sis[s]));
    }

    var sheets = [];
    var sheetEls = wb.getElementsByTagNameNS("*", "sheet");
    for (var k = 0; k < sheetEls.length; k++) {
      var el = sheetEls[k];
      var rid = el.getAttribute("r:id") || el.getAttributeNS("http://schemas.openxmlformats.org/officeDocument/2006/relationships", "id");
      var path = relMap[rid] || ("xl/worksheets/sheet" + (k + 1) + ".xml");
      var xml = zip.text(path);
      if (!xml) continue;
      sheets.push({ name: el.getAttribute("name") || ("Sheet" + (k + 1)), rows: parseSheet(parseXml(xml), shared) });
    }
    return { date1904: date1904, sheets: sheets };
  }

  function parseSheet(doc, shared) {
    var rows = [];
    var rowEls = doc.getElementsByTagNameNS("*", "row");
    var nextRow = 0;
    for (var i = 0; i < rowEls.length; i++) {
      var rEl = rowEls[i];
      var rAttr = parseInt(rEl.getAttribute("r"), 10);
      var ri = isNaN(rAttr) ? nextRow : rAttr - 1;
      nextRow = ri + 1;
      var row = [];
      var nextCol = 0;
      var cells = children(rEl, "c");
      for (var j = 0; j < cells.length; j++) {
        var c = cells[j];
        var ci = c.getAttribute("r") ? colIndex(c.getAttribute("r")) : nextCol;
        if (ci < 0) ci = nextCol;
        nextCol = ci + 1;
        var t = c.getAttribute("t") || "n";
        var vEl = children(c, "v")[0];
        var raw = vEl ? vEl.textContent : null;
        var val = null;
        if (t === "s") val = raw != null ? (shared[parseInt(raw, 10)] != null ? shared[parseInt(raw, 10)] : "") : null;
        else if (t === "inlineStr") { var is = children(c, "is")[0]; val = is ? textOf(is) : ""; }
        else if (t === "str") val = raw;
        else if (t === "b") val = raw === "1";
        else if (t === "e") val = null;
        else if (raw != null && raw !== "") { var num = Number(raw); val = isNaN(num) ? raw : num; }
        row[ci] = val;
      }
      rows[ri] = row;
    }
    for (var z = 0; z < rows.length; z++) if (!rows[z]) rows[z] = [];
    return rows;
  }

  function serialToISO(serial, date1904) {
    var base = date1904 ? Date.UTC(1904, 0, 1) : Date.UTC(1899, 11, 30);
    var d = new Date(base + Math.round(serial * 86400000));
    return d.toISOString().slice(0, 10);
  }

  /* ---- Writer: multi-sheet workbook with a few cell styles ---- */
  var STYLE = { normal: 0, header: 1, warn: 2, danger: 3, title: 4, note: 5 };

  function escXml(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "");
  }
  function colLetter(i) {
    var s = "";
    i++;
    while (i > 0) { var m = (i - 1) % 26; s = String.fromCharCode(65 + m) + s; i = Math.floor((i - 1) / 26); }
    return s;
  }
  function sheetXml(sheet) {
    var xml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">';
    if (sheet.freezeRow) {
      var top = "A" + (sheet.freezeRow + 1);
      xml += '<sheetViews><sheetView workbookViewId="0"><pane ySplit="' + sheet.freezeRow + '" topLeftCell="' + top + '" activePane="bottomLeft" state="frozen"/><selection pane="bottomLeft" activeCell="' + top + '" sqref="' + top + '"/></sheetView></sheetViews>';
    }
    if (sheet.widths && sheet.widths.length) {
      xml += "<cols>" + sheet.widths.map(function (w, i) { return '<col min="' + (i + 1) + '" max="' + (i + 1) + '" width="' + w + '" customWidth="1"/>'; }).join("") + "</cols>";
    }
    xml += "<sheetData>";
    sheet.rows.forEach(function (row, ri) {
      xml += '<row r="' + (ri + 1) + '">';
      row.forEach(function (cell, ci) {
        if (cell == null || cell === "") return;
        var ref = colLetter(ci) + (ri + 1);
        var v = cell, s = 0;
        if (typeof cell === "object") { v = cell.v; s = cell.s || 0; }
        if (v == null || v === "") { if (s) xml += '<c r="' + ref + '" s="' + s + '"/>'; return; }
        var sAttr = s ? ' s="' + s + '"' : "";
        if (typeof v === "number" && isFinite(v)) xml += '<c r="' + ref + '"' + sAttr + "><v>" + v + "</v></c>";
        else xml += '<c r="' + ref + '" t="inlineStr"' + sAttr + '><is><t xml:space="preserve">' + escXml(v) + "</t></is></c>";
      });
      xml += "</row>";
    });
    xml += "</sheetData></worksheet>";
    return xml;
  }

  function buildWorkbook(sheets) {
    var enc = new TextEncoder();
    var ct = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' +
      '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>' +
      '<Default Extension="xml" ContentType="application/xml"/>' +
      '<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>' +
      '<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>' +
      sheets.map(function (s, i) { return '<Override PartName="/xl/worksheets/sheet' + (i + 1) + '.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>'; }).join("") +
      "</Types>";
    var rootRels = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
      '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>';
    var wb = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>' +
      sheets.map(function (s, i) { return '<sheet name="' + escXml(s.name.slice(0, 31)) + '" sheetId="' + (i + 1) + '" r:id="rId' + (i + 1) + '"/>'; }).join("") +
      "</sheets></workbook>";
    var wbRels = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
      sheets.map(function (s, i) { return '<Relationship Id="rId' + (i + 1) + '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet' + (i + 1) + '.xml"/>'; }).join("") +
      '<Relationship Id="rId' + (sheets.length + 1) + '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>';
    var styles = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">' +
      '<fonts count="4"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="13"/><name val="Calibri"/></font><font><i/><sz val="10"/><color rgb="FF555555"/><name val="Calibri"/></font></fonts>' +
      '<fills count="5"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill>' +
      '<fill><patternFill patternType="solid"><fgColor rgb="FFE3ECEF"/><bgColor indexed="64"/></patternFill></fill>' +
      '<fill><patternFill patternType="solid"><fgColor rgb="FFFDE2B8"/><bgColor indexed="64"/></patternFill></fill>' +
      '<fill><patternFill patternType="solid"><fgColor rgb="FFF6C4BE"/><bgColor indexed="64"/></patternFill></fill></fills>' +
      '<borders count="2"><border><left/><right/><top/><bottom/><diagonal/></border><border><left/><right/><top/><bottom style="thin"><color rgb="FF8A9A9F"/></bottom><diagonal/></border></borders>' +
      '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>' +
      '<cellXfs count="6">' +
      '<xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>' +
      '<xf numFmtId="0" fontId="1" fillId="2" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
      '<xf numFmtId="0" fontId="1" fillId="3" borderId="0" xfId="0" applyFont="1" applyFill="1"/>' +
      '<xf numFmtId="0" fontId="1" fillId="4" borderId="0" xfId="0" applyFont="1" applyFill="1"/>' +
      '<xf numFmtId="0" fontId="2" fillId="0" borderId="0" xfId="0" applyFont="1"/>' +
      '<xf numFmtId="0" fontId="3" fillId="0" borderId="0" xfId="0" applyFont="1"/>' +
      '</cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>';
    var files = [
      { name: "[Content_Types].xml", data: enc.encode(ct) },
      { name: "_rels/.rels", data: enc.encode(rootRels) },
      { name: "xl/workbook.xml", data: enc.encode(wb) },
      { name: "xl/_rels/workbook.xml.rels", data: enc.encode(wbRels) },
      { name: "xl/styles.xml", data: enc.encode(styles) }
    ];
    sheets.forEach(function (s, i) { files.push({ name: "xl/worksheets/sheet" + (i + 1) + ".xml", data: enc.encode(sheetXml(s)) }); });
    return buildZip(files);
  }

  return {
    inflateRaw: inflateRaw,
    unzip: unzip,
    readWorkbook: readWorkbook,
    serialToISO: serialToISO,
    buildWorkbook: buildWorkbook,
    STYLE: STYLE
  };
})();

if (typeof module !== "undefined") module.exports = XlsxIO;
