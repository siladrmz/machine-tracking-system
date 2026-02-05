# Machine Map Project (Makine Takip Sistemi)

Bu proje, saha operasyonlarında kullanılan makinelerin (otomatlar) harita üzerinde takibini, durum yönetimini ve rota planlamasını sağlayan modern bir web uygulamasıdır. Frontend tarafında React ve Leaflet kullanılarak etkileşimli bir harita deneyimi sunulmuştur.

## 🚀 Özellikler

### Giriş ve Harita
- **Etkileşimli Harita**: Tüm makineleri konumlarına göre harita üzerinde görüntüleyin.
- **Dinamik Markerlar**: Makinelerin durumuna (Mevcut, Potansiyel, Hata) göre renk değiştiren ikonlar.
- **Alarm Animasyonu**: Hata durumundaki (WiFi yok, kapı açık vb.) makineler için yanıp sönen "alarm" efekti.
- **Odaklanma (Focus)**: Listeden bir makineye tıklandığında harita o makineye zoom yapar ve marker büyüyerek öne çıkar.

### Makine Yönetimi
- **Excel İçe Aktarma**: Toplu makine verilerini `.xlsx` veya `.csv` formatında sisteme yükleyebilirsiniz.
- **Durum Filtreleme**: Makineleri "Mevcut" veya "Potansiyel" durumlarına göre filtreleyin.
- **Arama**: Makine numarasına göre hızlı arama yapın.
- **Detaylı Popup**: Harita üzerindeki bir makineye tıklandığında; satış adetleri, hata durumları ve son görülme zamanı gibi detayları içeren bir popup açılır.

### Navigasyon ve Rota
- **Yol Tarifi Entegrasyonu**: Popup içerisindeki **"Yol Tarifi Al"** butonu ile Google Haritalar üzerinden o makineye anında rota oluşturun (Sizin konumunuz -> Makine konumu).
- **Rota Oluşturma Sayfası**: Seçilen makineler için optimize edilmiş rota planlaması yapın (Geliştirme aşamasında).

## 🛠 Kullanılan Teknolojiler

### Frontend
- **React**: Kullanıcı arayüzü kütüphanesi.
- **Vite**: Hızlı geliştirme ve build aracı.
- **Leaflet & React-Leaflet**: Harita entegrasyonu.
- **Lucide React**: Modern ikon seti.
- **XLSX**: Excel dosyalarını işlemek için.


## 📦 Kurulum ve Çalıştırma

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin.

### Ön Hazırlık
Bilgisayarınızda [Node.js](https://nodejs.org/) kurulu olduğundan emin olun.

### Adım 1: Projeyi İndirin
Projeyi bilgisayarınıza klonlayın veya indirin.


### Adım 2: Frontend Kurulumu
Yeni bir terminal açın, ana dizine dönün ve frontend klasörüne gidin. Bağımlılıkları yükleyip uygulamayı başlatın.

```bash
cd frontend
npm install
npm run dev
```
Frontend uygulaması genellikle `http://localhost:5173` adresinde çalışacaktır. Tarayıcınızda bu adresi açarak uygulamayı görebilirsiniz.

## 📖 Kullanım Detayları

1. **Harita Görünümü**: Ana sayfada (`/machines`) tüm makineler haritada listelenir.
2. **Hata Takibi**: Kırmızı renkte yanıp sönen markerlar, acil müdahale gereken (örneğin kapısı açık kalmış) makineleri gösterir.
3. **Makineye Gitme**: Sol taraftaki listeden veya haritadaki markerlardan birine tıklayın.
    - Listeden tıklarsanız harita o makineye **zoom (18. seviye)** yapar.
    - Haritadan tıklarsanız detay popup'ı açılır.
4. **Yol Tarifi Alma**: Detay popup'ındaki "Yol Tarifi Al" butonuna tıklayarak Google Haritalar'da rotanızı çizin.
5. **Veri Yükleme**: Sağ üstteki veya filtre alanındaki butonları kullanarak Excel dosyanızı yükleyebilirsiniz. Dosya formatı `Makine No`, `Enlem`, `Boylam`, `Statü` sütunlarını içermelidir.

## ⚠️ Notlar
- Harita verileri OpenStreetMap üzerinden sağlanmaktadır.

