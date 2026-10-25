# KADEK BALI — Tour Bali | Private Tours & Travel Experiences

A production-ready, minimalist boutique travel web application for **KADEK BALI**, offering private tours, sightseeing trips, and island-wide holiday transportation services across Bali, Indonesia.

---

## 🌺 Fitur Utama & Keunggulan

1. **Logo Minimalis Bernuansa Bali**:
   - Lambang *Gapura Candi Bentar* Bali bergaya vektor geometris minimalis (simbol harmoni & tradisi Bali).
   - Tipografi elegan: **KADEK** (Biru `#1E6FD9`) dan **BALI** (Hijau `#15803D`) dengan subjudul **TOUR BALI**.
   - Favicon SVG selaras di tab peramban.

2. **Ikon & Fitur Pesanan / Pertanyaan dengan Notifikasi Otomatis ke Email Admin**:
   - Ikon **Pesan / Tanya Tur** di Navbar (Desktop & Mobile), tombol pesan di setiap kartu tur, modal detail destinasi, dan hero banner.
   - **Formulir Interaktif**: Pilihan paket tur/destinasi, nama tamu, email, nomor WhatsApp, tanggal wisata, jumlah orang, lokasi penjemputan hotel/bandara, dan catatan khusus.
   - **Notifikasi Instan ke Email**: Setiap kali pesanan dikirim, sistem otomatis mengirimkan notifikasi rincian pesanan ke email admin yang ditautkan (`kadek.yon30@guru.sd.belajar.id` atau email yang diatur di Portal Admin).
   - **WhatsApp 1-Klik**: Tamu dapat langsung mengirim salinan pesanan berformat rapi ke WhatsApp Kadek Bali (`+6285739256845`).
   - **Kotak Masuk Admin**: Pesanan langsung tersimpan ke tab **Pesan Masuk** di Portal Admin.

3. **Layanan Antar-Jemput Seluruh Bali (Tanpa Kantor Fisik)**:
   - Penjemputan langsung di hotel, villa, resort, dan Bandara Internasional Ngurah Rai Bali.

4. **Portal Admin Lengkap**:
   - Ubah nomor WhatsApp, email admin, dan akun media sosial (Instagram, Facebook, TikTok, YouTube) sewaktu-waktu tanpa ubah koding.
   - Kelola paket tur, harga, destinasi, galeri foto, testimoni, dan status pesanan masuk.
   - Responsif di ponsel (HP), tablet, maupun laptop/komputer.

---

## 🚀 Panduan Publish ke GitHub & Hosting di Vercel

### 1. Inisialisasi Git & Push ke GitHub

Di terminal komputer Anda:
```bash
git init
git add .
git commit -m "feat: Kadek Bali Tour - ready for production"
git branch -M main
git remote add origin https://github.com/USERNAME-ANDA/kadek-bali-tour.git
git push -u origin main
```

### 2. Hosting Gratis di Vercel (1-Klik)

1. Buka [vercel.com](https://vercel.com) dan login dengan akun GitHub Anda.
2. Klik **"Add New..."** lalu pilih **"Project"**.
3. Pilih repositori **kadek-bali-tour** yang baru saja Anda push.
4. Pengaturan otomatis terdeteksi:
   - **Framework Preset**: `Vite`
   - **Build Command**: `vite build`
   - **Output Directory**: `dist`
5. Konfigurasi `vercel.json` sudah disediakan di dalam repositori untuk menangani routing SPA secara otomatis tanpa error 404 saat refresh halaman.
6. Klik **"Deploy"**. Dalam hitungan detik website Kadek Bali Tour Anda sudah online dengan domain gratis `.vercel.app` dan HTTPS SSL otomatis!

---

## 🛠️ Menjalankan Lokal di Komputer

```bash
# 1. Install dependencies
npm install

# 2. Jalankan server lokal
npm run dev

# 3. Jalankan pengujian unit
npm test

# 4. Cek kompilasi produksi
npm run build
```

Buka `http://localhost:3000` di browser Anda.

---

## 🔐 Akses Portal Admin

- **Tombol Akses**: Klik tombol **Admin** (ikon perisai) di navbar atas kanan atau footer.
- **Username Default**: `admin`
- **Password Default**: `verlaska2026!` (atau `admin123`)
- Kata sandi dapat diperbarui kapan saja di tab **Deployment & Keamanan** di dalam dashboard admin.
