Nama: Deffa Haidar Darmansyah
NIM: 2430511035
Kelas: 5C Teknik Informatika

Fitur yang Diselesaikan
-Design Tokens: Menerapkan standarisasi warna, ukuran, dan tipografi (`tokens.js`).
-FlatList Responsif: Tampilan daftar otomatis menyesuaikan ukuran layar.
-Detail Modal: Menampilkan pop-up detail catatan saat kartu ditekan.
-Penambahan Data: Menambahkan 2 entri baru (total 5 entri) untuk menguji mode grid.

Cara Kerja Breakpoint 600px
Aplikasi mendeteksi lebar layar menggunakan `useWindowDimensions()`. Jika lebar layar di bawah 600px (HP), data ditampilkan dalam 1 kolom. Jika lebar layar 600px atau lebih (Tablet/Landscape), data otomatis ditampilkan dalam 2 kolom (`numColumns={2}`).

Cara Menjalankan Aplikasi
1. Buka terminal di dalam folder `diary-app`.
2. Jalankan perintah `npm install` untuk menginstal dependensi.
3. Jalankan perintah `npx expo start` untuk memulai server.
4. Buka aplikasi **Expo Go** di smartphone, lalu *scan* QR Code yang muncul di terminal.
