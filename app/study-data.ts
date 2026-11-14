import type {SystemId} from './anatomy';

export interface CourseChapter {
  id: string;
  course: 'fizyoloji' | 'anatomi';
  number: string;
  title: string;
  latinTitle: string;
  summary: string;
  orthoticNote?: string;
  examAlert?: string;
  tables?: {
    title: string;
    headers: string[];
    rows: string[][];
  }[];
  sections: {
    heading: string;
    latin?: string;
    bullets: string[];
  }[];
  relatedConceptIds?: string[];
}

export interface QuizQuestion {
  id: string;
  category: 'fizyoloji' | 'anatomi' | 'klinik';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  conceptId?: string;
}

export interface FlashcardItem {
  id: string;
  latin: string;
  turkish: string;
  category: string;
  detail: string;
  conceptId?: string;
}

export interface MatchPair {
  id: string;
  left: string;
  right: string;
  category: 'organel' | 'reseptor' | 'eklem' | 'kemik' | 'kas';
}

export interface FindOnBodyChallenge {
  id: string;
  conceptId: string;
  latin: string;
  turkish: string;
  system: SystemId;
  clue: string;
}

export const COURSE_CHAPTERS: CourseChapter[] = [
  // ==================== FİZYOLOJİ MODÜLLERİ (PDF 1) ====================
  {
    id: 'fiz-1',
    course: 'fizyoloji',
    number: 'Modül 1',
    title: 'Hücre Fizyolojisi ve Temel Organeller',
    latinTitle: 'Physiologia Cellulae & Organella',
    summary:
      'Hücre (Cellula), canlılığın en küçük yapısal ve işlevsel birimidir. Hücresel işlevlerin sürdürülmesi, iç ortamın sabit tutulması anlamına gelen homeostaz (Homeostasis) ile doğrudan ilişkilidir.',
    examAlert:
      'SINAV UYARI KUTUSU: Lizozom ve peroksizom arasındaki enzim farkı sınavda sıkça sorulmaktadır! Lizozom asit hidrolazlar ile hücresel sindirim yaparken, peroksizom katalaz enzimi ile H₂O₂ detoksifikasyonu sağlar (H₂O₂ → H₂O + O₂). Kas hücrelerinde kalsiyum depolayan özel ER formu ise Sarkoplazmik Retikulum (SR) adını alır.',
    tables: [
      {
        title: 'Hücresel Organeller, Yapısal Özellikler ve Kritik Sınav Noktaları',
        headers: ['Organel (Latince/Yunanca)', 'Yapısal Özellik', 'Temel Fizyolojik Görevi', 'Sınav Açısından Kritik Nokta'],
        rows: [
          [
            'Lizozom (Lysosoma)',
            'Golgi kompleksinden köken alır, asidik pH’a sahiptir.',
            'Hücre içi savunma ve sindirim elemanıdır; hücresel homeostaz, büyüme ve apoptozda rol oynar.',
            'İçerdiği 10-12 çeşit hidrolitik enzim (asit hidrolaz, asit ribonükleaz, asit lipaz, kollegenaz) nedeniyle Golgi’ye yakın bulunur.'
          ],
          [
            'Peroksizom (Peroxisoma)',
            'Hücresel tepkimeler sonucu oluşan zehirli ürünleri işler.',
            'Hücresel metabolizma sonucu ortaya çıkan zehirli maddeleri zararsız hale getirir (detoksifikasyon).',
            'Zehirli Hidrojen Peroksidi (H₂O₂), içerdiği KATALAZ enzimi yardımıyla su (H₂O) ve oksijene (O₂) parçalar.'
          ],
          [
            'Golgi Kompleksi (Complexus golgiensis)',
            'Nükleus (çekirdek) çevresinde yer alan kanal ve keseciklerdir.',
            'Hücresel salgı yapma, proteinleri paketleme ve işleme merkezidir.',
            'ER’den gelen proteinler Golgi’ye cis yüzeyinden girer ve trans yüzeyinden salgı vezikülleri olarak ayrılır.'
          ],
          [
            'Endoplazmik Retikulum (Reticulum endoplasmicum)',
            'Hücre (sitoplazma) ve çekirdek zarı arasında uzanan kanalcık sistemidir.',
            'Granüllü ER protein sentezi/katlanması; Granülsüz (Düz) ER lipit sentezi ve Ca²⁺ depolama yapar.',
            'Kas hücrelerinde kalsiyum (Ca²⁺) depolayan özel formu Sarkoplazmik Retikulum (SR) adını alır.'
          ]
        ]
      }
    ],
    sections: [
      {
        heading: 'Giriş ve Homeostaz İlkeleri',
        latin: 'Homeostasis & Biomechanica',
        bullets: [
          'Ortez ve Protez klinisyen adayı olarak vücudun hareket mekanizmasını, kas kasılmasını, sinirsel iletiyi ve duyusal geri bildirimi anlamak, tasarlayacağınız protez ve ortezlerin biyomekanik başarısı için hayati önem taşır.',
          'Hücre içi sindirimde Lizozom (asit hidrolazlar), oksidatif detoksifikasyonda Peroksizom (katalaz enzimi), protein paketlemede Golgi (cis giriş → trans çıkış) ve kalsiyum depolamada Sarkoplazmik Retikulum görev yapar.'
        ]
      }
    ]
  },
  {
    id: 'fiz-2',
    course: 'fizyoloji',
    number: 'Modül 2',
    title: 'Kas Sistemi Fizyolojisi ve Kasılma Mekanizması',
    latinTitle: 'Physiologia Systematis Muscularis & Sarcomerum',
    summary:
      'İskelet kası hareketin aktif unsurudur; eklem hareket açıklığı (EHA/ROM), kuvvet iletimi ve elektromiyografik (EMG) değerlendirmeler doğrudan bu fizyolojik temele dayanır.',
    orthoticNote:
      'Kasın kasılması sırasında meydana gelen elektriksel aktivitenin elektrotlar yardımıyla ölçülmesi işlemine Elektromiyografi (EMG), elde edilen kayda elektromiyogram denir. Klinikte kas/sinir hastalıkları tanısında ve miyoelektrik protezlerin kontrol mekanizmasında yaygın kullanılır.',
    examAlert:
      'SINAV UYARI KUTUSU: Kasılma sırasında A Bandının (kalın miyozin boyu) boyu DEĞİŞMEZ! I Bandı (sadece aktin) ve H Bandı (sadece miyozin) kasılmada daralır veya kaybolur. Kalsiyum (Ca²⁺) ince filament üzerindeki Troponin C alt ünitesine bağlanır. Triad = Sisterna + T Tübülü + Sisterna (Her sarkomerde 2 adet T tübülü bulunur).',
    tables: [
      {
        title: 'Üç Kas Tipinin Fizyolojik ve Biyomekanik Karşılaştırması',
        headers: ['Özellik', 'İskelet Kası (Textus muscularis striatus)', 'Kalp Kası (Myocardium)', 'Düz Kas (Textus muscularis levis)'],
        rows: [
          ['Kontrol', 'İstemli (Somatik sinir sistemi)', 'İstemsiz (Otonom sinir sistemi / Otomatisite)', 'İstemsiz (Otonom sinir sistemi)'],
          ['Çizgili Yapı', 'Var (Sarkomer belirgin)', 'Var (Sarkomer belirgin)', 'Yok (Sarkomer yapısı bulunmaz)'],
          ['Hücresel Bağlantılar', 'Bağımsız lifler', 'İnterkalat diskler (Disci intercalares / Gap junction)', 'Kavisli yapılar, geçit bağlantıları (Konneksin)'],
          ['Enerji ve Yorulma', 'Hızlı kasılır, çabuk yorulabilir (SR Ca²⁺)', 'Ritmik kasılır, yorulmaz', 'Yavaş, ritmik kasılır; az enerji harcar, yorulmaz (Hücre dışı + SR Ca²⁺)']
        ]
      }
    ],
    sections: [
      {
        heading: 'İskelet Kasının Hiyerarşik Yapısı ve Sarkomer Bantları',
        latin: 'Fasciculus → Fibra muscularis → Myofibrilla → Myofilamentum',
        bullets: [
          'Hiyerarşi: Bütün kas organı (Musculus) → Kas demetleri (Fasikül / Fasciculus) → Kas lifleri (Hücre) → Miyofibriller → Miyofilamentler (Aktin ve Miyozin).',
          'Sarkomer (Sarcomerum): İki Z çizgisi arasında kalan en küçük kasılma birimidir.',
          'Z Çizgisi (Linea Z): Sarkomerin sınırlarını çizer, aktin filamentlerinin tutunduğu esnek yapıdır.',
          'I Bandı: Sadece ince (aktin) filamentlerin bulunduğu açık renkli banttır. Kasılmada DARALIR.',
          'A Bandı: Kalın (miyozin) filamentlerin boyunu kapsayan koyu renkli banttır. Kasılma sırasında boyu DEĞİŞMEZ.',
          'H Bandı: A bandının ortasında, sadece miyozin filamentlerinin bulunduğu bölgedir. Kasılmada DARALIR veya KAYBOLUR.',
          'M Çizgisi (Linea M): H bandının tam ortasındaki miyozin tutunma çizgisidir.'
        ]
      },
      {
        heading: 'Kasılma Proteinleri ve T-Tübülü / Triad Yapısı',
        latin: 'Actinum, Myosinum, Troponinum, Titinum, Nebulinum & Trias',
        bullets: [
          'F-Aktin: G-aktin moleküllerinin dizilmesiyle oluşan çift sarmal yapıdır; üzerinde miyozin başının bağlanacağı aktif noktalar bulunur.',
          'Tropomiyozin: İstirahat halinde aktin üzerindeki aktif bağlanma noktalarını örterek kasılmayı engeller.',
          'Troponin Kompleksi: Troponin I (aktine bağlıdır, kasılmayı inhibe eder), Troponin T (tropomiyozine bağlanır), Troponin C (Kalsiyum Ca²⁺ bağlayan kritik alt ünite).',
          'Miyozin (Kalın Filament): Baş ve kuyruk kısmından oluşur. Miyozin başı ATP’yi parçalayabilen bir enzimdir (ATPaz aktivitesi).',
          'Titin: Z çizgisinden M çizgisine uzanır; kasılan sarkomerin esneyip tekrar istirahat haline dönmesine yardım eder. Nebulin: Aktin filamentinin kararlı ve sabit yapıda durmasını sağlar.',
          'T-Tübülü (Tubulus transversus): Sarkolemmanın hücre içine yaptığı derin girintilerdir (her sarkomerde 2 adet). Aksiyon potansiyelini miyofibrillerin derinliklerine hızla yayar.',
          'Triad Yapısı: T tübülü ve her iki yanındaki Sarkoplazmik Retikulum (SR) sisternalarının oluşturduğu üçlü yapıdır (Sisterna – T tübülü – Sisterna).'
        ]
      },
      {
        heading: 'Kayan Filamanlar Teorisi: Kasılma ve Gevşeme Sıralaması',
        latin: 'Contractio & Relaxatio Muscularis',
        bullets: [
          'KASILMA EVRESİ: (1) Motor nörondan gelen aksiyon potansiyeli T tübüllerine yayılır → (2) SR’den sitoplazmaya Ca²⁺ salınır → (3) Serbest Ca²⁺, Troponin C alt ünitesine bağlanır → (4) Troponin-Tropomiyozin kompleksi biçim değiştirerek tropomiyozini aktinin aktif noktalarından çeker → (5) Aktinin açıkta kalan aktif noktalarına miyozin başı bağlanır ve çapraz köprü (aktomiyozin) oluşur → (6) Miyozin başındaki ATPaz ATP’yi hidrolize eder, açığa çıkan enerjiyle miyozin başı bükülerek aktini sarkomer merkezine çeker (Güç Darbesi / Power Stroke).',
          'GEVŞEME EVRESİ: (1) Sinaptik aralıktaki asetilkolin, Asetilkolinesteraz (AChE) enzimi ile parçalanır → (2) Ca²⁺ iyonları aktif taşıma ile tekrar SR sisternalarına pompalanır → (3) Troponin C’den Ca²⁺ ayrılınca tropomiyozin tekrar aktinin aktif noktalarını kapatır → (4) Miyozin başı yeni bir ATP bağlayarak aktinden ayrılır (ATPaz inhibisyonu) ve kas istirahat konumuna döner.',
          'Klinik Sentez: AChE enzimi bloke edilirse asetilkolin parçalanamaz, sodyum kanalları açık kalır, Ca²⁺ SR’ye geri pompalanamaz ve kas gevşeyemez (tetanik kasılma / spastisite).'
        ]
      }
    ],
    relatedConceptIds: ['FMA5022', 'FMA7265', 'FMA7272', 'FMA7274']
  },
  {
    id: 'fiz-3',
    course: 'fizyoloji',
    number: 'Modül 3',
    title: 'Duyusal Sistemler, Reseptörler ve Özel Duyular',
    latinTitle: 'Systema Sensorium, Receptores & Fototransduksiyon',
    summary:
      'Reseptörler iç ve dış ortamdaki fiziksel veya kimyasal değişimleri elektrik sinyallerine çevirerek beyine ileten biyolojik dönüştürücülerdir (transdüser). Duyusal sinyaller kortekse 3 kademeli nöron dizilimi ile taşınır.',
    orthoticNote:
      'Pacini Cisimciği (Corpusculum lamellosum) derin basınç ve titreşime (vibrasyon) duyarlıdır; ortez temas noktalarındaki basınç/titreşim algısı ve proprioseptif geri bildirim için kritik önem taşır.',
    examAlert:
      'SINAV UYARI KUTUSU: Fototransdüksiyonda ışık uyaranı cGMP seviyesini DÜŞÜRÜR, Na⁺-Ca²⁺ katyon kanalları KAPANIR, fotoreseptör hücre HİPERPOLARİZE olur ve ketleyici nörotransmitter olan glutamat salınımı AZALIR! Ağrı iletiminde A-delta (Aδ) lifleri miyelinli ve hızlı/keskin ağrıyı; C lifleri miyelinsiz ve yavaş/kronik/yanıcı ağrıyı taşır.',
    tables: [
      {
        title: 'Reseptör Tipleri, Uygun Uyaran (Modalite) ve Görevleri',
        headers: ['Reseptör Tipi', 'Uygun Uyaran (Modalite)', 'Vücuttaki Örnekleri / Görevi'],
        rows: [
          ['Mekanoreseptör', 'Basınç, şekil değişikliği, gerilme, dokunma ve işitme', 'Deri reseptörleri (Pacini, Meissner, Merkel, Ruffini), İç kulak tüy hücreleri'],
          ['Fotoreseptör', 'Elektromanyetik dalgalar (Işık)', 'Retinadaki Çubuk (Rod) ve Koni (Cone) hücreleri'],
          ['Termoreseptör', 'Sıcaklık değişiklikleri (Sıcak / Soğuk)', 'Ruffini cisimciği (Sıcak), Krause / Soğuk reseptörleri'],
          ['Kemoreseptör', 'Kimyasal moleküller (O₂, CO₂, Glikoz, Koku, Tat)', 'Tat tomurcukları, koku epiteli (Olfaktör mukoza), damar içi kan gazı reseptörleri'],
          ['Nosiseptör', 'Doku hasarı oluşturan fiziksel/kimyasal/termal şiddetli uyaranlar', 'Serbest sinir uçları (Ağrı duyusu - Nosisepsiyon)']
        ]
      }
    ],
    sections: [
      {
        heading: 'Duyusal Sinyallerin 3 Kademeli Taşınma Yolu ve Deri Reseptörleri',
        latin: 'Via Sensoria & Corpuscula Tactilia',
        bullets: [
          '1. Primer Afferent Nöron (1. Sıra Nöron): Reseptörden aldığı uyaranı omuriliğe (Medulla spinalis) veya beyin sapına (Truncus encephali) getirir.',
          '2. İkinci Sıra Nöron: Omurilik veya beyin sapından çıkar, çapraz (dekussasyon) yaparak sinyali Talamusa (Thalamus) taşır.',
          '3. Üçüncü Sıra Nöron: Talamustan başlayarak bilgiyi primer somatosensör kortekse (Gyrus postcentralis) ulaştırır. (Not: Koku duyusu talamusa uğramadan doğrudan kortekse iletilir!).',
          'Meissner Cisimciği & Merkel Diski: Hafif dokunma ve yüzeysel basınca duyarlıdır.',
          'Pacini Cisimciği: Derin basınç ve titreşime (vibrasyon) duyarlıdır (Ortez uyum kontrolünde kritiktir).',
          'Ruffini Cisimciği: Deri gerilimine ve sıcaklığa duyarlıdır.',
          'Serbest Sinir Uçları: Dokunma, sıcaklık ve ağrı (nosisepsiyon) duyularını algılar.',
          'A-delta (Aδ) Lifleri: Miyelinli, iletim hızı yüksek; hızlı, keskin ve batıcı ağrıyı taşır. C Lifleri: Miyelinsiz, iletim hızı yavaş; yavaş, kronik, künt ve yanıcı ağrıyı taşır.'
        ]
      },
      {
        heading: 'Görme Fizyolojisi (Fototransdüksiyon 8 Adım) ve İşitme',
        latin: 'Bulbus Oculi (Sclera, Choroidea, Retina) & Auris (Cochlea)',
        bullets: [
          'Göz küresi (Bulbus oculi) dıştan içe: Sert tabaka (Sklera / Sclera), Damar tabaka (Koroid / Choroidea) ve Ağ tabaka (Retina) olmak üzere 3 katmandan oluşur.',
          'Fototransdüksiyon Adımları: (1) Işık uyaranı retinal dış segmentteki rodopsin pigmentini aktifler → (2) Rodopsin, G-proteini olan transdusin molekülünü aktifler → (3) Transdusin, cGMP fosfodiesteraz enzimini aktif hale getirir → (4) cGMP, 5’-cGMP’ye hidrolize olur; hücre içi cGMP seviyesi düşer → (5) cGMP’ye bağımlı Na⁺-Ca²⁺ katyon kanalları kapanır → (6) Katyon çıkışı devam ederken içeri giremediği için fotoreseptör hücre HİPERPOLARİZE olur → (7) Hiperpolarizasyon sonucu ketleyici nörotransmitter olan glutamat salınımı azalır → (8) Bipolar ve gangliyon hücreleri tetiklenerek optik sinir (Nervus opticus - CN II) üzerinden görme bilgisi beyne iletilir.',
          'İşitme Fizyolojisi: Dış kulak (kulak kepçesi/auricula, dış kulak yolu/meatus acusticus externus, kulak zarı/membrana tympanica), Orta kulak (Malleus/çekiç, Incus/örs, Stapes/üzengi kemikçikleri, Östaki borusu/Tuba auditiva) ve İç kulak (Salyangoz/Cochlea ve yarım daire kanalları/Canales semicirculares). Ses dalgaları kulak zarını titreştirir → kemikçikler titreşimi kuvvetlendirip oval pencere (Fenestra vestibuli) üzerinden Kohlea sıvısına iletir → sıvı dalgalanması tüy hücrelerini bükerek işitme sinirini (N. vestibulocochlearis - CN VIII) uyarır.'
        ]
      }
    ],
    relatedConceptIds: ['FMA58238', 'FMA50863', 'FMA52781']
  },
  {
    id: 'fiz-4',
    course: 'fizyoloji',
    number: 'Modül 4',
    title: 'Kan Fizyolojisi, Plazma Proteinleri ve Hematopoez',
    latinTitle: 'Physiologia Sanguinis, Erythrocyti, Leucocyti & Haemopoiesis',
    summary:
      'Kan (Sanguis), vücut ağırlığının %7-8’ini oluşturan (%55 Plazma, %45 Hücresel elemanlar), dokulara O₂ ve besin taşıyan, atıkları uzaklaştıran, pH/ısı/osmotik dengeyi ve bağışıklığı sağlayan hayati sıvı dokudur.',
    examAlert:
      'SINAV UYARI KUTUSU: Kanın onkotik (kolloid osmotik) basıncını oluşturan ve damar dışına sıvı sızmasını (ödemi) engelleyen en önemli plazma proteini ALBÜMİN’dir (%60). Eritrositler çekirdek, ribozom ve mitokondri İÇERMEZ; enerjilerini anaerobik glikoliz ile üretir ve taşıdıkları oksijeni kendileri tüketmezler!',
    tables: [
      {
        title: 'Plazma Proteinleri ve Kan Hücreleri Özeti',
        headers: ['Bileşen / Hücre', 'Oran / Değer', 'Yapısal Özellik', 'Temel Fizyolojik Görev'],
        rows: [
          ['Albümin (Albuminum)', 'Plazma proteinlerinin %60’ı', 'Karaciğerde sentezlenir.', 'Kanın onkotik (osmotik) basıncını oluşturur; damar dışına sıvı sızmasını (ödemi) engeller.'],
          ['Globülinler (Globulina)', 'Plazma proteinlerinin %35’i', 'Alfa/Beta globülinler ve Gama globülinler (IgG, IgA, IgM, IgD, IgE).', 'Transferrin ile demir, apolipoprotein ile lipit taşır; İmmünoglobulinler (antikorlar) savunmada rol oynar.'],
          ['Fibrinojen (Fibrinogenum)', 'Plazma proteinlerinin %4’ü', 'Pıhtılaşma öncül proteini.', 'Pıhtılaşma sürecinde fibrin iplikçiklerine dönüşerek kanamayı durdurur.'],
          ['Eritrosit (Erythrocytus)', 'Hücrelerin %99.9’u (Hematokrit: E %46, K %42)', '7-8 mikron bikonkav disk. Çekirdek, ribozom, mitokondri İÇERMEZ.', 'Hemoglobin ile O₂ ve CO₂ taşır; anaerobik glikoliz yaptığı için taşıdığı O₂’yi tüketmez.'],
          ['Granülosit Lökositler', 'Nötrofil, Eozinofil, Bazofil', 'Kemik iliğinde üretilir (Granüllü).', 'Nötrofil: Fagositoz ve ilk yanıt. Eozinofil: Parazitik enfeksiyon ve alerji. Bazofil: Histamin ve heparin salınımı.'],
          ['Agranülosit Lökositler & Trombosit', 'Monosit, Lenfosit (B ve T) & Platelet', 'Monosit dokuda makrofaja dönüşür; Trombosit çekirdeksiz parçacıktır.', 'Lenfositler özgül bağışıklık sağlar; Trombositler damar zedelenmesinde tıkaç oluşturup hemostazı başlatır.']
        ]
      }
    ],
    sections: [
      {
        heading: 'Kanın 6 Temel Görevi ve Hematopoez Evreleri',
        latin: 'Haemopoiesis (Vitellus → Hepar/Splen → Medulla Ossea Rubra)',
        bullets: [
          'Kanın Görevleri: (1) Solunum (O₂ ve CO₂ taşıma), (2) Beslenme (glikoz, amino asit, yağ taşıma), (3) Ekskresyon (üre, ürik asit, kreatinin böbreklere taşıma), (4) Düzenleme (vücut ısısı, su-tuz ve pH dengesi), (5) Koruma ve Savunma (lökositler, antikorlar ve pıhtılaşma faktörleri), (6) Hormon Taşıma.',
          'Hematopoez Evreleri (Pluripotent kök hücreden üretim yerleri):',
          '• Gelişimin İlk Haftaları (Embriyonik): Vitellus Kesesi (Yolk-sac)',
          '• Gebeliğin 1.5 – 3. Ayları: Karaciğer (Hepar) ve Dalak (Splen/Lien)',
          '• Gebeliğin 3. – 6. Ayları: Ağırlıklı olarak Karaciğer (Hepar)',
          '• Doğuma Yakın ve Doğum Sonrası Yetişkinlik: Kırmızı Kemik İliği (Medulla ossium rubra)',
          'Klinik Sentez (Yanık / Hipovolemi): Ağır yanık veya sıvı kaybında plazma hacmi azalır → hematokrit göreceli yükselir (rölatif polisitemi) ve kan viskozitesi artar. Albümin kaybı ise onkotik basıncı düşürerek dokularda ödeme yol açar.'
        ]
      }
    ],
    relatedConceptIds: ['FMA7197', 'FMA7196', 'FMA9607']
  },
  {
    id: 'fiz-5',
    course: 'fizyoloji',
    number: 'Modül 5',
    title: 'Sinir Sistemine Giriş, Ara Beyin (Diensefalon) ve Omurilik',
    latinTitle: 'Systema Nervosum, Diencephalon & Medulla Spinalis',
    summary:
      'Sinir sistemi Merkezi Sinir Sistemi (MSS: Beyin / Encephalon ve Omurilik / Medulla spinalis) ile Çevresel Sinir Sistemi (ÇSS: Duyu/motor sinir lifleri ve ganglionlar) olarak ikiye ayrılır.',
    examAlert:
      'SINAV UYARI KUTUSU: Koku duyusu HARİÇ tüm duyusal sinyaller kortekse gitmeden önce TALAMUS’ta toplanır! Omurilik (Medulla spinalis) C1’den L2’ye (1. boyun omurundan 2. bel omuruna) kadar uzanır ve toplam 31 çift spinal sinir çıkar. İç kısımda kelebek şeklinde Gri Cevher (Substantia grisea - nöron gövdeleri), dış kısımda Beyaz Cevher (Substantia alba - miyelinli akson yolları) bulunur.',
    tables: [
      {
        title: 'Ara Beyin (Diensefalon) Yapıları ve Klinik Nörolojik Bozukluklar',
        headers: ['Yapı / Klinik Tablo', 'Latince Adı', 'Temel Fizyolojik Görevi / Patofizyolojisi'],
        rows: [
          ['Talamus', 'Thalamus', 'Koku duyusu hariç tüm duyusal sinyallerin kortekse iletilmeden önce toplandığı ve işlendiği "duyu kapısı"dır.'],
          ['Hipotalamus', 'Hypothalamus', 'Açlık, susuzluk, vücut sıcaklığı (termoregülasyon), uyku ritmi, stres yanıtı ve otonom sinir sistemini kontrol eder; hipofiz bezini (Hypophysis) yönetir.'],
          ['Epitalamus (Pineal Bez)', 'Epithalamus / Glandula pinealis', 'Melatonin hormonu salgılayarak sirkadiyen ritmi (uyku-uyanıklık döngüsü) düzenler.'],
          ['Subtalamus', 'Subthalamus', 'Bazal ganglionlarla bağlantılıdır, iskelet kası hareketlerinin koordinasyonuna katkıda bulunur.'],
          ['Klinik Nörolojik Tablolar', 'Parkinson, MS, Alzheimer, Epilepsi', 'Parkinson: Dopaminerjik kayıp. Multiple Skleroz (MS): Miyelin kılıf hasarı. Alzheimer: Bellek kaybı. Epilepsi: Anormal elektriksel deşarj.']
        ]
      }
    ],
    sections: [
      {
        heading: 'Omurilik (Medulla Spinalis) Anatomisi ve Fizyolojisi',
        latin: 'Substantia Grisea & Substantia Alba (C1 - L2)',
        bullets: [
          'Uzandığı Seviye: Omurga kanalı (Canalis vertebralis) içinde C1’den L2’ye (1. servikal omurdan 2. lumbal omura) kadar uzanır.',
          'Spinal Sinirler: Omurilikten toplam 31 çift spinal sinir (Nervi spinales) çıkar.',
          'Gri Cevher (Substantia Grisea): Nöron gövdelerinin bulunduğu iç kısımdır (kesitte kelebek şeklinde görünür).',
          'Beyaz Cevher (Substantia Alba): Miyelinli sinir lifleri ve akson hatlarının uzandığı dış kısımdır; beyin ile omurilik arasındaki inen (motor) ve çıkan (duyusal) yolları oluşturur.'
        ]
      }
    ],
    relatedConceptIds: ['FMA50801', 'FMA62007', 'FMA62008', 'FMA62033', 'FMA7647']
  },
  {
    id: 'fiz-6',
    course: 'fizyoloji',
    number: 'Modül 6',
    title: 'Dolaşım Fizyolojisi, Kalbin İleti Sistemi ve Kardiyak Siklus',
    latinTitle: 'Physiologia Cardiovascularis, Systema Conducens Cordis & Cyclus Cardiacus',
    summary:
      'Kalp (Cor), dışarıdan sinirsel uyarı gelmeksizin kendi ritmik aksiyon potansiyelini oluşturma yeteneğine (otomatisite) sahiptir. Kardiyak siklus sistol (kasılma/pompalama) ve diyastol (gevşeme/dolma) evrelerinden oluşur.',
    examAlert:
      'SINAV UYARI KUTUSU: Kalbin doğal pacemaker’ı (hız belirleyicisi) sağ atriyum duvarındaki Sinoatriyal (SA) Düğüm’dür (60-80 uyarı/dk). AV Düğüm iletiyi ~0.1 sn geciktirerek atriyumların ventriküllere tam dolmasını sağlar. 1. Kalp Sesi (S1) İzovolümetrik Kasılma başında AV kapakların (Triküspit/Mitral) kapanmasıyla; 2. Kalp Sesi (S2) Fırlatma sonunda Semilunar kapakların (Aort/Pulmoner) kapanmasıyla oluşur!',
    tables: [
      {
        title: 'Kalbin Uyarım/İleti Sistemi ve Kardiyak Siklusun 4 Evresi',
        headers: ['Aşama / Yapı', 'Latince / Terminolojik Adı', 'Fizyolojik Mekanizma ve Kritik Değerler'],
        rows: [
          ['1. Sinoatriyal (SA) Düğüm', 'Nodus sinuatrialis (Keith-Flack)', 'Sağ atriyum duvarında bulunur. Kalbin doğal pacemaker’ıdır. Dakikada 60-80 arası uyarı üretir.'],
          ['2. Atriyoventriküler (AV) Düğüm', 'Nodus atrioventrikularis (Aschoff-Tawara)', 'Atriyum ile ventrikül arasındadır. Uyarıyı ~0.1 saniye geciktirerek atriyumların tam dolmasını sağlar.'],
          ['3. His Demeti & 4. Purkinje Lifleri', 'Fasciculus atrioventricularis & Rami subendocardiales', 'His demeti iletiyi interventriküler septuma taşır; Purkinje lifleri ventrikül miyokardına hızla yayarak güçlü kasılma sağlar.'],
          ['Evre 1: Ventrikül Doluş Dönemi', 'Diastole ventriculorum', 'Ventriküller %70 pasif dolar, ardından Atriyum Sistolü kalan %30’u pompalar. Diyastol Sonu Hacim (EDV) ≈ 120 ml.'],
          ['Evre 2: İzovolümetrik Kasılma', 'Contractio isovolumetrica', 'AV kapaklar kapanır → 1. KALP SESİ (S1) oluşur. Tüm kapaklar kapalıdır, hacim değişmez, basınç hızla yükselir.'],
          ['Evre 3: Fırlatma (Ejeksiyon) & Evre 4: İzovolümetrik Gevşeme', 'Ejectio & Relaxatio isovolumetrica', 'Semilunar (aort ve pulmoner) kapaklar açılır, kan fırlatılır. Semilunar kapaklar kapanınca 2. KALP SESİ (S2) oluşur; ardından izovolümetrik gevşeme başlar.']
        ]
      }
    ],
    sections: [
      {
        heading: 'Kardiyak Siklus ve Kalp Sesleri Özeti',
        latin: 'Systole, Diastole, S1 & S2',
        bullets: [
          'Otomatisite: SA Düğüm (60-80/dk) → AV Düğüm (0.1 sn gecikme) → His Demeti (Septum) → Purkinje Lifleri (Ventrikül miyokardı).',
          'Diyastol Sonu Hacim: Ventrikül doluşu (%70 pasif + %30 atriyum sistolü) sonunda ventriküldeki toplam kan miktarıdır (yaklaşık 120 ml).',
          'S1 (1. Kalp Sesi): İzovolümetrik kasılma başında AV kapakların (Triküspit ve Mitral) kapanmasıyla oluşur.',
          'S2 (2. Kalp Sesi): Ejeksiyon (fırlatma) sonunda Semilunar kapakların (Aort ve Pulmoner) kapanmasıyla oluşur.'
        ]
      }
    ],
    relatedConceptIds: ['FMA7088', 'FMA7096', 'FMA7097', 'FMA7098', 'FMA7101', 'FMA7234', 'FMA7235']
  },

  // ==================== ANATOMİ MODÜLLERİ (PDF 2) ====================
  {
    id: 'ana-1',
    course: 'anatomi',
    number: 'Modül 1',
    title: 'Anatomiye Giriş, Düzlemler (Plana), Eksenler (Axes) ve Terminoloji',
    latinTitle: 'Positio Anatomica, Plana, Axes & Terminologia Generalis',
    summary:
      'Anatomi (Eski Yunanca Ana + Tome = içinden kesip ayırmak; Latince Dissection = kadavra kesimi) vücudun normal şeklini, yapısını ve organ komşuluklarını inceler. Tüm yön tarifleri Anatomik Duruş (Positio Anatomica) kabul edilerek yapılır.',
    orthoticNote:
      'ORTEZ-PROTEZ NOTU: Eklem açısal ölçümleri (Goniometre) ve protez hizalaması yapılırken; Rotasyon (pronasyon/supinasyon) hareketlerinin Axis Verticalis, Fleksiyon/Ekstansiyonun Axis Transversalis, Abduksiyon/Adduksiyonun ise Axis Sagittalis üzerinde gerçekleştiği unutulmamalıdır!',
    examAlert:
      'SINAV UYARI KUTUSU: Anatomik pozisyonda birey ayakta dik durur, yüz/gözler karşıya bakar, kollar yanda sarkıktır ve AVUÇ İÇLERİ KARŞIYA (ÖNE / SUPİNASYONDA) bakar! Vücudu sağ (dexter) ve sol (sinister) İKİ EŞİT PARÇAYA ayıran TEK düzlem Planum Medianum’dur.',
    tables: [
      {
        title: 'Vücut Düzlemleri (Plana) ve Eksenleri (Axes) Karşılaştırma Tablosu',
        headers: ['Düzlem / Eksen', 'Latince Adı', 'Geçiş Yönü ve Ayırdığı Bölgeler / Yapılan Hareketler'],
        rows: [
          ['Orta Düzlem', 'Planum Medianum', 'Vücudun tam ortasından geçerek gövdeyi sağ (dexter) ve sol (sinister) İKİ EŞİT parçaya ayıran tek düzlemdir.'],
          ['Sagittal Düzlem', 'Planum Sagittale', 'Planum medianum’a paralel geçer; vücudu sağ ve sol eşit olmayan parçalara ayırır.'],
          ['Alın Düzlemi', 'Planum Frontale (Coronale)', 'Alına/yüze paralel dikey geçer; vücudu ön (anterior) ve arka (posterior) parçalara ayırır.'],
          ['Yatay Düzlem', 'Planum Horizontale (Transversale)', 'Yere paralel geçer; vücudu üst (superior) ve alt (inferior) parçalara ayırır.'],
          ['Dikey Eksen', 'Axis Verticalis', 'Yukarıdan aşağıya dikey iner → Etrafında ROTASYON (iç/dış rotasyon, pronasyon/supinasyon) yapılır.'],
          ['Enine Eksen', 'Axis Transversalis', 'Sağdan sola yere paralel geçer → Etrafında FLEKSİYON (Bükülme) ve EKSTANSİYON (Açılma) yapılır.'],
          ['Okusal Eksen', 'Axis Sagittalis', 'Önden arkaya yere paralel geçer → Etrafında ABDUKSİYON (Uzaklaşma) ve ADDUKSİYON (Yaklaşma) yapılır.']
        ]
      }
    ],
    sections: [
      {
        heading: 'Temel Anatomik Yön ve Kemik Kabartı/Çukur Terimleri',
        latin: 'Termini Directionales & Osteologia Generalis',
        bullets: [
          'Yön Terimleri: Anterior/Ventralis (Ön), Posterior/Dorsalis (Arka), Superior/Cranialis (Üst/Baş tarafı), Inferior/Caudalis (Alt/Ayak tarafı), Medialis (Orta hatta yakın), Lateralis (Orta hattan uzak), Intermedius (İki oluşum arası), Proximalis (Ekstremitede gövdeye yakın), Distalis (Gövdeden uzak), Superficialis (Yüzeyel), Profundus (Derin).',
          'Kemik İşaret Terimleri: Corpus (Gövde), Caput (Baş), Capitulum (Başçık), Collum (Boyun), Sulcus (Oluk/iz), Tuberculum (Tümsek/yumrucuk), Tuberositas (Pürtüklü engebeli çıkıntı), Crista (İbik şeklinde kenar), Spina (Diken/sivri çıkıntı), Processus (Çıkıntı), Foramen (Delik), Fossa (Çukur), Fovea/Foveola (Küçük sığ çukurcuk), Incisura (Çentik).'
        ]
      }
    ]
  },
  {
    id: 'ana-2',
    course: 'anatomi',
    number: 'Modül 2',
    title: 'İskelet Sisteminin Genel Yapısı ve Aksiyal İskelet (Omurga & Göğüs Kafesi)',
    latinTitle: 'Skeleton Axiale: Columna Vertebralis & Skeleton Thoracis',
    summary:
      'Yetişkin insan iskeletinde toplam 206 kemik bulunur: Aksiyal İskelet (80 kemik) ve Apendiküler İskelet (126 kemik: Üst ekstremite 64, Alt ekstremite 62). Omurga çocukta 33-34 kemikken erişkinde sakral ve koksigeal birleşmeyle 26 kemiğe düşer.',
    orthoticNote:
      'Vertebra Prominens (C7) processus spinosus’u çok uzun ve çatalsızdır; servikal/torakal ortez (TLSO, CTLSO) ölçümlerinde boyun arkasında palpe edilen ilk belirgin kemik nirengi noktasıdır. Angulus Sterni (Louis Açısı) ise 2. kaburga hizasını gösterir.',
    examAlert:
      'SINAV UYARI KUTUSU: Atlas (C1) omurunun corpus’u (gövdesi) ve processus spinosus’u YOKTUR; Os occipitale ile Art. atlantooccipitalis yaparak "Evet" hareketini sağlar. Axis (C2) omuru ise Dens Axis (Processus odontoideus) çıkıntısına sahiptir ve Atlas ile Art. atlantoaxialis yaparak "Hayır" rotasyon hareketini sağlar!',
    tables: [
      {
        title: 'Yetişkin İskeleti (206 Kemik) Sayısal Dağılımı ve Omurga Bölgeleri',
        headers: ['İskelet Bölümü / Grup', 'Latince Adı', 'Kemik Sayısı', 'Detay ve Alt Elemanlar'],
        rows: [
          ['Aksiyal İskelet', 'Skeleton Axiale', '80 Kemik', 'Kafa (22) + Kulak kemikçikleri (6) + Os hyoideum (1) + Omurga (26) + Göğüs kafesi (25: Sternum 1 + Costae 24)'],
          ['Apendiküler İskelet', 'Skeleton Appendiculare', '126 Kemik', 'Membrum Superius / Üst Ekstremite (64) + Membrum Inferius / Alt Ekstremite (62)'],
          ['Boyun Omurları', 'Vertebrae Cervicales (C1-C7)', '7 Adet', 'C1: Atlas (gövdesiz), C2: Axis (Dens axis), C7: Vertebra prominens (uzun dikensi çıkıntı)'],
          ['Göğüs & Bel Omurları', 'Vertebrae Thoracicae (T1-T12) & Lumbales (L1-L5)', '12 + 5 Adet', 'Torakal omurlar kaburgalarla eklemleşir; Lumbal omurlar en kalın gövdeli yük taşıyıcılardır.'],
          ['Sağrı & Kuyruk Sokumu', 'Os Sacrum (1) & Os Coccygis (1)', '1 + 1 Adet (Erişkin)', 'Sacrum 5 omurun, Coccyx 3-4 omurun birleşmesiyle oluşur (Çocukta toplam 33-34 omur).'],
          ['Kaburgalar (12 Çift)', 'Costae Verae (1-7), Spuriae (8-10), Fluctuantes (11-12)', '24 Adet', '1-7 Gerçek (doğrudan sternuma), 8-10 Yalancı (7. kıkırdağa / Arcus costalis), 11-12 Yüzen (serbest).']
        ]
      }
    ],
    sections: [
      {
        heading: 'Tipik Omur Elemanları, Os Sacrum ve Sternum',
        latin: 'Vertebra, Os Sacrum (Promontorium) & Sternum (Angulus Sterni)',
        bullets: [
          'Tipik Omur: Önde ağırlık taşıyan Corpus vertebrae, arkada Arcus vertebrae (gövdeye tutunan Pediculus arcus vertebrae + arka çatı Lamina arcus vertebrae). Ortadaki Foramen vertebrale’ler üst üste dizilerek Canalis vertebralis’i (omurilik kanalı) oluşturur.',
          'Omur Çıkıntıları: Processus spinosus (arkaya tek dikensi), Processus transversus (yanlara çift), Processus articularis superior/inferior (komşu omurlarla eklemleşen çıkıntılar).',
          'Os Sacrum: Öne doğru yaptığı belirgin açısal çıkıntıya Promontorium denir. Yanlarda ilium ile eklemleşen Facies auricularis yüzeyi, içinde Canalis sacralis ve alt açıklığı Hiatus sacralis bulunur.',
          'Sternum (Göğüs Kemiği): Manubrium sterni (üstte Incisura jugularis çentiği), Corpus sterni (birleşim yerinde Angulus sterni / Louis açısı = 2. kaburga hizası) ve en altta Processus xiphoideus. Kaburgaların alt kenarında damar-sinir paketi geçen Sulcus costae oluğu yer alır.'
        ]
      }
    ],
    relatedConceptIds: ['FMA7485', 'FMA7486', 'FMA7487', 'FMA7488', 'FMA7574', 'FMA16202']
  },
  {
    id: 'ana-3',
    course: 'anatomi',
    number: 'Modül 3',
    title: 'Kafa Kemikleri (Ossa Cranii - 22 Kemik) ve Kafa Eklemleri',
    latinTitle: 'Neurocranium (8), Viscerocranium (14) & Articulatio Temporomandibularis',
    summary:
      'Kafa iskeletinde toplam 22 kemik bulunur: Beyni koruyan Neurocranium (8 kemik) ve yüz iskeletini oluşturan Viscerocranium (14 kemik). Kafa iskeletinin tek hareketli kemiği Mandibula, tek sinovyal eklemi ise Art. temporomandibularis’tir (TMJ).',
    examAlert:
      'KLİNİK KRİTİK BÖLGE - PTERION: Frontal, Parietal, Temporal ve Sphenoid (büyük kanat) kemiklerin birleştiği "H" şeklindeki kraniyal sütür bölgesidir. Kafatasının en zayıf noktasıdır! Derininden Arteria meningea media’nın ön dalı geçer; travmalarda yırtılması hayati risk taşıyan EPİDURAL HEMATOM’a yol açar! Ayrıca VII. kafa çifti (Nervus facialis) Os temporale’deki Foramen stylomastoideum deliğinden çıkar.',
    tables: [
      {
        title: 'Neurocranium (8) ve Viscerocranium (14) Kemikleri ile Kafa Eklemleri',
        headers: ['Grup / Kemik', 'Latince Adı ve Sayısı', 'Kritik Anatomik Oluşumlar ve Klinik Önemi'],
        rows: [
          ['Neurocranium (8 Kemik)', 'Os frontale (1), Os parietale (2), Os temporale (2), Os occipitale (1), Os sphenoidale (1), Os ethmoidale (1)', 'Beyin kafa çatısını oluşturur. Pterion bölgesinde Sulcus arteriae meningeae mediae bulunur.'],
          ['Viscerocranium (14 Kemik)', 'Maxilla (2), Os zygomaticum (2), Os nasale (2), Os lacrimale (2), Os palatinum (2), Concha nasalis inferior (2), Vomer (1), Mandibula (1)', 'Maxilla yüzün merkezindedir; Mandibula kafa iskeletinin TEK hareketli kemiğidir.'],
          ['Os Temporale (Şakak)', 'Pars squamosa, Pars petrosa (Pyramis), Pars tympanica, Pars mastoidea', 'Porus acusticus internus ve Canalis caroticus (Pars petrosa’da); Proc. mastoideus (SMC kası tutunur); Foramen stylomastoideum (N. facialis çıkar).'],
          ['Os Occipitale (Art Kafa)', 'Foramen magnum, Condylus occipitalis, Clivus, Inion', 'Foramen magnum’dan Medulla spinalis geçer; Condylus occipitalis Atlas (C1) ile eklemleşir; Clivus’a pons/bulbus oturur.'],
          ['Kafa Sütürleri & TMJ', 'Sutura serrata, Sutura squamosa, Sutura plana, Gomphosis & Art. temporomandibularis', 'Serrata: Testere dişi (Sutura sagittalis). Squamosa: Balık pulu (temporal-parietal). Plana: Düz (palatomaxillaris). Gomphosis: Diş-çene çivi eklemi.']
        ]
      }
    ],
    sections: [
      {
        heading: 'Çene Eklemi (Articulatio Temporomandibularis - TMJ)',
        latin: 'Caput Mandibulae + Fossa Mandibularis & Tuberculum Articulare',
        bullets: [
          'Kafa iskeletindeki TEK sinovyal (hareketli) eklemdir (Synovial / Bicondylaris).',
          'Mandibula’nın Caput mandibulae ucu ile Os temporale’nin (Pars squamosa) Fossa mandibularis ve Tuberculum articulare yapıları arasında oluşur.'
        ]
      }
    ],
    relatedConceptIds: ['FMA46565', 'FMA52734', 'FMA52745', 'FMA52741']
  },
  {
    id: 'ana-4',
    course: 'anatomi',
    number: 'Modül 4',
    title: 'Üst Ekstremite Kemikleri ve Eklemleri (Membrum Superius - 64 Kemik)',
    latinTitle: 'Cingulum Pectorale (4), Pars Libera (60), Art. Humeri & Art. Cubiti',
    summary:
      'Üst ekstremite 64 kemikten oluşur: Omuz kavşağı (Clavicula 2, Scapula 2) ve Serbest kısım (Humerus 2, Radius 2, Ulna 2, Ossa carpi 16, Ossa metacarpi 10, Phalanges 28).',
    orthoticNote:
      'KLİNİK NOT - COLLES KIRIĞI: Açık el üzerine düşme sonucu distal radius ucunun arkaya ve dışa deplase olduğu kırığa Colles Kırığı denir; yan radyografide tipik "Gümüş Çatal Deformitesi" görülür. El bileği ortezlemesinde (cock-up splint vb.) pozisyonlama kritiktir.',
    examAlert:
      'SINAV UYARI KUTUSU: Humerus kırıklarının en sık görüldüğü bölge Collum chirurgicum’dur; Epicondylus medialis arkasından N. ulnaris geçer. El bilek (Carpal) kemiklerinden EN ÇOK KIRILAN Os scaphoideum, EN ÇOK ÇIKIĞI GÖRÜLEN Os lunatum, EN BÜYÜK olanı ise Os capitatum’dur! Omuz eklemi (Art. humeri) vücudun en hareketli ve en sık çıkan eklemidir.',
    tables: [
      {
        title: 'El Bilek Kemikleri (Ossa Carpi - 8 Adet) ve Üst Ekstremite Eklemleri',
        headers: ['Sıra / Eklem', 'Lateralden Mediale (Başparmaktan Küçük Parmağa) / Oluşturan Yapılar', 'Klinik ve Biyomekanik Özellikler'],
        rows: [
          ['Ossa Carpi - Proksimal Sıra (4)', '[1] Os Scaphoideum → [2] Os Lunatum → [3] Os Triquetrum → [4] Os Pisiforme', 'Scaphoideum: En çok kırılan. Lunatum: En çok çıkan. Pisiforme: Sesamoid kemik yapısında.'],
          ['Ossa Carpi - Distal Sıra (4)', '[1] Os Trapezium → [2] Os Trapezoideum → [3] Os Capitatum → [4] Os Hamatum', 'Trapezium: 1. metakarp (başparmak) ile eklemleşir. Capitatum: En büyük karpal kemik. Hamatum: Çengel çıkıntılı (Hamulus ossis hamati).'],
          ['Art. Humeri (Omuz Eklemi)', 'Caput humeri + Cavitas glenoidalis (Scapula)', 'Art. Spheroidea (Top-Yuva). En hareketli ve en sık çıkan eklem. Bağlar: Lig. glenohumerale, coracohumerale, transversum humerale.'],
          ['Art. Cubiti (Dirsek - Bileşik Eklem)', '1. Art. humeroulnaris (Ginglymus/Menteşe)\n2. Art. humeroradialis (Spheroidea - yan hareket yapamaz)\n3. Art. radioulnaris proximalis (Trochoidea/Döner)', 'Humeroulnaris (Trochlea + Incisura trochlearis): Sadece Fleksiyon-Ekstansiyon.\nRadioulnaris (Circumferentia radii + Incisura radialis): Pronasyon ve Supinasyon!']
        ]
      }
    ],
    sections: [
      {
        heading: 'Clavicula, Scapula, Humerus, Radius ve Ulna Kritik Nirengileri',
        latin: 'Clavicula, Scapula, Humerus, Radius & Ulna',
        bullets: [
          'Clavicula: S şeklinde yatay kemik; iç ucu Extremitas sternalis, dış ucu Extremitas acromialis.',
          'Scapula: Arkada Spina scapulae (Fossa supraspinata ve infraspinata’ya böler, tepe noktası Acromion), önde Fossa subscapularis ve gaga çıkıntısı Processus coracoideus, dışta Cavitas glenoidalis.',
          'Humerus: Proksimalde Caput humeri, Collum anatomicum, Collum chirurgicum (en sık kırılan yer), Tuberculum majus/minus ve Sulcus intertubercularis. Distalde Trochlea humeri (ulna ile), Capitulum humeri (radius ile), Fossa olecrani ve Epicondylus medialis (N. ulnaris komşuluğu).',
          'Radius (Lateral / Başparmak tarafı): Caput radii, Tuberositas radii (biceps tutunur), distalde Processus styloideus radii ve Incisura ulnaris.',
          'Ulna (Medial / Küçük parmak tarafı): Proksimalde dirsek çıkıntısı Olecranon, Processus coronoideus, Incisura trochlearis ve Incisura radialis.'
        ]
      }
    ],
    relatedConceptIds: ['FMA13321', 'FMA13394', 'FMA13303', 'FMA23463', 'FMA23466', 'FMA9677']
  },
  {
    id: 'ana-5',
    course: 'anatomi',
    number: 'Modül 5',
    title: 'Alt Ekstremite Kemikleri, Pelvis ve Kalça Eklemi (Membrum Inferius - 62 Kemik)',
    latinTitle: 'Cingulum Pelvicum (Os Coxae), Femur, Tibia, Fibula, Ossa Tarsi & Art. Coxae',
    summary:
      'Alt ekstremite 62 kemikten oluşur: Kalça kavşağı (Os coxae 2) ve Serbest kısım (Femur 2, Patella 2, Tibia 2, Fibula 2, Ossa tarsi 14, Ossa metatarsi 10, Phalanges 28). Os coxae; Ilium, Ischium ve Pubis’in Acetabulum’da birleşmesiyle (Synostosis) oluşur.',
    orthoticNote:
      'ORTEZ-PROTEZ KRİTİK NİRENGİLER: (1) SIAS (Spina iliaca anterior superior): Bacak boyu ölçümünde ana nirengi noktasıdır. (2) Tuber ischiadicum: Oturma kemiğidir; transfemoral (diz üstü) ischiyal yüklemeli protez soketlerinde en kritik yük taşıma alanıdır. (3) Tuberositas tibiae: PTB protez ve ortezlerde basınç/yükleme nirengisidir. (4) Collum fibulae: Derininden Nervus fibularis (peroneus) communis geçer; ortez/alçı basısında DÜŞÜK AYAK (Foot Drop) gelişir ve AFO ortezi gerektirir!',
    examAlert:
      'SINAV UYARI KUTUSU: Bacakta vücut ağırlığını medialdeki kalın kemik TİBİA taşır; lateraldeki ince FİBULA vücut ağırlığını TAŞIMAZ (sadece kas tutunma alanı sağlar ve Malleolus lateralis’i oluşturur). Bacak kemikleriyle eklemleşen TEK tarsal kemik TALUS’tur; en büyük tarsal kemik ise CALCANEUS’tur (topuk kemiği). Vücudun en büyük sesamoid kemiği PATELLA’dır (M. quadriceps femoris tendonu içinde).',
    tables: [
      {
        title: 'Alt Ekstremite Kemikleri ve Ayak Bilek Kemikleri (Ossa Tarsi - 7 Adet)',
        headers: ['Kemik / Grup', 'Latince Oluşumlar', 'Klinik ve Biyomekanik Önemi'],
        rows: [
          ['Os Coxae (Ilium + Ischium + Pubis)', 'Crista iliaca, SIAS, SIPS, Tuber ischiadicum, Symphysis pubica, Acetabulum (Facies lunata), Foramen obturatum', 'SIAS: Bacak boyu ölçümü. Tuber ischiadicum: Protez soket yük taşıma alanı. Acetabulum derinliğini Labrum acetabulare artırır.'],
          ['Femur (Uyluk Kemiği)', 'Caput femoris (Fovea capitis), Collum femoris, Trochanter major/minor, Condylus medialis/lateralis', 'Vücudun en uzun, en ağır ve en güçlü kemiğidir. Yaşlılarda en sık Collum femoris kırığı görülür.'],
          ['Tibia (Medial) & Fibula (Lateral)', 'Tibia: Tuberositas tibiae, Malleolus medialis.\nFibula: Caput/Collum fibulae, Malleolus lateralis.', 'Tibia ağırlık taşır; Fibula ağırlık TAŞIMAZ. Collum fibulae basısı → N. peroneus communis hasarı → Düşük Ayak (Foot Drop)!'],
          ['Ossa Tarsi (7 Adet)', 'Proksimal: Talus, Calcaneus.\nDistal: Os naviculare (medial), Os cuboideum (lateral), 3 Ossa cuneiformia (mediale, intermedium, laterale).', 'Talus: Bacakla eklemleşen tek tarsal kemik. Calcaneus: En büyük tarsal kemik. Metatarslar (I-V) ayak arklarını oluşturur.'],
          ['Art. Coxae (Kalça Eklemi)', 'Caput femoris + Acetabulum (Enarthrosis sphaeroidea / Derin top-yuva)', '3 eksende tüm hareketleri yapar. Çok güçlü bağlarla (Lig. iliofemorale, pubofemorale, ischiofemorale) desteklenir.']
        ]
      }
    ],
    sections: [
      {
        heading: 'Alt Ekstremite Biyomekaniği Özeti',
        latin: 'Patella, Tibia, Fibula & Pes',
        bullets: [
          'Patella (Diz kapağı): Vücudun en büyük sesamoid kemiğidir; M. quadriceps femoris tendonu içinde yer alarak kaldıraç kolunu uzatır ve kasın kuvvet kazancını artırır.',
          'Ayak İskeleti: 7 Tarsal, 5 Metatarsal (I. Metatars = Başparmak/Hallux tarafı; longitudinal ve transvers ayak arklarını oluşturur) ve 14 Falanks (Hallux’ta 2, diğer parmaklarda 3’er adet).'
        ]
      }
    ],
    relatedConceptIds: ['FMA16585', 'FMA9611', 'FMA24485', 'FMA24476', 'FMA24479', 'FMA9674']
  },
  {
    id: 'ana-6',
    course: 'anatomi',
    number: 'Modül 6',
    title: 'Diz Eklemi (Articulatio Genus), Bağları ve Kilitlenme Biyomekaniği',
    latinTitle: 'Articulatio Genus (Bicondylaris), Menisci, Ligamenta & Vida-Yuva Mekanizması',
    summary:
      'Diz eklemi (Articulatio genus) vücudun en büyük, en komplike ve en geniş eklem boşluğuna sahip eklemidir (Art. bicondylaris / Modifiye ginglymus). Duruş ve yürümede vücut ağırlığının 2 ila 5 katı yük taşır.',
    orthoticNote:
      'KLİNİK PATOLOJİ - MUTSUZ ÜÇLÜ (UNHAPPY TRIAD / BLOWN KNEE): Dize dış taraftan (lateralden) gelen şiddetli valgus travmalarında aynı anda 3 yapı birden yırtılır: (1) Meniscus Medialis + (2) Ligamentum Collaterale Tibiale (MCL) + (3) Ligamentum Cruciatum Anterius (LCA). Ameliyat ve sonrasında özel donanımlı diz ortezleri (ROM walker / rijit breys) gerektirir.',
    examAlert:
      'SINAV UYARI KUTUSU: Meniscus medialis "C" harfi şeklindedir ve MCL’ye (Lig. collaterale tibiale) sıkıca yapışık olduğu için yırtık riski ÇOK YÜKSEKTİR! Meniscus lateralis "O" şeklindedir ve daha hareketlidir. LCA tibia’nın femur üzerinde ÖNE kaymasını, LCP ise ARKAYA kaymasını engeller. Vida-Ev kilitlenme mekanizmasında ekstansiyonun son 30°’sinde ayak/bacak sabitse (kapalı zincir) FEMUR İÇ ROTASYON yapar; uyluk sabitse (açık zincir) TİBİA DIŞ ROTASYON yapar! Kilidi açan kas M. popliteus’tur.',
    tables: [
      {
        title: 'İç ve Dış Menisküs ile Diz Bağları Karşılaştırma Tablosu',
        headers: ['Yapı / Bağ', 'Şekil / Konum', 'Biyomekanik Görevi ve Klinik Önemi'],
        rows: [
          ['Meniscus Medialis (İç Menisküs)', '"C" harfi şeklinde geniş halkalı', 'Daha az hareketlidir; eklem kapsülüne ve Lig. collaterale tibiale’ye (MCL) sıkıca yapışıktır → Yırtık riski ÇOK YÜKSEKTİR!'],
          ['Meniscus Lateralis (Dış Menisküs)', '"O" harfi şeklinde kapalı daire', 'Daha hareketlidir, bağlara doğrudan yapışmaz → Yırtılma riski daha düşüktür.'],
          ['Lig. Collaterale Tibiale (MCL) & Fibulare (LCL)', 'Dış (Ekstrakapsüler) yan bağlar', 'MCL: Meniscus medialis’e tutunan TEK bağdır; dize VALGUS zorlamalarına karşı en önemli stabilizatördür. LCL: Varus zorlamalarına karşı korur.'],
          ['Lig. Cruciatum Anterius (LCA - Ön Çapraz)', 'İntrakapsüler (Tibia ön → Femur dış kondil iç yüzü)', 'Tibia’nın Femur üzerinde ÖNE doğru kaymasını engeller.'],
          ['Lig. Cruciatum Posterius (LCP - Arka Çapraz)', 'İntrakapsüler (Tibia arka → Femur iç kondil iç yüzü)', 'LCA’ya göre daha güçlüdür. Tibia’nın Femur üzerinde ARKAYA doğru kaymasını engeller.'],
          ['Vida-Ev Kilitlenme (Son 30° Ekstansiyon)', 'Kapalı Zincir vs Açık Zincir', 'Ayak Sabit (Ayağa kalkma): Femur İÇ ROTASYON yapar.\nUyluk Sabit (Otururken bacak uzatma): Tibia DIŞ ROTASYON yapar.\nKilidi açan kas: M. popliteus!']
        ]
      }
    ],
    sections: [
      {
        heading: 'Diz Eklemi Kilitlenme (Vida-Ev Eksenli) Biyomekaniği',
        latin: 'Transvers Eksen Kayması & Musculus Popliteus',
        bullets: [
          'Transvers Eksen Kayması: Femur kondillerinin medial ve lateral uzunluk/kavis farkı nedeniyle dönme ekseni sabit değildir; ekstansiyonda öne ve yukarı, fleksiyonda aşağı ve arkaya kayar.',
          'Kapalı Kinematik Zincir (Ayak/Bacak Sabit - Örn: Ayağa kalkma): Ekstansiyonun son 30°’sinde femur (uyluk) tibia üzerinde İÇ ROTASYON yaparak eklemi kilitler. Fleksiyon başlangıcında femur DIŞ ROTASYON yaparak kilidi açar (M. popliteus kası ile).',
          'Açık Kinematik Zincir (Uyluk Sabit / Bacak Serbest - Örn: Otururken bacağı uzatma): Ekstansiyon sonunda serbest bacak (tibia) DIŞ ROTASYON yaparak kilitlenir; fleksiyon başında bacak İÇ ROTASYON yaparak kilit açılır.'
        ]
      }
    ],
    relatedConceptIds: ['FMA24477', 'FMA24485', 'FMA24474', 'FMA24476']
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    category: 'fizyoloji',
    question: 'Peroksizom (Peroxisoma) organelinin zehirli hidrojen peroksidi (H₂O₂) su ve oksijene parçalayarak detoksifiye etmesini sağlayan temel enzim hangisidir?',
    options: ['Asit hidrolaz', 'Katalaz', 'Asetilkolinesteraz (AChE)', 'cGMP fosfodiesteraz'],
    correctIndex: 1,
    explanation: 'Lizozom asit hidrolazlar ile hücre içi sindirim yaparken, Peroksizom KATALAZ enzimi ile H₂O₂ → H₂O + O₂ detoksifikasyonu sağlar.'
  },
  {
    id: 'q2',
    category: 'fizyoloji',
    question: 'İskelet kası kasılmasında Sarkoplazmik Retikulumdan (SR) salınan kalsiyum (Ca²⁺) iyonları ince filament üzerindeki hangi proteine bağlanır?',
    options: ['Troponin I', 'Troponin T', 'Troponin C', 'Tropomiyozin'],
    correctIndex: 2,
    explanation: 'Serbest kalan Ca²⁺ iyonları Troponin C alt ünitesine bağlanarak tropomiyozinin aktinin aktif noktaları üzerinden çekilmesini sağlar.',
    conceptId: 'FMA5022'
  },
  {
    id: 'q3',
    category: 'fizyoloji',
    question: 'Sarkomer yapısında kas kasılması sırasında boyu DEĞİŞMEYEN bant hangisidir?',
    options: ['I Bandı', 'H Bandı', 'A Bandı', 'İki Z çizgisi arası mesafe'],
    correctIndex: 2,
    explanation: 'A Bandı kalın (miyozin) filamentlerin boyunu kapsar ve kasılma sırasında boyu değişmez. I ve H bantları ise daralır.',
    conceptId: 'FMA5022'
  },
  {
    id: 'q4',
    category: 'fizyoloji',
    question: 'Deride derin basınç ve titreşim (vibrasyon) duyusunu algılayan ve ortez temas noktalarında kritik öneme sahip mekanoreseptör hangisidir?',
    options: ['Pacini Cisimciği', 'Meissner Cisimciği', 'Ruffini Cisimciği', 'Krause Cisimciği'],
    correctIndex: 0,
    explanation: 'Pacini Cisimciği (Corpusculum lamellosum) derin basınç ve vibrasyona duyarlıdır; Meissner hafif dokunmaya, Ruffini deri gerilimi ve sıcağa duyarlıdır.'
  },
  {
    id: 'q5',
    category: 'fizyoloji',
    question: 'Ağrı (nosisepsiyon) iletiminde hızlı, keskin ve batıcı ağrıyı taşıyan lifler ile yavaş, kronik ve yanıcı ağrıyı taşıyan lifler sırasıyla hangileridir?',
    options: [
      'Miyelinsiz C lifleri — Miyelinli A-delta (Aδ) lifleri',
      'Miyelinli A-delta (Aδ) lifleri — Miyelinsiz C lifleri',
      'Miyelinli B lifleri — Miyelinsiz A-beta lifleri',
      'Purkinje lifleri — His demeti lifleri'
    ],
    correctIndex: 1,
    explanation: 'A-delta (Aδ) lifleri miyelinlidir ve hızlı, keskin, batıcı ağrıyı taşır; C lifleri miyelinsizdir ve yavaş, kronik, künt/yanıcı ağrıyı taşır.'
  },
  {
    id: 'q6',
    category: 'fizyoloji',
    question: 'Fototransdüksiyon sürecinde retinaya ışık düştüğünde fotoreseptör hücrede hangi elektriksel ve kimyasal değişim gerçekleşir?',
    options: [
      'cGMP artar, Na⁺ kanalları açılır, hücre depolarize olur ve glutamat artar',
      'cGMP düşer, katyon kanalları kapanır, hücre hiperpolarize olur ve glutamat salınımı azalır',
      'Rodopsin parçalanmaz, K⁺ kanalları kapanır ve asetilkolin salınır',
      'Transdusin inhibe olur ve hücre aksiyon potansiyeli ateşler'
    ],
    correctIndex: 1,
    explanation: 'Işık → Rodopsin → Transdusin → cGMP fosfodiesteraz aktifleşir → cGMP düşer → Na⁺-Ca²⁺ kanalları kapanır → hücre HİPERPOLARİZE olur ve glutamat azalır.',
    conceptId: 'FMA58238'
  },
  {
    id: 'q7',
    category: 'fizyoloji',
    question: 'Kan plazmasında onkotik (osmotik) basıncı oluşturan (%60 oranla) ve eksikliğinde dokularda ödeme yol açan en önemli plazma proteini hangisidir?',
    options: ['Fibrinojen', 'Gama globülin (İmmünoglobulin)', 'Albümin', 'Transferrin'],
    correctIndex: 2,
    explanation: 'Albümin plazma proteinlerinin %60’ını oluşturur ve kanın onkotik basıncını sağlayarak suyun damar dışına sızmasını engeller.'
  },
  {
    id: 'q8',
    category: 'fizyoloji',
    question: 'Koku duyusu hariç tüm duyusal sinyallerin serebral kortekse iletilmeden önce toplandığı ve işlendiği ara beyin (Diensefalon) merkezi neresidir?',
    options: ['Hipotalamus (Hypothalamus)', 'Talamus (Thalamus)', 'Epitalamus (Glandula pinealis)', 'Subtalamus'],
    correctIndex: 1,
    explanation: 'Talamus koku duyusu hariç tüm duyuların kortekse çıkmadan önceki "duyu kapısı"dır. Koku duyusu talamusa uğramadan doğrudan kortekse gider.',
    conceptId: 'FMA62007'
  },
  {
    id: 'q9',
    category: 'fizyoloji',
    question: 'Kalbin doğal pacemaker’ı (ritim merkezi) neresidir ve Kardiyak Siklusta 1. Kalp Sesi (S1) nasıl oluşur?',
    options: [
      'AV Düğüm (40-60/dk) — Semilunar kapakların kapanmasıyla',
      'Sinoatriyal (SA) Düğüm (60-80/dk) — İzovolümetrik kasılma başında AV kapakların (Triküspit/Mitral) kapanmasıyla',
      'His Demeti (80-100/dk) — Aort kapağının açılmasıyla',
      'Purkinje Lifleri (60-80/dk) — Ventrikül doluş döneminde'
    ],
    correctIndex: 1,
    explanation: 'SA düğüm sağ atriyumda dakikada 60-80 uyarı üretir. İzovolümetrik kasılma başında AV kapakların kapanması S1’i, ejeksiyon sonunda semilunar kapakların kapanması S2’yi oluşturur.',
    conceptId: 'FMA7088'
  },
  {
    id: 'q10',
    category: 'klinik',
    question: 'Bir Ortez-Protez uzmanı hastanın kas aktivitesini EMG ile değerlendirirken nöromüsküler kavşakta Asetilkolinesteraz (AChE) enziminin bloke edildiğini gözlemlerse kas gevşemesi nasıl etkilenir?',
    options: [
      'Kas hemen gevşer ve flaksid paralizi gelişir',
      'Asetilkolin parçalanamaz, Ca²⁺ SR’ye geri pompalanamaz ve kas gevşeyemez (sürekli kasılı/tetanik kalır)',
      'Troponin C kalsiyumu hemen bırakır ancak ATP üretimi durur',
      'T-tübülleri kapanır ve aksiyon potansiyeli oluşmaz'
    ],
    correctIndex: 1,
    explanation: 'AChE bloke olursa sinaptik aralıktaki asetilkolin parçalanamaz, motor uç plakta depolarizasyon sürer, Ca²⁺ SR’ye geri pompalanamaz ve kas tetanik kasılı kalır.'
  },
  {
    id: 'q11',
    category: 'anatomi',
    question: 'Eklem açısal ölçümleri (Goniometre) yapılırken Fleksiyon/Ekstansiyon ve Abduksiyon/Adduksiyon hareketleri sırasıyla hangi eksenler (Axes) etrafında gerçekleşir?',
    options: [
      'Axis Transversalis (Enine) — Axis Sagittalis (Okusal)',
      'Axis Verticalis (Dikey) — Axis Transversalis (Enine)',
      'Axis Sagittalis (Okusal) — Axis Verticalis (Dikey)',
      'Planum Medianum — Axis Verticalis'
    ],
    correctIndex: 0,
    explanation: 'Fleksiyon/Ekstansiyon Axis Transversalis’te, Abduksiyon/Adduksiyon Axis Sagittalis’te, Rotasyon (pronasyon/supinasyon) ise Axis Verticalis’te gerçekleşir.'
  },
  {
    id: 'q12',
    category: 'anatomi',
    question: 'Erişkin insan iskeletindeki toplam kemik sayısı ile Aksiyal ve Apendiküler iskelet dağılımı hangisinde doğru verilmiştir?',
    options: [
      'Toplam 206 Kemik: Aksiyal (80) + Apendiküler (126: Üst 64, Alt 62)',
      'Toplam 206 Kemik: Aksiyal (126) + Apendiküler (80: Üst 40, Alt 40)',
      'Toplam 214 Kemik: Aksiyal (84) + Apendiküler (130)',
      'Toplam 206 Kemik: Aksiyal (70) + Apendiküler (136)'
    ],
    correctIndex: 0,
    explanation: 'Erişkinde 206 kemik vardır: Skeleton axiale = 80 kemik (Kafa 22, Kulak 6, Hyoid 1, Omurga 26, Göğüs kafesi 25) ve Skeleton appendiculare = 126 kemik (Üst 64, Alt 62).'
  },
  {
    id: 'q13',
    category: 'anatomi',
    question: 'Gövdesi (corpus) ve processus spinosus’u OLMAYAN 1. boyun omuru ile diş şeklinde Dens Axis çıkıntısına sahip 2. boyun omuru hangileridir?',
    options: [
      'Axis (C1) ve Vertebra Prominens (C2)',
      'Atlas (C1) ve Axis (C2)',
      'Atlas (C1) ve Os Sacrum (C2)',
      'Vertebra Prominens (C7) ve Atlas (C1)'
    ],
    correctIndex: 1,
    explanation: 'Atlas (C1) gövdesizdir ve "Evet" hareketini (Art. atlantooccipitalis) yapar; Axis (C2) Dens Axis çıkıntısına sahiptir ve "Hayır" rotasyon hareketini (Art. atlantoaxialis) yapar.'
  },
  {
    id: 'q14',
    category: 'klinik',
    question: 'Kafatasında Frontal, Parietal, Temporal ve Sphenoid kemiklerin birleştiği "H" şeklindeki en zayıf nokta (Pterion) kırıklarında hangi arter yırtılarak Epidural Hematom’a yol açar?',
    options: [
      'Arteria carotis externa',
      'Arteria meningea media (ön dalı)',
      'Arteria vertebralis',
      'Vena jugularis interna'
    ],
    correctIndex: 1,
    explanation: 'Pterion derininden Arteria meningea media’nın ön dalı geçer; travmada yırtılması hayati tehlike oluşturan Epidural Hematom’a neden olur.',
    conceptId: 'FMA46565'
  },
  {
    id: 'q15',
    category: 'klinik',
    question: 'Açık el üzerine düşme sonucu distal Radius ucunun arkaya/dışa deplase olmasıyla "Gümüş Çatal Deformitesi" oluşturan kırık ve el bileğinde en sık kırılan karpal kemik hangisidir?',
    options: [
      'Colles Kırığı — Os Scaphoideum',
      'Smith Kırığı — Os Lunatum',
      'Pott Kırığı — Os Pisiforme',
      'Boxer Kırığı — Os Capitatum'
    ],
    correctIndex: 0,
    explanation: 'Distal radius kırığı Colles Kırığı ("Gümüş Çatal Deformitesi") olarak bilinir. Karpal kemiklerden en çok kırılan Os scaphoideum, en çok çıkan ise Os lunatum’dur.',
    conceptId: 'FMA23463'
  },
  {
    id: 'q16',
    category: 'klinik',
    question: 'Transfemoral (diz üstü) protez soket tasarımında oturma sırasında vücut ağırlığının bindiği ana nirengi noktası ve Collum fibulae basısında hasarlanarak "Düşük Ayak (Foot Drop)" yapan sinir hangisidir?',
    options: [
      'SIAS — Nervus femoralis',
      'Tuber Ischiadicum — Nervus Fibularis (Peroneus) Communis',
      'Trochanter Major — Nervus tibialis',
      'Malleolus Lateralis — Nervus obturatorius'
    ],
    correctIndex: 1,
    explanation: 'Tuber ischiadicum (Os ischium) ischiyal yüklemeli soketlerin ana yük taşıma noktasıdır. Collum fibulae derininden geçen N. peroneus communis basısında düşük ayak gelişir (AFO ortezi gerekir).',
    conceptId: 'FMA16585'
  },
  {
    id: 'q17',
    category: 'klinik',
    question: 'Dize dıştan (lateralden) gelen şiddetli darbelerde aynı anda yırtılan "Mutsuz Üçlü (Unhappy Triad)" yapıları hangileridir?',
    options: [
      'Meniscus Lateralis + LCL + LCP',
      'Meniscus Medialis + Lig. Collaterale Tibiale (MCL) + Lig. Cruciatum Anterius (LCA)',
      'Lig. Patellae + Meniscus Lateralis + LCA',
      'Meniscus Medialis + LCL + Lig. Popliteum Obliquum'
    ],
    correctIndex: 1,
    explanation: 'MCL, Meniscus medialis’e sıkıca yapışıktır; lateralden gelen valgus travmasında Meniscus medialis + MCL + LCA birlikte yırtılır (Mutsuz Üçlü).',
    conceptId: 'FMA24477'
  },
  {
    id: 'q18',
    category: 'anatomi',
    question: 'Diz ekleminin vida-ev (kilitlenme) biyomekaniğinde ekstansiyonun son 30°’sinde ayak sabitken (ayağa kalkarken) gerçekleşen kilitlenme rotasyonu ve kilidi açan kas hangisidir?',
    options: [
      'Femur tibia üzerinde İÇ ROTASYON yapar — Kilidi M. popliteus açar',
      'Femur tibia üzerinde DIŞ ROTASYON yapar — Kilidi M. quadriceps femoris açar',
      'Tibia femur üzerinde İÇ ROTASYON yapar — Kilidi M. gastrocnemius açar',
      'Patella yukarı kayar — Kilidi M. sartorius açar'
    ],
    correctIndex: 0,
    explanation: 'Kapalı kinematik zincirde (ayak sabitken) ekstansiyonun son 30°’sinde femur İÇ rotasyon yaparak dizi kilitler; fleksiyona başlarken M. popliteus femura dış rotasyon yaptırarak kilidi açar.',
    conceptId: 'FMA24477'
  }
];

export const FLASHCARDS: FlashcardItem[] = [
  { id: 'f1', latin: 'Lysosoma vs. Peroxisoma', turkish: 'Lizozom ve Peroksizom Enzim Farkı', category: 'Hücre Fizyolojisi', detail: 'Lizozom: Asit hidrolazlar (hücre içi sindirim & apoptoz).\nPeroksizom: Katalaz enzimi (H₂O₂ → H₂O + O₂ detoksifikasyonu).' },
  { id: 'f2', latin: 'Reticulum Sarcoplasmicum & Trias', turkish: 'Sarkoplazmik Retikulum ve Triad', category: 'Kas Fizyolojisi', detail: 'Kas hücresinde Ca²⁺ depolayan ER formudur. Triad = 1 T-tübülü + iki yanındaki 2 SR sisternası (Her sarkomerde 2 T-tübülü vardır).' },
  { id: 'f3', latin: 'Sarcomerum (A, I, H Bantları)', turkish: 'Sarkomer Bant Değişimleri', category: 'Kas Fizyolojisi', detail: 'Kasılmada A Bandı (kalın miyozin boyu) DEĞİŞMEZ! I Bandı (sadece aktin) ve H Bandı (sadece miyozin) daralır/kaybolur.' },
  { id: 'f4', latin: 'Troponinum C, I, T & Titinum', turkish: 'Kasılma Düzenleyici Proteinler', category: 'Kas Fizyolojisi', detail: 'Troponin C: Ca²⁺ bağlar. Troponin I: Aktini inhibe eder. Troponin T: Tropomiyozine bağlanır. Titin: Sarkomeri esnetip istirahate döndürür.' },
  { id: 'f5', latin: 'Corpusculum Lamellosum (Pacini)', turkish: 'Pacini Cisimciği', category: 'Duyusal Fizyoloji', detail: 'Derin basınç ve titreşime (vibrasyon) duyarlı mekanoreseptördür. Ortez temas noktalarındaki titreşim algısı için kritiktir.' },
  { id: 'f6', latin: 'A-delta (Aδ) vs. C Lifleri', turkish: 'Ağrı (Nosisepsiyon) İletim Lifleri', category: 'Duyusal Fizyoloji', detail: 'A-delta: Miyelinli, hızlı, keskin ve batıcı ağrı.\nC Lifleri: Miyelinsiz, yavaş, kronik, künt ve yanıcı ağrı.' },
  { id: 'f7', latin: 'Phototransductio (Retina)', turkish: 'Fototransdüksiyon Mekanizması', category: 'Özel Duyular', detail: 'Işık → Rodopsin → Transdusin → cGMP PDE aktif → cGMP düşer → Na⁺-Ca²⁺ kanalları KAPANIR → Fotoreseptör HİPERPOLARİZE olur → Glutamat azalır.' },
  { id: 'f8', latin: 'Albuminum & Erythrocytus', turkish: 'Albümin ve Eritrosit Özellikleri', category: 'Kan Fizyolojisi', detail: 'Albümin (%60): Kanın onkotik basıncını oluşturur, ödemi önler.\nEritrosit: Çekirdek, ribozom, mitokondri içermez; anaerobik glikoliz yapar.' },
  { id: 'f9', latin: 'Thalamus & Hypothalamus', turkish: 'Ara Beyin (Diensefalon) Merkezleri', category: 'Sinir Fizyolojisi', detail: 'Talamus: Koku hariç tüm duyuların toplanma kapısı.\nHipotalamus: Açlık, susuzluk, ısı, otonom sistem ve hipofiz kontrol merkezi.' },
  { id: 'f10', latin: 'Nodus Sinuatrialis (SA) & S1-S2', turkish: 'Kalp İleti Sistemi ve Kalp Sesleri', category: 'Dolaşım Fizyolojisi', detail: 'SA Düğüm: Doğal pacemaker (60-80/dk). AV Düğüm: 0.1 sn gecikme.\nS1: AV kapakların kapanması. S2: Semilunar kapakların kapanması.' },
  { id: 'f11', latin: 'Axes (Verticalis, Transversalis, Sagittalis)', turkish: 'Vücut Eksenleri ve Eklem Hareketleri', category: 'Genel Anatomi', detail: 'Axis Verticalis: Rotasyon (Pronasyon/Supinasyon).\nAxis Transversalis: Fleksiyon / Ekstansiyon.\nAxis Sagittalis: Abduksiyon / Adduksiyon.' },
  { id: 'f12', latin: 'Atlas (C1), Axis (C2) & Prominens (C7)', turkish: 'Atipik Boyun Omurları', category: 'Aksiyal İskelet', detail: 'Atlas (C1): Corpus ve proc. spinosus yoktur ("Evet" hareketi).\nAxis (C2): Dens axis çıkıntısı vardır ("Hayır" hareketi).\nC7: İlk palpe edilen uzun proc. spinosus.' },
  { id: 'f13', latin: 'Pterion & Arteria Meningea Media', turkish: 'Pterion Noktası ve Klinik Önemi', category: 'Kafa İskeleti', detail: 'Frontal + Parietal + Temporal + Sphenoid birleşimi ("H" sütürü). Kırığında A. meningea media yırtılır → Epidural Hematom!' },
  { id: 'f14', latin: 'Foramen Stylomastoideum', turkish: 'Stilomastoid Delik (Os Temporale)', category: 'Kafa İskeleti', detail: 'Os temporale’de Processus styloideus ile Processus mastoideus arasındadır; içinden Nervus Facialis (VII. kafa çifti) çıkar.' },
  { id: 'f15', latin: 'Ossa Carpi (Scaphoideum & Lunatum)', turkish: 'El Bilek Kemikleri Kırık/Çıkıkları', category: 'Üst Ekstremite', detail: 'Proksimal: Scaphoideum (En çok kırılan), Lunatum (En çok çıkan), Triquetrum, Pisiforme.\nDistal: Trapezium, Trapezoideum, Capitatum (En büyük), Hamatum.' },
  { id: 'f16', latin: 'Tuber Ischiadicum & SIAS', turkish: 'Pelvis Ortez-Protez Nirengileri', category: 'Alt Ekstremite', detail: 'SIAS: Bacak boyu ölçümü ana nirengisi.\nTuber Ischiadicum: Oturma kemiği; ischiyal yüklemeli protez soketlerinin ana yük taşıma noktası.' },
  { id: 'f17', latin: 'Collum Fibulae & N. Peroneus Communis', turkish: 'Fibula Boynu ve Düşük Ayak', category: 'Alt Ekstremite', detail: 'Fibula ağırlık TAŞIMAZ. Collum fibulae derininden N. fibularis (peroneus) communis geçer; basısında Düşük Ayak (Foot Drop) oluşur (AFO gerekir).' },
  { id: 'f18', latin: 'Unhappy Triad (Mutsuz Üçlü)', turkish: 'Diz Eklemi Mutsuz Üçlü Yaralanması', category: 'Diz Biyomekaniği', detail: 'Lateralden gelen darbeyle aynı anda yırtılan 3 yapı:\n1. Meniscus Medialis ("C" şekilli)\n2. Lig. Collaterale Tibiale (MCL)\n3. Lig. Cruciatum Anterius (LCA)' }
];

export const MATCH_PAIRS: MatchPair[] = [
  { id: 'm1', left: 'Peroksizom (Peroxisoma)', right: 'Katalaz enzimi ile H₂O₂ detoksifikasyonu', category: 'organel' },
  { id: 'm2', left: 'Lizozom (Lysosoma)', right: 'Asit hidrolazlar ile hücre içi sindirim', category: 'organel' },
  { id: 'm3', left: 'Sarkoplazmik Retikulum (SR)', right: 'Kas hücresinde Ca²⁺ iyonu depolama', category: 'organel' },
  { id: 'm4', left: 'Pacini Cisimciği', right: 'Derin basınç ve titreşim (vibrasyon) algısı', category: 'reseptor' },
  { id: 'm5', left: 'Meissner & Merkel Diski', right: 'Hafif dokunma ve yüzeysel basınç algısı', category: 'reseptor' },
  { id: 'm6', left: 'A-delta (Aδ) Sinir Lifleri', right: 'Miyelinli, hızlı ve keskin ağrı iletimi', category: 'reseptor' },
  { id: 'm7', left: 'Articulatio Humeri (Omuz)', right: 'Art. Spheroidea — En hareketli ve en sık çıkan eklem', category: 'eklem' },
  { id: 'm8', left: 'Articulatio Humeroulnaris', right: 'Ginglymus (Menteşe) — Yalnızca fleksiyon ve ekstansiyon', category: 'eklem' },
  { id: 'm9', left: 'Articulatio Radioulnaris Prox.', right: 'Art. Trochoidea (Döner) — Pronasyon ve supinasyon', category: 'eklem' },
  { id: 'm10', left: 'Articulatio Temporomandibularis', right: 'Kafa iskeletindeki tek hareketli (sinovyal) eklem', category: 'eklem' },
  { id: 'm11', left: 'Atlas (C1 Omuru)', right: 'Corpus ve proc. spinosus yoktur ("Evet" hareketi)', category: 'kemik' },
  { id: 'm12', left: 'Axis (C2 Omuru)', right: 'Dens Axis çıkıntısına sahiptir ("Hayır" rotasyonu)', category: 'kemik' },
  { id: 'm13', left: 'Os Scaphoideum', right: 'En sık kırılan el bileği (karpal) kemiği', category: 'kemik' },
  { id: 'm14', left: 'Tuber Ischiadicum', right: 'Protez soketlerde oturma yükü taşıyan nirengi', category: 'kemik' },
  { id: 'm15', left: 'Lig. Cruciatum Anterius (LCA)', right: 'Tibia’nın femur üzerinde ÖNE kaymasını engeller', category: 'kas' },
  { id: 'm16', left: 'Musculus Popliteus', right: 'Tam ekstansiyonda kilitlenen diz eklemini çözen kas', category: 'kas' }
];

export const BODY_CHALLENGES: FindOnBodyChallenge[] = [
  {
    id: 'b1',
    conceptId: 'FMA9611',
    latin: 'Femur (Os femoris)',
    turkish: 'Uyluk Kemiği',
    system: 'skeletal',
    clue: 'Vücudun en uzun, en ağır ve en güçlü kemiğidir; yaşlılarda boyun (Collum femoris) kırığı sık görülür.'
  },
  {
    id: 'b2',
    conceptId: 'FMA24476',
    latin: 'Tibia',
    turkish: 'Kaval Kemiği',
    system: 'skeletal',
    clue: 'Bacağın medialinde yer alan ve vücut ağırlığını taşıyan kalın kemiktir; ön yüzünde Tuberositas tibiae bulunur.'
  },
  {
    id: 'b3',
    conceptId: 'FMA24479',
    latin: 'Fibula',
    turkish: 'Kamış Kemiği',
    system: 'skeletal',
    clue: 'Bacağın lateralinde yer alır, vücut ağırlığını TAŞIMAZ. Boyun (Collum fibulae) basısında Düşük Ayak gelişir.'
  },
  {
    id: 'b4',
    conceptId: 'FMA24485',
    latin: 'Patella',
    turkish: 'Diz Kapağı Kemiği',
    system: 'skeletal',
    clue: 'M. quadriceps femoris tendonu içinde yer alan vücudun en büyük sesamoid (susamdaş) kemiğidir.'
  },
  {
    id: 'b5',
    conceptId: 'FMA16585',
    latin: 'Os coxae',
    turkish: 'Kalça Kemiği',
    system: 'skeletal',
    clue: 'Ilium, Ischium ve Pubis kemiklerinin Acetabulum çukurunda birleşmesiyle oluşur; SIAS ve Tuber ischiadicum nirengilerini taşır.'
  },
  {
    id: 'b6',
    conceptId: 'FMA13394',
    latin: 'Scapula',
    turkish: 'Kürek Kemiği',
    system: 'skeletal',
    clue: 'Göğüs kafesinin arkasında yer alan üçgen yassı kemiktir; Spina scapulae, Acromion ve Cavitas glenoidalis’i içerir.'
  },
  {
    id: 'b7',
    conceptId: 'FMA13321',
    latin: 'Clavicula',
    turkish: 'Köprücük Kemiği',
    system: 'skeletal',
    clue: '"S" şeklinde yatay kemiktir; Sternum ile Scapula (Acromion) arasında uzanır.'
  },
  {
    id: 'b8',
    conceptId: 'FMA13303',
    latin: 'Humerus',
    turkish: 'Kol Kemiği',
    system: 'skeletal',
    clue: 'Üst ekstremitenin en büyük uzun kemiğidir; kırıkların en sık görüldüğü Collum chirurgicum’a sahiptir.'
  },
  {
    id: 'b9',
    conceptId: 'FMA23463',
    latin: 'Radius',
    turkish: 'Döner Kemik',
    system: 'skeletal',
    clue: 'Ön kolun dış (lateral / başparmak) tarafındaki kemiktir; distal uç kırığına Colles Kırığı ("Gümüş Çatal Deformitesi") denir.'
  },
  {
    id: 'b10',
    conceptId: 'FMA7485',
    latin: 'Sternum',
    turkish: 'Göğüs Kemiği',
    system: 'skeletal',
    clue: 'Manubrium sterni, Corpus sterni (Angulus sterni / Louis açısı) ve Processus xiphoideus’tan oluşan ön göğüs kemiğidir.'
  },
  {
    id: 'b11',
    conceptId: 'FMA7088',
    latin: 'Cor',
    turkish: 'Kalp',
    system: 'cardiac',
    clue: 'SA düğüm (doğal pacemaker, 60-80/dk) ile kendi ritmini üreten (otomatisite) dört odacıklı kaslı pompa organıdır.'
  },
  {
    id: 'b12',
    conceptId: 'FMA13295',
    latin: 'Diaphragma',
    turkish: 'Diyafram Kası',
    system: 'muscular',
    clue: 'Göğüs ve karın boşluğunu ayıran, kasıldığında göğüs hacmini artırarak inspirasyonu sağlayan ana solunum kasıdır.'
  },
  {
    id: 'b13',
    conceptId: 'FMA62007',
    latin: 'Thalamus',
    turkish: 'Talamus',
    system: 'nervous',
    clue: 'Koku duyusu hariç tüm duyusal sinyallerin kortekse iletilmeden önce toplandığı ve işlendiği ara beyin (Diensefalon) merkezidir.'
  },
  {
    id: 'b14',
    conceptId: 'FMA7197',
    latin: 'Hepar',
    turkish: 'Karaciğer',
    system: 'digestive',
    clue: 'Fetal dönemin 1.5–6. aylarında hematopoez yapan, yetişkinde albümin/pıhtılaşma faktörleri ve safra üreten en büyük iç organdır.'
  }
];
