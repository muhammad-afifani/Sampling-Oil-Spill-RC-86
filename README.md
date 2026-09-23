# Peta Sampling Oil Spill

Repositori ini menyimpan data sumber dan aplikasi peta untuk pemantauan sampling air dan sedimen pada program pemulihan lahan terdampak tumpahan minyak (oil spill). RC 86 adalah nama platform oil spill yang lebih luas; repositori ini hanya memuat alat pemetaan sampling untuk kebutuhan tersebut.

## Isi repositori

```
index.html                 Halaman utama aplikasi
styles.css                 Tampilan aplikasi, termasuk mode gelap dan terang
app.js                      Data titik dan grid, serta seluruh logika aplikasi
vendor/leaflet/             Pustaka peta Leaflet, disalin secara lokal

data/
  GRID.kml                 Data grid area sampling (poligon), 17 area
  HYB_Sample_Point.kml     Data 73 titik sampling beserta kode dan koordinatnya

app/
  project/Main.dc.html     Versi sebelumnya, dibuat sebagai Claude Artifact
  project/canvas.json      Berkas konfigurasi kanvas versi tersebut
```

## Tentang data

`data/GRID.kml` berisi 17 poligon area grid sampling (termasuk 4 area sedimen), diekspor dari perangkat lunak pemetaan (AutoCAD/Google Earth). `data/HYB_Sample_Point.kml` berisi 73 titik sampling dengan kode seperti `GRID5.2` atau `SED1.1`, masing-masing dengan koordinat lintang dan bujur.

Kedua berkas ini adalah data mentah asli yang menjadi dasar pembuatan peta dan aplikasi pelaporan.

## Tentang aplikasi

Aplikasi ini disajikan langsung dari `index.html` di akar repositori lewat GitHub Pages, tanpa bergantung pada layanan lain. Fiturnya meliputi:

- Peta satelit sungguhan (Leaflet dengan citra Esri World Imagery), menampilkan seluruh area grid dan titik sampling berikut nama grid dan kode setiap titik, dengan pewarnaan otomatis sesuai status pengerjaan
- Navigasi peta murni lewat mouse atau layar sentuh, gulir untuk memperbesar dan memperkecil, seret atau cubit untuk menggeser, tanpa tombol arah tambahan
- Formulir laporan per titik: tanggal sampling, catatan kendala, dan lampiran foto kegiatan, terpisah untuk tahap sebelum dan sesudah pemulihan lahan (recovery)
- Dashboard ringkasan progres, termasuk perbandingan tahap sebelum dan sesudah recovery serta daftar area yang paling memerlukan perhatian
- Ringkasan area grid ditampilkan di bawah peta agar peta bisa ditampilkan sebesar mungkin
- Mode gelap dan terang yang dapat diganti dari tombol di pojok kanan atas
- Ekspor dan impor data dalam format JSON untuk pencadangan dan berbagi data antar perangkat

Folder `app/project/` menyimpan versi sebelumnya dari aplikasi ini, yang dibuat sebagai Claude Artifact bertipe Design. Versi tersebut masih dapat dibuka lewat Claude, tetapi tidak dapat menampilkan citra satelit karena keterbatasan platform tersebut, sehingga petanya masih berupa gambar skematik. Berkas ini disimpan sebagai riwayat, bukan versi yang disarankan untuk dipakai.

## Membuka lewat GitHub Pages

Situs ini disajikan dari cabang `claude/stoic-cannon-ew2fbf`. Bila halaman GitHub Pages belum juga muncul, periksa pengaturannya di repositori GitHub, pada menu Settings kemudian Pages, pastikan bagian Source diatur ke Deploy from branch, dengan cabang `claude/stoic-cannon-ew2fbf` dan folder root (/) dipilih, lalu simpan. Setelah tersimpan, GitHub biasanya butuh waktu singkat sebelum halamannya bisa diakses.

Berkas ini hanya bisa dijalankan lewat server seperti GitHub Pages, bukan dengan membuka `index.html` langsung dari komputer, karena browser memblokir sebagian pemuatan berkas saat dibuka dengan cara tersebut.
