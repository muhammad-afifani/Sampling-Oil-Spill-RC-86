# Sinkronisasi data bersama

Folder ini menyimpan berkas ekspor JSON yang dibagikan ke seluruh tim. Setiap kali aplikasi dibuka, aplikasi otomatis memeriksa folder ini lewat GitHub, mengambil berkas dengan nama terbaru, lalu menggabungkannya ke data pada perangkat pengguna (entri yang lebih baru saja yang dipakai, jadi data yang sedang diketik di perangkat lain tidak tertimpa oleh data lama).

## Cara membagikan pembaruan data ke semua orang

1. Buka aplikasi, tekan **Ekspor JSON** di toolbar untuk mengunduh seluruh data laporan sebagai satu berkas, misalnya `sampling-oilspill-2026-09-25.json`.
2. Di GitHub, buka folder `data/exports/` pada cabang `claude/stoic-cannon-ew2fbf`, pilih **Add file → Upload files**, lalu unggah berkas tersebut apa adanya (jangan ubah namanya).
3. Selesai. Beberapa saat kemudian, siapa pun yang membuka halaman ini akan melihat "Memperbarui database..." sebentar saat aplikasi mengambil berkas terbaru, lalu datanya ikut termutakhirkan di perangkat mereka.

Karena nama berkas ekspor selalu memuat tanggal (format `YYYY-MM-DD`), aplikasi memilih berkas dengan nama paling akhir secara alfabetis sebagai yang terbaru. Jangan mengganti nama berkas dengan format tanggal yang berbeda, dan boleh mengunggah lebih dari satu berkas di folder ini sebagai riwayat, karena hanya yang namanya paling baru yang dipakai.
