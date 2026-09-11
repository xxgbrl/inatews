# InaTEWS · BMKG Realtime Dashboard

Dashboard tidak resmi untuk memantau informasi gempa bumi dan peringatan dini tsunami Indonesia secara realtime, menggunakan data publik dari **BMKG (Badan Meteorologi, Klimatologi, dan Geofisika)** / InaTEWS.

**🔴 Live demo:**
- https://inatews.pages.dev
- https://inatews.netlify.app
- https://xxgbrl.github.io/inatews

> ⚠️ Ini adalah proyek independen/pribadi dan **bukan situs resmi BMKG**. Semua data gempa & tsunami bersumber dari API publik BMKG (`data.bmkg.go.id` dan `bmkg-content-inatews.storage.googleapis.com`). Untuk informasi resmi, selalu rujuk ke [inatews.bmkg.go.id](https://inatews.bmkg.go.id) atau kanal resmi BMKG lainnya.

## ✨ Fitur

- **Gempa Terbaru** — info gempa paling baru yang tercatat BMKG
- **Gempa Terkini (M ≥ 5.0)** — daftar gempa signifikan terbaru
- **Gempa Dirasakan** — daftar gempa yang dirasakan masyarakat
- **Peringatan Dini Tsunami** — status peringatan dini tsunami terkini
- **Gempa Realtime** — feed gempa realtime lengkap dengan waktu, magnitudo, kedalaman, lokasi, dan status
- **Peta interaktif** (MapLibre GL) dengan overlay sesar aktif Indonesia
- **Simpan/Bagikan Gambar** — buat kartu gambar (share card) dari data gempa realtime yang siap dibagikan sebagai story, lengkap dengan cuplikan peta, magnitudo, kedalaman, dan koordinat
- Tampilan gelap (dark mode) yang ringan, tanpa framework front-end

## 🛠️ Teknologi

- HTML, CSS, dan JavaScript murni (vanilla) — tanpa build step
- [MapLibre GL JS](https://maplibre.org/) untuk peta vector interaktif
- Basemap dari [CARTO](https://carto.com/basemaps)
- Data gempa & tsunami dari BMKG (format JSON & CAP/XML)
- Web Share API untuk berbagi gambar langsung dari perangkat mobile

## 🚀 Menjalankan secara lokal

Karena proyek ini tidak memakai build tool, cukup jalankan server statis sederhana:

```bash
# clone repo
git clone https://github.com/xxgbrl/inatews.git
cd inatews

# jalankan dengan server statis apa saja, contoh:
npx serve .
# atau
python3 -m http.server 8080
```

Lalu buka `http://localhost:8080` (atau port sesuai server yang dipakai) di browser.

## ⚙️ Konfigurasi

Proyek ini menggunakan API key CARTO (basemap peta) yang disimpan langsung di `index.html`. Jika ingin deploy versi sendiri, disarankan mengganti API key tersebut dengan milik kamu sendiri melalui [CARTO](https://carto.com/basemaps).

## 📂 Struktur Proyek

```
inatews/
├── index.html      # seluruh markup, styling, dan logic aplikasi
├── favicon.ico
├── favicon-16x16.png
├── favicon-32x32.png
├── apple-touch-icon.png
├── android-chrome-192x192.png
├── android-chrome-512x512.png
├── site.webmanifest
├── LICENSE
└── README.md
```

## 🙏 Sumber Data & Kredit

- Data gempa & tsunami: [BMKG](https://www.bmkg.go.id/) / [InaTEWS](https://inatews.bmkg.go.id/)
- Peta & basemap: [MapLibre GL JS](https://maplibre.org/) & [CARTO](https://carto.com/)

## 🤝 Kontribusi

Pull request dan issue sangat terbuka. Kalau menemukan bug atau punya ide fitur, silakan buat issue baru di repo ini.

## 📄 Lisensi

Proyek ini dilisensikan di bawah [MIT License](./LICENSE).
