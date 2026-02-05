# Machine Map Project (Makine Takip Sistemi)
![License](https://img.shields.io/badge/license-MIT-blue.svg) ![React](https://img.shields.io/badge/React-18.2-61DAFB.svg) ![Vite](https://img.shields.io/badge/Vite-5.0-646CFF.svg)
Saha operasyonlarında kullanılan makinelerin (otomatlar) harita üzerinde takibini, durum yönetimini ve rota planlamasını sağlayan modern bir web uygulamasıdır. Kullanıcıların Excel üzerinden veri aktarmasına, makineleri durumlarına göre filtrelemesine ve en uygun rotayı oluşturmasına olanak tanır.
##  Özellikler
### Harita ve Takip
- **Etkileşimli Harita**: Leaflet altyapısı ile tüm makinelerin konum takibi.
- **Akıllı Markerlar**: Makine durumuna (Mevcut, Potansiyel, Hata) göre renk değiştiren dinamik ikonlar.
- **Canlı Alarm Sistemi**: Hata veren makineler için dikkat çekici "pulse" animasyonu.
- **Akıllı Zoom**: Listeden seçilen makineye otomatik odaklanma.
### Yönetim Araçları
- **Excel Entegrasyonu**: `.xlsx` formatında toplu makine verisi yükleme.
- **Gelişmiş Filtreleme**: Statü ve duruma göre anlık filtreleme seçenekleri.
- **Detaylı Analiz**: Her makine için satış, stok ve arıza geçmişi içeren detay popup'ları.
### Rota ve Navigasyon
- **Rota Optimizasyonu**: Seçilen makineler arasında en verimli rotayı otomatik hesaplama.
- **Navigasyon Desteği**: Tek tıkla Google Haritalar üzerinden yol tarifi alma.
## Teknolojiler
- **Frontend**: React, Vite
- **Harita**: Leaflet, React-Leaflet, Leaflet Routing Machine
- **UI/UX**: Lucide React, CSS3
- **Veri**: XLSX, Axios
## Kurulum
1. Projeyi klonlayın:
   \`\`\`bash
   git clone https://github.com/kullaniciadi/machine-tracking-system.git
   \`\`\`
2. Proje dizinine gidin ve bağımlılıkları yükleyin:
   \`\`\`bash
   cd machine-tracking-system/frontend
   npm install
   \`\`\`
3. Uygulamayı başlatın:
   \`\`\`bash
   npm run dev
   \`\`\`
## Lisans
Bu proje MIT lisansı ile lisanslanmıştır.
