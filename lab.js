"use strict";

/* ---------------------------------------------------------------------
   Lab results (Hasil Pemantauan Lab): data store, TK-A/B/C
   classification (PP 22/2021), source and wind-direction analysis, map
   layer, dashboard, charts, manual editing and Excel import/export.
--------------------------------------------------------------------- */
var LAB_STORAGE_KEY = "oilspill_lab_v1";
var LAB_CFG_KEY = "oilspill_lab_cfg_v1";
var VIEW_KEY = "oilspill_view";

var LAB_SEED_SOURCE = "LHP BCL.LHP.IX.26278 (PT Bestari Casa Laboratory)";
// [No., Kode Sampel, Matriks, Lokasi, Kedalaman (cm), Tanggal, Satuan, Hasil]
var LAB_SEED = [
  [1,"AP.141","air","area:Sedimen 1",null,"2026-09-24","mg/L",{"tph":"<1","pah":"<0.05","oil_grease":0.51,"benzene":"<5","ethylbenzene":"<5","toluene":"<5","xylene":"<10"}],
  [2,"AP.142","air","area:Sedimen 2",null,"2026-09-24","mg/L",{"tph":"<1","pah":"<0.05","oil_grease":0.59,"benzene":"<5","ethylbenzene":"<5","toluene":"<5","xylene":"<10"}],
  [3,"AP.143","air","area:Sedimen 3",null,"2026-09-24","mg/L",{"tph":"<1","pah":"<0.05","oil_grease":0.6,"benzene":"<5","ethylbenzene":"<5","toluene":"<5","xylene":"<10"}],
  [4,"AP.144","air","area:Sedimen 4",null,"2026-09-24","mg/L",{"tph":"<1","pah":"<0.05","oil_grease":0.5,"benzene":"<5","ethylbenzene":"<5","toluene":"<5","xylene":"<10"}],
  [5,"UK.084","tanah","GRID2.5",30,"2026-09-24","mg/L",{"tph_c6c9":11.2,"tph_c10c36":"<40","benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [6,"UK.085","tanah","GRID5.5",30,"2026-09-24","mg/L",{"tph_c6c9":14.7,"tph_c10c36":4700,"benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [7,"UK.086","tanah","GRID11.1",30,"2026-09-24","mg/L",{"tph_c6c9":9.3,"tph_c10c36":116,"benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [8,"UK.087","tanah","GRID2.1",30,"2026-09-24","mg/L",{"tph_c6c9":12.6,"tph_c10c36":997,"benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [9,"UK.088","tanah","GRID11.3",30,"2026-09-24","mg/L",{"tph_c6c9":14.5,"tph_c10c36":"<40","benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [10,"UK.089","tanah","GRID7.3",30,"2026-09-24","mg/L",{"tph_c6c9":10.6,"tph_c10c36":48,"benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [11,"UK.090","tanah","GRID1.1",30,"2026-09-24","mg/L",{"tph_c6c9":5.5,"tph_c10c36":148,"benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [12,"UK.091","tanah","GRID7.1",30,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":"<40","benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [13,"UK.092","tanah","GRID3.3",30,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":63,"benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [14,"UK.093","tanah","GRID6.3",30,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":7210,"benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [15,"UK.094","tanah","GRID2.3",30,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":126,"benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [16,"UK.095","tanah","GRID4.2",30,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":170,"benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [17,"UK.096","tanah","GRID3.4",30,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":67,"benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [18,"UK.097","tanah","GRID1.4",30,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":153,"benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [19,"UK.098","tanah","GRID2.2",30,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":203,"benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [20,"UK.099","tanah","GRID4.3",30,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":45,"benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [21,"UK.100","tanah","GRID1.5",30,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":286,"benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [22,"UK.101","tanah","GRID11.2",30,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":44,"benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [23,"UK.102","tanah","GRID8.5",30,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":634,"benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [24,"UK.103","tanah","GRID4.5",30,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":393,"benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [25,"UK.104","tanah","GRID6.2",30,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":977,"benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [26,"UK.105","tanah","GRID1.3",30,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":57,"benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [27,"UK.106","tanah","GRID1.2",30,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":"<40","benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [28,"UK.107","tanah","GRID4.4",30,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":1090,"benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [29,"UK.108","tanah","GRID3.5",30,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":45,"benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [30,"UK.109","tanah","GRID6.4",30,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":3140,"benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [31,"UK.110","tanah","GRID2.4",30,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":404,"benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [32,"UK.111","tanah","GRID3.1",30,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":"<40","benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [33,"UK.112","tanah","GRID7.5",30,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":50,"benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [34,"UK.113","tanah","GRID5.1",30,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":"<40","benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [35,"UK.114","tanah","GRID4.1",30,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":"<40","benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [36,"UK.115","tanah","GRID9.2",30,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":"<40","benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [37,"UK.116","tanah","GRID2.5",60,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":"<40","benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [38,"UK.117","tanah","GRID5.5",60,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":308,"benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [39,"UK.118","tanah","GRID11.1",60,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":"<40","benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [40,"UK.119","tanah","GRID2.1",60,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":"<40","benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [41,"UK.120","tanah","GRID11.3",60,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":"<40","benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [42,"UK.121","tanah","GRID7.3",60,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":"<40","benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [43,"UK.122","tanah","GRID1.1",60,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":"<40","benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [44,"UK.123","tanah","GRID7.1",60,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":"<40","benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [45,"UK.124","tanah","GRID3.3",60,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":53,"benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [46,"UK.125","tanah","GRID6.3",60,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":1900,"benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [47,"UK.126","tanah","GRID2.3",60,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":"<40","benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [48,"UK.127","tanah","GRID4.2",60,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":"<40","benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [49,"UK.128","tanah","GRID3.4",60,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":"<40","benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [50,"UK.129","tanah","GRID1.4",60,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":"<40","benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [51,"UK.130","tanah","GRID2.2",60,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":1890,"benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [52,"UK.131","tanah","GRID4.3",60,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":172,"benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [53,"UK.132","tanah","GRID1.5",60,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":"<40","benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [54,"UK.133","tanah","GRID11.2",60,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":"<40","benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [55,"UK.134","tanah","GRID8.5",60,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":"<40","benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [56,"UK.135","tanah","GRID4.5",60,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":219,"benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [57,"UK.136","tanah","GRID6.2",60,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":806,"benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [58,"UK.137","tanah","GRID1.3",60,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":"<40","benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [59,"UK.138","tanah","GRID1.2",60,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":"<40","benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [60,"UK.139","tanah","GRID4.4",60,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":"<40","benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [61,"UK.140","tanah","GRID3.5",60,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":"<40","benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [62,"UK.141","tanah","GRID6.4",60,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":78,"benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [63,"UK.142","tanah","GRID2.4",60,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":"<40","benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [64,"UK.143","tanah","GRID3.1",60,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":484,"benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [65,"UK.144","tanah","GRID7.5",60,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":"<40","benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [66,"UK.145","tanah","GRID5.1",60,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":"<40","benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [67,"UK.146","tanah","GRID4.1",60,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":"<40","benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [68,"UK.147","tanah","GRID9.2",60,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":"<40","benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [69,"UK.148","sedimen","SED1.1",null,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":"<40","benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [70,"UK.149","sedimen","SED1.2",null,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":"<40","benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [71,"UK.150","sedimen","SED2.1",null,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":"<40","benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [72,"UK.151","sedimen","SED2.2",null,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":"<40","benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [73,"UK.152","sedimen","SED3.1",null,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":"<40","benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [74,"UK.153","sedimen","SED3.2",null,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":"<40","benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [75,"UK.154","sedimen","SED4.1",null,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":"<40","benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}],
  [76,"UK.155","sedimen","SED4.2",null,"2026-09-24","mg/L",{"tph_c6c9":"<5.0","tph_c10c36":"<40","benzene":"<0.5","ethylbenzene":"<0.5","toluene":"<0.5","xylene":"<1.0"}]
];

var LAB_PARAMS = {
  tph_c6c9: { label: "TPH C6-C9", head: "TPH C6-C9", tk: { C: 100, B: 325, A: 2600 } },
  tph_c10c36: { label: "TPH C10-C36", head: "TPH C10-C36", tk: { C: 1000, B: 5000, A: 40000 } },
  benzene: { label: "Benzena", head: "Benzene", tk: { C: 1, B: 4, A: 16 } },
  ethylbenzene: { label: "Etilbenzena", head: "Ethylenebenzen", tk: { C: null, B: 1200, A: 4800 } },
  toluene: { label: "Toluena", head: "Toulene", tk: { C: null, B: 3200, A: 12800 } },
  xylene: { label: "Xilena", head: "Xylene", tk: { C: null, B: 2400, A: 9600 } },
  tph: { label: "TPH", head: "TPH", bm: 0.02 },
  pah: { label: "PAH", head: "PAH", bm: 0.003 },
  oil_grease: { label: "Minyak dan Lemak", head: "Minyak dan Lemak", bm: 1 }
};
var SOIL_PARAMS = ["tph_c6c9", "tph_c10c36", "benzene", "ethylbenzene", "toluene", "xylene"];
var WATER_PARAMS = ["tph", "pah", "oil_grease", "benzene", "ethylbenzene", "toluene", "xylene"];
var XL_PARAM_ORDER = ["tph", "pah", "oil_grease", "tph_c6c9", "tph_c10c36", "benzene", "ethylbenzene", "toluene", "xylene"];
var MATRIX_META = {
  tanah: { label: "Tanah", unit: "mg/kg" },
  sedimen: { label: "Sedimen", unit: "mg/kg" },
  air: { label: "Air Permukaan", unit: "mg/L" }
};

var LAB_CLASS = [
  { short: "< TK-C", xl: "< TK-C", label: "Di bawah TK-C", mgmt: "Tanah Pelapis Dasar", color: "#2E9E6A", icon: "✓" },
  { short: "TK-C – TK-B", xl: "TK-C < x < TK-B", label: "Melebihi TK-C", mgmt: "Non B3", color: "#F2A024", icon: "!" },
  { short: "TK-B – TK-A", xl: "TK-B < x < TK-A", label: "Melebihi TK-B", mgmt: "LB3 Kategori 2", color: "#E5402F", icon: "▲" },
  { short: "> TK-A", xl: "> TK-A", label: "Melebihi TK-A", mgmt: "LB3 Kategori 1", color: "#8E2A6E", icon: "✕" }
];
var WATER_STATUS = {
  ok: { label: "Memenuhi baku mutu", color: "#2E9E6A", icon: "✓" },
  exceed: { label: "Melebihi baku mutu", color: "#E5402F", icon: "▲" },
  inconclusive: { label: "Belum dapat disimpulkan", color: "#8A979D", icon: "?" },
  na: { label: "Tidak ada baku mutu", color: "#8A979D", icon: "–" }
};

var LAB_RAMP = [[0, "#1B8A6B"], [0.5, "#4FB36A"], [0.8, "#B9D65A"], [0.95, "#ECCD47"], [1, "#F5A524"], [2, "#E0422F"], [3, "#8B2069"], [4, "#4D0F3F"]];
var Z_MAX = 4;
var Z_FLOOR = 0.03;

var COMPASS = ["Utara", "Utara-Timur Laut", "Timur Laut", "Timur-Timur Laut", "Timur", "Timur-Tenggara", "Tenggara", "Selatan-Tenggara",
  "Selatan", "Selatan-Barat Daya", "Barat Daya", "Barat-Barat Daya", "Barat", "Barat-Barat Laut", "Barat Laut", "Utara-Barat Laut"];

var LAB_DEFAULT_CFG = {
  param: "tph_c10c36",
  depth: "max",
  batch: "all",
  showSurface: true,
  showWind: true,
  showLabels: true,
  leakLat: -0.8560929187497984,
  leakLon: 117.26528964936735,
  windTo: 0,
  cone: 45,
  eventText: "28 Agustus 2026, sekitar pukul 15.00 WITA"
};

var LAB_ICONS = {
  flask: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M9 3h6M10 3v6.2L4.6 18.4A1.7 1.7 0 0 0 6.1 21h11.8a1.7 1.7 0 0 0 1.5-2.6L14 9.2V3" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M7.2 15h9.6" stroke="currentColor" stroke-width="1.8"/></svg>',
  progress: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="m9.2 9.6 2 2 3.6-3.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  edit: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M4 20h4L19 9l-4-4L4 16v4Z" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/><path d="m13.5 6.5 4 4" stroke="currentColor" stroke-width="1.9"/></svg>',
  wind: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M3 9h11a3 3 0 1 0-3-3M3 15h15a3 3 0 1 1-3 3M3 12h7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  info: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/><path d="M12 11v6M12 7.5v.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'
};

var labDataVersion = 0;

/* ---------------------------------------------------------------------
   Values: parsing "<0,5", "1.890", 148 etc. and Indonesian formatting
--------------------------------------------------------------------- */
function parseLocaleNumber(str) {
  var s = String(str);
  if (!/^[0-9.,]+$/.test(s)) return null;
  var hasDot = s.indexOf(".") !== -1, hasComma = s.indexOf(",") !== -1;
  if (hasDot && hasComma) {
    if (s.lastIndexOf(",") > s.lastIndexOf(".")) s = s.replace(/\./g, "").replace(",", ".");
    else s = s.replace(/,/g, "");
  } else if (hasComma) {
    s = (s.match(/,/g).length > 1) ? s.replace(/,/g, "") : s.replace(",", ".");
  } else if (hasDot) {
    if (s.match(/\./g).length > 1 || /^[1-9]\d{0,2}\.\d{3}$/.test(s)) s = s.replace(/\./g, "");
  }
  if (!/^(\d+\.?\d*|\.\d+)$/.test(s)) return null;
  var n = parseFloat(s);
  return isFinite(n) ? n : null;
}

function parseLabValue(raw) {
  if (raw == null) return null;
  if (typeof raw === "number") return isFinite(raw) && raw >= 0 ? { op: "=", v: raw } : null;
  if (typeof raw === "object") {
    if ((raw.op === "<" || raw.op === "=" || raw.op === ">") && typeof raw.v === "number" && isFinite(raw.v) && raw.v >= 0) return { op: raw.op, v: raw.v };
    return null;
  }
  var s = String(raw).trim().replace(/\s+/g, "");
  if (!s) return null;
  var op = "=";
  var c0 = s.charAt(0);
  if (c0 === "<" || c0 === "≤") { op = "<"; s = s.slice(1); }
  else if (c0 === ">" || c0 === "≥") { op = ">"; s = s.slice(1); }
  if (s.charAt(0) === "=") s = s.slice(1);
  var n = parseLocaleNumber(s);
  if (n == null) return null;
  return { op: op, v: n };
}

function isBlankLabCell(raw) {
  if (raw == null) return true;
  var s = String(raw).trim();
  return !s || /^[-–—]$/.test(s) || /^R$/i.test(s);
}

function fmtNum(v) {
  if (v == null || !isFinite(v)) return "–";
  var a = Math.abs(v);
  var digits = a >= 100 ? 0 : a >= 10 ? 1 : a >= 1 ? 2 : a >= 0.01 ? 3 : 4;
  return v.toLocaleString("id-ID", { maximumFractionDigits: digits });
}
function fmtVal(val) {
  if (!val) return "–";
  return (val.op === "<" ? "<" : val.op === ">" ? ">" : "") + fmtNum(val.v);
}
function valToCellString(val) {
  return (val.op === "<" ? "<" : ">") + String(val.v).replace(".", ",");
}

function labKey(kode) { return String(kode || "").trim().toUpperCase(); }

/* ---------------------------------------------------------------------
   Store
--------------------------------------------------------------------- */
function gridByLabel(label) {
  var n = String(label || "").trim().toLowerCase().replace(/\s+/g, " ");
  for (var i = 0; i < GRIDS.length; i++) if (GRIDS[i].label.toLowerCase() === n) return GRIDS[i];
  return null;
}

function normalizeLabSample(o) {
  if (!o || typeof o !== "object") return null;
  var kode = String(o.kode || "").trim();
  if (!kode) return null;
  if (o.deleted) return { kode: kode, deleted: true, updatedAt: Number(o.updatedAt) || 0 };
  var matrix = MATRIX_META[o.matrix] ? o.matrix : null;
  if (!matrix || typeof o.loc !== "string" || !o.loc) return null;
  var values = {};
  if (o.values && typeof o.values === "object") {
    Object.keys(o.values).forEach(function (k) {
      if (!LAB_PARAMS[k]) return;
      var pv = parseLabValue(o.values[k]);
      if (pv) values[k] = pv;
    });
  }
  var depth = (o.depth === null || o.depth === undefined || o.depth === "") ? null : Number(o.depth);
  return {
    kode: kode,
    no: (typeof o.no === "number" && isFinite(o.no)) ? o.no : null,
    matrix: matrix,
    loc: o.loc,
    depth: (depth != null && isFinite(depth)) ? depth : null,
    date: typeof o.date === "string" ? o.date : "",
    batch: typeof o.batch === "string" && o.batch.trim() ? o.batch.trim() : "Batch 1",
    unit: typeof o.unit === "string" && o.unit.trim() ? o.unit.trim() : MATRIX_META[matrix].unit,
    values: values,
    notes: typeof o.notes === "string" ? o.notes : "",
    source: typeof o.source === "string" ? o.source : "",
    updatedAt: Number(o.updatedAt) || 0,
    deleted: false
  };
}

function labSeedSamples() {
  return LAB_SEED.map(function (r) {
    var loc = r[3];
    if (loc.indexOf("area:") === 0) {
      var g = gridByLabel(loc.slice(5));
      loc = g ? "area:" + g.id : loc;
    }
    return normalizeLabSample({
      no: r[0], kode: r[1], matrix: r[2], loc: loc, depth: r[4], date: r[5], unit: r[6], values: r[7],
      batch: "Batch 1", source: LAB_SEED_SOURCE, notes: "", updatedAt: 1
    });
  }).filter(Boolean);
}

(function labInit() {
  var samples = null;
  try {
    var raw = localStorage.getItem(LAB_STORAGE_KEY);
    if (raw) {
      var parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.samples)) samples = parsed.samples.map(normalizeLabSample).filter(Boolean);
    }
  } catch (e) {}
  if (!samples) samples = [];
  var have = {};
  samples.forEach(function (s) { have[labKey(s.kode)] = true; });
  labSeedSamples().forEach(function (s) { if (!have[labKey(s.kode)]) samples.push(s); });
  state.lab = { samples: samples };

  var cfg = Object.assign({}, LAB_DEFAULT_CFG);
  try {
    var rawCfg = localStorage.getItem(LAB_CFG_KEY);
    if (rawCfg) {
      var c = JSON.parse(rawCfg);
      Object.keys(LAB_DEFAULT_CFG).forEach(function (k) {
        if (c && c[k] !== undefined && typeof c[k] === typeof LAB_DEFAULT_CFG[k]) cfg[k] = c[k];
      });
    }
  } catch (e) {}
  if (cfg.param !== "index" && !LAB_PARAMS[cfg.param]) cfg.param = LAB_DEFAULT_CFG.param;
  state.labCfg = cfg;

  var hash = (location.hash || "").toLowerCase();
  var view = hash === "#lab" ? "lab" : (hash === "#progres" ? "progress" : null);
  if (!view) { try { view = localStorage.getItem(VIEW_KEY); } catch (e) {} }
  state.view = view === "progress" ? "progress" : "lab";

  state.labUi = { selected: null, tblFilter: "all", tblSearch: "", tblSort: "kode", showAllRows: false, settingsOpen: false, form: null, importPreview: null };
})();

function persistLab() {
  labDataVersion++;
  try {
    localStorage.setItem(LAB_STORAGE_KEY, JSON.stringify({ schema: 1, samples: state.lab.samples }));
  } catch (e) {
    showToast("warn", "Penyimpanan lokal penuh. Segera ekspor data sebagai cadangan.");
  }
}
function persistLabCfg() {
  try { localStorage.setItem(LAB_CFG_KEY, JSON.stringify(state.labCfg)); } catch (e) {}
}

function labFindIndex(kode) {
  var key = labKey(kode);
  for (var i = 0; i < state.lab.samples.length; i++) if (labKey(state.lab.samples[i].kode) === key) return i;
  return -1;
}
function labUpsert(sample) {
  var i = labFindIndex(sample.kode);
  if (i >= 0) state.lab.samples[i] = sample; else state.lab.samples.push(sample);
}

function labAllLive() { return state.lab.samples.filter(function (s) { return !s.deleted; }); }
function labBatches() {
  var seen = {}, list = [];
  labAllLive().forEach(function (s) { if (!seen[s.batch]) { seen[s.batch] = true; list.push(s.batch); } });
  return list.sort(naturalCompare);
}
function labActive() {
  var b = state.labCfg.batch;
  return labAllLive().filter(function (s) { return b === "all" || s.batch === b; });
}

/* ---------------------------------------------------------------------
   Locations: a sample sits on a sampling point ("GRID6.3") or on a
   whole grid area ("area:29") for surface water taken per area.
--------------------------------------------------------------------- */
function locInfo(loc) {
  if (!loc) return null;
  if (loc.indexOf("area:") === 0) {
    var g = GRID_BY_ID[loc.slice(5)];
    if (!g) return { loc: loc, type: "area", label: loc.slice(5), gridId: null, exists: false };
    var members = g.members.map(getPoint).filter(Boolean);
    var lat, lon;
    if (members.length) {
      lat = members.reduce(function (s, p) { return s + p.lat; }, 0) / members.length;
      lon = members.reduce(function (s, p) { return s + p.lon; }, 0) / members.length;
    } else {
      var c = ringCentroid(g.ring.slice(0, -1));
      lat = c[0]; lon = c[1];
    }
    return { loc: loc, type: "area", label: g.label, gridId: g.id, lat: lat, lon: lon, exists: true };
  }
  var p = getPoint(loc);
  if (!p) return { loc: loc, type: "point", label: loc, gridId: null, exists: false };
  return { loc: loc, type: "point", label: p.id, gridId: p.gridId, lat: p.lat, lon: p.lon, exists: true };
}
function locLabel(loc) {
  var info = locInfo(loc);
  if (!info) return "–";
  return info.type === "area" ? "Area " + info.label : info.label;
}
function locGridLabel(loc) {
  var info = locInfo(loc);
  var g = info && info.gridId ? GRID_BY_ID[info.gridId] : null;
  return g ? g.label : "Tanpa grid";
}

/* ---------------------------------------------------------------------
   Classification
--------------------------------------------------------------------- */
function paramLevel(k, val) {
  var P = LAB_PARAMS[k];
  if (!P || !P.tk || !val) return null;
  var tk = P.tk;
  var first = tk.C != null ? tk.C : tk.B;
  if (val.op === "<") return { level: 0, nd: true, inconclusive: val.v > first };
  var v = val.v, level = 0;
  if (v > tk.A) level = 3;
  else if (v > tk.B) level = 2;
  else if (tk.C != null && v > tk.C) level = 1;
  return { level: level, nd: false, inconclusive: false };
}

function paramStatusLabel(k, level) {
  if (level === 0 && LAB_PARAMS[k].tk && LAB_PARAMS[k].tk.C == null) return "Di bawah TK-B";
  return LAB_CLASS[level].label;
}

function labScore(k, val) {
  var tk = LAB_PARAMS[k].tk;
  var v = val.v, C = tk.C, B = tk.B, A = tk.A;
  var base = C != null ? C : B;
  if (v <= base) return v / base;
  if (C != null && v <= B) return 1 + Math.log(v / C) / Math.log(B / C);
  if (v <= A) return 2 + Math.log(v / B) / Math.log(A / B);
  return 3 + Math.log(v / A) / Math.log(A / B);
}
function scoreToZ(s) {
  if (s >= 1) return Math.min(s, Z_MAX);
  return 1 + Math.log(Math.max(s, Z_FLOOR)) / Math.log(10) / (-Math.log(Z_FLOOR) / Math.log(10));
}

function sampleClass(s) {
  var level = 0, worst = null, worstZ = -1, inconclusive = false, hasData = false;
  SOIL_PARAMS.forEach(function (k) {
    var val = s.values[k];
    var pl = paramLevel(k, val);
    if (!pl) return;
    hasData = true;
    if (pl.inconclusive) inconclusive = true;
    if (pl.level > level) level = pl.level;
    if (!pl.nd) {
      var z = scoreToZ(labScore(k, val));
      if (z > worstZ) { worstZ = z; worst = k; }
    }
  });
  return { level: level, worstParam: worst, worstZ: worstZ < 0 ? 0 : worstZ, detected: worstZ >= 0, inconclusive: inconclusive, hasData: hasData };
}

function waterParamStatus(k, val) {
  var P = LAB_PARAMS[k];
  if (!val) return null;
  if (!P || P.bm == null) return "na";
  if (val.op === "<") return val.v <= P.bm ? "ok" : "inconclusive";
  return val.v > P.bm ? "exceed" : "ok";
}
function waterStatus(s) {
  var any = { ok: false, exceed: false, inconclusive: false };
  Object.keys(s.values).forEach(function (k) {
    var st = waterParamStatus(k, s.values[k]);
    if (st && st !== "na") any[st] = true;
  });
  if (any.exceed) return "exceed";
  if (any.inconclusive) return "inconclusive";
  if (any.ok) return "ok";
  return "na";
}

// Observation of one sample for the chosen map/chart parameter.
function labObs(s, param) {
  if (s.matrix === "air") return null;
  if (param === "index") {
    var cls = sampleClass(s);
    if (!cls.hasData) return null;
    return { z: cls.detected ? cls.worstZ : 0, level: cls.level, nd: !cls.detected, val: null, inconclusive: cls.inconclusive, driver: cls.worstParam };
  }
  var val = s.values[param];
  if (!val || !LAB_PARAMS[param] || !LAB_PARAMS[param].tk) return null;
  var pl = paramLevel(param, val);
  return { z: pl.nd ? 0 : scoreToZ(labScore(param, val)), level: pl.level, nd: pl.nd, val: val, inconclusive: pl.inconclusive };
}

function depthKey(d) { return d == null ? "sed" : String(d); }
function depthLabel(d) { return d == null ? "Permukaan" : fmtNum(d) + " cm"; }

function labDepthOptions() {
  var seen = {}, list = [];
  labActive().forEach(function (s) {
    if (s.matrix === "tanah" && s.depth != null && !seen[s.depth]) { seen[s.depth] = true; list.push(s.depth); }
  });
  return list.sort(function (a, b) { return a - b; });
}

function newerSample(a, b) {
  if ((a.date || "") !== (b.date || "")) return (a.date || "") > (b.date || "") ? a : b;
  return (a.updatedAt || 0) >= (b.updatedAt || 0) ? a : b;
}

// Per sampling location: latest sample at each depth, filtered by depth mode.
function labPointObs(loc, param, depthMode, pool) {
  var byDepth = {};
  pool.forEach(function (s) {
    if (s.loc !== loc || s.matrix === "air") return;
    var k = depthKey(s.depth);
    byDepth[k] = byDepth[k] ? newerSample(byDepth[k], s) : s;
  });
  var entries = Object.keys(byDepth).map(function (k) {
    var s = byDepth[k];
    return { depth: s.depth, sample: s, obs: labObs(s, param) };
  }).filter(function (e) { return e.obs; });
  if (depthMode !== "max") {
    entries = entries.filter(function (e) { return e.depth == null || String(e.depth) === String(depthMode); });
  }
  if (!entries.length) return null;
  entries.sort(function (a, b) {
    if (a.depth == null) return -1;
    if (b.depth == null) return 1;
    return a.depth - b.depth;
  });
  var best = entries[0];
  entries.forEach(function (e) {
    if (e.obs.z > best.obs.z || (e.obs.z === best.obs.z && e.obs.level > best.obs.level)) best = e;
  });
  var level = entries.reduce(function (m, e) { return Math.max(m, e.obs.level); }, 0);
  var info = locInfo(loc);
  return {
    loc: loc, info: info, entries: entries, best: best, z: best.obs.z, level: level,
    nd: entries.every(function (e) { return e.obs.nd; }),
    inconclusive: entries.some(function (e) { return e.obs.inconclusive; }),
    matrix: best.sample.matrix
  };
}

function labPointObsList(param, depthMode) {
  var pool = labActive();
  var locs = {};
  pool.forEach(function (s) { if (s.matrix !== "air") locs[s.loc] = true; });
  return Object.keys(locs).map(function (loc) { return labPointObs(loc, param, depthMode, pool); })
    .filter(function (o) { return o && o.info && o.info.exists; });
}

/* ---------------------------------------------------------------------
   Geometry around the leak point
--------------------------------------------------------------------- */
function geoFromLeak(lat, lon) {
  var cfg = state.labCfg;
  var dx = (lon - cfg.leakLon) * mPerDegLon(cfg.leakLat);
  var dy = (lat - cfg.leakLat) * MAP_SVG_MPERDEG_LAT;
  var bearing = (Math.atan2(dx, dy) * 180 / Math.PI + 360) % 360;
  return { dx: dx, dy: dy, dist: Math.sqrt(dx * dx + dy * dy), bearing: bearing };
}
function angDiff(a, b) { return ((a - b + 540) % 360) - 180; }
function destPoint(lat, lon, bearingDeg, distM) {
  var b = bearingDeg * Math.PI / 180;
  return [lat + distM * Math.cos(b) / MAP_SVG_MPERDEG_LAT, lon + distM * Math.sin(b) / mPerDegLon(lat)];
}
function compassName(deg) { return COMPASS[Math.round((((deg % 360) + 360) % 360) / 22.5) % 16]; }
function fmtDeg(d) { return Math.round(((d % 360) + 360) % 360) + "°"; }

/* ---------------------------------------------------------------------
   Wind and source analysis
--------------------------------------------------------------------- */
function rankAvg(arr) {
  var idx = arr.map(function (v, i) { return i; }).sort(function (a, b) { return arr[a] - arr[b]; });
  var ranks = new Array(arr.length);
  var i = 0;
  while (i < idx.length) {
    var j = i;
    while (j + 1 < idx.length && arr[idx[j + 1]] === arr[idx[i]]) j++;
    var r = (i + j) / 2 + 1;
    for (var k = i; k <= j; k++) ranks[idx[k]] = r;
    i = j + 1;
  }
  return ranks;
}
function pearson(x, y) {
  var n = x.length, mx = 0, my = 0;
  for (var i = 0; i < n; i++) { mx += x[i]; my += y[i]; }
  mx /= n; my /= n;
  var sxy = 0, sxx = 0, syy = 0;
  for (var j = 0; j < n; j++) {
    var a = x[j] - mx, b = y[j] - my;
    sxy += a * b; sxx += a * a; syy += b * b;
  }
  if (sxx === 0 || syy === 0) return 0;
  return sxy / Math.sqrt(sxx * syy);
}
function spearmanTest(x, y) {
  var rx = rankAvg(x), ry = rankAvg(y);
  var rho = pearson(rx, ry);
  var seed = 20260828;
  function rnd() {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    var t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
  var perm = ry.slice(), hits = 0, N = 3000;
  for (var it = 0; it < N; it++) {
    for (var i = perm.length - 1; i > 0; i--) {
      var j = Math.floor(rnd() * (i + 1));
      var t = perm[i]; perm[i] = perm[j]; perm[j] = t;
    }
    if (Math.abs(pearson(rx, perm)) >= Math.abs(rho) - 1e-12) hits++;
  }
  return { rho: rho, p: (hits + 1) / (N + 1) };
}

function computeLabAnalysis() {
  var cfg = state.labCfg;
  var obs = labPointObsList(cfg.param, cfg.depth);
  var rows = obs.map(function (o) {
    var g = geoFromLeak(o.info.lat, o.info.lon);
    var delta = angDiff(g.bearing, cfg.windTo);
    return { o: o, dist: g.dist, bearing: g.bearing, dx: g.dx, dy: g.dy, delta: delta, inCone: Math.abs(delta) <= cfg.cone };
  });
  var exceed = rows.filter(function (r) { return r.o.level >= 1; });
  var inRows = rows.filter(function (r) { return r.inCone; });
  var exIn = exceed.filter(function (r) { return r.inCone; }).length;

  var trend = null;
  if (rows.length >= 6) {
    var zs = rows.map(function (r) { return r.o.z; });
    var allSame = zs.every(function (z) { return z === zs[0]; });
    if (!allSame) trend = spearmanTest(rows.map(function (r) { return r.dist; }), zs);
  }

  var detected = rows.filter(function (r) { return !r.o.nd; });
  var centroid = null;
  if (detected.length) {
    var sw = 0, sx = 0, sy = 0;
    detected.forEach(function (r) {
      var w = (cfg.param !== "index" && r.o.best.obs.val) ? r.o.best.obs.val.v : Math.pow(10, r.o.z);
      sw += w; sx += w * r.dx; sy += w * r.dy;
    });
    if (sw > 0) {
      var cx = sx / sw, cy = sy / sw;
      var bearing = (Math.atan2(cx, cy) * 180 / Math.PI + 360) % 360;
      centroid = { dist: Math.sqrt(cx * cx + cy * cy), bearing: bearing, delta: angDiff(bearing, cfg.windTo) };
    }
  }

  var gridsSeen = {}, exceedGrids = [];
  exceed.slice().sort(function (a, b) { return b.o.z - a.o.z; }).forEach(function (r) {
    var gl = locGridLabel(r.o.loc);
    if (!gridsSeen[gl]) { gridsSeen[gl] = true; exceedGrids.push(gl); }
  });

  var ev = [];
  var windName = compassName(cfg.windTo);
  if (exceed.length) {
    var frac = exIn / exceed.length;
    ev.push({
      ok: frac >= 0.6 ? "yes" : "no",
      text: exIn + " dari " + exceed.length + " titik yang melebihi TK-C berada di dalam sektor arah angin (±" + cfg.cone + "° dari arah " + windName + ")."
    });
  } else {
    ev.push({ ok: "na", text: "Belum ada titik yang melebihi TK-C untuk parameter dan kedalaman ini, sehingga sebaran titik tercemar belum dapat dinilai." });
  }
  if (centroid) {
    ev.push({
      ok: Math.abs(centroid.delta) <= cfg.cone ? "yes" : "no",
      text: "Pusat sebaran konsentrasi berada sekitar " + Math.round(centroid.dist) + " m ke arah " + compassName(centroid.bearing) + " (" + fmtDeg(centroid.bearing) + ") dari titik bocor, selisih " + Math.round(Math.abs(centroid.delta)) + "° dari arah angin."
    });
  } else {
    ev.push({ ok: "na", text: "Seluruh hasil berada di bawah batas deteksi lab, sehingga pusat sebaran tidak dapat dihitung." });
  }
  if (trend) {
    var rhoTxt = "ρ = " + fmtRho(trend.rho).toLocaleString("id-ID", { maximumFractionDigits: 2, minimumFractionDigits: 2 }) + "; p " + (trend.p < 0.001 ? "< 0,001" : "= " + trend.p.toLocaleString("id-ID", { maximumFractionDigits: 3 }));
    if (trend.rho <= -0.25 && trend.p < 0.05) ev.push({ ok: "yes", text: "Konsentrasi menurun seiring bertambahnya jarak dari titik bocor (" + rhoTxt + "), pola yang lazim untuk sebaran dari satu sumber." });
    else if (trend.rho >= 0.25 && trend.p < 0.05) ev.push({ ok: "no", text: "Konsentrasi justru cenderung naik menjauhi titik bocor (" + rhoTxt + ")." });
    else ev.push({ ok: "na", text: "Belum terlihat pola konsentrasi terhadap jarak yang jelas secara statistik (" + rhoTxt + ")." });
  } else {
    ev.push({ ok: "na", text: "Data belum cukup bervariasi untuk menguji pola konsentrasi terhadap jarak." });
  }

  var yes = ev.filter(function (e) { return e.ok === "yes"; }).length;
  var tone, headline;
  if (!exceed.length && !centroid) { tone = "none"; headline = "Belum ada indikasi pencemaran untuk parameter ini"; }
  else if (yes >= 3) { tone = "strong"; headline = "Sangat konsisten dengan arah angin"; }
  else if (yes === 2) { tone = "yes"; headline = "Konsisten dengan arah angin"; }
  else if (yes === 1) { tone = "partial"; headline = "Sebagian konsisten dengan arah angin"; }
  else { tone = "no"; headline = "Tidak konsisten dengan arah angin"; }

  var summary = "";
  if (yes >= 2 && exceedGrids.length) {
    summary = "Titik tercemar terkumpul di " + listJoin(exceedGrids) + ", sejalan dengan dugaan bahwa kondensat yang terbawa angin ke arah " + windName + " jatuh di area tersebut.";
  } else if (exceedGrids.length) {
    summary = "Titik tercemar ditemukan di " + listJoin(exceedGrids) + ".";
  }
  var caveat = "";
  var nOut = rows.length - inRows.length;
  if (rows.length && nOut < 5) {
    caveat = inRows.length + " dari " + rows.length + " titik uji memang berada di sektor arah angin, sehingga pembanding di luar sektor terbatas (" + nOut + " titik). Sampel tambahan di sisi hulu angin akan memperkuat kesimpulan.";
  }

  return { rows: rows, exceed: exceed, exIn: exIn, inCount: inRows.length, trend: trend, centroid: centroid, ev: ev, tone: tone, headline: headline, summary: summary, caveat: caveat, exceedGrids: exceedGrids };
}

function fmtRho(r) { return Math.abs(r) < 0.005 ? 0 : r; }

function listJoin(arr) {
  if (arr.length <= 1) return arr.join("");
  return arr.slice(0, -1).join(", ") + " dan " + arr[arr.length - 1];
}

/* ---------------------------------------------------------------------
   Color ramp (semantic heat anchored to TK-C / TK-B / TK-A)
--------------------------------------------------------------------- */
var LAB_RAMP_LUT = (function () {
  var lut = [];
  var stops = LAB_RAMP.map(function (s) { return [s[0], hexToRgb(s[1])]; });
  for (var i = 0; i <= Z_MAX * 100; i++) {
    var z = i / 100, k = 0;
    while (k < stops.length - 2 && z > stops[k + 1][0]) k++;
    var a = stops[k], b = stops[k + 1];
    var t = Math.max(0, Math.min(1, (z - a[0]) / (b[0] - a[0])));
    lut.push([Math.round(a[1][0] + (b[1][0] - a[1][0]) * t), Math.round(a[1][1] + (b[1][1] - a[1][1]) * t), Math.round(a[1][2] + (b[1][2] - a[1][2]) * t)]);
  }
  return lut;
})();
function rampRgb(z) { return LAB_RAMP_LUT[Math.round(Math.max(0, Math.min(Z_MAX, z)) * 100)]; }
function rampHex(z) {
  var c = rampRgb(z);
  return "#" + c.map(function (x) { return ("0" + x.toString(16)).slice(-2); }).join("");
}
function obsColor(o) { return o.inconclusive && o.nd ? "#8A979D" : rampHex(o.z); }

/* ---------------------------------------------------------------------
   Map layer
--------------------------------------------------------------------- */
var labMap = { ready: false, surface: null, surfaceKey: "", markerKey: "", windKey: "", markers: {}, popupPinned: null };

function labEnsureMapLayers() {
  if (labMap.ready || !map) return;
  map.createPane("labSurface");
  map.getPane("labSurface").style.zIndex = 405;
  map.getPane("labSurface").style.pointerEvents = "none";
  map.createPane("labWind");
  map.getPane("labWind").style.zIndex = 410;
  map.getPane("labWind").style.pointerEvents = "none";
  labMap.surfaceLayer = L.layerGroup();
  labMap.windLayer = L.layerGroup();
  labMap.markerLayer = L.layerGroup();
  labMap.ready = true;
}

function applyMapMode() {
  if (!map) return;
  labEnsureMapLayers();
  var lab = state.view === "lab";
  allPoints().forEach(function (p) {
    var m = markerLayers[p.id];
    if (!m) return;
    if (lab) { if (map.hasLayer(m)) map.removeLayer(m); }
    else if (!map.hasLayer(m)) m.addTo(map);
  });
  if (actualLayer) {
    if (lab) { if (map.hasLayer(actualLayer)) map.removeLayer(actualLayer); }
    else if (!map.hasLayer(actualLayer)) actualLayer.addTo(map);
  }
  [labMap.surfaceLayer, labMap.windLayer, labMap.markerLayer].forEach(function (l) {
    if (lab) { if (!map.hasLayer(l)) l.addTo(map); }
    else if (map.hasLayer(l)) map.removeLayer(l);
  });
  map.closePopup();
}

function styleGridsForLab(sampledGrids) {
  GRIDS.forEach(function (g) {
    var layer = gridLayers[g.id];
    if (!layer) return;
    var sampled = !!sampledGrids[g.id];
    layer.setStyle({ color: "#FFFFFF", weight: sampled ? 1.4 : 1, opacity: sampled ? 0.75 : 0.4, fillOpacity: 0 });
    layer.setTooltipContent(esc(g.label));
  });
}

function labGridPopupHtml(g) {
  var pool = labActive();
  var obsList = labPointObsList(state.labCfg.param, state.labCfg.depth).filter(function (o) { return o.info.gridId === g.id; });
  var exceedSamples = pool.filter(function (s) {
    var info = locInfo(s.loc);
    return info && info.gridId === g.id && s.matrix !== "air" && sampleClass(s).level >= 1;
  }).length;
  var water = pool.filter(function (s) { return s.matrix === "air" && s.loc === "area:" + g.id; });
  var top = obsList.slice().sort(function (a, b) { return b.z - a.z; })[0];
  var html = '<div class="gp-title">' + esc(g.label) + '</div>';
  if (!obsList.length && !water.length) return html + '<div class="gp-pct">Belum ada hasil lab di area ini.</div>';
  if (obsList.length) {
    html += '<div class="gp-area">' + obsList.length + ' titik diuji · ' + exceedSamples + ' sampel melebihi TK-C</div>';
    if (top) html += '<div class="gp-pct">Tertinggi (' + esc(labParamLabel(state.labCfg.param)) + '): ' + esc(obsDisplay(top.best.obs)) + ' di ' + esc(top.info.label) + ' ' + esc(depthLabel(top.best.depth)) + '</div>';
  }
  if (water.length) html += '<div class="gp-pct">Air permukaan: ' + esc(WATER_STATUS[waterStatus(water[0])].label.toLowerCase()) + '</div>';
  return html;
}

function labParamLabel(param) { return param === "index" ? "Klasifikasi gabungan" : LAB_PARAMS[param].label; }
function obsDisplay(obs) {
  if (!obs.val) return obs.nd ? "Tidak terdeteksi" : LAB_CLASS[obs.level].mgmt + (obs.driver ? " (" + LAB_PARAMS[obs.driver].label + ")" : "");
  return fmtVal(obs.val);
}

function glyphSvg(entries, selected, size) {
  size = size || 22;
  var r = size / 2 - 2.5, cx = size / 2 + 3, cy = size / 2 + 3, full = size + 6;
  var parts = ['<svg width="' + full + '" height="' + full + '" viewBox="0 0 ' + full + ' ' + full + '" xmlns="http://www.w3.org/2000/svg">'];
  if (selected) parts.push('<circle cx="' + cx + '" cy="' + cy + '" r="' + (r + 4.2) + '" fill="none" stroke="#2FD9C7" stroke-width="2.4"/>');
  var exceed = entries.some(function (e) { return e.obs.level >= 1; });
  parts.push('<circle cx="' + cx + '" cy="' + cy + '" r="' + (r + 2) + '" fill="#FFFFFF"/>');
  var n = entries.length;
  entries.forEach(function (e, i) {
    var color = obsColor(e.obs);
    if (n === 1) { parts.push('<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + color + '"/>'); return; }
    var y0 = cy - r + (2 * r) * i / n, y1 = cy - r + (2 * r) * (i + 1) / n;
    var x0 = Math.sqrt(Math.max(0, r * r - (y0 - cy) * (y0 - cy)));
    var x1 = Math.sqrt(Math.max(0, r * r - (y1 - cy) * (y1 - cy)));
    parts.push('<path d="M' + (cx - x0).toFixed(2) + ' ' + y0.toFixed(2) + 'L' + (cx + x0).toFixed(2) + ' ' + y0.toFixed(2) +
      'A' + r + ' ' + r + ' 0 0 1 ' + (cx + x1).toFixed(2) + ' ' + y1.toFixed(2) + 'L' + (cx - x1).toFixed(2) + ' ' + y1.toFixed(2) +
      'A' + r + ' ' + r + ' 0 0 1 ' + (cx - x0).toFixed(2) + ' ' + y0.toFixed(2) + 'Z" fill="' + color + '"/>');
  });
  if (n > 1) {
    for (var b = 1; b < n; b++) {
      var yb = cy - r + (2 * r) * b / n;
      var xb = Math.sqrt(Math.max(0, r * r - (yb - cy) * (yb - cy)));
      parts.push('<line x1="' + (cx - xb).toFixed(2) + '" y1="' + yb.toFixed(2) + '" x2="' + (cx + xb).toFixed(2) + '" y2="' + yb.toFixed(2) + '" stroke="#FFFFFF" stroke-width="1.2"/>');
    }
  }
  if (exceed) parts.push('<circle cx="' + cx + '" cy="' + cy + '" r="' + (r + 2.6) + '" fill="none" stroke="#0A1116" stroke-width="1.1"/>');
  parts.push("</svg>");
  return { html: parts.join(""), size: full };
}

function labMarkerPopupHtml(o) {
  var cfg = state.labCfg;
  var g = geoFromLeak(o.info.lat, o.info.lon);
  var inCone = Math.abs(angDiff(g.bearing, cfg.windTo)) <= cfg.cone;
  var html = '<span class="ph-id">' + esc(o.info.label) + '</span><div class="ph-notes">' + esc(locGridLabel(o.loc)) + ' · ' + esc(MATRIX_META[o.matrix].label) + '</div>';
  o.entries.forEach(function (e) {
    var cls = sampleClass(e.sample);
    html += '<div class="ph-round"><span class="ph-round-label">' + esc(depthLabel(e.depth)) + ':</span> ' +
      esc(labParamLabel(cfg.param)) + ' ' + esc(obsDisplay(e.obs)) +
      ' <span class="lab-pop-cls" style="color:' + LAB_CLASS[cls.level].color + '">' + LAB_CLASS[cls.level].icon + ' ' + esc(LAB_CLASS[cls.level].mgmt) + '</span></div>';
  });
  html += '<div class="ph-notes">' + Math.round(g.dist) + ' m ke arah ' + esc(compassName(g.bearing)) + ' dari titik bocor' + (inCone ? ', di dalam sektor arah angin' : '') + '</div>';
  html += '<button type="button" class="lab-pop-btn" data-action="lab-open-detail" data-id="' + esc(o.loc) + '">Lihat detail &amp; edit</button>';
  return html;
}

function labWaterPopupHtml(s) {
  var info = locInfo(s.loc);
  var st = waterStatus(s);
  var html = '<span class="ph-id">Air permukaan · ' + esc(info ? info.label : s.loc) + '</span><div class="ph-notes">' + esc(s.kode) + ' · ' + esc(formatDateID(s.date)) + '</div>';
  WATER_PARAMS.forEach(function (k) {
    var val = s.values[k];
    if (!val) return;
    var ps = waterParamStatus(k, val);
    html += '<div class="ph-round"><span class="ph-round-label">' + esc(LAB_PARAMS[k].label) + ':</span> ' + esc(fmtVal(val)) + ' ' + esc(s.unit) +
      (LAB_PARAMS[k].bm != null ? ' <span class="ph-notes">(baku mutu ' + esc(fmtNum(LAB_PARAMS[k].bm)) + ')</span>' : '') +
      (ps === "exceed" ? ' <b style="color:#F2635C">melebihi</b>' : '') + '</div>';
  });
  html += '<div class="ph-round" style="color:' + WATER_STATUS[st].color + ';font-weight:600">' + WATER_STATUS[st].icon + ' ' + esc(WATER_STATUS[st].label) + '</div>';
  html += '<button type="button" class="lab-pop-btn" data-action="lab-open-detail" data-id="' + esc(s.loc) + '">Lihat detail &amp; edit</button>';
  return html;
}

function bindLabMarkerEvents(marker, htmlFn, loc) {
  marker.bindPopup("", { closeButton: true, autoPan: false, className: "point-hover-popup lab-popup", offset: [0, -4], maxWidth: 270 });
  marker.on("mouseover", function () {
    if (labMap.popupPinned && labMap.popupPinned !== marker) return;
    marker.setPopupContent(htmlFn());
    marker.openPopup();
  });
  marker.on("mouseout", function () { if (labMap.popupPinned !== marker) marker.closePopup(); });
  marker.on("click", function () {
    labMap.popupPinned = marker;
    marker.setPopupContent(htmlFn());
    marker.openPopup();
    labSelect(loc, false);
  });
  marker.on("popupclose", function () { if (labMap.popupPinned === marker) labMap.popupPinned = null; });
}

function labUpdateMap() {
  if (!map || state.view !== "lab") return;
  labEnsureMapLayers();
  var cfg = state.labCfg;
  var obsList = labPointObsList(cfg.param, cfg.depth);
  var sampledGrids = {};
  obsList.forEach(function (o) { if (o.info.gridId) sampledGrids[o.info.gridId] = true; });
  styleGridsForLab(sampledGrids);

  var surfaceKey = [labDataVersion, cfg.param, cfg.depth, cfg.batch, cfg.showSurface].join("|");
  if (surfaceKey !== labMap.surfaceKey) {
    labMap.surfaceKey = surfaceKey;
    labMap.surfaceLayer.clearLayers();
    if (cfg.showSurface) {
      var surf = buildLabSurface(obsList, sampledGrids);
      if (surf) L.imageOverlay(surf.url, surf.bounds, { pane: "labSurface", interactive: false, opacity: 1 }).addTo(labMap.surfaceLayer);
    }
  }

  var markerKey = [labDataVersion, cfg.param, cfg.depth, cfg.batch, cfg.showLabels].join("|");
  if (markerKey !== labMap.markerKey) {
    labMap.markerKey = markerKey;
    labMap.popupPinned = null;
    labMap.markers = {};
    labMap.selApplied = state.labUi.selected;
    labMap.markerLayer.clearLayers();
    var tested = {};
    obsList.forEach(function (o) { tested[o.loc] = true; });
    allPoints().forEach(function (p) {
      if (tested[p.id]) return;
      var dot = L.circleMarker([p.lat, p.lon], { radius: 3.2, color: "#D5DEE2", weight: 1.2, opacity: 0.85, fillColor: "#0A1116", fillOpacity: 0.55 });
      dot.bindTooltip(esc(p.id) + " · belum diuji", { direction: "top", className: "point-label-tip", offset: [0, -4] });
      dot.addTo(labMap.markerLayer);
    });
    obsList.forEach(function (o) {
      var entry = { kind: "pt", o: o, size: glyphSvg(o.entries, false).size };
      var sel = state.labUi.selected === o.loc;
      var marker = L.marker([o.info.lat, o.info.lon], { icon: labIconFor(entry, sel), zIndexOffset: labZFor(entry, sel), riseOnHover: true });
      if (cfg.showLabels) {
        marker.bindTooltip('<b>' + esc(o.info.label) + '</b> ' + esc(cfg.param === "index" ? LAB_CLASS[o.level].mgmt : obsDisplay(o.best.obs)), {
          permanent: true, direction: "bottom", offset: [0, entry.size / 2 - 2], className: "lab-label-tip" + (o.level >= 1 ? " lab-label-exceed" : ""), interactive: false
        });
      }
      bindLabMarkerEvents(marker, function () { return labMarkerPopupHtml(o); }, o.loc);
      marker.addTo(labMap.markerLayer);
      entry.marker = marker;
      labMap.markers[o.loc] = entry;
    });
    var waterByLoc = {};
    labActive().forEach(function (s) {
      if (s.matrix === "air") waterByLoc[s.loc] = waterByLoc[s.loc] ? newerSample(waterByLoc[s.loc], s) : s;
    });
    Object.keys(waterByLoc).map(function (loc) { return waterByLoc[loc]; }).forEach(function (s) {
      var info = locInfo(s.loc);
      if (!info || !info.exists || labMap.markers[s.loc]) return;
      var entry = { kind: "water", s: s };
      var sel = state.labUi.selected === s.loc;
      var wm = L.marker([info.lat, info.lon], { icon: labIconFor(entry, sel), zIndexOffset: labZFor(entry, sel), riseOnHover: true });
      if (cfg.showLabels) wm.bindTooltip("Air " + esc(info.label), { permanent: true, direction: "bottom", offset: [0, 6], className: "lab-label-tip lab-label-water", interactive: false });
      bindLabMarkerEvents(wm, function () { return labWaterPopupHtml(s); }, s.loc);
      wm.addTo(labMap.markerLayer);
      entry.marker = wm;
      labMap.markers[s.loc] = entry;
    });
  }
  labApplySelection();

  var windKey = [labDataVersion, cfg.showWind, cfg.leakLat, cfg.leakLon, cfg.windTo, cfg.cone, cfg.eventText].join("|");
  if (windKey !== labMap.windKey) {
    labMap.windKey = windKey;
    labMap.windLayer.clearLayers();
    if (cfg.showWind) buildWindLayer(obsList);
  }
}

function labIconFor(entry, selected) {
  if (entry.kind === "pt") {
    var glyph = glyphSvg(entry.o.entries, selected);
    return L.divIcon({ html: glyph.html, className: "lab-glyph", iconSize: [glyph.size, glyph.size], iconAnchor: [glyph.size / 2, glyph.size / 2] });
  }
  var st = waterStatus(entry.s);
  var html = '<svg width="24" height="28" viewBox="0 0 24 28" xmlns="http://www.w3.org/2000/svg">' +
    (selected ? '<path d="M12 0.5C12 0.5 1.5 12 1.5 18.2a10.5 10.5 0 0 0 21 0C22.5 12 12 0.5 12 0.5Z" fill="none" stroke="#2FD9C7" stroke-width="2"/>' : '') +
    '<path d="M12 3C12 3 4 12.4 4 17.6a8 8 0 0 0 16 0C20 12.4 12 3 12 3Z" fill="#2B8FD6" stroke="#FFFFFF" stroke-width="1.8"/>' +
    '<circle cx="12" cy="18" r="3.3" fill="' + WATER_STATUS[st].color + '" stroke="#FFFFFF" stroke-width="1"/></svg>';
  return L.divIcon({ html: html, className: "lab-water", iconSize: [24, 28], iconAnchor: [12, 22] });
}
function labZFor(entry, selected) {
  return (entry.kind === "pt" ? Math.round(entry.o.z * 100) : 500) + (selected ? 2000 : 0);
}
function labApplySelection() {
  var sel = state.labUi.selected;
  if (labMap.selApplied === sel) return;
  [labMap.selApplied, sel].forEach(function (loc) {
    var entry = loc ? labMap.markers[loc] : null;
    if (!entry) return;
    entry.marker.setIcon(labIconFor(entry, loc === sel));
    entry.marker.setZIndexOffset(labZFor(entry, loc === sel));
  });
  labMap.selApplied = sel;
}

function buildWindLayer(obsList) {
  var cfg = state.labCfg;
  var leak = [cfg.leakLat, cfg.leakLon];
  var maxD = 0;
  obsList.forEach(function (o) { maxD = Math.max(maxD, geoFromLeak(o.info.lat, o.info.lon).dist); });
  var R = Math.max(120, Math.min(400, maxD + 25));
  var cone = [leak];
  for (var a = -cfg.cone; a <= cfg.cone + 0.001; a += 3) cone.push(destPoint(cfg.leakLat, cfg.leakLon, cfg.windTo + a, R));
  L.polygon(cone, { pane: "labWind", color: "#9EDCFF", weight: 1.2, opacity: 0.9, dashArray: "6 5", fillColor: "#9EDCFF", fillOpacity: 0.09, interactive: false }).addTo(labMap.windLayer);
  [50, 100, 150, 200, 300].forEach(function (rad) {
    if (rad > R) return;
    L.circle(leak, { radius: rad, pane: "labWind", color: "#FFFFFF", weight: 0.9, opacity: 0.4, fill: false, interactive: false }).addTo(labMap.windLayer);
    var lp = destPoint(cfg.leakLat, cfg.leakLon, cfg.windTo + 90, rad);
    L.marker(lp, { pane: "labWind", interactive: false, keyboard: false, icon: L.divIcon({ html: '<span>' + rad + ' m</span>', className: "lab-ring-label", iconSize: [44, 16], iconAnchor: [22, 8] }) }).addTo(labMap.windLayer);
  });
  var tip = destPoint(cfg.leakLat, cfg.leakLon, cfg.windTo, R * 0.9);
  L.polyline([leak, tip], { pane: "labWind", color: "#DDF3FF", weight: 2.6, opacity: 0.95, interactive: false }).addTo(labMap.windLayer);
  var back = destPoint(tip[0], tip[1], cfg.windTo + 180, 10);
  L.polygon([tip, destPoint(back[0], back[1], cfg.windTo - 90, 5), destPoint(back[0], back[1], cfg.windTo + 90, 5)], { pane: "labWind", color: "#DDF3FF", weight: 1, fillColor: "#DDF3FF", fillOpacity: 1, interactive: false }).addTo(labMap.windLayer);
  var lbl = destPoint(cfg.leakLat, cfg.leakLon, cfg.windTo, R * 0.9 + 14);
  L.marker(lbl, { pane: "labWind", interactive: false, keyboard: false, icon: L.divIcon({ html: '<span>' + LAB_ICONS.wind + ' Angin menuju ' + esc(compassName(cfg.windTo)) + '</span>', className: "lab-wind-label", iconSize: [190, 22], iconAnchor: [95, 11] }) }).addTo(labMap.windLayer);

  var leakIcon = L.divIcon({
    html: '<span class="leak-pulse"></span><span class="leak-core"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 3 2.5 20h19L12 3Z" fill="#fff"/><path d="M12 9.5v5M12 17.2v.3" stroke="#C62828" stroke-width="2.4" stroke-linecap="round"/></svg></span>',
    className: "leak-marker", iconSize: [34, 34], iconAnchor: [17, 17]
  });
  var lm = L.marker(leak, { icon: leakIcon, zIndexOffset: 3000, keyboard: false });
  lm.bindTooltip("Titik bocor", { permanent: true, direction: "right", offset: [14, 0], className: "lab-leak-tip", interactive: false });
  lm.bindPopup('<span class="ph-id">Titik bocor</span><div class="ph-round">' + esc(cfg.eventText) + '</div>' +
    '<div class="ph-notes">Lintang ' + cfg.leakLat.toFixed(6) + ', bujur ' + cfg.leakLon.toFixed(6) + '</div>' +
    '<div class="ph-notes">Angin menuju ' + esc(compassName(cfg.windTo)) + ' (' + fmtDeg(cfg.windTo) + '); sektor ±' + cfg.cone + '° digambar sebagai area putus-putus.</div>',
    { className: "point-hover-popup", maxWidth: 260 });
  lm.addTo(labMap.windLayer);
}

// Inverse-distance interpolation (in the 0..4 "z" space) clipped to sampled grid areas, fading with distance from the nearest sample.
function buildLabSurface(obsList, sampledGrids) {
  var pts = obsList.filter(function (o) { return o.info.lat != null; });
  var gridIds = Object.keys(sampledGrids).filter(function (id) { return GRID_BY_ID[id]; });
  if (!pts.length || !gridIds.length) return null;
  var minLat = Infinity, maxLat = -Infinity, minLon = Infinity, maxLon = -Infinity;
  gridIds.forEach(function (id) {
    GRID_BY_ID[id].ring.forEach(function (c) {
      minLat = Math.min(minLat, c[0]); maxLat = Math.max(maxLat, c[0]);
      minLon = Math.min(minLon, c[1]); maxLon = Math.max(maxLon, c[1]);
    });
  });
  var lat0 = (minLat + maxLat) / 2;
  var mx = mPerDegLon(lat0), my = MAP_SVG_MPERDEG_LAT;
  var widthM = (maxLon - minLon) * mx, heightM = (maxLat - minLat) * my;
  var res = Math.max(0.5, Math.max(widthM, heightM) / 900);
  var W = Math.max(2, Math.ceil(widthM / res)), H = Math.max(2, Math.ceil(heightM / res));

  var canvas = document.createElement("canvas");
  canvas.width = W; canvas.height = H;
  var ctx = canvas.getContext("2d");
  ctx.fillStyle = "#000";
  gridIds.forEach(function (id) {
    var ring = GRID_BY_ID[id].ring;
    ctx.beginPath();
    ring.forEach(function (c, i) {
      var x = (c[1] - minLon) * mx / res, y = (maxLat - c[0]) * my / res;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fill();
  });
  var mask = ctx.getImageData(0, 0, W, H).data;
  var img = ctx.createImageData(W, H);
  var P = pts.map(function (o) { return { x: (o.info.lon - minLon) * mx, y: (maxLat - o.info.lat) * my, z: o.z }; });
  var FADE_START = 16, FADE_END = 34;
  for (var py = 0; py < H; py++) {
    for (var px = 0; px < W; px++) {
      var idx = (py * W + px) * 4;
      var a = mask[idx + 3];
      if (!a) continue;
      var xm = (px + 0.5) * res, ym = (py + 0.5) * res;
      var sw = 0, sz = 0, dmin2 = Infinity, exact = null;
      for (var i = 0; i < P.length; i++) {
        var dx = xm - P[i].x, dy = ym - P[i].y;
        var d2 = dx * dx + dy * dy;
        if (d2 < dmin2) dmin2 = d2;
        if (d2 < 0.04) { exact = P[i].z; break; }
        var w = 1 / d2;
        sw += w; sz += w * P[i].z;
      }
      var z = exact != null ? exact : sz / sw;
      var dmin = Math.sqrt(dmin2);
      var fade = Math.max(0, Math.min(1, (FADE_END - dmin) / (FADE_END - FADE_START)));
      if (fade <= 0) continue;
      var c = rampRgb(z);
      img.data[idx] = c[0]; img.data[idx + 1] = c[1]; img.data[idx + 2] = c[2];
      var strength = 0.34 + 0.44 * Math.min(1, z / 1.6);
      img.data[idx + 3] = Math.round(strength * fade * a);
    }
  }
  ctx.putImageData(img, 0, 0);
  return { url: canvas.toDataURL("image/png"), bounds: [[minLat, minLon], [maxLat, maxLon]] };
}

/* ---------------------------------------------------------------------
   View switching
--------------------------------------------------------------------- */
function applyViewChrome() {
  var lab = state.view === "lab";
  document.body.classList.toggle("view-lab", lab);
  document.body.classList.toggle("view-progress", !lab);
  var tl = document.getElementById("viewTabLab"), tp = document.getElementById("viewTabProgress");
  if (tl) { tl.classList.toggle("active", lab); tl.setAttribute("aria-selected", lab ? "true" : "false"); }
  if (tp) { tp.classList.toggle("active", !lab); tp.setAttribute("aria-selected", lab ? "false" : "true"); }
  var title = document.getElementById("mapTitle");
  if (title) title.textContent = lab ? "Peta Sebaran Hasil Lab" : "Peta Grid Sampling";
  var count = document.getElementById("viewTabLabCount");
  if (count) count.textContent = labAllLive().length;
}

var LAB_LABEL_ZOOM = 20;
function labZoomClass() {
  var el = document.getElementById("map");
  if (el && map) el.classList.toggle("lab-zoomed-out", map.getZoom() < LAB_LABEL_ZOOM);
}
function labFitView() {
  if (!map) return;
  var pts = labPointObsList(state.labCfg.param, "max").map(function (o) { return [o.info.lat, o.info.lon]; });
  pts.push([state.labCfg.leakLat, state.labCfg.leakLon]);
  if (pts.length < 2) return;
  map.fitBounds(L.latLngBounds(pts), { padding: [40, 40] });
}

function setView(v) {
  if (v !== "lab" && v !== "progress") return;
  if (state.pickMode) cancelPick();
  state.view = v;
  try { localStorage.setItem(VIEW_KEY, v); } catch (e) {}
  if (history.replaceState) history.replaceState(null, "", v === "lab" ? "#lab" : "#progres");
  applyViewChrome();
  applyMapMode();
  labMap.markerKey = "";
  labMap.surfaceKey = "";
  labMap.windKey = "";
  render();
  setTimeout(function () {
    if (!map) return;
    map.invalidateSize();
    if (v === "lab") labFitView(); else map.fitBounds(allBounds(), { padding: [36, 36] });
  }, 30);
}

/* ---------------------------------------------------------------------
   Rendering
--------------------------------------------------------------------- */
function renderLab() {
  applyViewChrome();
  renderLabDash();
  renderLabControls();
  renderLabLegend();
  renderLabBottom();
  labUpdateMap();
  renderLabModal();
  renderLabCharts();
}

function classBadge(level, extraLabel) {
  var c = LAB_CLASS[level];
  return '<span class="clsbadge" style="--cls:' + c.color + '"><span class="clsbadge-ico">' + c.icon + '</span>' + esc(extraLabel || c.mgmt) + '</span>';
}
function waterBadge(st) {
  var w = WATER_STATUS[st];
  return '<span class="clsbadge" style="--cls:' + w.color + '"><span class="clsbadge-ico">' + w.icon + '</span>' + esc(w.label) + '</span>';
}

function labKpis() {
  var pool = labActive();
  var soilSed = pool.filter(function (s) { return s.matrix !== "air"; });
  var counts = { tanah: 0, sedimen: 0, air: 0 };
  pool.forEach(function (s) { counts[s.matrix]++; });
  var exceed = soilSed.filter(function (s) { return sampleClass(s).level >= 1; });
  var exceedLocs = {};
  exceed.forEach(function (s) { exceedLocs[s.loc] = true; });
  var maxLevel = soilSed.reduce(function (m, s) { return Math.max(m, sampleClass(s).level); }, 0);
  var maxLevelCount = soilSed.filter(function (s) { return sampleClass(s).level === maxLevel; }).length;

  var top = null;
  soilSed.forEach(function (s) {
    var c = sampleClass(s);
    if (!c.detected) return;
    if (!top || c.worstZ > top.z) top = { s: s, z: c.worstZ, param: c.worstParam };
  });

  var depths = labDepthOptions();
  var depthStats = depths.map(function (d) {
    var list = soilSed.filter(function (s) { return s.matrix === "tanah" && s.depth === d; });
    return { depth: d, n: list.length, ex: list.filter(function (s) { return sampleClass(s).level >= 1; }).length };
  });
  var water = pool.filter(function (s) { return s.matrix === "air"; });
  var wst = { ok: 0, exceed: 0, inconclusive: 0, na: 0 };
  water.forEach(function (s) { wst[waterStatus(s)]++; });
  return { pool: pool, counts: counts, soilSed: soilSed, exceed: exceed, exceedLocs: Object.keys(exceedLocs).length, maxLevel: maxLevel, maxLevelCount: maxLevelCount, top: top, depthStats: depthStats, water: water, wst: wst };
}

function renderLabDash() {
  var root = document.getElementById("labDash");
  if (!root) return;
  var k = labKpis();
  var batches = labBatches();
  var dates = k.pool.map(function (s) { return s.date; }).filter(Boolean).sort();
  var dateTxt = dates.length ? (dates[0] === dates[dates.length - 1] ? formatDateID(dates[0]) : formatDateID(dates[0]) + " – " + formatDateID(dates[dates.length - 1])) : "–";
  var sources = {};
  k.pool.forEach(function (s) { if (s.source) sources[s.source] = true; });
  var analysis = computeLabAnalysis();
  var pctEx = k.soilSed.length ? Math.round(k.exceed.length / k.soilSed.length * 1000) / 10 : 0;

  var depthTile = "";
  if (k.depthStats.length >= 2) {
    var worstDepth = k.depthStats.slice().sort(function (a, b) { return (b.ex / (b.n || 1)) - (a.ex / (a.n || 1)); })[0];
    depthTile = '<div class="labkpi"><div class="kpi-label">Lapisan Paling Tercemar</div>' +
      '<div class="kpi-value">' + (worstDepth.ex ? esc(depthLabel(worstDepth.depth)) : "–") + '</div>' +
      '<div class="kpi-sub">' + k.depthStats.map(function (d) { return esc(depthLabel(d.depth)) + ': ' + d.ex + ' dari ' + d.n + ' melebihi TK-C'; }).join(' · ') + '</div></div>';
  }

  var waterSub = k.water.length ? (k.wst.exceed ? k.wst.exceed + " lokasi melebihi baku mutu" :
    "Minyak & lemak memenuhi baku mutu" + (k.wst.inconclusive ? "; TPH/PAH di bawah batas deteksi lab yang lebih tinggi dari baku mutu" : "")) : "Belum ada data air";

  root.innerHTML = '<div class="wrap">' +
    '<div class="labhead">' +
    '<div><h2 class="labtitle">Hasil Pemantauan Laboratorium</h2>' +
    '<p class="labsub">' + k.pool.length + ' sampel · sampling ' + esc(dateTxt) + ' · ' + esc(batches.join(", ") || "–") +
    (Object.keys(sources).length ? ' · sumber ' + esc(Object.keys(sources).join("; ")) : '') + '</p></div>' +
    '<div class="labhead-actions">' +
    '<label class="btn" for="labImportInput" title="Gabungkan hasil lab dari berkas Excel (.xlsx)">' + ICONS.upload + ' Impor Excel</label>' +
    '<input class="hiddenfile" id="labImportInput" type="file" accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"/>' +
    '<button type="button" class="btn" data-action="lab-export" title="Unduh seluruh hasil lab sebagai berkas Excel, bisa diedit lalu diimpor kembali">' + ICONS.download + ' Ekspor Excel</button>' +
    '<button type="button" class="btn btn-primary" data-action="lab-add">' + ICONS.plus + ' Tambah Hasil Uji</button>' +
    '</div></div>' +
    '<div class="labkpis">' +
    '<div class="labkpi"><div class="kpi-label">Sampel Diuji</div><div class="kpi-value">' + k.pool.length + '</div>' +
    '<div class="kpi-sub">' + k.counts.tanah + ' tanah · ' + k.counts.sedimen + ' sedimen · ' + k.counts.air + ' air permukaan</div></div>' +
    '<div class="labkpi' + (k.exceed.length ? ' labkpi-alert' : '') + '"><div class="kpi-label">Melebihi TK-C (Tercemar)</div><div class="kpi-value">' + k.exceed.length + '<span class="kpi-unit"> sampel</span></div>' +
    '<div class="kpi-sub">di ' + k.exceedLocs + ' titik · ' + pctEx.toLocaleString("id-ID") + '% dari sampel tanah dan sedimen</div></div>' +
    '<div class="labkpi"><div class="kpi-label">Konsentrasi Tertinggi</div>' +
    (k.top ? '<div class="kpi-value">' + esc(fmtVal(k.top.s.values[k.top.param])) + '<span class="kpi-unit"> ' + esc(k.top.s.unit) + '</span></div>' +
      '<div class="kpi-sub">' + esc(LAB_PARAMS[k.top.param].label) + ' · ' + esc(locLabel(k.top.s.loc)) + ' ' + esc(depthLabel(k.top.s.depth)) + ' · ' + esc(LAB_CLASS[sampleClass(k.top.s).level].mgmt) + '</div>'
      : '<div class="kpi-value">–</div><div class="kpi-sub">Seluruh hasil di bawah batas deteksi</div>') + '</div>' +
    (depthTile || ('<div class="labkpi"><div class="kpi-label">Klasifikasi Terberat</div><div class="kpi-value kpi-value-sm">' + esc(LAB_CLASS[k.maxLevel].mgmt) + '</div><div class="kpi-sub">' + k.maxLevelCount + ' sampel</div></div>')) +
    '<div class="labkpi"><div class="kpi-label">Air Permukaan</div><div class="kpi-value">' + k.water.length + '<span class="kpi-unit"> lokasi</span></div><div class="kpi-sub">' + esc(waterSub) + '</div></div>' +
    '</div>' +
    '<div class="labinsights">' +
    '<div class="card"><h2>Klasifikasi Sampel per Lapisan</h2><p class="cardsub">Tingkat kontaminasi tiap sampel menurut TK-A, TK-B, dan TK-C (PP 22/2021), dari parameter terberat.</p>' +
    '<div id="labChartClass" class="vizbox"></div>' +
    '<div class="vizlegend">' + LAB_CLASS.map(function (c) { return '<span class="vizlegend-item"><span class="vizsw" style="background:' + c.color + '"></span>' + c.icon + ' ' + esc(c.mgmt) + ' <span class="muted">(' + esc(c.short) + ')</span></span>'; }).join("") + '</div></div>' +
    renderVerdictCard(analysis) +
    '</div></div>';
}

function renderVerdictCard(an) {
  var cfg = state.labCfg;
  var icons = { yes: "✓", no: "✕", na: "–" };
  var toneIcon = { strong: "◎", yes: "◎", partial: "◐", no: "○", none: "○" }[an.tone];
  var depthTxt = cfg.depth === "max" ? "nilai tertinggi antar kedalaman" : "kedalaman " + depthLabel(Number(cfg.depth));
  var html = '<div class="card labverdict">' +
    '<div class="verdict-kicker">' + LAB_ICONS.wind + ' Analisis Titik Bocor &amp; Arah Angin</div>' +
    '<h3 class="verdict verdict-' + an.tone + '"><span class="verdict-ico">' + toneIcon + '</span>' + esc(an.headline) + '</h3>' +
    '<p class="verdict-basis">Dasar: ' + esc(labParamLabel(cfg.param)) + ', ' + esc(depthTxt) + ' · bocor ' + esc(cfg.eventText) + ' · angin menuju ' + esc(compassName(cfg.windTo)) + ' (' + fmtDeg(cfg.windTo) + ', sektor ±' + cfg.cone + '°)</p>' +
    (an.summary ? '<p class="verdict-summary">' + esc(an.summary) + '</p>' : '') +
    '<ul class="evidence">' + an.ev.map(function (e) {
      return '<li class="ev ev-' + e.ok + '"><span class="ev-ico">' + icons[e.ok] + '</span><span>' + esc(e.text) + '</span></li>';
    }).join("") + '</ul>' +
    (an.caveat ? '<p class="verdict-note">' + LAB_ICONS.info + ' ' + esc(an.caveat) + '</p>' : '') +
    '<p class="verdict-note">Analisis bersifat indikatif dari posisi dan nilai titik uji; tidak memodelkan dispersi udara, limpasan permukaan, maupun pasang surut. Ganti parameter atau kedalaman di atas peta untuk menguji ulang.</p>' +
    '<button type="button" class="linkbtn" data-action="lab-toggle-settings">' + (state.labUi.settingsOpen ? "Tutup pengaturan" : "Atur titik bocor &amp; arah angin") + '</button>';
  if (state.labUi.settingsOpen) {
    var dirOpts = COMPASS.map(function (name, i) {
      var deg = i * 22.5;
      return '<option value="' + deg + '"' + (Math.abs(cfg.windTo - deg) < 0.01 ? " selected" : "") + '>Menuju ' + name + ' (' + deg.toLocaleString("id-ID") + '°)</option>';
    }).join("");
    if (COMPASS.every(function (n, i) { return Math.abs(cfg.windTo - i * 22.5) >= 0.01; })) dirOpts = '<option value="' + cfg.windTo + '" selected>' + fmtDeg(cfg.windTo) + '</option>' + dirOpts;
    html += '<div class="labsettings">' +
      '<div class="field"><label>Lintang titik bocor</label><input type="number" step="any" value="' + cfg.leakLat + '" data-field="lab-cfg-leakLat"/></div>' +
      '<div class="field"><label>Bujur titik bocor</label><input type="number" step="any" value="' + cfg.leakLon + '" data-field="lab-cfg-leakLon"/></div>' +
      '<div class="field"><label>Arah angin bertiup</label><select data-field="lab-cfg-windTo">' + dirOpts + '</select></div>' +
      '<div class="field"><label>Lebar sektor angin</label><select data-field="lab-cfg-cone">' + [22.5, 30, 45, 60, 90].map(function (c) {
        return '<option value="' + c + '"' + (cfg.cone === c ? " selected" : "") + '>±' + c.toLocaleString("id-ID") + '°</option>';
      }).join("") + '</select></div>' +
      '<div class="field labsettings-wide"><label>Keterangan kejadian</label><input type="text" value="' + esc(cfg.eventText) + '" data-field="lab-cfg-eventText"/></div>' +
      '<button type="button" class="btn" data-action="lab-reset-cfg">Pulihkan bawaan</button>' +
      '</div>';
  }
  html += '</div>';
  return html;
}

function renderLabControls() {
  var root = document.getElementById("labControls");
  if (!root) return;
  var cfg = state.labCfg;
  var depths = labDepthOptions();
  if (cfg.depth !== "max" && depths.map(String).indexOf(String(cfg.depth)) === -1) cfg.depth = "max";
  var batches = labBatches();
  if (cfg.batch !== "all" && batches.indexOf(cfg.batch) === -1) cfg.batch = "all";
  var paramOpts = '<option value="index"' + (cfg.param === "index" ? " selected" : "") + '>Klasifikasi gabungan (semua parameter)</option>' +
    SOIL_PARAMS.map(function (k) { return '<option value="' + k + '"' + (cfg.param === k ? " selected" : "") + '>' + esc(LAB_PARAMS[k].label) + '</option>'; }).join("");
  var depthBtns = depths.map(function (d) {
    return '<button type="button" class="segbtn' + (String(cfg.depth) === String(d) ? " active" : "") + '" data-action="lab-set-depth" data-depth="' + d + '">' + esc(depthLabel(d)) + '</button>';
  }).join("") + '<button type="button" class="segbtn' + (cfg.depth === "max" ? " active" : "") + '" data-action="lab-set-depth" data-depth="max" title="Nilai tertinggi dari semua kedalaman di tiap titik">Tertinggi</button>';
  root.innerHTML =
    '<label class="labctl"><span>Parameter</span><select data-field="lab-cfg-param" aria-label="Parameter yang ditampilkan">' + paramOpts + '</select></label>' +
    '<div class="labctl"><span>Kedalaman</span><div class="seg" role="group" aria-label="Kedalaman">' + depthBtns + '</div></div>' +
    (batches.length > 1 ? '<label class="labctl"><span>Batch</span><select data-field="lab-cfg-batch" aria-label="Batch sampling"><option value="all"' + (cfg.batch === "all" ? " selected" : "") + '>Semua (hasil terbaru)</option>' +
      batches.map(function (b) { return '<option value="' + esc(b) + '"' + (cfg.batch === b ? " selected" : "") + '>' + esc(b) + '</option>'; }).join("") + '</select></label>' : '') +
    '<div class="labeltoggles">' +
    '<button type="button" class="labeltoggle' + (cfg.showSurface ? " active" : "") + '" data-action="lab-toggle-surface">Gradasi</button>' +
    '<button type="button" class="labeltoggle' + (cfg.showWind ? " active" : "") + '" data-action="lab-toggle-wind">Sumber &amp; Angin</button>' +
    '<button type="button" class="labeltoggle' + (cfg.showLabels ? " active" : "") + '" data-action="lab-toggle-labels">Label Nilai</button>' +
    '<button type="button" class="labeltoggle' + (state.showGridLabels ? " active" : "") + '" data-action="toggle-grid-labels" id="labToggleGridLabels">Nama Grid</button>' +
    '</div>';
}

function rampGradientCss() {
  return "linear-gradient(90deg," + LAB_RAMP.map(function (s) { return s[1] + " " + (s[0] / Z_MAX * 100).toFixed(1) + "%"; }).join(",") + ")";
}

function renderLabLegend() {
  var root = document.getElementById("labLegend");
  if (!root) return;
  var cfg = state.labCfg;
  var ticks;
  if (cfg.param === "index") {
    ticks = [[0, "tidak terdeteksi"], [1, "TK-C"], [2, "TK-B"], [3, "TK-A"]];
  } else {
    var tk = LAB_PARAMS[cfg.param].tk;
    ticks = [[0, "tidak terdeteksi"]];
    if (tk.C != null) ticks.push([1, "TK-C " + fmtNum(tk.C)]);
    ticks.push([2, "TK-B " + fmtNum(tk.B)]);
    ticks.push([3, "TK-A " + fmtNum(tk.A)]);
  }
  var depths = labDepthOptions();
  var glyphLegend = depths.length >= 2 ? glyphSvg(depths.map(function (d, i) { return { obs: { z: i === 0 ? 1.6 : 0.5, level: 0, nd: false } }; }), false, 16).html : "";
  root.innerHTML =
    '<div class="lg-block lg-ramp-block">' +
    '<div class="lg-title">' + esc(labParamLabel(cfg.param)) + (cfg.param !== "index" ? ' (mg/kg)' : '') + ' · ' + esc(cfg.depth === "max" ? "nilai tertinggi" : depthLabel(Number(cfg.depth))) + '</div>' +
    '<div class="lg-ramp" style="background:' + rampGradientCss() + '"></div>' +
    '<div class="lg-ticks">' + ticks.map(function (t) {
      return '<span class="lg-tick" style="left:' + (t[0] / Z_MAX * 100) + '%"><span>' + esc(t[1]) + '</span></span>';
    }).join("") + '</div></div>' +
    '<div class="lg-block lg-keys">' +
    (glyphLegend ? '<div class="legend-item"><span class="lg-glyph">' + glyphLegend + '</span>Lingkaran berlapis: atas ' + esc(depthLabel(depths[0])) + ', bawah ' + esc(depthLabel(depths[depths.length - 1])) + '</div>' : '') +
    '<div class="legend-item"><span class="lg-ring"></span>Garis tepi gelap: ada sampel melebihi TK-C</div>' +
    '<div class="legend-item"><span class="legend-dot" style="background:#0A1116;border:1.5px solid #D5DEE2;width:9px;height:9px"></span>Titik belum diuji lab</div>' +
    '<div class="legend-item"><span class="lg-drop"></span>Air permukaan per area</div>' +
    '<div class="legend-item"><span class="lg-leak"></span>Titik bocor</div>' +
    '<div class="legend-item"><span class="lg-cone"></span>Sektor arah angin</div>' +
    '</div>' +
    '<p class="lg-note">Label nilai semua titik tampil saat peta diperbesar; saat diperkecil hanya label titik yang melebihi TK-C yang ditampilkan. Gradasi warna adalah interpolasi antar titik uji di dalam area grid yang memiliki sampel, makin pudar makin jauh dari titik uji. Hasil di bawah batas deteksi lab digambar sebagai tidak terdeteksi. Satuan pada LHP tertulis ' + esc(labUnitsSummary()) + '; ambang TK-A, TK-B, TK-C dalam mg/kg (PP 22/2021).</p>';
}

function labUnitsSummary() {
  var units = {};
  labActive().forEach(function (s) { if (s.matrix !== "air") units[s.unit] = true; });
  return Object.keys(units).join(", ") || "mg/kg";
}

/* ---- Bottom panel ---- */
function renderLabBottom() {
  var root = document.getElementById("bottomPanel");
  if (!root) return;
  if (state.labUi.selected) {
    var info = locInfo(state.labUi.selected);
    if (info) { root.innerHTML = labDetailHtml(info); return; }
    state.labUi.selected = null;
  }
  var cfg = state.labCfg;
  var obsCount = labPointObsList(cfg.param, cfg.depth).length;
  root.innerHTML =
    '<div class="labpanel">' +
    '<div class="card labcard-wide">' +
    '<div class="panelhead-row"><div><p class="panel-title">Konsentrasi per Titik dan Kedalaman</p>' +
    '<p class="panel-sub">' + esc(labParamLabel(cfg.param)) + ', diurutkan dari yang tertinggi. Pita warna di belakang menandai rentang TK-C, TK-B, dan TK-A. Klik satu baris untuk melihat detail titik.</p></div>' +
    (obsCount > 15 ? '<button type="button" class="btn" data-action="lab-toggle-allrows">' + (state.labUi.showAllRows ? "Tampilkan 15 teratas" : "Tampilkan semua " + obsCount + " titik") + '</button>' : '') +
    '</div>' +
    '<div class="vizlegend" id="labDepthLegend"></div>' +
    '<div id="labChartDumbbell" class="vizbox"></div></div>' +
    '<div class="labgrid2">' +
    '<div class="card"><p class="panel-title">Jarak dari Titik Bocor terhadap Konsentrasi</p>' +
    '<p class="panel-sub">Tiap titik adalah satu sampel. Lingkaran: di dalam sektor arah angin; kotak: di luar sektor. Titik berongga: di bawah batas deteksi lab.</p>' +
    '<div class="vizlegend" id="labScatterLegend"></div>' +
    '<div id="labChartScatter" class="vizbox"></div></div>' +
    '<div class="card"><p class="panel-title">Ringkasan per Area Grid</p>' +
    '<p class="panel-sub">Nilai tertinggi ' + esc(labParamLabel(cfg.param)) + ' per kedalaman, jumlah sampel melebihi TK-C, dan jarak dari titik bocor.</p>' +
    labGridSummaryHtml() + '</div>' +
    '</div>' +
    labWaterCardHtml() +
    '<div class="card labcard-wide" id="labTableCard">' + labTableCardHtml() + '</div>' +
    '</div>';
}

function labGridSummaryHtml() {
  var cfg = state.labCfg;
  var pool = labActive();
  var depths = labDepthOptions();
  var byGrid = {};
  pool.forEach(function (s) {
    if (s.matrix === "air") return;
    var info = locInfo(s.loc);
    var gid = info && info.gridId ? info.gridId : "none";
    if (!byGrid[gid]) byGrid[gid] = { samples: [], locs: {} };
    byGrid[gid].samples.push(s);
    byGrid[gid].locs[s.loc] = true;
  });
  var rows = Object.keys(byGrid).map(function (gid) {
    var gObj = GRID_BY_ID[gid];
    var d = byGrid[gid];
    var maxBy = {};
    d.samples.forEach(function (s) {
      var o = labObs(s, cfg.param);
      if (!o) return;
      var key = depthKey(s.depth);
      if (!maxBy[key] || o.z > maxBy[key].obs.z) maxBy[key] = { obs: o, s: s };
    });
    var ex = d.samples.filter(function (s) { return sampleClass(s).level >= 1; }).length;
    var worst = d.samples.reduce(function (m, s) { return Math.max(m, sampleClass(s).level); }, 0);
    var dist = Infinity;
    Object.keys(d.locs).forEach(function (loc) {
      var info = locInfo(loc);
      if (info && info.exists) dist = Math.min(dist, geoFromLeak(info.lat, info.lon).dist);
    });
    return { gid: gid, label: gObj ? gObj.label : "Tanpa grid", nLoc: Object.keys(d.locs).length, maxBy: maxBy, ex: ex, worst: worst, dist: dist };
  }).sort(function (a, b) { return b.worst - a.worst || b.ex - a.ex || naturalCompare(a.label, b.label); });
  var depthCols = depths.map(depthKey);
  var hasSed = rows.some(function (r) { return r.maxBy.sed; });
  if (hasSed) depthCols.push("sed");
  function cell(m) {
    if (!m) return '<td class="tbl-center muted">–</td>';
    var tint = m.obs.level >= 1 ? ' style="background:' + LAB_CLASS[m.obs.level].color + '24;font-weight:600"' : '';
    return '<td class="num"' + tint + '>' + esc(obsDisplay(m.obs)) + '</td>';
  }
  return '<div class="datatable-wrap labsmalltable"><table class="datatable"><thead><tr><th>Area</th><th class="num">Titik</th>' +
    depthCols.map(function (k) { return '<th class="num">' + (k === "sed" ? "Sedimen" : esc(depthLabel(Number(k)))) + '</th>'; }).join("") +
    '<th class="num">&gt; TK-C</th><th>Klasifikasi terberat</th><th class="num">Jarak</th></tr></thead><tbody>' +
    rows.map(function (r) {
      return '<tr class="tbl-row" data-action="lab-focus-grid" data-id="' + esc(r.gid) + '"><td><b>' + esc(r.label) + '</b></td><td class="num">' + r.nLoc + '</td>' +
        depthCols.map(function (k) { return cell(r.maxBy[k]); }).join("") +
        '<td class="num">' + (r.ex ? '<b>' + r.ex + '</b>' : '0') + '</td><td>' + classBadge(r.worst) + '</td>' +
        '<td class="num">' + (isFinite(r.dist) ? Math.round(r.dist) + ' m' : '–') + '</td></tr>';
    }).join("") + '</tbody></table></div>';
}

function labWaterCardHtml() {
  var water = labActive().filter(function (s) { return s.matrix === "air"; });
  if (!water.length) return "";
  water.sort(function (a, b) { return naturalCompare(locLabel(a.loc), locLabel(b.loc)); });
  var params = WATER_PARAMS.filter(function (k) { return water.some(function (s) { return s.values[k]; }); });
  return '<div class="card labcard-wide"><p class="panel-title">Air Permukaan</p>' +
    '<p class="panel-sub">Dibandingkan dengan baku mutu air laut untuk biota (PP 22/2021 Lampiran VIII): TPH 0,02 mg/L, PAH 0,003 mg/L, minyak dan lemak 1 mg/L. Bila batas deteksi lab lebih tinggi dari baku mutu, hasil "di bawah batas deteksi" belum bisa dipastikan memenuhi.</p>' +
    '<div class="datatable-wrap labsmalltable"><table class="datatable"><thead><tr><th>Lokasi</th><th>Kode</th>' +
    params.map(function (k) { return '<th class="num">' + esc(LAB_PARAMS[k].label) + (LAB_PARAMS[k].bm != null ? '<span class="th-sub">BM ' + esc(fmtNum(LAB_PARAMS[k].bm)) + '</span>' : '') + '</th>'; }).join("") +
    '<th>Status</th></tr></thead><tbody>' +
    water.map(function (s) {
      return '<tr class="tbl-row" data-action="lab-edit" data-id="' + esc(s.kode) + '"><td><b>' + esc(locLabel(s.loc)) + '</b></td><td class="tbl-code">' + esc(s.kode) + '</td>' +
        params.map(function (k) {
          var v = s.values[k];
          if (!v) return '<td class="num muted">–</td>';
          var st = waterParamStatus(k, v);
          if (st === "exceed") return '<td class="num" style="background:#E5402F2E;font-weight:600">' + esc(fmtVal(v)) + '</td>';
          if (st === "inconclusive") return '<td class="num" title="Batas deteksi lab lebih tinggi dari baku mutu">' + esc(fmtVal(v)) + ' <span class="muted">?</span></td>';
          return '<td class="num">' + esc(fmtVal(v)) + '</td>';
        }).join("") +
        '<td>' + waterBadge(waterStatus(s)) + '</td></tr>';
    }).join("") + '</tbody></table></div></div>';
}

/* ---- Data table (all samples, editable) ---- */
function labTableRows() {
  var ui = state.labUi, cfg = state.labCfg;
  var q = (ui.tblSearch || "").trim().toLowerCase();
  var list = labActive().filter(function (s) {
    if (ui.tblFilter === "tanah" || ui.tblFilter === "sedimen" || ui.tblFilter === "air") { if (s.matrix !== ui.tblFilter) return false; }
    if (ui.tblFilter === "exceed") {
      if (s.matrix === "air") { if (waterStatus(s) !== "exceed") return false; }
      else if (sampleClass(s).level < 1) return false;
    }
    if (q) {
      var hay = (s.kode + " " + locLabel(s.loc) + " " + locGridLabel(s.loc) + " " + s.batch).toLowerCase();
      if (hay.indexOf(q) === -1) return false;
    }
    return true;
  });
  var paramForSort = cfg.param;
  list.sort(function (a, b) {
    if (ui.tblSort === "lokasi") {
      var c = naturalCompare(locLabel(a.loc), locLabel(b.loc));
      if (c) return c;
      return (a.depth == null ? -1 : a.depth) - (b.depth == null ? -1 : b.depth);
    }
    if (ui.tblSort === "nilai") {
      var oa = labObs(a, paramForSort), ob = labObs(b, paramForSort);
      var za = oa ? oa.z + (oa.val ? oa.val.v * 1e-9 : 0) : -1, zb = ob ? ob.z + (ob.val ? ob.val.v * 1e-9 : 0) : -1;
      if (za !== zb) return zb - za;
    }
    if (a.no != null && b.no != null && a.no !== b.no) return a.no - b.no;
    return naturalCompare(a.kode, b.kode);
  });
  return list;
}

function labTableCardHtml() {
  var ui = state.labUi;
  var chips = [["all", "Semua"], ["tanah", "Tanah"], ["sedimen", "Sedimen"], ["air", "Air"], ["exceed", "Melebihi ambang"]];
  return '<div class="panelhead-row"><div><p class="panel-title">Data Hasil Uji</p>' +
    '<p class="panel-sub">Seluruh hasil laboratorium. Klik satu baris untuk mengedit. Sel berwarna menandai nilai di atas TK-C (jingga), TK-B (merah), atau TK-A (ungu).</p></div>' +
    '<div class="tblhead-actions"><button type="button" class="btn btn-primary" data-action="lab-add">' + ICONS.plus + ' Tambah</button></div></div>' +
    '<div class="labtblbar">' +
    '<div class="filterchips">' + chips.map(function (c) {
      return '<button type="button" class="chip' + (ui.tblFilter === c[0] ? " active" : "") + '" data-action="lab-tbl-filter" data-filter="' + c[0] + '">' + c[1] + '</button>';
    }).join("") + '</div>' +
    '<div class="searchbox labtblsearch">' + ICONS.search + '<input type="text" placeholder="Cari kode sampel, titik, atau grid" value="' + esc(ui.tblSearch) + '" data-field="lab-tbl-search" aria-label="Cari data hasil uji"/></div>' +
    '<label class="labctl labctl-inline"><span>Urutkan</span><select data-field="lab-tbl-sort">' +
    [["kode", "Nomor / kode sampel"], ["lokasi", "Lokasi"], ["nilai", "Nilai tertinggi (" + labParamLabel(state.labCfg.param) + ")"]].map(function (o) {
      return '<option value="' + o[0] + '"' + (ui.tblSort === o[0] ? " selected" : "") + '>' + esc(o[1]) + '</option>';
    }).join("") + '</select></label></div>' +
    '<div id="labTableBody">' + labTableHtml() + '</div>';
}

function labTableHtml() {
  var rows = labTableRows();
  var cols = ["tph_c6c9", "tph_c10c36", "benzene", "ethylbenzene", "toluene", "xylene", "tph", "pah", "oil_grease"];
  var html = '<div class="datatable-wrap labdatatable"><table class="datatable"><thead><tr>' +
    '<th class="sticky-col">Kode</th><th>Matriks</th><th>Lokasi</th><th class="num">Kedalaman</th><th>Tanggal</th><th>Batch</th>' +
    cols.map(function (k) {
      var P = LAB_PARAMS[k];
      var sub = P.tk ? "TK-C " + (P.tk.C != null ? fmtNum(P.tk.C) : "–") : "BM " + fmtNum(P.bm);
      return '<th class="num">' + esc(P.label) + '<span class="th-sub">' + esc(sub) + '</span></th>';
    }).join("") +
    '<th>Klasifikasi</th><th></th></tr></thead><tbody>';
  if (!rows.length) {
    html += '<tr><td colspan="' + (cols.length + 8) + '" class="tbl-empty">Tidak ada data yang cocok dengan filter atau pencarian.</td></tr>';
  }
  rows.forEach(function (s) {
    var isWater = s.matrix === "air";
    html += '<tr class="tbl-row" data-action="lab-edit" data-id="' + esc(s.kode) + '">' +
      '<td class="tbl-code sticky-col">' + esc(s.kode) + '</td>' +
      '<td>' + esc(MATRIX_META[s.matrix].label) + '</td>' +
      '<td>' + esc(locLabel(s.loc)) + (locInfo(s.loc).exists ? '' : ' <span class="tbl-custom">tidak di peta</span>') + '</td>' +
      '<td class="num">' + (s.depth != null ? esc(fmtNum(s.depth)) : '–') + '</td>' +
      '<td>' + esc(s.date ? formatDateID(s.date) : "–") + '</td>' +
      '<td>' + esc(s.batch) + '</td>' +
      cols.map(function (k) {
        var v = s.values[k];
        if (!v) return '<td class="num muted">–</td>';
        var lvl = isWater ? (waterParamStatus(k, v) === "exceed" ? 2 : 0) : (paramLevel(k, v) ? paramLevel(k, v).level : 0);
        var style = lvl >= 1 ? ' style="background:' + LAB_CLASS[lvl].color + '2E;font-weight:600"' : '';
        return '<td class="num' + (v.op === "<" ? " nd" : "") + '"' + style + '>' + esc(fmtVal(v)) + '</td>';
      }).join("") +
      '<td>' + (isWater ? waterBadge(waterStatus(s)) : classBadge(sampleClass(s).level)) + '</td>' +
      '<td class="tbl-actions"><button type="button" class="iconbtn iconbtn-sm" data-action="lab-open-detail" data-id="' + esc(s.loc) + '" title="Lihat titik ini" aria-label="Lihat titik ' + esc(locLabel(s.loc)) + '">' + ICONS.pin + '</button></td>' +
      '</tr>';
  });
  html += '</tbody></table></div><p class="tbl-count">Menampilkan ' + rows.length + ' dari ' + labActive().length + ' sampel.</p>';
  return html;
}

/* ---- Point detail ---- */
function labDetailHtml(info) {
  var cfg = state.labCfg;
  var samples = labActive().filter(function (s) { return s.loc === info.loc; }).sort(function (a, b) {
    if (a.matrix !== b.matrix) return a.matrix < b.matrix ? -1 : 1;
    var da = a.depth == null ? -1 : a.depth, db = b.depth == null ? -1 : b.depth;
    if (da !== db) return da - db;
    return (b.date || "").localeCompare(a.date || "");
  });
  var geo = info.exists ? geoFromLeak(info.lat, info.lon) : null;
  var inCone = geo ? Math.abs(angDiff(geo.bearing, cfg.windTo)) <= cfg.cone : false;
  var g = info.gridId ? GRID_BY_ID[info.gridId] : null;

  var blocks = samples.map(function (s) {
    var isWater = s.matrix === "air";
    var params = (isWater ? WATER_PARAMS : SOIL_PARAMS).filter(function (k) { return s.values[k]; });
    Object.keys(s.values).forEach(function (k) { if (params.indexOf(k) === -1) params.push(k); });
    var head = isWater ? waterBadge(waterStatus(s)) : classBadge(sampleClass(s).level);
    var rows = params.map(function (k) {
      var P = LAB_PARAMS[k], v = s.values[k];
      var status;
      if (isWater) {
        var ws = waterParamStatus(k, v);
        status = ws === "na" ? '<span class="muted">tidak ada baku mutu</span>' : waterBadge(ws);
      } else {
        var pl = paramLevel(k, v);
        status = pl ? (pl.inconclusive ? '<span class="muted">batas deteksi di atas ambang</span>' : classBadge(pl.level, paramStatusLabel(k, pl.level))) : '–';
      }
      var thr = P.tk ? [P.tk.C, P.tk.B, P.tk.A].map(function (t) { return t != null ? fmtNum(t) : "–"; }).join(" / ") : (P.bm != null ? fmtNum(P.bm) : "–");
      return '<tr><td>' + esc(P.label) + '</td><td class="num"><b>' + esc(fmtVal(v)) + '</b></td><td class="num muted">' + esc(thr) + '</td><td>' + status + '</td></tr>';
    }).join("");
    return '<div class="labsample">' +
      '<div class="labsample-head"><div><span class="labsample-depth">' + esc(isWater ? "Air permukaan" : (s.matrix === "sedimen" ? "Sedimen" : depthLabel(s.depth))) + '</span>' +
      '<span class="labsample-meta">' + esc(s.kode) + ' · ' + esc(s.date ? formatDateID(s.date) : "tanpa tanggal") + ' · ' + esc(s.batch) + ' · ' + esc(s.unit) + '</span></div>' +
      '<div class="labsample-actions">' + head + '<button type="button" class="btn btn-sm" data-action="lab-edit" data-id="' + esc(s.kode) + '">' + LAB_ICONS.edit + ' Edit</button></div></div>' +
      '<table class="labparamtable"><thead><tr><th>Parameter</th><th class="num">Hasil</th><th class="num">' + (isWater ? "Baku mutu" : "TK-C / TK-B / TK-A") + '</th><th>Status</th></tr></thead><tbody>' + rows + '</tbody></table>' +
      (s.notes ? '<p class="labsample-notes">' + esc(s.notes) + '</p>' : '') +
      '</div>';
  }).join("");

  return '<button type="button" class="backbtn" data-action="lab-back">' + ICONS.back + ' Kembali ke ringkasan hasil lab</button>' +
    '<div class="detailgrid">' +
    '<div class="detailcard">' +
    '<div class="pointhead"><div class="pointid">' + esc(info.type === "area" ? "Area " + info.label : info.label) + '</div>' +
    '<div class="pointgrid">' + esc(g ? g.label : "Tanpa grid") + (info.exists && info.type === "point" ? ' · lintang ' + info.lat.toFixed(6) + ', bujur ' + info.lon.toFixed(6) : '') + '</div>' +
    (geo ? '<div class="labgeo">' + LAB_ICONS.wind + ' ' + Math.round(geo.dist) + ' m ke arah ' + esc(compassName(geo.bearing)) + ' (' + fmtDeg(geo.bearing) + ') dari titik bocor · ' +
      (inCone ? '<b>di dalam sektor arah angin</b>' : 'di luar sektor arah angin') + '</div>' : '<div class="labgeo">Lokasi ini tidak ada di peta.</div>') +
    '</div>' +
    (blocks || '<div class="emptyphoto">Belum ada hasil lab di lokasi ini.</div>') +
    '<div class="formactions"><button type="button" class="btn btn-primary" data-action="lab-add-here" data-id="' + esc(info.loc) + '">' + ICONS.plus + ' Tambah hasil di lokasi ini</button>' +
    (info.exists ? '<button type="button" class="btn" data-action="lab-focus" data-id="' + esc(info.loc) + '">' + ICONS.pin + ' Lihat di peta</button>' : '') + '</div>' +
    '</div>' +
    '<div class="detailcard"><p class="panel-title">Profil Kedalaman</p><p class="panel-sub">' + esc(labParamLabel(cfg.param === "index" ? "tph_c10c36" : cfg.param)) + ' pada tiap kedalaman di lokasi ini, dibandingkan dengan ambang TK.</p>' +
    '<div id="labChartProfile" class="vizbox"></div></div>' +
    '</div>';
}

/* ---------------------------------------------------------------------
   Charts (inline SVG, hover tooltips via [data-tip])
--------------------------------------------------------------------- */
function vizTheme() {
  var cs = getComputedStyle(document.documentElement);
  function v(n) { return cs.getPropertyValue(n).trim(); }
  return {
    series: [v("--viz-s1"), v("--viz-s2"), v("--viz-s3"), v("--viz-s4")],
    grid: v("--viz-grid"), axis: v("--viz-axis"), ink: v("--viz-ink"), ink2: v("--viz-ink2"), muted: v("--viz-muted"), surface: v("--viz-surface")
  };
}
function depthSeries() {
  var depths = labDepthOptions();
  var keys = depths.map(depthKey);
  var hasSed = labActive().some(function (s) { return s.matrix === "sedimen"; });
  if (hasSed) keys.push("sed");
  return keys;
}
function seriesColor(keys, key, th) { var i = keys.indexOf(key); return th.series[Math.max(0, Math.min(3, i))]; }
function seriesLabel(key) { return key === "sed" ? "Sedimen" : depthLabel(Number(key)); }
function tipAttr(html) { return ' data-tip="' + esc(html) + '"'; }

function niceLogTicks(d0, d1) {
  var out = [];
  for (var e = Math.floor(Math.log10(d0)); e <= Math.ceil(Math.log10(d1)); e++) {
    [1, 2, 5].forEach(function (m) { var v = m * Math.pow(10, e); if (v >= d0 && v <= d1) out.push(v); });
  }
  if (out.length > 9) out = out.filter(function (v) { return Math.abs(Math.log10(v) - Math.round(Math.log10(v))) < 1e-9; });
  return out;
}

// x-axis model for a parameter: log concentration, or the 0..4 class score for "index".
function valueAxis(param, values) {
  if (param === "index") {
    var maxZ = Math.max(3.3, Math.max.apply(null, values.concat([0])) + 0.2);
    return {
      kind: "z", d0: 0, d1: maxZ,
      pos: function (z) { return z / maxZ; },
      ticks: [],
      thresholds: [[1, "TK-C", 1], [2, "TK-B", 2], [3, "TK-A", 3]].filter(function (t) { return t[0] <= maxZ; }),
      bands: [[1, 2, 1], [2, 3, 2], [3, maxZ, 3]]
    };
  }
  var tk = LAB_PARAMS[param].tk;
  var first = tk.C != null ? tk.C : tk.B;
  var vmin = Math.min.apply(null, values.concat([first / 20]));
  var vmax = Math.max.apply(null, values.concat([first * 1.6]));
  var d0 = vmin / 1.6, d1 = vmax * 1.6;
  var l0 = Math.log10(d0), l1 = Math.log10(d1);
  var thresholds = [];
  if (tk.C != null) thresholds.push([tk.C, "TK-C", 1]);
  thresholds.push([tk.B, "TK-B", 2]);
  thresholds.push([tk.A, "TK-A", 3]);
  var hidden = thresholds.filter(function (t) { return t[0] > d1; });
  var bands = [];
  if (tk.C != null) bands.push([tk.C, tk.B, 1]);
  bands.push([tk.B, tk.A, 2]);
  bands.push([tk.A, Infinity, 3]);
  return {
    kind: "log", d0: d0, d1: d1,
    pos: function (v) { return (Math.log10(Math.max(v, d0)) - l0) / (l1 - l0); },
    ticks: niceLogTicks(d0, d1),
    thresholds: thresholds.filter(function (t) { return t[0] <= d1; }),
    hidden: hidden,
    bands: bands
  };
}
function obsAxisValue(param, obs) { return param === "index" ? obs.z : obs.val.v; }

function bandsSvg(ax, X, top, bottom) {
  return ax.bands.map(function (b) {
    var lo = Math.max(b[0], ax.d0), hi = Math.min(b[1], ax.d1);
    if (hi <= lo) return "";
    var x0 = X(lo), x1 = X(hi);
    return '<rect x="' + x0.toFixed(1) + '" y="' + top + '" width="' + (x1 - x0).toFixed(1) + '" height="' + (bottom - top) + '" fill="' + LAB_CLASS[b[2]].color + '" opacity="0.1"/>';
  }).join("");
}
function thresholdsSvg(ax, X, top, bottom, th, labelY) {
  return ax.thresholds.map(function (t) {
    var x = X(t[0]);
    return '<line x1="' + x.toFixed(1) + '" x2="' + x.toFixed(1) + '" y1="' + top + '" y2="' + bottom + '" stroke="' + LAB_CLASS[t[2]].color + '" stroke-width="1.5" stroke-dasharray="4 3"/>' +
      '<text x="' + x.toFixed(1) + '" y="' + labelY + '" text-anchor="middle" font-size="10.5" font-weight="600" fill="' + th.ink2 + '">' + esc(t[1] + (ax.kind === "log" ? " " + fmtNum(t[0]) : "")) + '</text>';
  }).join("");
}

function renderLabCharts() {
  if (state.view !== "lab") return;
  var th = vizTheme();
  var el = document.getElementById("labChartClass");
  if (el) el.innerHTML = classStackSvg(el.clientWidth, th);
  var keys = depthSeries();
  var legendHtml = keys.map(function (k) { return '<span class="vizlegend-item"><span class="vizdot" style="background:' + seriesColor(keys, k, th) + '"></span>' + esc(seriesLabel(k)) + '</span>'; }).join("") +
    '<span class="vizlegend-item"><span class="vizdot vizdot-hollow" style="border-color:' + th.ink2 + '"></span>Di bawah batas deteksi</span>';
  var dl = document.getElementById("labDepthLegend");
  if (dl) dl.innerHTML = legendHtml;
  var sl = document.getElementById("labScatterLegend");
  if (sl) sl.innerHTML = legendHtml;
  var dd = document.getElementById("labChartDumbbell");
  if (dd) dd.innerHTML = dumbbellSvg(dd.clientWidth, th);
  var sc = document.getElementById("labChartScatter");
  if (sc) sc.innerHTML = scatterSvg(sc.clientWidth, th);
  var pr = document.getElementById("labChartProfile");
  if (pr) pr.innerHTML = profileSvg(pr.clientWidth, th);
}

function classStackSvg(width, th) {
  var W = Math.max(280, width || 480);
  var pool = labActive().filter(function (s) { return s.matrix !== "air"; });
  var groups = labDepthOptions().map(function (d) {
    return { label: "Tanah " + depthLabel(d), list: pool.filter(function (s) { return s.matrix === "tanah" && s.depth === d; }) };
  });
  var noDepth = pool.filter(function (s) { return s.matrix === "tanah" && s.depth == null; });
  if (noDepth.length) groups.push({ label: "Tanah (tanpa kedalaman)", list: noDepth });
  var sed = pool.filter(function (s) { return s.matrix === "sedimen"; });
  if (sed.length) groups.push({ label: "Sedimen", list: sed });
  if (!groups.length) return '<p class="muted vizempty">Belum ada data tanah atau sedimen.</p>';
  var labelW = 132, countW = 40, barH = 22, gap = 14, top = 4;
  var H = top + groups.length * (barH + gap);
  var bw = W - labelW - countW;
  var parts = ['<svg width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Klasifikasi sampel per lapisan" class="vizsvg">'];
  groups.forEach(function (g, gi) {
    var y = top + gi * (barH + gap);
    var counts = [0, 0, 0, 0];
    g.list.forEach(function (s) { counts[sampleClass(s).level]++; });
    var n = g.list.length;
    parts.push('<text x="0" y="' + (y + barH / 2 + 4) + '" font-size="12" fill="' + th.ink + '">' + esc(g.label) + '</text>');
    parts.push('<text x="' + W + '" y="' + (y + barH / 2 + 4) + '" font-size="11.5" text-anchor="end" fill="' + th.ink2 + '" class="tnum">' + n + '</text>');
    var x = labelW;
    var segs = counts.map(function (c, lvl) { return { c: c, lvl: lvl }; }).filter(function (s) { return s.c > 0; });
    segs.forEach(function (sg, si) {
      var w = bw * sg.c / n;
      var gapPx = si < segs.length - 1 ? 2 : 0;
      var wDraw = Math.max(1, w - gapPx);
      var pct = Math.round(sg.c / n * 100);
      var tip = '<b>' + esc(g.label) + '</b><br>' + LAB_CLASS[sg.lvl].icon + ' ' + esc(LAB_CLASS[sg.lvl].mgmt) + ' (' + esc(LAB_CLASS[sg.lvl].short) + ')<br>' + sg.c + ' dari ' + n + ' sampel (' + pct + '%)';
      var rx = (si === 0 || si === segs.length - 1) ? 4 : 0;
      parts.push('<rect x="' + x.toFixed(1) + '" y="' + y + '" width="' + wDraw.toFixed(1) + '" height="' + barH + '" rx="' + rx + '" fill="' + LAB_CLASS[sg.lvl].color + '"' + tipAttr(tip) + '/>');
      var label = String(sg.c);
      if (wDraw > 22) parts.push('<text x="' + (x + wDraw / 2).toFixed(1) + '" y="' + (y + barH / 2 + 4) + '" text-anchor="middle" font-size="11.5" font-weight="700" fill="' + (sg.lvl === 0 || sg.lvl === 1 ? "#0B1A12" : "#FFFFFF") + '" pointer-events="none">' + label + '</text>');
      x += w;
    });
  });
  parts.push("</svg>");
  return parts.join("");
}

function dumbbellRows(param) {
  var list = labPointObsList(param, "max");
  return list.map(function (o) {
    return { o: o, max: Math.max.apply(null, o.entries.map(function (e) { return obsAxisValue(param, e.obs); })) };
  }).sort(function (a, b) { return b.o.z - a.o.z || b.max - a.max || naturalCompare(a.o.info.label, b.o.info.label); });
}

function obsTipHtml(o, param) {
  var html = '<b>' + esc(o.info.label) + '</b> · ' + esc(locGridLabel(o.loc)) + '<br>';
  o.entries.forEach(function (e) {
    html += esc(seriesLabel(depthKey(e.depth))) + ': ' + esc(obsDisplay(e.obs)) + (e.obs.level >= 1 ? ' — ' + esc(LAB_CLASS[e.obs.level].mgmt) : '') + '<br>';
  });
  var g = geoFromLeak(o.info.lat, o.info.lon);
  html += '<span class="muted">' + Math.round(g.dist) + ' m dari titik bocor</span>';
  return html;
}

function dumbbellSvg(width, th) {
  var cfg = state.labCfg, param = cfg.param;
  var rows = dumbbellRows(param);
  if (!rows.length) return '<p class="muted vizempty">Belum ada hasil untuk parameter ini.</p>';
  if (!state.labUi.showAllRows) rows = rows.slice(0, 15);
  var keys = depthSeries();
  var allVals = [];
  rows.forEach(function (r) { r.o.entries.forEach(function (e) { allVals.push(obsAxisValue(param, e.obs)); }); });
  var ax = valueAxis(param, allVals);
  var W = Math.max(320, width || 640);
  var mL = 92, mR = 18, mT = 26, rowH = 24, mB = 30;
  var plotW = W - mL - mR;
  var H = mT + rows.length * rowH + mB;
  function X(v) { return mL + ax.pos(v) * plotW; }
  var bottom = mT + rows.length * rowH;
  var parts = ['<svg width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Konsentrasi per titik dan kedalaman" class="vizsvg">'];
  parts.push(bandsSvg(ax, X, mT - 6, bottom));
  ax.ticks.forEach(function (t) {
    var x = X(t);
    parts.push('<line x1="' + x.toFixed(1) + '" x2="' + x.toFixed(1) + '" y1="' + (mT - 6) + '" y2="' + bottom + '" stroke="' + th.grid + '" stroke-width="1"/>');
    parts.push('<text x="' + x.toFixed(1) + '" y="' + (bottom + 16) + '" text-anchor="middle" font-size="10.5" fill="' + th.muted + '" class="tnum">' + esc(fmtNum(t)) + '</text>');
  });
  if (ax.kind === "z") {
    [[0, "ttd"], [1, "TK-C"], [2, "TK-B"], [3, "TK-A"]].forEach(function (t) {
      if (t[0] > ax.d1) return;
      parts.push('<text x="' + X(t[0]).toFixed(1) + '" y="' + (bottom + 16) + '" text-anchor="middle" font-size="10.5" fill="' + th.muted + '">' + t[1] + '</text>');
    });
  }
  parts.push('<line x1="' + mL + '" x2="' + (W - mR) + '" y1="' + bottom + '" y2="' + bottom + '" stroke="' + th.axis + '" stroke-width="1"/>');
  parts.push(thresholdsSvg(ax, X, mT - 6, bottom, th, mT - 11));
  rows.forEach(function (r, i) {
    var y = mT + i * rowH + rowH / 2;
    var o = r.o;
    var xs = o.entries.map(function (e) { return X(obsAxisValue(param, e.obs)); });
    var tip = obsTipHtml(o, param);
    parts.push('<g class="vizrow" data-action="lab-open-detail" data-id="' + esc(o.loc) + '"' + tipAttr(tip) + '>');
    parts.push('<rect x="0" y="' + (y - rowH / 2) + '" width="' + W + '" height="' + rowH + '" fill="transparent"/>');
    parts.push('<text x="' + (mL - 10) + '" y="' + (y + 4) + '" text-anchor="end" font-size="11.5" font-weight="' + (o.level >= 1 ? 700 : 500) + '" fill="' + th.ink + '">' + esc(o.info.label) + '</text>');
    parts.push('<line x1="' + mL + '" x2="' + (W - mR) + '" y1="' + y + '" y2="' + y + '" stroke="' + th.grid + '" stroke-width="1" opacity="0.6"/>');
    if (xs.length > 1) parts.push('<line x1="' + Math.min.apply(null, xs).toFixed(1) + '" x2="' + Math.max.apply(null, xs).toFixed(1) + '" y1="' + y + '" y2="' + y + '" stroke="' + th.ink2 + '" stroke-width="2" opacity="0.55"/>');
    o.entries.forEach(function (e, ei) {
      var c = seriesColor(keys, depthKey(e.depth), th);
      var x = xs[ei];
      if (e.obs.nd) parts.push('<circle cx="' + x.toFixed(1) + '" cy="' + y + '" r="4.6" fill="' + th.surface + '" stroke="' + c + '" stroke-width="2"/>');
      else parts.push('<circle cx="' + x.toFixed(1) + '" cy="' + y + '" r="5.6" fill="' + c + '" stroke="' + th.surface + '" stroke-width="2"/>');
    });
    parts.push('</g>');
  });
  if (ax.hidden && ax.hidden.length) {
    parts.push('<text x="' + (W - mR) + '" y="' + (H - 2) + '" text-anchor="end" font-size="10.5" fill="' + th.muted + '">' + esc(ax.hidden.map(function (t) { return t[1] + " (" + fmtNum(t[0]) + ")"; }).join(", ")) + ' di luar rentang data</text>');
  }
  parts.push('<text x="' + mL + '" y="' + (H - 2) + '" font-size="10.5" fill="' + th.muted + '">' + (ax.kind === "log" ? "Skala logaritmik" : "Skor klasifikasi") + '</text>');
  parts.push("</svg>");
  return parts.join("");
}

function scatterSvg(width, th) {
  var cfg = state.labCfg, param = cfg.param;
  var an = computeLabAnalysis();
  var pts = [];
  an.rows.forEach(function (r) {
    r.o.entries.forEach(function (e) { pts.push({ r: r, e: e, v: obsAxisValue(param, e.obs) }); });
  });
  if (!pts.length) return '<p class="muted vizempty">Belum ada hasil untuk parameter ini.</p>';
  var keys = depthSeries();
  var W = Math.max(300, width || 480), H = 300;
  var mL = 56, mR = 14, mT = 22, mB = 38;
  var plotW = W - mL - mR, plotH = H - mT - mB;
  var dMax = Math.max.apply(null, pts.map(function (p) { return p.r.dist; }));
  var xMax = Math.max(50, Math.ceil(dMax / 25) * 25);
  var ax = valueAxis(param, pts.map(function (p) { return p.v; }));
  function X(d) { return mL + d / xMax * plotW; }
  function Y(v) { return mT + (1 - ax.pos(v)) * plotH; }
  var parts = ['<svg width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Jarak dari titik bocor terhadap konsentrasi" class="vizsvg">'];
  ax.bands.forEach(function (b) {
    var lo = Math.max(b[0], ax.d0), hi = Math.min(b[1], ax.d1);
    if (hi <= lo) return;
    parts.push('<rect x="' + mL + '" y="' + Y(hi).toFixed(1) + '" width="' + plotW + '" height="' + (Y(lo) - Y(hi)).toFixed(1) + '" fill="' + LAB_CLASS[b[2]].color + '" opacity="0.1"/>');
  });
  var yTicks = ax.kind === "log" ? ax.ticks : [];
  yTicks.forEach(function (t) {
    var y = Y(t);
    parts.push('<line x1="' + mL + '" x2="' + (W - mR) + '" y1="' + y.toFixed(1) + '" y2="' + y.toFixed(1) + '" stroke="' + th.grid + '" stroke-width="1"/>');
    parts.push('<text x="' + (mL - 6) + '" y="' + (y + 3.5).toFixed(1) + '" text-anchor="end" font-size="10.5" fill="' + th.muted + '" class="tnum">' + esc(fmtNum(t)) + '</text>');
  });
  if (ax.kind === "z") {
    [[0, "ttd"], [1, "TK-C"], [2, "TK-B"], [3, "TK-A"]].forEach(function (t) {
      parts.push('<text x="' + (mL - 6) + '" y="' + (Y(t[0]) + 3.5).toFixed(1) + '" text-anchor="end" font-size="10.5" fill="' + th.muted + '">' + t[1] + '</text>');
    });
  }
  for (var d = 0; d <= xMax; d += (xMax > 200 ? 50 : 25)) {
    var x = X(d);
    parts.push('<line x1="' + x.toFixed(1) + '" x2="' + x.toFixed(1) + '" y1="' + mT + '" y2="' + (mT + plotH) + '" stroke="' + th.grid + '" stroke-width="1"/>');
    parts.push('<text x="' + x.toFixed(1) + '" y="' + (mT + plotH + 15) + '" text-anchor="middle" font-size="10.5" fill="' + th.muted + '" class="tnum">' + d + '</text>');
  }
  parts.push('<text x="' + (mL + plotW / 2) + '" y="' + (H - 4) + '" text-anchor="middle" font-size="11" fill="' + th.ink2 + '">Jarak dari titik bocor (m)</text>');
  ax.thresholds.forEach(function (t) {
    var y = Y(t[0]);
    parts.push('<line x1="' + mL + '" x2="' + (W - mR) + '" y1="' + y.toFixed(1) + '" y2="' + y.toFixed(1) + '" stroke="' + LAB_CLASS[t[2]].color + '" stroke-width="1.5" stroke-dasharray="4 3"/>');
    parts.push('<text x="' + (W - mR - 2) + '" y="' + (y - 4).toFixed(1) + '" text-anchor="end" font-size="10.5" font-weight="600" fill="' + th.ink2 + '">' + esc(t[1]) + '</text>');
  });
  parts.push('<line x1="' + mL + '" x2="' + mL + '" y1="' + mT + '" y2="' + (mT + plotH) + '" stroke="' + th.axis + '"/>');
  parts.push('<line x1="' + mL + '" x2="' + (W - mR) + '" y1="' + (mT + plotH) + '" y2="' + (mT + plotH) + '" stroke="' + th.axis + '"/>');
  pts.sort(function (a, b) { return a.v - b.v; });
  pts.forEach(function (p) {
    var cx = X(p.r.dist), cy = Y(p.v);
    var c = seriesColor(keys, depthKey(p.e.depth), th);
    var fill = p.e.obs.nd ? th.surface : c;
    var stroke = p.e.obs.nd ? c : th.surface;
    var tip = '<b>' + esc(p.r.o.info.label) + '</b> · ' + esc(seriesLabel(depthKey(p.e.depth))) + '<br>' + esc(labParamLabel(param)) + ': ' + esc(obsDisplay(p.e.obs)) +
      '<br>' + Math.round(p.r.dist) + ' m ke arah ' + esc(compassName(p.r.bearing)) + '<br><span class="muted">' + (p.r.inCone ? 'Di dalam sektor arah angin' : 'Di luar sektor arah angin') + '</span>';
    var attrs = ' data-action="lab-open-detail" data-id="' + esc(p.r.o.loc) + '"' + tipAttr(tip) + ' class="vizmark"';
    if (p.r.inCone) parts.push('<circle cx="' + cx.toFixed(1) + '" cy="' + cy.toFixed(1) + '" r="5.4" fill="' + fill + '" stroke="' + stroke + '" stroke-width="2"' + attrs + '/>');
    else parts.push('<rect x="' + (cx - 5).toFixed(1) + '" y="' + (cy - 5).toFixed(1) + '" width="10" height="10" rx="1.5" fill="' + fill + '" stroke="' + stroke + '" stroke-width="2"' + attrs + '/>');
  });
  parts.push("</svg>");
  var cap = "";
  if (an.trend) {
    cap = '<p class="vizcaption">Korelasi peringkat Spearman jarak–konsentrasi: <b>ρ = ' + fmtRho(an.trend.rho).toLocaleString("id-ID", { maximumFractionDigits: 2, minimumFractionDigits: 2 }) + '</b> (p ' +
      (an.trend.p < 0.001 ? "&lt; 0,001" : "= " + an.trend.p.toLocaleString("id-ID", { maximumFractionDigits: 3 })) + ', n = ' + an.rows.length + ' titik). Nilai negatif berarti konsentrasi turun menjauhi titik bocor.</p>';
  }
  return parts.join("") + cap;
}

function profileSvg(width, th) {
  var sel = state.labUi.selected;
  var param = state.labCfg.param === "index" ? "tph_c10c36" : state.labCfg.param;
  var samples = labActive().filter(function (s) { return s.loc === sel && s.matrix !== "air" && s.values[param]; });
  if (!samples.length) return '<p class="muted vizempty">Tidak ada hasil ' + esc(LAB_PARAMS[param].label) + ' di lokasi ini.</p>';
  var byDepth = {};
  samples.forEach(function (s) { var k = depthKey(s.depth); byDepth[k] = byDepth[k] ? newerSample(byDepth[k], s) : s; });
  var list = Object.keys(byDepth).map(function (k) { return byDepth[k]; }).sort(function (a, b) { return (a.depth == null ? -1 : a.depth) - (b.depth == null ? -1 : b.depth); });
  var keys = depthSeries();
  var ax = valueAxis(param, list.map(function (s) { return s.values[param].v; }));
  var W = Math.max(280, width || 400), rowH = 40, mL = 84, mR = 16, mT = 26, mB = 30;
  var H = mT + list.length * rowH + mB;
  var plotW = W - mL - mR, bottom = mT + list.length * rowH;
  function X(v) { return mL + ax.pos(v) * plotW; }
  var parts = ['<svg width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Profil kedalaman" class="vizsvg">'];
  parts.push(bandsSvg(ax, X, mT - 6, bottom));
  ax.ticks.forEach(function (t) {
    var x = X(t);
    parts.push('<line x1="' + x.toFixed(1) + '" x2="' + x.toFixed(1) + '" y1="' + (mT - 6) + '" y2="' + bottom + '" stroke="' + th.grid + '"/>');
    parts.push('<text x="' + x.toFixed(1) + '" y="' + (bottom + 16) + '" text-anchor="middle" font-size="10.5" fill="' + th.muted + '" class="tnum">' + esc(fmtNum(t)) + '</text>');
  });
  parts.push(thresholdsSvg(ax, X, mT - 6, bottom, th, mT - 11));
  var prev = null;
  list.forEach(function (s, i) {
    var y = mT + i * rowH + rowH / 2;
    var v = s.values[param];
    var x = X(v.v);
    var c = seriesColor(keys, depthKey(s.depth), th);
    if (prev) parts.push('<line x1="' + prev[0].toFixed(1) + '" y1="' + prev[1] + '" x2="' + x.toFixed(1) + '" y2="' + y + '" stroke="' + th.ink2 + '" stroke-width="2" opacity="0.5"/>');
    prev = [x, y];
    parts.push('<text x="' + (mL - 10) + '" y="' + (y + 4) + '" text-anchor="end" font-size="12" fill="' + th.ink + '">' + esc(s.matrix === "sedimen" ? "Sedimen" : depthLabel(s.depth)) + '</text>');
    var tip = esc(depthLabel(s.depth)) + ': ' + esc(fmtVal(v)) + ' ' + esc(s.unit);
    if (v.op === "<") parts.push('<circle cx="' + x.toFixed(1) + '" cy="' + y + '" r="6" fill="' + th.surface + '" stroke="' + c + '" stroke-width="2.2"' + tipAttr(tip) + '/>');
    else parts.push('<circle cx="' + x.toFixed(1) + '" cy="' + y + '" r="7" fill="' + c + '" stroke="' + th.surface + '" stroke-width="2"' + tipAttr(tip) + '/>');
    parts.push('<text x="' + (x + 11).toFixed(1) + '" y="' + (y + 4) + '" font-size="11.5" font-weight="600" fill="' + th.ink + '" class="tnum">' + esc(fmtVal(v)) + '</text>');
  });
  parts.push("</svg>");
  return parts.join("");
}

/* ---- Tooltip ---- */
var vizTipEl = null;
function vizTipShow(target, e) {
  if (!vizTipEl) vizTipEl = document.getElementById("vizTip");
  if (!vizTipEl) return;
  vizTipEl.innerHTML = target.getAttribute("data-tip");
  vizTipEl.style.display = "block";
  vizTipMove(e);
}
function vizTipMove(e) {
  if (!vizTipEl || vizTipEl.style.display !== "block") return;
  var pad = 14, w = vizTipEl.offsetWidth, h = vizTipEl.offsetHeight;
  var x = e.clientX + pad, y = e.clientY + pad;
  if (x + w > window.innerWidth - 8) x = e.clientX - w - pad;
  if (y + h > window.innerHeight - 8) y = e.clientY - h - pad;
  vizTipEl.style.left = Math.max(8, x) + "px";
  vizTipEl.style.top = Math.max(8, y) + "px";
}
function vizTipHide() { if (vizTipEl) vizTipEl.style.display = "none"; }

/* ---------------------------------------------------------------------
   Add / edit form
--------------------------------------------------------------------- */
function labOpenForm(kode, presetLoc) {
  var s = null;
  if (kode) {
    var i = labFindIndex(kode);
    if (i >= 0 && !state.lab.samples[i].deleted) s = state.lab.samples[i];
  }
  var draft;
  if (s) {
    var vals = {};
    Object.keys(s.values).forEach(function (k) { vals[k] = valueToInput(s.values[k]); });
    draft = { kode: s.kode, matrix: s.matrix, loc: s.loc, depth: s.depth != null ? String(s.depth) : "", date: s.date, batch: s.batch, unit: s.unit, notes: s.notes, values: vals };
  } else {
    var matrix = "tanah";
    if (presetLoc) {
      if (presetLoc.indexOf("area:") === 0) matrix = "air";
      else { var p = getPoint(presetLoc); if (p) matrix = pointType(p) === "sedimen" ? "sedimen" : pointType(p) === "air" ? "air" : "tanah"; }
    }
    var batches = labBatches();
    draft = { kode: "", matrix: matrix, loc: presetLoc || "", depth: "", date: new Date().toISOString().slice(0, 10), batch: batches[batches.length - 1] || "Batch 1", unit: MATRIX_META[matrix].unit, notes: "", values: {} };
  }
  state.labUi.form = { mode: s ? "edit" : "add", origKode: s ? s.kode : null, draft: draft, error: "" };
  renderLabModal();
  setTimeout(function () {
    var first = document.querySelector('#modalRoot [data-field="lab-f-kode"]');
    if (first) first.focus();
  }, 30);
}

function valueToInput(val) {
  if (!val) return "";
  var s = String(val.v).replace(".", ",");
  return (val.op === "<" ? "<" : val.op === ">" ? ">" : "") + s;
}

function formParams(matrix, draft) {
  var base = matrix === "air" ? WATER_PARAMS.slice() : SOIL_PARAMS.slice();
  Object.keys(draft.values).forEach(function (k) { if (draft.values[k] && base.indexOf(k) === -1 && LAB_PARAMS[k]) base.push(k); });
  return base;
}

function locOptionsHtml(selected, matrix) {
  var groups = { soil: [], sedimen: [], air: [] };
  allPoints().forEach(function (p) { groups[pointType(p)].push(p); });
  Object.keys(groups).forEach(function (k) { groups[k].sort(function (a, b) { return naturalCompare(a.id, b.id); }); });
  var order = matrix === "air" ? ["air", "sedimen", "soil"] : matrix === "sedimen" ? ["sedimen", "soil", "air"] : ["soil", "sedimen", "air"];
  var names = { soil: "Titik tanah", sedimen: "Titik sedimen", air: "Titik air" };
  var html = '<option value="">Pilih lokasi</option>';
  var areaGroup = '<optgroup label="Area grid (sampel per area, misalnya air permukaan)">' + GRIDS.slice().sort(function (a, b) {
    var sa = /^Sedimen/.test(a.label) ? 0 : 1, sb = /^Sedimen/.test(b.label) ? 0 : 1;
    return sa - sb || naturalCompare(a.label, b.label);
  }).map(function (g) {
    var v = "area:" + g.id;
    return '<option value="' + esc(v) + '"' + (selected === v ? " selected" : "") + '>Area ' + esc(g.label) + '</option>';
  }).join("") + '</optgroup>';
  if (matrix === "air") html += areaGroup;
  order.forEach(function (k) {
    if (!groups[k].length) return;
    html += '<optgroup label="' + names[k] + '">' + groups[k].map(function (p) {
      return '<option value="' + esc(p.id) + '"' + (selected === p.id ? " selected" : "") + '>' + esc(p.id) + '</option>';
    }).join("") + '</optgroup>';
  });
  if (matrix !== "air") html += areaGroup;
  var known = selected && (selected.indexOf("area:") === 0 ? GRID_BY_ID[selected.slice(5)] : getPoint(selected));
  if (selected && !known) html += '<option value="' + esc(selected) + '" selected>' + esc(selected) + ' (tidak ditemukan)</option>';
  return html;
}

function paramPreviewHtml(k, raw, matrix) {
  if (raw == null || !String(raw).trim()) return '<span class="muted">kosong</span>';
  var pv = parseLabValue(raw);
  if (!pv) return '<span class="prev-bad">Format tidak dikenali</span>';
  var txt = '= ' + esc(fmtVal(pv));
  if (matrix === "air") {
    var ws = waterParamStatus(k, pv);
    return txt + (ws && ws !== "na" ? ' ' + waterBadge(ws) : '');
  }
  var pl = paramLevel(k, pv);
  if (!pl) return txt;
  if (pl.inconclusive) return txt + ' <span class="muted">batas deteksi di atas ambang</span>';
  return txt + ' ' + classBadge(pl.level, paramStatusLabel(k, pl.level));
}

function renderLabModal() {
  var root = document.getElementById("modalRoot");
  if (!root) return;
  var ui = state.labUi;
  if (ui.importPreview) { root.innerHTML = importPreviewHtml(ui.importPreview); return; }
  if (!ui.form) { root.innerHTML = ""; return; }
  var f = ui.form, d = f.draft;
  var params = formParams(d.matrix, d);
  var batches = labBatches();
  root.innerHTML = '<div class="modal-backdrop" data-action="lab-modal-backdrop">' +
    '<div class="modal" role="dialog" aria-modal="true" aria-labelledby="labFormTitle">' +
    '<div class="modal-head"><h3 id="labFormTitle">' + (f.mode === "edit" ? "Edit Hasil Uji " + esc(f.origKode) : "Tambah Hasil Uji") + '</h3>' +
    '<button type="button" class="iconbtn" data-action="lab-close-modal" aria-label="Tutup">' + ICONS.close + '</button></div>' +
    '<div class="modal-body">' +
    '<div class="formgrid">' +
    '<div class="field"><label for="lf-kode">Kode sampel *</label><input id="lf-kode" type="text" placeholder="Contoh: UK.156" value="' + esc(d.kode) + '" data-field="lab-f-kode"/></div>' +
    '<div class="field"><label for="lf-matrix">Matriks *</label><select id="lf-matrix" data-field="lab-f-matrix">' +
    Object.keys(MATRIX_META).map(function (m) { return '<option value="' + m + '"' + (d.matrix === m ? " selected" : "") + '>' + MATRIX_META[m].label + '</option>'; }).join("") + '</select></div>' +
    '<div class="field"><label for="lf-loc">Lokasi *</label><select id="lf-loc" data-field="lab-f-loc">' + locOptionsHtml(d.loc, d.matrix) + '</select></div>' +
    '<div class="field"><label for="lf-depth">Kedalaman (cm)' + (d.matrix === "tanah" ? " *" : "") + '</label><input id="lf-depth" type="number" min="0" step="any" placeholder="' + (d.matrix === "tanah" ? "Contoh: 30" : "Kosongkan bila tidak ada") + '" value="' + esc(d.depth) + '" data-field="lab-f-depth"/></div>' +
    '<div class="field"><label for="lf-date">Tanggal sampling</label><input id="lf-date" type="date" value="' + esc(d.date) + '" data-field="lab-f-date"/></div>' +
    '<div class="field"><label for="lf-batch">Batch</label><input id="lf-batch" type="text" list="lf-batch-list" value="' + esc(d.batch) + '" data-field="lab-f-batch"/>' +
    '<datalist id="lf-batch-list">' + batches.map(function (b) { return '<option value="' + esc(b) + '"></option>'; }).join("") + '</datalist></div>' +
    '<div class="field"><label for="lf-unit">Satuan</label><input id="lf-unit" type="text" value="' + esc(d.unit) + '" data-field="lab-f-unit"/></div>' +
    '</div>' +
    '<p class="formsection">Hasil parameter</p>' +
    '<p class="formhint">Tulis angka hasil lab. Untuk hasil di bawah batas deteksi gunakan tanda &lt;, misalnya <b>&lt;0,5</b>. Desimal boleh pakai koma, tanpa pemisah ribuan (contoh 7210 atau 0,51). Kosongkan parameter yang tidak diuji.</p>' +
    '<div class="paramrows">' + params.map(function (k) {
      var P = LAB_PARAMS[k];
      var thr = d.matrix === "air" ? (P.bm != null ? "Baku mutu " + fmtNum(P.bm) : "Tanpa baku mutu") : (P.tk ? "TK-C " + (P.tk.C != null ? fmtNum(P.tk.C) : "–") + " · TK-B " + fmtNum(P.tk.B) + " · TK-A " + fmtNum(P.tk.A) : "Tanpa ambang TK");
      return '<div class="paramrow"><label for="lv-' + k + '">' + esc(P.label) + '<span class="paramthr">' + esc(thr) + '</span></label>' +
        '<input id="lv-' + k + '" type="text" inputmode="decimal" autocomplete="off" value="' + esc(d.values[k] || "") + '" data-field="lab-v-' + k + '" placeholder="–"/>' +
        '<span class="paramprev" id="lprev-' + k + '">' + paramPreviewHtml(k, d.values[k], d.matrix) + '</span></div>';
    }).join("") + '</div>' +
    '<div class="field"><label for="lf-notes">Catatan</label><textarea id="lf-notes" data-field="lab-f-notes" placeholder="Opsional, misalnya nomor LHP atau keterangan lapangan">' + esc(d.notes) + '</textarea></div>' +
    '<p class="formerror" id="labFormError"' + (f.error ? '' : ' style="display:none"') + '>' + esc(f.error) + '</p>' +
    '</div>' +
    '<div class="modal-foot">' +
    (f.mode === "edit" ? '<button type="button" class="dangerbtn" data-action="lab-delete">' + ICONS.trash + ' Hapus</button>' : '<span></span>') +
    '<div class="modal-foot-right"><button type="button" class="btn" data-action="lab-close-modal">Batal</button>' +
    '<button type="button" class="btn btn-primary" data-action="lab-save">Simpan</button></div></div>' +
    '</div></div>';
}

function labFormError(msg) {
  state.labUi.form.error = msg;
  var el = document.getElementById("labFormError");
  if (el) { el.textContent = msg; el.style.display = msg ? "block" : "none"; }
}

function labSaveForm() {
  var f = state.labUi.form;
  if (!f) return;
  var d = f.draft;
  var kode = String(d.kode || "").trim();
  if (!kode) { labFormError("Kode sampel wajib diisi."); return; }
  var idx = labFindIndex(kode);
  if (idx >= 0 && !state.lab.samples[idx].deleted && labKey(kode) !== labKey(f.origKode)) { labFormError("Kode sampel " + kode + " sudah dipakai sampel lain."); return; }
  if (!MATRIX_META[d.matrix]) { labFormError("Pilih matriks sampel."); return; }
  if (!d.loc) { labFormError("Pilih lokasi sampel."); return; }
  var depth = null;
  if (String(d.depth).trim() !== "") {
    depth = Number(String(d.depth).replace(",", "."));
    if (!isFinite(depth) || depth < 0) { labFormError("Kedalaman harus berupa angka 0 atau lebih."); return; }
  } else if (d.matrix === "tanah") { labFormError("Kedalaman wajib diisi untuk sampel tanah, misalnya 30 atau 60."); return; }
  var values = {}, bad = [];
  formParams(d.matrix, d).forEach(function (k) {
    var raw = d.values[k];
    if (raw == null || !String(raw).trim()) return;
    var pv = parseLabValue(raw);
    if (!pv) bad.push(LAB_PARAMS[k].label); else values[k] = pv;
  });
  if (bad.length) { labFormError("Nilai " + bad.join(", ") + " tidak dikenali. Gunakan angka, misalnya 148, 0,51, atau <0,5."); return; }
  if (!Object.keys(values).length) { labFormError("Isi minimal satu hasil parameter."); return; }
  var prev = f.origKode ? state.lab.samples[labFindIndex(f.origKode)] : null;
  var now = Date.now();
  var sample = normalizeLabSample({
    kode: kode, no: prev ? prev.no : null, matrix: d.matrix, loc: d.loc, depth: depth, date: d.date || "",
    batch: d.batch, unit: d.unit, values: values, notes: d.notes || "", source: prev ? prev.source : "Input manual", updatedAt: now
  });
  if (f.origKode && labKey(f.origKode) !== labKey(kode)) {
    state.lab.samples[labFindIndex(f.origKode)] = { kode: f.origKode, deleted: true, updatedAt: now };
  }
  labUpsert(sample);
  persistLab();
  state.labUi.form = null;
  showToast("success", "Hasil uji " + kode + " tersimpan.");
  render();
}

function labDeleteFromForm() {
  var f = state.labUi.form;
  if (!f || !f.origKode) return;
  if (!window.confirm("Hapus hasil uji " + f.origKode + "? Tindakan ini tidak dapat dibatalkan.")) return;
  var i = labFindIndex(f.origKode);
  if (i >= 0) state.lab.samples[i] = { kode: state.lab.samples[i].kode, deleted: true, updatedAt: Date.now() };
  persistLab();
  state.labUi.form = null;
  showToast("success", "Hasil uji " + f.origKode + " dihapus.");
  render();
}

/* ---------------------------------------------------------------------
   Excel export
--------------------------------------------------------------------- */
function locToSheetText(s) {
  var info = locInfo(s.loc);
  if (s.loc.indexOf("area:") === 0) return "Grid " + (info ? info.label : s.loc.slice(5));
  var m = /^GRID(\d+\.\d+)$/i.exec(s.loc);
  if (m) return "G" + m[1] + (s.depth != null ? " " + s.depth + " CM" : "");
  m = /^SED(\d+\.\d+)$/i.exec(s.loc);
  if (m) return "Grid Sedimen " + m[1];
  return s.loc + (s.depth != null ? " " + s.depth + " CM" : "");
}
function locToIdCell(loc) {
  if (loc.indexOf("area:") === 0) { var g = GRID_BY_ID[loc.slice(5)]; return "AREA:" + (g ? g.label : loc.slice(5)); }
  return loc;
}

function labExportExcel() {
  var S = XlsxIO.STYLE;
  var list = labAllLive().slice().sort(function (a, b) {
    if (a.no != null && b.no != null && a.no !== b.no) return a.no - b.no;
    if ((a.no == null) !== (b.no == null)) return a.no == null ? 1 : -1;
    return naturalCompare(a.kode, b.kode);
  });
  if (!list.length) { showToast("warn", "Belum ada hasil lab untuk diekspor."); return; }
  var header = ["No.", "Kode Sampel", "Matriks", "ID Titik", "Titik Pengambilan Sampel", "Kedalaman (cm)", "Tanggal Sampling", "Batch", "Satuan (asli)"]
    .concat(XL_PARAM_ORDER.map(function (k) { return LAB_PARAMS[k].head; }))
    .concat(["Klasifikasi", "Pengelolaan (PP 22/2021)", "Status Air", "Catatan"]);
  var rows = [header.map(function (h) { return { v: h, s: S.header }; })];
  list.forEach(function (s, i) {
    var isWater = s.matrix === "air";
    var cls = isWater ? null : sampleClass(s);
    var row = [s.no != null ? s.no : "", s.kode, MATRIX_META[s.matrix].label, locToIdCell(s.loc), locToSheetText(s), s.depth != null ? s.depth : "", s.date || "", s.batch, s.unit];
    XL_PARAM_ORDER.forEach(function (k) {
      var v = s.values[k];
      if (!v) { row.push(""); return; }
      var cellV = v.op === "=" ? v.v : valToCellString(v);
      var lvl = isWater ? (waterParamStatus(k, v) === "exceed" ? 2 : 0) : (paramLevel(k, v) ? paramLevel(k, v).level : 0);
      row.push(lvl >= 2 ? { v: cellV, s: S.danger } : lvl === 1 ? { v: cellV, s: S.warn } : cellV);
    });
    row.push(cls ? LAB_CLASS[cls.level].xl : "");
    row.push(cls ? LAB_CLASS[cls.level].mgmt : "");
    row.push(isWater ? WATER_STATUS[waterStatus(s)].label : "");
    row.push(s.notes || "");
    rows.push(row);
  });

  var tkRows = [[{ v: "Ambang tingkat kontaminasi tanah/sedimen (PP 22/2021), mg/kg", s: S.title }], [],
    ["Parameter", "TK-A", "TK-B", "TK-C"].map(function (h) { return { v: h, s: S.header }; })];
  SOIL_PARAMS.forEach(function (k) { var t = LAB_PARAMS[k].tk; tkRows.push([LAB_PARAMS[k].head, t.A, t.B, t.C != null ? t.C : "-"]); });
  tkRows.push([]);
  tkRows.push([{ v: "Baku mutu air laut untuk biota (PP 22/2021 Lampiran VIII), mg/L", s: S.title }]);
  tkRows.push([]);
  tkRows.push(["Parameter", "Baku mutu"].map(function (h) { return { v: h, s: S.header }; }));
  ["tph", "pah", "oil_grease"].forEach(function (k) { tkRows.push([LAB_PARAMS[k].head, LAB_PARAMS[k].bm]); });
  tkRows.push([]);
  tkRows.push([{ v: "Klasifikasi: < TK-C = Tanah Pelapis Dasar; TK-C < x < TK-B = Non B3; TK-B < x < TK-A = LB3 Kategori 2; > TK-A = LB3 Kategori 1.", s: S.note }]);

  var guide = [
    [{ v: "Petunjuk pengisian untuk impor kembali", s: S.title }], [],
    ["1. Isi atau ubah data pada sheet \"Hasil per Sampel\". Satu baris = satu sampel."],
    ["2. Kode Sampel wajib dan unik. Baris dengan kode yang sudah ada akan memperbarui data lama; kode baru akan ditambahkan."],
    ["3. ID Titik memakai kode titik di aplikasi (contoh GRID6.3, SED1.1) atau AREA:Sedimen 1 untuk sampel per area. Bila kosong, kolom Titik Pengambilan Sampel dibaca (contoh G6.3 30 CM, Grid Sedimen 1.1)."],
    ["4. Matriks: Tanah, Sedimen, atau Air Permukaan. Kedalaman diisi angka cm untuk tanah."],
    ["5. Hasil di bawah batas deteksi ditulis dengan tanda <, misalnya <0,5. Kosongkan parameter yang tidak diuji."],
    ["6. Kolom Klasifikasi, Pengelolaan, dan Status Air dihitung ulang otomatis oleh aplikasi saat impor."],
    [],
    [{ v: "Diekspor " + formatDateID(new Date().toISOString().slice(0, 10)) + " dari Peta Sampling Oil Spill. Titik bocor: " + state.labCfg.eventText + " (" + state.labCfg.leakLat.toFixed(6) + ", " + state.labCfg.leakLon.toFixed(6) + ").", s: S.note }]
  ];

  var blob = XlsxIO.buildWorkbook([
    { name: "Hasil per Sampel", rows: rows, freezeRow: 1, widths: [6, 12, 14, 14, 22, 13, 15, 10, 11, 9, 9, 15, 11, 13, 10, 15, 10, 10, 17, 22, 22, 30] },
    { name: "Baku Mutu", rows: tkRows, widths: [24, 12, 12, 12] },
    { name: "Petunjuk", rows: guide, widths: [130] }
  ]);
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url;
  a.download = "hasil-lab-oilspill-" + new Date().toISOString().slice(0, 10) + ".xlsx";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
  showToast("success", "Hasil lab diekspor ke Excel (" + list.length + " sampel).");
}

/* ---------------------------------------------------------------------
   Excel import (preview first, then apply)
--------------------------------------------------------------------- */
function normHeader(h) { return String(h == null ? "" : h).toLowerCase().replace(/[^a-z0-9]/g, ""); }
var HEADER_ALIASES = {
  no: ["no", "nomor"],
  kode: ["kodesampel", "kode"],
  matrix: ["matriks", "matrix", "jenissampel", "jenis"],
  pointId: ["idtitik"],
  locText: ["titikpengambilansampel", "lokasi", "titik", "lokasisampel"],
  depth: ["kedalamancm", "kedalaman"],
  date: ["tanggalsampling", "tanggal"],
  batch: ["batch"],
  unit: ["satuanasli", "satuan"],
  notes: ["catatan", "keterangan"],
  tph: ["tph"],
  pah: ["pah"],
  oil_grease: ["minyakdanlemak", "minyaklemak", "oilandgrease"],
  tph_c6c9: ["tphc6c9"],
  tph_c10c36: ["tphc10c36"],
  benzene: ["benzene", "benzena"],
  ethylbenzene: ["ethylenebenzen", "ethylbenzene", "etilbenzena", "ethylbenzena", "etilbenzen"],
  toluene: ["toulene", "toluene", "toluena"],
  xylene: ["xylene", "xilena", "xylena"]
};

function findHeader(rows) {
  for (var r = 0; r < Math.min(rows.length, 25); r++) {
    var row = rows[r] || [];
    for (var c = 0; c < row.length; c++) if (normHeader(row[c]) === "kodesampel") return r;
  }
  return -1;
}
function mapColumns(headerRow) {
  var map = {};
  Object.keys(HEADER_ALIASES).forEach(function (field) {
    var aliases = HEADER_ALIASES[field];
    for (var a = 0; a < aliases.length && map[field] == null; a++) {
      for (var c = 0; c < headerRow.length; c++) {
        if (normHeader(headerRow[c]) === aliases[a]) { map[field] = c; break; }
      }
    }
  });
  return map;
}

function labResolveLoc(idCell, locText) {
  var pointIndex = {};
  allPoints().forEach(function (p) { pointIndex[p.id.toUpperCase().replace(/\s+/g, "")] = p.id; });
  function point(id) { return pointIndex[String(id).toUpperCase().replace(/\s+/g, "")] || null; }
  function area(label) {
    var g = gridByLabel(label);
    return g ? "area:" + g.id : null;
  }
  if (idCell != null && String(idCell).trim()) {
    var s = String(idCell).trim();
    var am = /^AREA\s*:\s*(.+)$/i.exec(s);
    if (am) { var a1 = area(am[1].replace(/^grid\s+/i, "")) || area(am[1]); if (a1) return a1; }
    var p1 = point(s);
    if (p1) return p1;
  }
  if (locText != null && String(locText).trim()) {
    var t = String(locText).trim().replace(/\b\d+(?:[.,]\d+)?\s*cm\b/ig, "").trim();
    var p2 = point(t);
    if (p2) return p2;
    var m = /SED(?:IMEN)?\s*(\d+)\s*[.,]\s*(\d+)/i.exec(t);
    if (m) { var p3 = point("SED" + m[1] + "." + m[2]); if (p3) return p3; }
    m = /^G(?:RID)?\s*(\d+)\s*[.,]\s*(\d+)/i.exec(t);
    if (m) { var p4 = point("GRID" + m[1] + "." + m[2]); if (p4) return p4; }
    m = /SED(?:IMEN)?\s*(\d+)\s*$/i.exec(t);
    if (m) { var a2 = area("Sedimen " + m[1]); if (a2) return a2; }
    m = /^AIR\s*(\d+)$/i.exec(t);
    if (m) { var a3 = area("Sedimen " + m[1]); if (a3) return a3; }
    m = /^G(?:RID)?\s*(\d+)\s*$/i.exec(t);
    if (m) { var a4 = area("Grid " + m[1]); if (a4) return a4; }
  }
  return null;
}

function normMatrix(v, kode, loc) {
  var s = String(v == null ? "" : v).toLowerCase();
  if (/sedimen|sediment/.test(s)) return "sedimen";
  if (/air|water/.test(s)) return "air";
  if (/tanah|soil/.test(s)) return "tanah";
  if (s) return null;
  if (/^AP\./i.test(kode || "")) return "air";
  if (loc && /^SED/i.test(loc)) return "sedimen";
  if (loc && loc.indexOf("area:") === 0) return "air";
  return loc ? "tanah" : null;
}

function normDate(v, date1904) {
  if (v == null || v === "") return "";
  if (typeof v === "number" && isFinite(v) && v > 1000) return XlsxIO.serialToISO(v, date1904);
  var s = String(v).trim();
  var m = /^(\d{4})-(\d{1,2})-(\d{1,2})/.exec(s);
  if (m) return m[1] + "-" + ("0" + m[2]).slice(-2) + "-" + ("0" + m[3]).slice(-2);
  m = /^(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{4})$/.exec(s);
  if (m) return m[3] + "-" + ("0" + m[2]).slice(-2) + "-" + ("0" + m[1]).slice(-2);
  m = /^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/.exec(s);
  if (m) {
    var mon = ["jan", "feb", "mar", "apr", "mei", "jun", "jul", "agu", "sep", "okt", "nov", "des"];
    var alt = { may: 4, aug: 7, oct: 9, dec: 11, agt: 7 };
    var key = m[2].slice(0, 3).toLowerCase();
    var mi = mon.indexOf(key);
    if (mi < 0 && alt[key] != null) mi = alt[key];
    if (mi >= 0) return m[3] + "-" + ("0" + (mi + 1)).slice(-2) + "-" + ("0" + m[1]).slice(-2);
  }
  return "";
}

function labParseWorkbook(wb, fileName) {
  var order = wb.sheets.slice().sort(function (a, b) {
    function rank(s) { return /hasil\s*per\s*sampel/i.test(s.name) ? 0 : /^hasil/i.test(s.name) ? 1 : /tabel/i.test(s.name) ? 2 : 3; }
    return rank(a) - rank(b);
  });
  var sheet = null, hdr = -1;
  for (var i = 0; i < order.length; i++) {
    hdr = findHeader(order[i].rows);
    if (hdr >= 0) { sheet = order[i]; break; }
  }
  if (!sheet) throw new Error('Tidak ditemukan tabel dengan kolom "Kode Sampel" di berkas ini.');
  var cols = mapColumns(sheet.rows[hdr]);
  var paramCols = XL_PARAM_ORDER.filter(function (k) { return cols[k] != null; });
  if (!paramCols.length) throw new Error("Tidak ditemukan kolom parameter hasil uji (misalnya TPH C10-C36, Benzene).");

  var parsed = [], skipped = [], warnings = [];
  var seenKeys = {};
  for (var r = hdr + 1; r < sheet.rows.length; r++) {
    var row = sheet.rows[r] || [];
    var cell = function (field) { return cols[field] != null ? row[cols[field]] : null; };
    var kodeRaw = cell("kode");
    var kode = kodeRaw == null ? "" : String(kodeRaw).trim();
    if (!kode) continue;
    var key = labKey(kode);
    if (seenKeys[key]) { skipped.push({ kode: kode, reason: "Kode sampel muncul lebih dari sekali di berkas; baris ke-" + (r + 1) + " dilewati." }); continue; }
    var locText = cell("locText");
    var loc = labResolveLoc(cell("pointId"), locText);
    var matrix = normMatrix(cell("matrix"), kode, loc);
    if (!loc) { skipped.push({ kode: kode, reason: 'Lokasi "' + (cell("pointId") || locText || "") + '" tidak dikenali.' }); continue; }
    if (!matrix) { skipped.push({ kode: kode, reason: 'Matriks "' + cell("matrix") + '" tidak dikenali.' }); continue; }
    var depth = null;
    var dc = cell("depth");
    if (dc != null && dc !== "") {
      var dn = typeof dc === "number" ? dc : parseLocaleNumber(String(dc).replace(/cm/i, "").trim());
      if (dn != null && isFinite(dn)) depth = dn;
    }
    if (depth == null && locText) {
      var dm = /(\d+(?:[.,]\d+)?)\s*cm/i.exec(String(locText));
      if (dm) depth = parseLocaleNumber(dm[1]);
    }
    if (matrix !== "tanah" && depth == null) depth = null;
    var values = {};
    paramCols.forEach(function (k) {
      var raw = row[cols[k]];
      if (isBlankLabCell(raw)) return;
      var pv = parseLabValue(raw);
      if (pv) values[k] = pv;
      else warnings.push(kode + ": nilai " + LAB_PARAMS[k].label + ' "' + raw + '" tidak dikenali dan dilewati.');
    });
    if (!Object.keys(values).length) { skipped.push({ kode: kode, reason: "Tidak ada nilai hasil uji yang terbaca." }); continue; }
    seenKeys[key] = true;
    var noVal = cell("no");
    parsed.push({
      kode: kode,
      no: typeof noVal === "number" ? noVal : (noVal != null && /^\d+$/.test(String(noVal).trim()) ? Number(noVal) : null),
      matrix: matrix, loc: loc, depth: depth,
      date: normDate(cell("date"), wb.date1904),
      batch: cell("batch") != null && String(cell("batch")).trim() ? String(cell("batch")).trim() : null,
      unit: cell("unit") != null && String(cell("unit")).trim() ? String(cell("unit")).trim() : null,
      notes: cell("notes") != null ? String(cell("notes")) : null,
      values: values
    });
  }

  var batches = labBatches();
  var nums = batches.map(function (b) { var m = /(\d+)\s*$/.exec(b); return m ? Number(m[1]) : 0; });
  var suggest = "Batch " + ((nums.length ? Math.max.apply(null, nums) : 0) + 1);
  var rows = parsed.map(function (p) {
    var i = labFindIndex(p.kode);
    var cur = i >= 0 && !state.lab.samples[i].deleted ? state.lab.samples[i] : null;
    return { p: p, cur: cur };
  });
  var needsBatch = rows.some(function (x) { return !x.p.batch && !x.cur; });
  return { fileName: fileName, sheetName: sheet.name, rows: rows, skipped: skipped, warnings: warnings, needsBatch: needsBatch, batchName: suggest };
}

function importCandidate(x, batchName) {
  var p = x.p, cur = x.cur;
  return normalizeLabSample({
    kode: cur ? cur.kode : p.kode,
    no: p.no != null ? p.no : (cur ? cur.no : null),
    matrix: p.matrix, loc: p.loc, depth: p.depth,
    date: p.date || (cur ? cur.date : ""),
    batch: p.batch || (cur ? cur.batch : batchName),
    unit: p.unit || (cur ? cur.unit : MATRIX_META[p.matrix].unit),
    notes: p.notes != null ? p.notes : (cur ? cur.notes : ""),
    source: cur ? cur.source : "Impor Excel",
    values: p.values,
    updatedAt: Date.now()
  });
}
function sameSample(a, b) {
  if (!a || !b) return false;
  var fields = ["matrix", "loc", "depth", "date", "batch", "unit", "notes"];
  for (var i = 0; i < fields.length; i++) if ((a[fields[i]] == null ? null : a[fields[i]]) !== (b[fields[i]] == null ? null : b[fields[i]])) return false;
  var ka = Object.keys(a.values).sort(), kb = Object.keys(b.values).sort();
  if (ka.join() !== kb.join()) return false;
  return ka.every(function (k) { return a.values[k].op === b.values[k].op && Math.abs(a.values[k].v - b.values[k].v) < 1e-12; });
}
function importClassify(prev) {
  var add = 0, upd = 0, same = 0;
  prev.rows.forEach(function (x) {
    if (!x.cur) { add++; return; }
    if (sameSample(importCandidate(x, prev.batchName), x.cur)) same++; else upd++;
  });
  return { add: add, upd: upd, same: same };
}

function importPreviewHtml(prev) {
  var c = importClassify(prev);
  var list = prev.rows.slice(0, 400).map(function (x) {
    var cand = importCandidate(x, prev.batchName);
    var status = !x.cur ? "Baru" : sameSample(cand, x.cur) ? "Sama" : "Diperbarui";
    var cls = cand.matrix === "air" ? waterBadge(waterStatus(cand)) : classBadge(sampleClass(cand).level);
    return '<tr><td class="tbl-code">' + esc(cand.kode) + '</td><td>' + esc(locLabel(cand.loc)) + (cand.depth != null ? " · " + esc(depthLabel(cand.depth)) : "") + '</td><td><span class="imp-st imp-' + status.toLowerCase() + '">' + status + '</span></td><td>' + cls + '</td></tr>';
  }).join("");
  return '<div class="modal-backdrop" data-action="lab-modal-backdrop"><div class="modal modal-wide" role="dialog" aria-modal="true" aria-labelledby="labImpTitle">' +
    '<div class="modal-head"><h3 id="labImpTitle">Pratinjau Impor Excel</h3><button type="button" class="iconbtn" data-action="lab-close-modal" aria-label="Tutup">' + ICONS.close + '</button></div>' +
    '<div class="modal-body">' +
    '<p class="formhint">Berkas <b>' + esc(prev.fileName) + '</b>, sheet <b>' + esc(prev.sheetName) + '</b>. Periksa ringkasan di bawah, lalu tekan Terapkan. Data yang kodenya sama akan diperbarui dengan isi berkas.</p>' +
    '<div class="impstats"><div><b>' + c.add + '</b><span>baru</span></div><div><b>' + c.upd + '</b><span>diperbarui</span></div><div><b>' + c.same + '</b><span>sama, tidak berubah</span></div><div><b>' + prev.skipped.length + '</b><span>dilewati</span></div></div>' +
    (prev.needsBatch ? '<div class="field"><label for="lf-impbatch">Nama batch untuk sampel baru (kolom Batch kosong)</label><input id="lf-impbatch" type="text" value="' + esc(prev.batchName) + '" data-field="lab-imp-batch"/></div>' : '') +
    (prev.skipped.length ? '<div class="impwarn"><b>Baris dilewati:</b><ul>' + prev.skipped.slice(0, 30).map(function (s) { return '<li>' + esc(s.kode) + ': ' + esc(s.reason) + '</li>'; }).join("") + '</ul></div>' : '') +
    (prev.warnings.length ? '<div class="impwarn"><b>Catatan:</b><ul>' + prev.warnings.slice(0, 30).map(function (w) { return '<li>' + esc(w) + '</li>'; }).join("") + '</ul></div>' : '') +
    '<div class="datatable-wrap labsmalltable" style="max-height:300px"><table class="datatable"><thead><tr><th>Kode</th><th>Lokasi</th><th>Status</th><th>Klasifikasi</th></tr></thead><tbody>' + list + '</tbody></table></div>' +
    '</div>' +
    '<div class="modal-foot"><span></span><div class="modal-foot-right"><button type="button" class="btn" data-action="lab-close-modal">Batal</button>' +
    '<button type="button" class="btn btn-primary" data-action="lab-import-apply"' + (prev.rows.length ? '' : ' disabled') + '>Terapkan</button></div></div>' +
    '</div></div>';
}

function labHandleImportInput(e) {
  var file = e.target.files && e.target.files[0];
  e.target.value = "";
  if (!file) return;
  if (!/\.xlsx$/i.test(file.name)) { showToast("warn", "Pilih berkas Excel berformat .xlsx. Berkas .xls lama perlu disimpan ulang sebagai .xlsx terlebih dahulu."); return; }
  var reader = new FileReader();
  reader.onload = function (ev) {
    try {
      var wb = XlsxIO.readWorkbook(ev.target.result);
      state.labUi.importPreview = labParseWorkbook(wb, file.name);
      state.labUi.form = null;
      renderLabModal();
    } catch (err) {
      showToast("warn", "Berkas Excel tidak dapat dibaca: " + (err && err.message ? err.message : "format tidak dikenali") + ".");
    }
  };
  reader.onerror = function () { showToast("warn", "Berkas tidak dapat dibuka."); };
  reader.readAsArrayBuffer(file);
}

function labApplyImport() {
  var prev = state.labUi.importPreview;
  if (!prev) return;
  var batchName = String(prev.batchName || "").trim() || "Batch 1";
  prev.batchName = batchName;
  var add = 0, upd = 0, same = 0;
  prev.rows.forEach(function (x) {
    var i = labFindIndex(x.p.kode);
    var cur = i >= 0 && !state.lab.samples[i].deleted ? state.lab.samples[i] : null;
    var cand = importCandidate({ p: x.p, cur: cur }, batchName);
    if (!cur) { labUpsert(cand); add++; }
    else if (sameSample(cand, cur)) same++;
    else { labUpsert(cand); upd++; }
  });
  state.labUi.importPreview = null;
  if (add || upd) persistLab();
  render();
  showToast("success", "Impor selesai: " + add + " baru, " + upd + " diperbarui, " + same + " tidak berubah" + (prev.skipped.length ? ", " + prev.skipped.length + " dilewati" : "") + ".");
}

/* ---------------------------------------------------------------------
   JSON export/import and shared sync
--------------------------------------------------------------------- */
function labExportForJson() { return state.lab.samples.map(function (s) { return Object.assign({}, s); }); }

function labMergeSamples(list) {
  if (!Array.isArray(list)) return 0;
  var changed = 0;
  list.forEach(function (raw) {
    var inc = normalizeLabSample(raw);
    if (!inc) return;
    var i = labFindIndex(inc.kode);
    var cur = i >= 0 ? state.lab.samples[i] : null;
    if (!cur || (inc.updatedAt || 0) > (cur.updatedAt || 0)) {
      labUpsert(inc);
      changed++;
    }
  });
  if (changed) persistLab();
  return changed;
}

/* ---------------------------------------------------------------------
   Events
--------------------------------------------------------------------- */
function labSelect(loc, scroll) {
  state.labUi.selected = loc;
  render();
  if (scroll) {
    var bp = document.getElementById("bottomPanel");
    if (bp) bp.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
function labFocus(loc) {
  var info = locInfo(loc);
  if (!info || !info.exists || !map) return;
  map.flyTo([info.lat, info.lon], Math.max(map.getZoom(), 19), { duration: 0.6 });
  var ms = document.querySelector(".mapsection");
  if (ms) ms.scrollIntoView({ behavior: "smooth", block: "start" });
}

function labOnAction(action, el, e) {
  var id = el.getAttribute("data-id");
  var cfg = state.labCfg;
  if (action === "lab-set-depth") { cfg.depth = el.getAttribute("data-depth"); persistLabCfg(); render(); }
  else if (action === "lab-toggle-surface") { cfg.showSurface = !cfg.showSurface; persistLabCfg(); render(); }
  else if (action === "lab-toggle-wind") { cfg.showWind = !cfg.showWind; persistLabCfg(); render(); }
  else if (action === "lab-toggle-labels") { cfg.showLabels = !cfg.showLabels; persistLabCfg(); render(); }
  else if (action === "lab-toggle-settings") { state.labUi.settingsOpen = !state.labUi.settingsOpen; renderLabDash(); renderLabCharts(); }
  else if (action === "lab-reset-cfg") {
    ["leakLat", "leakLon", "windTo", "cone", "eventText"].forEach(function (k) { cfg[k] = LAB_DEFAULT_CFG[k]; });
    persistLabCfg(); render();
  }
  else if (action === "lab-toggle-allrows") { state.labUi.showAllRows = !state.labUi.showAllRows; renderLabBottom(); renderLabCharts(); }
  else if (action === "lab-tbl-filter") { state.labUi.tblFilter = el.getAttribute("data-filter"); var card = document.getElementById("labTableCard"); if (card) card.innerHTML = labTableCardHtml(); }
  else if (action === "lab-open-detail") { map && map.closePopup(); labSelect(id, true); }
  else if (action === "lab-back") { state.labUi.selected = null; render(); }
  else if (action === "lab-focus") labFocus(id);
  else if (action === "lab-focus-grid") { var layer = gridLayers[id]; if (layer && map) { map.flyToBounds(layer.getBounds(), { padding: [60, 60], duration: 0.6 }); var ms = document.querySelector(".mapsection"); if (ms) ms.scrollIntoView({ behavior: "smooth", block: "start" }); } }
  else if (action === "lab-add") labOpenForm(null, null);
  else if (action === "lab-add-here") labOpenForm(null, id);
  else if (action === "lab-edit") labOpenForm(id, null);
  else if (action === "lab-save") labSaveForm();
  else if (action === "lab-delete") labDeleteFromForm();
  else if (action === "lab-close-modal") { state.labUi.form = null; state.labUi.importPreview = null; renderLabModal(); }
  else if (action === "lab-modal-backdrop") { if (e.target === el) { state.labUi.form = null; state.labUi.importPreview = null; renderLabModal(); } }
  else if (action === "lab-export") labExportExcel();
  else if (action === "lab-import-apply") labApplyImport();
}

function labOnInput(field, t) {
  var ui = state.labUi;
  if (field === "lab-tbl-search") {
    ui.tblSearch = t.value;
    var body = document.getElementById("labTableBody");
    if (body) body.innerHTML = labTableHtml();
    return;
  }
  if (field === "lab-imp-batch" && ui.importPreview) { ui.importPreview.batchName = t.value; return; }
  if (!ui.form) return;
  var d = ui.form.draft;
  if (field.indexOf("lab-v-") === 0) {
    var k = field.slice(6);
    d.values[k] = t.value;
    var prev = document.getElementById("lprev-" + k);
    if (prev) prev.innerHTML = paramPreviewHtml(k, t.value, d.matrix);
    return;
  }
  var map2 = { "lab-f-kode": "kode", "lab-f-depth": "depth", "lab-f-date": "date", "lab-f-batch": "batch", "lab-f-unit": "unit", "lab-f-notes": "notes", "lab-f-loc": "loc" };
  if (map2[field]) d[map2[field]] = t.value;
}

function labOnChange(field, t) {
  var cfg = state.labCfg, ui = state.labUi;
  if (field === "lab-cfg-param") { cfg.param = t.value; persistLabCfg(); render(); return; }
  if (field === "lab-cfg-batch") { cfg.batch = t.value; persistLabCfg(); render(); return; }
  if (field === "lab-cfg-leakLat" || field === "lab-cfg-leakLon") {
    var n = parseFloat(t.value);
    var k = field === "lab-cfg-leakLat" ? "leakLat" : "leakLon";
    var ok = isFinite(n) && (k === "leakLat" ? Math.abs(n) <= 90 : Math.abs(n) <= 180);
    if (!ok) { showToast("warn", "Koordinat tidak valid."); t.value = cfg[k]; return; }
    cfg[k] = n; persistLabCfg(); render(); return;
  }
  if (field === "lab-cfg-windTo") { cfg.windTo = Number(t.value) || 0; persistLabCfg(); render(); return; }
  if (field === "lab-cfg-cone") { cfg.cone = Number(t.value) || 45; persistLabCfg(); render(); return; }
  if (field === "lab-cfg-eventText") { cfg.eventText = t.value.trim() || LAB_DEFAULT_CFG.eventText; persistLabCfg(); render(); return; }
  if (field === "lab-tbl-sort") { ui.tblSort = t.value; var body = document.getElementById("labTableBody"); if (body) body.innerHTML = labTableHtml(); return; }
  if (!ui.form) return;
  var d = ui.form.draft;
  if (field === "lab-f-matrix") {
    var prevDefault = MATRIX_META[d.matrix] ? MATRIX_META[d.matrix].unit : "";
    d.matrix = t.value;
    if (!d.unit || d.unit === prevDefault) d.unit = MATRIX_META[d.matrix].unit;
    renderLabModal();
    var sel = document.getElementById("lf-matrix");
    if (sel) sel.focus();
    return;
  }
  if (field === "lab-f-loc") { d.loc = t.value; return; }
}

function labOnKeydown(e) {
  if (e.key === "Escape" && (state.labUi.form || state.labUi.importPreview)) {
    state.labUi.form = null; state.labUi.importPreview = null; renderLabModal();
  }
}

var labResizeTimer = null;
function labOnResize() {
  if (labResizeTimer) clearTimeout(labResizeTimer);
  labResizeTimer = setTimeout(function () { if (state.view === "lab") renderLabCharts(); }, 150);
}

// If a browser serves a stale cached app.js/styles.css next to a newer index.html,
// the view tabs never get wired up; offer a one-tap reload instead of a dead page.
window.addEventListener("load", function () {
  setTimeout(function () {
    if (window.__labBooted) return;
    var bar = document.createElement("div");
    bar.setAttribute("style", "position:fixed;left:12px;right:12px;bottom:12px;z-index:2000;background:#F2A93C;color:#2A1A00;font:600 13px system-ui,sans-serif;padding:12px 14px;border-radius:10px;display:flex;gap:12px;align-items:center;justify-content:space-between;box-shadow:0 10px 24px rgba(0,0,0,.35)");
    bar.innerHTML = '<span>Aplikasi baru saja diperbarui. Muat ulang halaman untuk memakai versi terbaru.</span>';
    var btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = "Muat ulang";
    btn.setAttribute("style", "border:none;background:#2A1A00;color:#fff;font:700 12px system-ui,sans-serif;padding:8px 12px;border-radius:8px;cursor:pointer");
    btn.onclick = function () { location.reload(); };
    bar.appendChild(btn);
    document.body.appendChild(bar);
  }, 1500);
});

function labBoot() {
  window.__labBooted = true;
  var tl = document.getElementById("viewTabLabIcon"), tp = document.getElementById("viewTabProgressIcon");
  if (tl) tl.innerHTML = LAB_ICONS.flask;
  if (tp) tp.innerHTML = LAB_ICONS.progress;
  applyViewChrome();
  applyMapMode();
  if (map) {
    map.on("zoomend", labZoomClass);
    if (state.view === "lab") labFitView();
    labZoomClass();
  }
  document.addEventListener("keydown", labOnKeydown);
  window.addEventListener("resize", labOnResize);
  document.addEventListener("mouseover", function (e) {
    var t = e.target && e.target.closest ? e.target.closest("[data-tip]") : null;
    if (t) vizTipShow(t, e);
  });
  document.addEventListener("mousemove", vizTipMove);
  document.addEventListener("mouseout", function (e) {
    var t = e.target && e.target.closest ? e.target.closest("[data-tip]") : null;
    if (t && !(e.relatedTarget && t.contains(e.relatedTarget))) vizTipHide();
  });
  window.addEventListener("scroll", vizTipHide, true);
  window.addEventListener("hashchange", function () {
    var h = (location.hash || "").toLowerCase();
    if (h === "#lab" && state.view !== "lab") setView("lab");
    else if (h === "#progres" && state.view !== "progress") setView("progress");
  });
}
