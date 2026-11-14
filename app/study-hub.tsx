import {useState, useMemo} from 'react';
import {
  BookOpen,
  Gamepad2,
  CheckCircle2,
  XCircle,
  Sparkles,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  AlertTriangle,
  Stethoscope,
  Crosshair,
  Award,
  Layers,
  X,
} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {
  COURSE_CHAPTERS,
  QUIZ_QUESTIONS,
  FLASHCARDS,
  MATCH_PAIRS,
  BODY_CHALLENGES,
  type FindOnBodyChallenge,
} from './study-data';

interface StudyHubProps {
  mode: 'guide' | 'games';
  onClose: () => void;
  onInspectConcept: (conceptId: string) => void;
  activeChallenge: FindOnBodyChallenge | null;
  onStartBodyChallenge: (challenge: FindOnBodyChallenge | null) => void;
  challengeScore: {hits: number; attempts: number};
  onResetChallengeScore: () => void;
}

export default function StudyHub({
  mode,
  onClose,
  onInspectConcept,
  activeChallenge,
  onStartBodyChallenge,
  challengeScore,
  onResetChallengeScore,
}: StudyHubProps) {
  // Course guide state
  const [courseTab, setCourseTab] = useState<'fizyoloji' | 'anatomi' | 'checklist'>('fizyoloji');
  const [selectedChapterId, setSelectedChapterId] = useState<string>('fiz-1');

  // Games state
  const [gameTab, setGameTab] = useState<'quiz' | 'flashcards' | 'match' | 'find3d'>('quiz');

  // Quiz state
  const [quizFilter, setQuizFilter] = useState<'all' | 'fizyoloji' | 'anatomi' | 'klinik'>('all');
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizStats, setQuizStats] = useState({correct: 0, total: 0, streak: 0});

  // Flashcards state
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [knownCards, setKnownCards] = useState<Set<string>>(new Set());

  // Match game state
  const [matchCategory, setMatchCategory] = useState<'all' | 'organel' | 'reseptor' | 'eklem' | 'kemik' | 'kas'>('all');
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<Set<string>>(new Set());
  const [wrongPair, setWrongPair] = useState<{left: string; right: string} | null>(null);
  const [matchSeed, setMatchSeed] = useState(0);

  const filteredChapters = useMemo(
    () => COURSE_CHAPTERS.filter(c => c.course === (courseTab === 'checklist' ? 'anatomi' : courseTab)),
    [courseTab],
  );

  const currentChapter = useMemo(
    () => COURSE_CHAPTERS.find(c => c.id === selectedChapterId) ?? filteredChapters[0] ?? COURSE_CHAPTERS[0],
    [selectedChapterId, filteredChapters],
  );

  const filteredQuestions = useMemo(
    () => (quizFilter === 'all' ? QUIZ_QUESTIONS : QUIZ_QUESTIONS.filter(q => q.category === quizFilter)),
    [quizFilter],
  );
  const currentQuestion = filteredQuestions[quizIndex % filteredQuestions.length] ?? QUIZ_QUESTIONS[0];

  const activePairs = useMemo(() => {
    const pool = matchCategory === 'all' ? MATCH_PAIRS : MATCH_PAIRS.filter(p => p.category === matchCategory);
    return pool.slice(0, 6);
  }, [matchCategory, matchSeed]);

  const shuffledRight = useMemo(() => {
    const arr = [...activePairs];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = (i * 7 + matchSeed * 3 + 5) % (i + 1);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [activePairs, matchSeed]);

  const handleSelectAnswer = (idx: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(idx);
    const isCorrect = idx === currentQuestion.correctIndex;
    setQuizStats(s => ({
      correct: s.correct + (isCorrect ? 1 : 0),
      total: s.total + 1,
      streak: isCorrect ? s.streak + 1 : 0,
    }));
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setQuizIndex(i => (i + 1) % filteredQuestions.length);
  };

  const handleMatchRight = (pairId: string) => {
    if (!selectedLeft || matchedIds.has(pairId)) return;
    if (selectedLeft === pairId) {
      setMatchedIds(prev => new Set([...prev, pairId]));
      setSelectedLeft(null);
      setWrongPair(null);
    } else {
      setWrongPair({left: selectedLeft, right: pairId});
      setTimeout(() => setWrongPair(null), 700);
    }
  };

  const resetMatch = () => {
    setMatchedIds(new Set());
    setSelectedLeft(null);
    setWrongPair(null);
    setMatchSeed(s => s + 1);
  };

  const currentCard = FLASHCARDS[cardIndex % FLASHCARDS.length];

  return (
    <div className="study-overlay" role="dialog" aria-modal="false" aria-label={mode === 'guide' ? 'Ders Rehberi' : 'Ezber Oyunları'}>
      <div className="study-modal glass">
        <header className="study-modal-header">
          <div className="study-title-group">
            <span className="study-badge">
              {mode === 'guide' ? <BookOpen size={15} /> : <Gamepad2 size={15} />}
              {mode === 'guide' ? 'ORTEZ VE PROTEZ DERS REHBERİ' : 'İNTERAKTİF EZBER VE SINAV OYUNLARI'}
            </span>
            <h2>
              {mode === 'guide'
                ? 'Fizyoloji & İnsan İskeleti Anatomisi Çalışma Modülü'
                : 'Latince / Yunanca Terminoloji & Klinik Pekiştirme'}
            </h2>
          </div>
          <Button variant="ghost" className="icon-button study-close" onClick={onClose} aria-label="Paneli kapat">
            <X size={20} />
          </Button>
        </header>

        {mode === 'guide' ? (
          <div className="study-body">
            <div className="study-tabs">
              <button
                type="button"
                className={courseTab === 'fizyoloji' ? 'active' : ''}
                onClick={() => {
                  setCourseTab('fizyoloji');
                  setSelectedChapterId('fiz-1');
                }}
              >
                <span>1. Fizyoloji Sınava Hazırlık Rehberi</span>
                <Badge variant="secondary">6 Modül</Badge>
              </button>
              <button
                type="button"
                className={courseTab === 'anatomi' ? 'active' : ''}
                onClick={() => {
                  setCourseTab('anatomi');
                  setSelectedChapterId('ana-1');
                }}
              >
                <span>2. İnsan İskeleti ve Kafa Kemikleri Anatomisi</span>
                <Badge variant="secondary">6 Modül</Badge>
              </button>
              <button
                type="button"
                className={courseTab === 'checklist' ? 'active' : ''}
                onClick={() => setCourseTab('checklist')}
              >
                <span>3. Sınav Öncesi Hızlı Tekrar & Check-List</span>
                <Badge variant="secondary">Özet</Badge>
              </button>
            </div>

            {courseTab === 'checklist' ? (
              <div className="study-content-scroll checklist-view">
                <div className="alert-card warning">
                  <AlertTriangle size={18} />
                  <div>
                    <strong>Ortez-Protez Sınavlarında Sık Sorulan Kritik Noktalar Check-List’i</strong>
                    <p>PDF ders rehberlerinizdeki tüm altın kurallar, klinik sendromlar ve karşılaştırma tabloları tek ekranda özetlenmiştir.</p>
                  </div>
                </div>

                <div className="checklist-grid">
                  <div className="check-item">
                    <h4>Kemik Sayıları (Toplam 206)</h4>
                    <p>
                      <strong>Aksiyal İskelet (Skeleton axiale):</strong> 80 Kemik (Kafa 22, Kulak 6, Hyoid 1, Omurga 26, Göğüs kafesi 25).<br />
                      <strong>Apendiküler İskelet (Skeleton appendiculare):</strong> 126 Kemik (Üst ekstremite 64, Alt ekstremite 62).<br />
                      <strong>Omurga (Columna vertebralis):</strong> Yetişkinde 26 (7 Servikal, 12 Torakal, 5 Lumbal, 1 Sacrum, 1 Coccyx), çocukta 33–34.
                    </p>
                  </div>
                  <div className="check-item">
                    <h4>Pterion ve Epidural Hematom</h4>
                    <p>
                      <strong>Frontal + Parietal + Temporal + Sphenoid</strong> (büyük kanat) kemiklerin birleştiği "H" şeklindeki en zayıf kraniyal sütür noktasıdır. Derininden <em>Arteria meningea media</em>’nın ön dalı geçer; yırtılması hayati <strong>Epidural Hematom</strong> oluşturur!
                    </p>
                  </div>
                  <div className="check-item">
                    <h4>Nervus Facialis & Kafa Delikleri</h4>
                    <p>
                      <strong>Foramen stylomastoideum (Os temporale):</strong> İçinden VII. kafa çifti <em>Nervus facialis</em> çıkar.<br />
                      <strong>Foramen magnum (Os occipitale):</strong> İçinden <em>Medulla spinalis</em> (omurilik) geçer.<br />
                      <strong>Canalis caroticus (Pars petrosa):</strong> İçinden <em>Arteria carotis interna</em> geçer.
                    </p>
                  </div>
                  <div className="check-item">
                    <h4>Colles Kırığı & Karpal Kemikler</h4>
                    <p>
                      <strong>Colles Kırığı:</strong> Açık el üzerine düşmeyle distal <em>Radius</em> kırığı → <strong>"Gümüş Çatal Deformitesi"</strong>.<br />
                      <strong>Ossa Carpi (8):</strong> En çok kırılan = <em>Os Scaphoideum</em>; en çok çıkan = <em>Os Lunatum</em>; en büyük = <em>Os Capitatum</em>.
                    </p>
                  </div>
                  <div className="check-item">
                    <h4>Alt Ekstremite Ortez/Protez Nirengileri</h4>
                    <p>
                      <strong>SIAS (Spina iliaca anterior superior):</strong> Bacak boyu ölçümü ana nirengisi.<br />
                      <strong>Tuber ischiadicum:</strong> Oturma kemiği; ischiyal yüklemeli protez soketlerinin ana temas noktası.<br />
                      <strong>Tibia vs Fibula:</strong> Tibia ağırlığı taşır (medialdedir); Fibula ağırlık TAŞIMAZ (lateraldedir).<br />
                      <strong>Collum fibulae basısı:</strong> <em>Nervus peroneus communis</em> hasarı → <strong>Düşük Ayak (Foot Drop)</strong> (AFO ortezi gerekir).
                    </p>
                  </div>
                  <div className="check-item">
                    <h4>Diz Biyomekaniği & Mutsuz Üçlü</h4>
                    <p>
                      <strong>LCA & LCP:</strong> LCA tibia’nın öne kaymasını, LCP arkaya kaymasını engeller.<br />
                      <strong>Mutsuz Üçlü (Unhappy Triad):</strong> <em>Meniscus medialis</em> ("C" şekilli, kapsüle yapışık) + <em>Lig. collaterale tibiale (MCL)</em> + <em>Lig. cruciatum anterius (LCA)</em>.<br />
                      <strong>Vida-Ev Kilitlenmesi (Son 30°):</strong> Bacak sabitse <em>uyluk (femur) iç rotasyon</em> yapar; uyluk sabitse <em>bacak (tibia) dış rotasyon</em> yapar (Kilidi <em>M. popliteus</em> açar).
                    </p>
                  </div>
                  <div className="check-item">
                    <h4>Hücre & Kas Fizyolojisi Kilit Noktalar</h4>
                    <p>
                      <strong>Lizozom vs Peroksizom:</strong> Lizozom <em>asit hidrolazlarla</em> sindirim yapar; Peroksizom <em>katalaz</em> enzimi ile H₂O₂ → H₂O + O₂ parçalar.<br />
                      <strong>Sarkomer & Ca²⁺:</strong> Kasılmada <strong>A bandı değişmez</strong>, I ve H bantları daralır. Ca²⁺ <strong>Troponin C</strong>’ye bağlanır. Triad = Sisterna + T-tübülü + Sisterna.
                    </p>
                  </div>
                  <div className="check-item">
                    <h4>Duyu, Kan, Sinir ve Kalp Kilit Noktalar</h4>
                    <p>
                      <strong>Pacini:</strong> Derin basınç ve titreşim (vibrasyon). <strong>A-delta:</strong> Miyelinli, hızlı/keskin ağrı. <strong>C lifi:</strong> Miyelinsiz, yavaş/yanıcı ağrı.<br />
                      <strong>Fototransdüksiyon:</strong> cGMP düşer → katyon kanalları kapanır → <strong>hiperpolarizasyon</strong> → glutamat azalır.<br />
                      <strong>Albümin (%60):</strong> Onkotik basınç. <strong>Talamus:</strong> Koku hariç tüm duyuların kapısı. <strong>SA Düğüm:</strong> 60-80/dk doğal pacemaker.
                    </p>
                  </div>
                </div>

                <div className="study-table-wrap">
                  <h4>Ekstremite Eklemleri ve Tip Karşılaştırma Tablosu (Tablo 7)</h4>
                  <table className="study-table">
                    <thead>
                      <tr>
                        <th>Eklem Adı (Articulatio)</th>
                        <th>Oluşturan Kemikler</th>
                        <th>Eklem Sınıfı / Tipi</th>
                        <th>Temel Eklem Hareketleri</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>Art. Humeri (Omuz)</strong></td>
                        <td>Humerus (Caput) + Scapula (Cavitas glenoidalis)</td>
                        <td>Art. Spheroidea (Top-Yuva)</td>
                        <td>Fleksiyon, Ekstansiyon, Abduksiyon, Adduksiyon, Rotasyon, Sirkumdüksiyon (En hareketli / En çok çıkan eklem)</td>
                      </tr>
                      <tr>
                        <td><strong>Art. Humeroulnaris</strong></td>
                        <td>Humerus (Trochlea) + Ulna (Incisura trochlearis)</td>
                        <td>Ginglymus (Menteşe)</td>
                        <td>Yalnızca Fleksiyon – Ekstansiyon</td>
                      </tr>
                      <tr>
                        <td><strong>Art. Humeroradialis</strong></td>
                        <td>Humerus (Capitulum) + Radius (Fovea art.)</td>
                        <td>Art. Spheroidea</td>
                        <td>Fleksiyon – Ekstansiyon (Ulna engeliyle rotasyon/yan hareket yapamaz)</td>
                      </tr>
                      <tr>
                        <td><strong>Art. Radioulnaris Prox.</strong></td>
                        <td>Radius (Circumferentia) + Ulna (Incisura rad.)</td>
                        <td>Art. Trochoidea (Döner)</td>
                        <td>Pronasyon (avuç arkaya/aşağı) – Supinasyon (avuç öne/yukarı)</td>
                      </tr>
                      <tr>
                        <td><strong>Art. Temporomandibularis</strong></td>
                        <td>Mandibula (Caput) + Os Temporale (Fossa mand.)</td>
                        <td>Synovial (Bicondylaris)</td>
                        <td>Çene açma, kapama, öne-arkaya kaydırma (Kafanın tek hareketli eklemi)</td>
                      </tr>
                      <tr>
                        <td><strong>Art. Coxae (Kalça)</strong></td>
                        <td>Femur (Caput) + Os Coxae (Acetabulum)</td>
                        <td>Art. Spheroidea (Enarthrosis)</td>
                        <td>Üç eksende tüm hareketler (Yüksek stabilite / Yük taşıma odağı)</td>
                      </tr>
                      <tr>
                        <td><strong>Art. Genus (Diz)</strong></td>
                        <td>Femur + Tibia + Patella</td>
                        <td>Art. Bicondylaris (Modifiye Ginglymus)</td>
                        <td>Fleksiyon, Ekstansiyon, Fleksiyonda sınırlı rotasyon, Ekstansiyon sonunda Kilitlenme rotasyonu</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="study-split">
                <aside className="chapter-sidebar">
                  {filteredChapters.map(ch => (
                    <button
                      type="button"
                      key={ch.id}
                      className={`chapter-nav-btn ${currentChapter.id === ch.id ? 'active' : ''}`}
                      onClick={() => setSelectedChapterId(ch.id)}
                    >
                      <span className="chapter-num">{ch.number}</span>
                      <strong>{ch.title}</strong>
                      <em>{ch.latinTitle}</em>
                    </button>
                  ))}
                </aside>

                <article className="study-content-scroll">
                  <div className="chapter-hero">
                    <Badge variant="outline">{currentChapter.number}</Badge>
                    <h3>{currentChapter.title}</h3>
                    <p className="chapter-latin">{currentChapter.latinTitle}</p>
                    <p className="chapter-summary">{currentChapter.summary}</p>
                  </div>

                  {currentChapter.examAlert && (
                    <div className="alert-card warning">
                      <AlertTriangle size={18} />
                      <div>{currentChapter.examAlert}</div>
                    </div>
                  )}

                  {currentChapter.orthoticNote && (
                    <div className="alert-card info">
                      <Stethoscope size={18} />
                      <div>{currentChapter.orthoticNote}</div>
                    </div>
                  )}

                  {currentChapter.sections.map((sec, idx) => (
                    <div className="chapter-section" key={idx}>
                      <h4>{sec.heading}</h4>
                      {sec.latin && <span className="section-latin">{sec.latin}</span>}
                      <ul>
                        {sec.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  {currentChapter.tables?.map((tbl, tIdx) => (
                    <div className="study-table-wrap" key={tIdx}>
                      <h4>{tbl.title}</h4>
                      <table className="study-table">
                        <thead>
                          <tr>
                            {tbl.headers.map((h, hIdx) => (
                              <th key={hIdx}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {tbl.rows.map((row, rIdx) => (
                            <tr key={rIdx}>
                              {row.map((cell, cIdx) => (
                                <td key={cIdx}>{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))}

                  {currentChapter.relatedConceptIds && currentChapter.relatedConceptIds.length > 0 && (
                    <div className="related-3d-bar">
                      <span>Bu modüldeki yapıları 3B Atlas üzerinde incele:</span>
                      <div className="related-3d-buttons">
                        {currentChapter.relatedConceptIds.map(cid => (
                          <Button
                            key={cid}
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              onInspectConcept(cid);
                              onClose();
                            }}
                          >
                            <Crosshair size={14} />
                            <span>{cid} 3B Göster</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </article>
              </div>
            )}
          </div>
        ) : (
          /* ==================== EZBER OYUNLARI MODU ==================== */
          <div className="study-body">
            <div className="study-tabs">
              <button type="button" className={gameTab === 'quiz' ? 'active' : ''} onClick={() => setGameTab('quiz')}>
                <Award size={15} />
                <span>1. Sınav Simülasyonu (Quiz)</span>
                <Badge variant="secondary">{QUIZ_QUESTIONS.length} Soru</Badge>
              </button>
              <button type="button" className={gameTab === 'flashcards' ? 'active' : ''} onClick={() => setGameTab('flashcards')}>
                <Layers size={15} />
                <span>2. Latince/Yunanca Bilgi Kartları</span>
                <Badge variant="secondary">{FLASHCARDS.length} Kart</Badge>
              </button>
              <button type="button" className={gameTab === 'match' ? 'active' : ''} onClick={() => setGameTab('match')}>
                <Sparkles size={15} />
                <span>3. Eşleştirme Oyunu</span>
              </button>
              <button type="button" className={gameTab === 'find3d' ? 'active' : ''} onClick={() => setGameTab('find3d')}>
                <Crosshair size={15} />
                <span>4. 3B Modelde Yapı Bul</span>
              </button>
            </div>

            <div className="study-content-scroll game-container">
              {gameTab === 'quiz' && (
                <div className="quiz-panel">
                  <div className="game-toolbar">
                    <div className="filter-pills">
                      {(['all', 'fizyoloji', 'anatomi', 'klinik'] as const).map(f => (
                        <button
                          type="button"
                          key={f}
                          className={quizFilter === f ? 'active' : ''}
                          onClick={() => {
                            setQuizFilter(f);
                            setQuizIndex(0);
                            setSelectedAnswer(null);
                          }}
                        >
                          {f === 'all' ? 'Tümü' : f === 'fizyoloji' ? 'Fizyoloji' : f === 'anatomi' ? 'Anatomi' : 'Klinik / Ortez-Protez'}
                        </button>
                      ))}
                    </div>
                    <div className="score-badges">
                      <Badge variant="secondary">Skor: {quizStats.correct} / {quizStats.total}</Badge>
                      <Badge variant="outline">Seri: {quizStats.streak}🔥</Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setQuizStats({correct: 0, total: 0, streak: 0});
                          setSelectedAnswer(null);
                          setQuizIndex(0);
                        }}
                      >
                        <RotateCcw size={14} /> Sıfırla
                      </Button>
                    </div>
                  </div>

                  <div className="quiz-card">
                    <div className="quiz-meta">
                      <Badge>{currentQuestion.category.toUpperCase()}</Badge>
                      <span>
                        Soru {(quizIndex % filteredQuestions.length) + 1} / {filteredQuestions.length}
                      </span>
                    </div>
                    <h3>{currentQuestion.question}</h3>
                    <div className="quiz-options">
                      {currentQuestion.options.map((opt, idx) => {
                        const isSelected = selectedAnswer === idx;
                        const isRight = idx === currentQuestion.correctIndex;
                        const stateClass =
                          selectedAnswer === null
                            ? ''
                            : isRight
                              ? 'correct'
                              : isSelected
                                ? 'wrong'
                                : 'dimmed';
                        return (
                          <button
                            type="button"
                            key={idx}
                            className={`quiz-option ${stateClass}`}
                            onClick={() => handleSelectAnswer(idx)}
                            disabled={selectedAnswer !== null}
                          >
                            <span className="opt-letter">{['A', 'B', 'C', 'D'][idx]}</span>
                            <span className="opt-text">{opt}</span>
                            {selectedAnswer !== null && isRight && <CheckCircle2 size={18} className="opt-icon" />}
                            {selectedAnswer !== null && isSelected && !isRight && <XCircle size={18} className="opt-icon" />}
                          </button>
                        );
                      })}
                    </div>

                    {selectedAnswer !== null && (
                      <div className={`quiz-feedback ${selectedAnswer === currentQuestion.correctIndex ? 'ok' : 'err'}`}>
                        <strong>
                          {selectedAnswer === currentQuestion.correctIndex ? 'Doğru Cevap!' : 'Yanlış Cevap — Doğru Açıklama:'}
                        </strong>
                        <p>{currentQuestion.explanation}</p>
                        <div className="quiz-feedback-actions">
                          {currentQuestion.conceptId && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                onInspectConcept(currentQuestion.conceptId!);
                                onClose();
                              }}
                            >
                              <Crosshair size={14} /> 3B Modelde İncele
                            </Button>
                          )}
                          <Button size="sm" onClick={handleNextQuestion}>
                            Sonraki Soru <ChevronRight size={15} />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {gameTab === 'flashcards' && (
                <div className="flashcard-panel">
                  <div className="game-toolbar">
                    <span>
                      Kart {(cardIndex % FLASHCARDS.length) + 1} / {FLASHCARDS.length} · Ezberlenen: <strong>{knownCards.size}</strong>
                    </span>
                    <div className="score-badges">
                      <Button variant="ghost" size="sm" onClick={() => setKnownCards(new Set())}>
                        <RotateCcw size={14} /> İlerlemeyi Sıfırla
                      </Button>
                    </div>
                  </div>

                  <div
                    className={`flashcard-3d ${flipped ? 'is-flipped' : ''}`}
                    onClick={() => setFlipped(f => !f)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setFlipped(f => !f);
                      }
                    }}
                  >
                    <div className="flashcard-face front">
                      <Badge variant="outline">{currentCard.category}</Badge>
                      <h3>{currentCard.latin}</h3>
                      <p className="card-hint">Türkçe karşılığını ve sınav detayını görmek için karta dokunun</p>
                    </div>
                    <div className="flashcard-face back">
                      <Badge>{currentCard.category}</Badge>
                      <h4>{currentCard.turkish}</h4>
                      <span className="card-latin-sub">{currentCard.latin}</span>
                      <p className="card-detail">{currentCard.detail}</p>
                    </div>
                  </div>

                  <div className="flashcard-controls">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setFlipped(false);
                        setCardIndex(i => (i - 1 + FLASHCARDS.length) % FLASHCARDS.length);
                      }}
                    >
                      <ChevronLeft size={16} /> Önceki
                    </Button>
                    <Button
                      variant={knownCards.has(currentCard.id) ? 'secondary' : 'default'}
                      onClick={() => {
                        setKnownCards(prev => {
                          const next = new Set(prev);
                          if (next.has(currentCard.id)) next.delete(currentCard.id);
                          else next.add(currentCard.id);
                          return next;
                        });
                        setFlipped(false);
                        setCardIndex(i => (i + 1) % FLASHCARDS.length);
                      }}
                    >
                      <CheckCircle2 size={16} />
                      {knownCards.has(currentCard.id) ? 'Ezberlendi İşaretli' : 'Ezberledim, Sıradaki'}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setFlipped(false);
                        setCardIndex(i => (i + 1) % FLASHCARDS.length);
                      }}
                    >
                      Sonraki <ChevronRight size={16} />
                    </Button>
                  </div>
                </div>
              )}

              {gameTab === 'match' && (
                <div className="match-panel">
                  <div className="game-toolbar">
                    <div className="filter-pills">
                      {(['all', 'organel', 'reseptor', 'eklem', 'kemik', 'kas'] as const).map(cat => (
                        <button
                          type="button"
                          key={cat}
                          className={matchCategory === cat ? 'active' : ''}
                          onClick={() => {
                            setMatchCategory(cat);
                            setMatchedIds(new Set());
                            setSelectedLeft(null);
                          }}
                        >
                          {cat === 'all'
                            ? 'Karışık'
                            : cat === 'organel'
                              ? 'Organeller'
                              : cat === 'reseptor'
                                ? 'Reseptörler'
                                : cat === 'eklem'
                                  ? 'Eklemler'
                                  : cat === 'kemik'
                                    ? 'Kemikler'
                                    : 'Kas & Bağ'}
                        </button>
                      ))}
                    </div>
                    <Button variant="ghost" size="sm" onClick={resetMatch}>
                      <RotateCcw size={14} /> Yeni Eşleştirme
                    </Button>
                  </div>

                  <p className="match-instructions">
                    Soldaki <strong>Latince / Anatomik</strong> terime tıklayın, ardından sağdaki <strong>Fizyolojik / Klinik</strong> karşılığını seçin ({matchedIds.size} / {activePairs.length} tamamlandı).
                  </p>

                  <div className="match-columns">
                    <div className="match-col">
                      {activePairs.map(p => {
                        const isMatched = matchedIds.has(p.id);
                        const isSelected = selectedLeft === p.id;
                        const isWrong = wrongPair?.left === p.id;
                        return (
                          <button
                            type="button"
                            key={p.id}
                            disabled={isMatched}
                            className={`match-btn ${isMatched ? 'matched' : ''} ${isSelected ? 'selected' : ''} ${isWrong ? 'wrong' : ''}`}
                            onClick={() => setSelectedLeft(p.id)}
                          >
                            {p.left}
                          </button>
                        );
                      })}
                    </div>
                    <div className="match-col">
                      {shuffledRight.map(p => {
                        const isMatched = matchedIds.has(p.id);
                        const isWrong = wrongPair?.right === p.id;
                        return (
                          <button
                            type="button"
                            key={p.id}
                            disabled={isMatched}
                            className={`match-btn ${isMatched ? 'matched' : ''} ${isWrong ? 'wrong' : ''}`}
                            onClick={() => handleMatchRight(p.id)}
                          >
                            {p.right}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {matchedIds.size === activePairs.length && activePairs.length > 0 && (
                    <div className="quiz-feedback ok">
                      <strong>Tebrikler! Tüm kavramları doğru eşleştirdiniz!</strong>
                      <Button size="sm" onClick={resetMatch}>
                        Tekrar Oyna
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {gameTab === 'find3d' && (
                <div className="find3d-panel">
                  <div className="alert-card info">
                    <Crosshair size={18} />
                    <div>
                      <strong>3B Atlas Üzerinde Yapı Bulma Oyunu</strong>
                      <p>
                        Aşağıdan bir görev seçip <strong>"3B Modelde Bulmaya Başla"</strong> butonuna tıklayın. Bu pencere kapanacak ve üstte görev çubuğu belirecektir; 3B model üzerinde doğru kemiğe/organa dokunarak puan toplayın!
                      </p>
                    </div>
                  </div>

                  <div className="game-toolbar">
                    <span>
                      3B Doğruluk Skoru: <strong>{challengeScore.hits}</strong> doğru / {challengeScore.attempts} deneme
                    </span>
                    <Button variant="ghost" size="sm" onClick={onResetChallengeScore}>
                      <RotateCcw size={14} /> Skoru Sıfırla
                    </Button>
                  </div>

                  <div className="challenge-grid">
                    {BODY_CHALLENGES.map(ch => (
                      <div key={ch.id} className={`challenge-card ${activeChallenge?.id === ch.id ? 'active' : ''}`}>
                        <div className="challenge-head">
                          <strong>{ch.latin}</strong>
                          <Badge variant="outline">{ch.turkish}</Badge>
                        </div>
                        <p>{ch.clue}</p>
                        <div className="challenge-actions">
                          <Button
                            size="sm"
                            onClick={() => {
                              onStartBodyChallenge(ch);
                              onClose();
                            }}
                          >
                            <Crosshair size={14} /> 3B Modelde Bulmaya Başla
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              onInspectConcept(ch.conceptId);
                              onClose();
                            }}
                          >
                            Doğrudan Göster
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
