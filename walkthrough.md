# Ortez & Protez — Latince/Yunanca Terminoloji, Ders Rehberi, Ezber Oyunları ve Dark Mode Raporu

## Tamamlanan Güncellemeler

### 1. Tam Kapsamlı Latince / Yunanca (*Terminologia Anatomica*) ve Türkçe Terminoloji
- [build-terms-tr.mjs](file:///c:/Users/sermed/Desktop/human/human-atlas/scripts/build-terms-tr.mjs) → [terms.tr.json](file:///c:/Users/sermed/Desktop/human/human-atlas/public/models/terms.tr.json): Atlastaki **3.432 kavramın tamamı** kemikler (*Ossa*), kaslar (*Musculi*), eklemler (*Articulationes*), kalp (*Cor*), damarlar (*Arteriae / Venae*), sinirler (*Nervi / Encephalon / Diencephalon*), duyu organları (*Organa sensoria*) ve iç organlar düzeyinde *Terminologia Anatomica* (Latince/Yunanca) ve Türkçe karşılıklarıyla güncellendi.
- 3B sahne üzerindeki hover ipuçları ve sağdaki detay paneli başlıkları **Latince + Türkçe** ikili yapıda gösterilecek şekilde düzenlendi.

### 2. PDF Ders Rehberlerine Göre Ayrıntılı Bilgilendirmeler
- [anatomy.ts](file:///c:/Users/sermed/Desktop/human/human-atlas/app/anatomy.ts) ve [study-data.ts](file:///c:/Users/sermed/Desktop/human/human-atlas/app/study-data.ts):
  - **Fizyoloji Sınava Hazırlık Rehberi (6 Modül):**
    1. Hücre Fizyolojisi ve Organeller (Lizozom *asit hidrolaz*, Peroksizom *katalaz* ile $\text{H}_2\text{O}_2$ detoksifikasyonu, Golgi *cis/trans*, ER ve kaslarda **Sarkoplazmik Retikulum - SR**).
    2. Kas Fizyolojisi ve Kasılma Mekanizması (Sarkomer bantları: **A bandı değişmez**, I ve H daralır; **Troponin C** $\text{Ca}^{2+}$ bağlar; **Triad** = Sisterna + T-tübülü + Sisterna; Kayan Filamanlar kasılma/gevşeme sıralaması; EMG ve İskelet/Kalp/Düz kas karşılaştırması).
    3. Duyusal Sistemler ve Özel Duyular (3 kademeli nöron yolu; **Pacini** derin basınç/vibrasyon, **Meissner/Merkel** hafif dokunma, **Ruffini** gerilim/sıcaklık; **A-delta** miyelinli hızlı ağrı vs **C lifleri** miyelinsiz yavaş ağrı; Göz tabakaları ve 8 adımlı **Fototransdüksiyon / Hiperpolarizasyon**; İşitme fizyolojisi).
    4. Kan Fizyolojisi ve Hematopoez (%55 Plazma, %45 Hücresel elemanlar; **Albümin %60** onkotik basınç, Globülinler %35, Fibrinojen %4; **Hematopoez evreleri**: Vitellus kesesi → Karaciğer/Dalak → Kırmızı Kemik İliği; Eritrosit, Lökosit ve Trombosit özellikleri).
    5. Sinir Sistemi ve Omurilik (MSS/ÇSS; **Diensefalon**: Talamus duyu kapısı, Hipotalamus, Epitalamus melatonin, Subtalamus; **Medulla spinalis** $\text{C}_1-\text{L}_2$, 31 çift spinal sinir, *Substantia grisea* & *Substantia alba*; Parkinson, MS, Alzheimer, Epilepsi).
    6. Dolaşım Fizyolojisi ve Kardiyak Siklus (Otomatisite: **SA Düğüm 60–80/dk** → **AV Düğüm 0.1 sn gecikme** → His Demeti → Purkinje Lifleri; Diyastol Sonu Hacim $\approx 120\text{ ml}$; **S1** AV kapak kapanması, **S2** Semilunar kapak kapanması).
  - **İnsan İskeleti ve Kafa Kemikleri Anatomisi (6 Modül + Check-List):**
    1. Anatomik Duruş (*Positio anatomica*), Düzlemler (*Planum medianum, sagittale, frontale, horizontale*) ve Eksenler (**Axis verticalis**: Rotasyon, **Axis transversalis**: Fleksiyon/Ekstansiyon, **Axis sagittalis**: Abduksiyon/Adduksiyon).
    2. Aksiyal İskelet (Toplam 206 kemik: Aksiyal 80 + Apendiküler 126; Omurga yetişkinde 26, çocukta 33–34; **Atlas $\text{C}_1$**, **Axis $\text{C}_2$ - Dens axis**, **Vertebra prominens $\text{C}_7$**, *Os sacrum* ve *Sternum / Costae*).
    3. Kafa Kemikleri (22 Kemik: *Neurocranium* 8, *Viscerocranium* 14; **Pterion** kırığı → *A. meningea media* → **Epidural Hematom**; *Foramen stylomastoideum* → *N. facialis*; Kafa sütürleri ve **Art. temporomandibularis - TMJ**).
    4. Üst Ekstremite (64 Kemik: *Clavicula, Scapula, Humerus Collum chirurgicum, Radius* **Colles kırığı / Gümüş Çatal Deformitesi**, *Ulna*, **Ossa carpi 8**: en çok kırılan *Os scaphoideum*, en çok çıkan *Os lunatum*; *Art. humeri* ve *Art. cubiti*).
    5. Alt Ekstremite (62 Kemik: *Os coxae* **SIAS** ve **Tuber ischiadicum** protez yük nirengisi, *Femur*, **Patella** en büyük sesamoid kemik, **Tibia** ağırlık taşır, **Fibula** ağırlık taşımaz ve **Collum fibulae** basısı → *N. peroneus communis* → **Düşük Ayak / Foot Drop**; *Ossa tarsi 7*).
    6. Diz Eklemi (*Art. genus*) ve Biyomekaniği (*Meniscus medialis* "C" vs *Meniscus lateralis* "O"; **LCA** öne, **LCP** arkaya kaymayı önler; **Mutsuz Üçlü / Unhappy Triad: Meniscus medialis + MCL + LCA**; **Vida-Ev Kilitlenmesi**: son $30^\circ$'de ayak sabitse femur iç rotasyon, uyluk sabitse tibia dış rotasyon yapar, kilidi *M. popliteus* açar).

### 3. İnteraktif Ezber ve Sınav Oyunları ([study-hub.tsx](file:///c:/Users/sermed/Desktop/human/human-atlas/app/study-hub.tsx))
1. **Sınav Simülasyonu (Quiz):** Fizyoloji, Anatomi ve Klinik/Ortez-Protez kategorilerinde açıklamalı test.
2. **Latince / Yunanca Bilgi Kartları (Flashcards):** Çevrilebilir ezber kartları ve ilerleme takibi.
3. **Eşleştirme Oyunu:** Organel, reseptör, eklem, kemik ve kas/bağ eşleştirme oyunu.
4. **3B Modelde Yapı Bulma Oyunu:** Canlı 3B model üzerinde hedef yapıyı bularak puan toplama modu.

### 4. Dinamik Dark Mode (Koyu Tema)
- [globals.css](file:///c:/Users/sermed/Desktop/human/human-atlas/app/globals.css), [page.tsx](file:///c:/Users/sermed/Desktop/human/human-atlas/app/page.tsx) ve [scene.tsx](file:///c:/Users/sermed/Desktop/human/human-atlas/app/scene.tsx): Üst bardaki tema butonu ile tüm arayüz tipografisi, tablolar, cam paneller ve 3B WebGL sahnesi/zemini dinamik olarak koyu ve açık moda geçiş yapar.
