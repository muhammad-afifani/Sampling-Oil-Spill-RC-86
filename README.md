# Sampling Oil Spill RC 86

Repositori ini menyimpan data sumber dan berkas aplikasi untuk pemantauan sampling air dan sedimen pada program pemulihan lahan terdampak tumpahan minyak (oil spill), proyek RC 86.

## Isi repositori

```
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

Berkas `app/project/Main.dc.html` dan `app/project/canvas.json` di sini adalah salinan sumber dari aplikasi tersebut, disimpan sebagai cadangan dan riwayat perubahan. Berkas ini bergantung pada landasan runtime milik platform Claude Artifacts (skrip pendukung dan mesin render kanvas) yang tidak disertakan di repositori ini, sehingga tidak dapat dijalankan langsung sebagai halaman web mandiri di luar platform tersebut.

Aplikasi yang aktif dan dapat digunakan dapat dibuka melalui tautan Claude Artifact yang telah dibagikan kepada tim.
