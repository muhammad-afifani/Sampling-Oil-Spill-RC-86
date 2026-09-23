# Sampling Oil Spill RC 86

Repositori ini menyimpan data sumber dan berkas aplikasi untuk pemantauan sampling air dan sedimen pada program pemulihan lahan terdampak tumpahan minyak (oil spill), proyek RC 86.

## Isi repositori

```
index.html                 Halaman aplikasi yang disajikan oleh GitHub Pages
support.js                 Mesin render aplikasi
vendor/react.js            Pustaka React yang dipakai aplikasi
vendor/react-dom.js        Pustaka React DOM yang dipakai aplikasi

data/
  GRID.kml                 Data grid area sampling (poligon), 17 area
  HYB_Sample_Point.kml     Data 73 titik sampling beserta kode dan koordinatnya

app/
  project/Main.dc.html     Berkas sumber aplikasi peta dan dashboard sampling
  project/canvas.json      Berkas konfigurasi kanvas aplikasi
```

## Tentang data

`data/GRID.kml` berisi 17 poligon area grid sampling (termasuk 4 area sedimen), diekspor dari perangkat lunak pemetaan (AutoCAD/Google Earth). `data/HYB_Sample_Point.kml` berisi 73 titik sampling dengan kode seperti `GRID5.2` atau `SED1.1`, masing-masing dengan koordinat lintang dan bujur.

Kedua berkas ini adalah data mentah asli yang menjadi dasar pembuatan peta dan aplikasi pelaporan.

## Tentang aplikasi

Aplikasi peta dan dashboard sampling dibangun sebagai Claude Artifact bertipe Design, dan menyediakan:

- Peta interaktif seluruh area grid dan titik sampling, dengan pewarnaan otomatis sesuai status pengerjaan
- Formulir laporan per titik: tanggal sampling, catatan kendala, dan lampiran foto kegiatan, terpisah untuk tahap sebelum dan sesudah pemulihan lahan (recovery)
- Dashboard ringkasan progres, termasuk perbandingan tahap sebelum dan sesudah recovery serta daftar area yang paling memerlukan perhatian
- Ekspor dan impor data dalam format JSON untuk pencadangan dan berbagi data antar perangkat

Aplikasi yang aktif dan dapat digunakan dapat dibuka melalui tautan Claude Artifact yang telah dibagikan kepada tim. `index.html` beserta `support.js` dan `vendor/` di akar repositori ini adalah salinan mandiri dari aplikasi tersebut, disajikan lewat GitHub Pages sehingga dapat dibuka tanpa masuk ke Claude. Berkas `app/project/Main.dc.html` dan `app/project/canvas.json` adalah berkas sumber komponennya, disimpan sebagai riwayat perubahan.

## Membuka lewat GitHub Pages

Situs ini disajikan dari cabang `claude/stoic-cannon-ew2fbf`. Bila halaman GitHub Pages belum juga muncul, periksa pengaturannya di repositori GitHub, pada menu Settings kemudian Pages, pastikan bagian Source diatur ke Deploy from branch, dengan cabang `claude/stoic-cannon-ew2fbf` dan folder root (/) dipilih, lalu simpan. Setelah tersimpan, GitHub biasanya butuh waktu singkat sebelum halamannya bisa diakses.

Berkas ini hanya bisa dijalankan lewat server seperti GitHub Pages, bukan dengan membuka `index.html` langsung dari komputer, karena browser memblokir skrip yang dibutuhkan halaman ini saat dibuka dengan cara tersebut.
