# Peta Sampling Oil Spill

Repositori ini menyimpan data sumber dan aplikasi peta untuk pemantauan sampling air dan sedimen pada program pemulihan lahan terdampak tumpahan minyak (oil spill). RC 86 adalah nama platform oil spill yang lebih luas; repositori ini hanya memuat alat pemetaan sampling untuk kebutuhan tersebut.

## Isi repositori

```
index.html                 Halaman utama aplikasi
styles.css                 Tampilan aplikasi, termasuk mode gelap dan terang
app.js                      Data titik dan grid, serta seluruh logika aplikasi
vendor/leaflet/             Pustaka peta Leaflet, disalin secara lokal
assets/basemap-drone.jpg    Citra udara drone sebagai latar peta

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

Ada tiga jenis sampling: tanah (kode `GRID...`), sedimen (kode `SED...`), dan air. Titik air belum ada di data KML awal, jadi ditambahkan manual lewat aplikasi (lihat "Opsi menambah titik sampling baru" di bawah).

## Tentang aplikasi

Aplikasi ini disajikan langsung dari `index.html` di akar repositori lewat GitHub Pages, tanpa bergantung pada layanan lain. Fiturnya meliputi:

- Peta dengan latar citra udara asli hasil pemotretan drone lapangan, menampilkan seluruh area grid dan titik sampling berikut nama grid dan kode setiap titik, dengan pewarnaan otomatis sesuai status pengerjaan. Grid yang baru sebagian selesai ditampilkan dengan isian warna yang mengikuti posisi asli tiap titik di dalam area tersebut (bagian dekat titik yang sudah disampling berwarna hijau, bagian dekat titik yang belum tetap berwarna kuning), bukan gradasi acak yang tidak berkaitan dengan lokasi sebenarnya
- Navigasi peta murni lewat mouse atau layar sentuh, gulir untuk memperbesar dan memperkecil, seret atau cubit untuk menggeser, tanpa tombol arah tambahan, dan tombol layar penuh di pojok kanan atas peta
- Tombol terpisah untuk menampilkan atau menyembunyikan isian warna area grid (bila dimatikan, area grid hanya tampak sebagai garis batas, dan baru terisi warna saat area itu diklik), warna garis batas berbeda per area grid, nama grid, kode titik, dan lokasi sampling aktual di peta
- Warna label nama grid dan label kode titik dibedakan supaya keduanya mudah dibedakan sekilas di peta. Garis batas tiap area grid juga diberi warna berbeda satu sama lain (dapat dimatikan) supaya batas antar area mudah dikenali, terpisah dari warna isian yang menunjukkan status pengerjaan
- Titik yang sudah disampling diberi lingkaran putih di sekeliling tandanya, supaya tetap terlihat jelas walau berada di atas area grid yang juga berwarna hijau
- Titik yang belum disampling berkedip dengan warna kuning, putih, dan merah terang bergantian di peta, seperti lampu tanda, supaya titik-titik yang masih tersisa mudah terlihat sekilas
- Bagian area grid yang catatan kendalanya sudah diisi (atau ditandai bermasalah) ditampilkan dengan arsiran garis miring tegas di lokasi titik tersebut, baik untuk titik yang memang belum bisa disampling karena kendala maupun titik yang sudah disampling tapi masih ada kendala yang perlu diketahui
- Info singkat saat kursor diarahkan ke sebuah titik, menampilkan status dan tanggal sampling tahap Before Recovery dan After Recovery, cuplikan catatan kendala, dan pratinjau foto dokumentasi terbaru (bila ada) tanpa perlu membuka detailnya, dengan tanda centang dan warna hijau pada status yang sudah selesai disampling
- Mengklik sebuah area grid menampilkan info singkat luas areanya dan persentase progres langsung di peta, selain membuka detail lengkapnya di bawah peta
- Formulir laporan per titik: tanggal sampling, personil yang ikut sampling, catatan kendala, dan lampiran foto kegiatan, terpisah untuk tahap Before Recovery dan After Recovery
- Foto dapat ditambahkan lewat tombol Tambah Foto atau dengan menyeret dan melepaskannya langsung ke area dokumentasi foto
- Foto lapangan yang membawa data lokasi GPS pada metadata EXIF-nya (misalnya dari aplikasi kamera GPS) otomatis dibaca saat diunggah, dan lokasinya dipakai sebagai lokasi sampling aktual titik tersebut apabila belum diisi. Data lokasi ini tersimpan bersama fotonya, sehingga tombol Deteksi dari Foto bisa dipakai kapan pun untuk memasukkannya ulang ke lokasi sampling aktual, termasuk setelah lokasi aktual dihapus
- Foto disimpan di penyimpanan berkas milik browser (IndexedDB), bukan di penyimpanan lokal biasa yang cepat penuh, sehingga menampung jauh lebih banyak foto per titik
- Lokasi sampling aktual per titik, untuk mencatat posisi sebenarnya saat sampling meleset dari titik rencana, diisi manual atau dengan menandai langsung di peta. Pergeserannya dalam meter dihitung otomatis, dan bila ditampilkan, peta menggambar garis dari titik rencana ke titik aktual
- Opsi menambah titik sampling baru secara manual, lengkap dengan kode, jenis (air, sedimen, atau tanah), area grid, dan koordinatnya, untuk titik yang belum tercatat di data KML awal. Titik tambahan ini dapat dihapus kembali dan ikut tersimpan pada ekspor dan impor JSON
- Detail tiap area grid menampilkan luas areanya dalam meter persegi dan hektar, dihitung dari poligon aslinya
- Dashboard ringkasan progres, termasuk perbandingan tahap Before dan After Recovery, progres per jenis sampling (air, sedimen, tanah), serta daftar area yang paling memerlukan perhatian
- Ringkasan area grid ditampilkan di bawah peta agar peta bisa ditampilkan sebesar mungkin
- Mode gelap dan terang yang dapat diganti dari tombol di pojok kanan atas
- Ekspor dan impor data dalam format JSON untuk pencadangan dan berbagi data antar perangkat, termasuk titik tambahan dan lokasi sampling aktual

Folder `app/project/` menyimpan versi sebelumnya dari aplikasi ini, yang dibuat sebagai Claude Artifact bertipe Design. Versi tersebut masih dapat dibuka lewat Claude, tetapi tidak dapat menampilkan citra udara karena keterbatasan platform tersebut, sehingga petanya masih berupa gambar skematik. Berkas ini disimpan sebagai riwayat, bukan versi yang disarankan untuk dipakai.

## Tentang citra latar peta

`assets/basemap-drone.jpg` adalah citra udara drone yang diunggah pengelola proyek. Posisinya di peta ditentukan dari data georeferensi yang sudah tertanam di dalam berkas aslinya (koordinat UTM zone 50S pada metadata EXIF/GeoTIFF), diubah ke koordinat lintang dan bujur biasa, bukan diperkirakan secara visual, sehingga sejajar tepat dengan titik dan grid sampling. Berkas yang disimpan di sini sudah diperkecil dari ukuran aslinya (sekitar 19336 x 16799 piksel, 98 MB) menjadi sekitar 4200 piksel pada sisi terpanjang supaya tidak memberatkan saat dimuat lewat GitHub Pages, dengan resolusi akhir sekitar 40 sentimeter per piksel, masih cukup tajam untuk memeriksa tiap titik sampling. Berkas asli beresolusi penuh tidak disimpan di repositori ini.

Jika suatu saat ada foto drone baru untuk menggantikan citra ini, sebaiknya gunakan berkas yang masih membawa metadata georeferensi yang sama (EXIF GeoTIFF, atau disertai berkas dunia seperti `.jgw`/`.tfw`, atau KML ground overlay), supaya posisinya bisa dipasang tepat tanpa harus menebak secara manual.

## Membuka lewat GitHub Pages

Situs ini disajikan dari cabang `claude/stoic-cannon-ew2fbf`. Bila halaman GitHub Pages belum juga muncul, periksa pengaturannya di repositori GitHub, pada menu Settings kemudian Pages, pastikan bagian Source diatur ke Deploy from branch, dengan cabang `claude/stoic-cannon-ew2fbf` dan folder root (/) dipilih, lalu simpan. Setelah tersimpan, GitHub biasanya butuh waktu singkat sebelum halamannya bisa diakses.

Berkas ini hanya bisa dijalankan lewat server seperti GitHub Pages, bukan dengan membuka `index.html` langsung dari komputer, karena browser memblokir sebagian pemuatan berkas saat dibuka dengan cara tersebut.
