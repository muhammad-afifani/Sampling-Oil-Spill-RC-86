# Peta Sampling Oil Spill

Repositori ini menyimpan data sumber dan aplikasi peta untuk pemantauan sampling air dan sedimen pada program pemulihan lahan terdampak tumpahan minyak (oil spill). RC 86 adalah nama platform oil spill yang lebih luas; repositori ini hanya memuat alat pemetaan sampling untuk kebutuhan tersebut.

## Isi repositori

```
index.html                 Halaman utama aplikasi
styles.css                 Tampilan aplikasi, termasuk mode gelap dan terang
app.js                      Data titik dan grid, serta seluruh logika aplikasi
lab.js                      Hasil pemantauan lab: data, klasifikasi TK, analisis arah angin, peta, grafik, edit
lab-xlsx.js                 Baca dan tulis berkas Excel (.xlsx) tanpa pustaka luar
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
- Navigasi peta murni lewat mouse atau layar sentuh, gulir untuk memperbesar dan memperkecil (kini bisa diperbesar lebih jauh lagi), seret atau cubit untuk menggeser, tanpa tombol arah tambahan, dan tombol layar penuh di pojok kanan atas peta
- Tombol Ekspor PDF di atas peta mencetak peta beserta legenda, ringkasan progres, dan informasi koordinat (lewat dialog cetak/Save as PDF bawaan browser), dengan tata letak mengikuti contoh lembar survei perusahaan. Lokasi sampling aktual sengaja tidak disertakan pada peta ini. Koordinat pada lembar cetak memakai referensi WGS 84 (lintang/bujur) dari data aplikasi, bukan grid lokal survei internal. Titik yang dicetak pada peta mengikuti pencarian dan filter status yang sedang aktif di layar, dan ringkasannya mencantumkan berapa titik yang ditampilkan serta filter apa yang dipakai. Di sisi kanan lembar cetak juga ada rincian progres per area grid (sudah berapa dari berapa titik), serta kode QR di pojok kanan bawah yang bila dipindai membuka langsung halaman aplikasi ini
- Tombol terpisah untuk menampilkan atau menyembunyikan isian warna area grid (bila dimatikan, area grid hanya tampak sebagai garis batas, dan baru terisi warna saat area itu diklik), nama grid, kode titik, dan lokasi sampling aktual di peta
- Warna label nama grid dan label kode titik dibedakan supaya keduanya mudah dibedakan sekilas di peta
- Titik yang sudah disampling diberi lingkaran putih di sekeliling tandanya, supaya tetap terlihat jelas walau berada di atas area grid yang juga berwarna hijau
- Tombol "Hanya Basemap" di atas peta menyembunyikan seluruh grid, titik, label, dan legenda sekaligus, menyisakan citra udara polos saja
- Lokasi sampling aktual ditandai dengan pin berwarna biru bercahaya kuning tipis di peta, gaya seperti penanda di Google Maps, supaya kontras dan mudah dikenali dari warna status lainnya
- Titik yang belum disampling berkedip dengan warna kuning, putih, dan merah terang bergantian di peta, seperti lampu tanda, supaya titik-titik yang masih tersisa mudah terlihat sekilas
- Bagian area grid yang catatan kendalanya sudah diisi (atau ditandai bermasalah) ditampilkan dengan arsiran garis miring tegas di lokasi titik tersebut, baik untuk titik yang memang belum bisa disampling karena kendala maupun titik yang sudah disampling tapi masih ada kendala yang perlu diketahui
- Info singkat saat kursor diarahkan ke sebuah titik, menampilkan status dan tanggal sampling tahap Before Recovery dan After Recovery, cuplikan catatan kendala, dan pratinjau foto dokumentasi terbaru (bila ada) tanpa perlu membuka detailnya, dengan tanda centang dan warna hijau pada status yang sudah selesai disampling
- Mengklik sebuah area grid menampilkan info singkat luas areanya dan persentase progres langsung di peta, selain membuka detail lengkapnya di bawah peta
- Rekap Data Titik: tabel di bawah Ringkasan Area Grid, mengelompokkan seluruh titik sampling per jenis (Tanah, Sedimen, Air) lalu per grid, keduanya bisa dilipat supaya ringkas, dan mengikuti pencarian serta filter status yang aktif di toolbar. Judul kolomnya tetap terlihat saat digulir. Tabel ini bisa disembunyikan atau ditampilkan lewat satu tombol. Mengklik satu baris menampilkan pratinjau singkat (status, catatan kendala, foto) tepat di bawahnya beserta tombol Lihat Detail dan Lihat di Peta, tanpa harus membuka detail lengkap di atas
- Tombol Ekspor Excel pada Rekap Data Titik mengunduh data yang sedang ditampilkan (mengikuti pencarian dan filter aktif) sebagai berkas .xlsx, cocok untuk melihat-lihat titik yang sudah maupun belum disampling di luar aplikasi
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
- Setiap kali halaman dibuka, aplikasi otomatis memeriksa akar repositori ini lewat GitHub, mengambil berkas ekspor JSON dengan nama terbaru bila ada (berkas hasil tombol Ekspor JSON, namanya selalu diawali `sampling-oilspill-` diikuti tanggal), lalu menggabungkannya ke data pada perangkat tersebut (menampilkan "Memperbarui database..." selama prosesnya), supaya semua orang yang membuka halaman ini melihat data terbaru yang sudah dibagikan tim tanpa perlu impor manual. Untuk membagikan pembaruan, cukup unggah berkas hasil Ekspor JSON ke akar repositori lewat GitHub (Add file → Upload files) tanpa mengubah namanya; boleh menumpuk beberapa berkas sebagai riwayat, karena yang namanya paling akhir secara alfabetis (tanggal paling baru) yang otomatis dipakai
- Tautan "Tentang & Dukung Pengembang" di footer menampilkan foto tim pembuat aplikasi ini beserta kode QRIS bila ingin memberi dukungan dana untuk pengembangannya

Folder `app/project/` menyimpan versi sebelumnya dari aplikasi ini, yang dibuat sebagai Claude Artifact bertipe Design. Versi tersebut masih dapat dibuka lewat Claude, tetapi tidak dapat menampilkan citra udara karena keterbatasan platform tersebut, sehingga petanya masih berupa gambar skematik. Berkas ini disimpan sebagai riwayat, bukan versi yang disarankan untuk dipakai.

## Hasil pemantauan laboratorium

Tab **Hasil Pemantauan Lab** (di bawah judul halaman) menampilkan hasil uji laboratorium. Data bawaannya adalah batch pertama (76 sampel: 64 tanah pada kedalaman 30 dan 60 cm di 32 titik, 8 sedimen, dan 4 air permukaan) dari LHP BCL.LHP.IX.26278, PT Bestari Casa Laboratory. Koordinat pada berkas hasil lab tidak dipakai; setiap sampel ditempatkan pada titik sampling yang sama di aplikasi ini (misalnya G6.3 menjadi GRID6.3), dan sampel air ditempatkan pada area grid sedimennya.

- **Klasifikasi** tanah dan sedimen dihitung otomatis dari ambang TK-A, TK-B, dan TK-C (PP 22/2021) untuk TPH C6-C9, TPH C10-C36, benzena, etilbenzena, toluena, dan xilena, dengan parameter terberat menentukan kelasnya: di bawah TK-C (Tanah Pelapis Dasar), TK-C sampai TK-B (Non B3), TK-B sampai TK-A (LB3 Kategori 2), dan di atas TK-A (LB3 Kategori 1). Hasilnya sama persis dengan kolom Klasifikasi pada berkas Excel asli. Sampel yang melebihi TK-C dihitung sebagai tercemar.
- **Air permukaan** dibandingkan dengan baku mutu air laut untuk biota (PP 22/2021 Lampiran VIII): TPH 0,02 mg/L, PAH 0,003 mg/L, minyak dan lemak 1 mg/L. Bila batas deteksi lab lebih tinggi dari baku mutu (TPH <1 dan PAH <0,05 pada batch pertama), hasilnya ditandai belum dapat disimpulkan, bukan memenuhi.
- **Peta sebaran**: gradasi warna hasil interpolasi antar titik uji di dalam area grid yang memiliki sampel, makin pudar makin jauh dari titik uji. Tiap titik digambar sebagai lingkaran berlapis (atas 30 cm, bawah 60 cm). Parameter, kedalaman (30 cm, 60 cm, atau nilai tertinggi), dan batch dapat dipilih di atas peta. Titik bocor (−0,8560929; 117,2652896; 28 Agustus 2026 sekitar pukul 15.00 WITA) ditampilkan beserta sektor arah angin (bawaan: menuju utara, ±45°) dan lingkaran jarak 50, 100, 150 m.
- **Analisis titik bocor dan arah angin** memeriksa tiga hal untuk parameter dan kedalaman yang dipilih: apakah titik yang melebihi TK-C berada di dalam sektor arah angin, ke arah mana pusat sebaran konsentrasi berada dari titik bocor, dan apakah konsentrasi menurun menjauhi titik bocor (korelasi peringkat Spearman dengan uji permutasi). Untuk TPH C10-C36 batch pertama, kelima titik yang melebihi TK-C (di Grid 6, 5, 2, dan 4) berada di sektor arah angin dan pusat sebarannya sekitar 56 m ke arah utara-timur laut dari titik bocor, sehingga konsisten dengan dugaan kondensat terbawa angin ke utara. Pola penurunan terhadap jarak belum terlihat jelas secara statistik, dan sebagian besar titik uji memang berada di sisi hilir angin, sehingga sampel tambahan di sisi hulu angin akan memperkuat kesimpulan. Analisis ini indikatif dan tidak memodelkan dispersi udara, limpasan, maupun pasang surut. Titik bocor dan arah angin dapat diubah lewat Atur titik bocor & arah angin.
- **Grafik**: klasifikasi per lapisan, konsentrasi per titik dan kedalaman terhadap ambang TK, jarak dari titik bocor terhadap konsentrasi, profil kedalaman per titik, serta ringkasan per area grid dan tabel air permukaan.
- **Input dan edit manual**: tombol Tambah Hasil Uji, atau klik baris pada tabel Data Hasil Uji untuk mengedit dan menghapus. Nilai di bawah batas deteksi ditulis dengan tanda <, misalnya <0,5; formulir menampilkan pratinjau status tiap nilai saat diketik.
- **Impor dan ekspor Excel**: Ekspor Excel mengunduh seluruh hasil (sheet Hasil per Sampel, Baku Mutu, dan Petunjuk), yang bisa diedit lalu diimpor kembali. Impor Excel menerima berkas hasil lab dengan kolom Kode Sampel (misalnya berkas batch berikutnya dengan format yang sama seperti batch pertama), menampilkan pratinjau berapa sampel baru, diperbarui, sama, atau dilewati beserta alasannya, lalu baru menerapkannya setelah dikonfirmasi. Sampel dikenali dari Kode Sampel, jadi mengimpor ulang berkas yang sama tidak menggandakan data.
- Data hasil lab ikut tersimpan di perangkat, ikut dalam Ekspor/Impor JSON, dan ikut tersinkron dari berkas JSON di repositori seperti data progres sampling.

Catatan satuan: LHP menuliskan satuan mg/L untuk sampel tanah dan sedimen, sedangkan ambang TK dalam mg/kg. Aplikasi menampilkan satuan sesuai LHP dan membandingkan angkanya langsung dengan ambang TK, sama seperti kolom Klasifikasi pada berkas asli.

## Tentang citra latar peta

`assets/basemap-drone.jpg` adalah citra udara drone yang diunggah pengelola proyek. Posisinya di peta ditentukan dari data georeferensi yang sudah tertanam di dalam berkas aslinya (koordinat UTM zone 50S pada metadata EXIF/GeoTIFF), diubah ke koordinat lintang dan bujur biasa, bukan diperkirakan secara visual, sehingga sejajar tepat dengan titik dan grid sampling. Berkas yang disimpan di sini sudah diperkecil dari ukuran aslinya (sekitar 19336 x 16799 piksel, 98 MB) menjadi sekitar 4200 piksel pada sisi terpanjang supaya tidak memberatkan saat dimuat lewat GitHub Pages, dengan resolusi akhir sekitar 40 sentimeter per piksel, masih cukup tajam untuk memeriksa tiap titik sampling. Berkas asli beresolusi penuh tidak disimpan di repositori ini.

Jika suatu saat ada foto drone baru untuk menggantikan citra ini, sebaiknya gunakan berkas yang masih membawa metadata georeferensi yang sama (EXIF GeoTIFF, atau disertai berkas dunia seperti `.jgw`/`.tfw`, atau KML ground overlay), supaya posisinya bisa dipasang tepat tanpa harus menebak secara manual.

## Membuka lewat GitHub Pages

Situs ini disajikan dari cabang `claude/stoic-cannon-ew2fbf`. Bila halaman GitHub Pages belum juga muncul, periksa pengaturannya di repositori GitHub, pada menu Settings kemudian Pages, pastikan bagian Source diatur ke Deploy from branch, dengan cabang `claude/stoic-cannon-ew2fbf` dan folder root (/) dipilih, lalu simpan. Setelah tersimpan, GitHub biasanya butuh waktu singkat sebelum halamannya bisa diakses.

Setiap kali `styles.css`, `app.js`, `lab.js`, atau `lab-xlsx.js` diubah, naikkan juga kode versi `?v=...` pada tautan berkas tersebut di `index.html`. GitHub Pages membiarkan browser menyimpan salinan lama berkas CSS dan JavaScript beberapa menit; tanpa kode versi baru, browser bisa memakai campuran berkas lama dan baru sehingga tombol tidak berfungsi. Bila hal itu tetap terjadi, aplikasi menampilkan pesan untuk memuat ulang halaman.

Berkas ini hanya bisa dijalankan lewat server seperti GitHub Pages, bukan dengan membuka `index.html` langsung dari komputer, karena browser memblokir sebagian pemuatan berkas saat dibuka dengan cara tersebut.
