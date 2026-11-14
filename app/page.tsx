import { flushSync } from "react-dom";
import { registerAtlasTools } from "./agent-tools";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  BookOpen,
  ChevronRight,
  Crosshair,
  Focus,
  Gamepad2,
  Info,
  Layers3,
  Lock,
  Moon,
  Move,
  Pause,
  RotateCcw,
  RotateCw,
  Search,
  Sun,
  Unlock,
  X,
  ZoomIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
} from "@/components/ui/combobox";
import AnatomyScene from "./scene";
import StudyHub from "./study-hub";
import { BODY_CHALLENGES, type FindOnBodyChallenge } from "./study-data";
import {
  DEFAULT_VISIBLE,
  SYSTEMS,
  explanation,
  type Atlas,
  type CameraFocusPreset,
  type Concept,
  type SceneState,
  type SystemId,
  type View,
} from "./anatomy";
import {
  conceptDisplayLabel,
  conceptLatinLabel,
  loadTerms,
  matchesConceptQuery,
  termForId,
  type TermsCatalog,
} from "./terms";

const initial: SceneState = {
  explode: 0,
  visible: DEFAULT_VISIBLE,
  selected: [],
  isolate: false,
  view: "three-quarter",
  rotate: false,
  reset: 0,
  freeCamera: true,
  panMode: false,
  focusTrigger: 0,
  focusPreset: null,
};

const JOINT_PRESETS: { id: CameraFocusPreset; label: string; title: string }[] = [
  { id: "head", label: "Baş & Çene", title: "Kafatası ve Temporomandibular Eklem (Cranium & TMJ)" },
  { id: "shoulder", label: "Omuz", title: "Omuz Kavşağı ve Glenohumeral Eklem (Art. humeri)" },
  { id: "wrist", label: "El Bileği", title: "El Bileği ve Karpal Kemikler (Carpus & Manus)" },
  { id: "pelvis", label: "Pelvis & Kalça", title: "Pelvis, SIAS ve Kalça Eklemi (Art. coxae)" },
  { id: "knee", label: "Diz Eklemi", title: "Diz Eklemi, Patella ve Bağlar (Art. genus)" },
  { id: "ankle", label: "Ayak Bileği", title: "Ayak Bileği, Talus ve Tarsal Kemikler (Tarsus)" },
  { id: "full", label: "Tam Vücut", title: "Tam Vücut Referans Görünümü" },
];
const STARTER_EN = [
  "heart",
  "brain",
  "liver",
  "stomach",
  "spleen",
  "pancreas",
  "urinary bladder",
  "trachea",
  "femur",
  "tibia",
  "fibula",
  "patella",
  "humerus",
  "radius",
  "ulna",
  "scapula",
];
const VIEW_LABEL: Record<View, string> = {
  "three-quarter": "¾ görünüm",
  front: "Ön (Anterior)",
  side: "Yan (Lateral)",
  back: "Arka (Posterior)",
};

export default function Home() {
  const detailTitle = useRef<HTMLHeadingElement>(null);
  const [atlas, setAtlas] = useState<Atlas | null>(null),
    [terms, setTerms] = useState<TermsCatalog | null>(null),
    [state, setState] = useState(initial),
    [progress, setProgress] = useState(0),
    [error, setError] = useState(""),
    [panel, setPanel] = useState<"layers" | "search" | null>(null),
    [details, setDetails] = useState(false),
    [about, setAbout] = useState(false),
    [query, setQuery] = useState(""),
    [chosen, setChosen] = useState<Concept | null>(null);
  const [dark, setDark] = useState<boolean>(() => {
    try {
      return localStorage.getItem("atlas-theme") === "dark";
    } catch {
      return false;
    }
  });
  const [studyMode, setStudyMode] = useState<"guide" | "games" | null>(null);
  const [activeChallenge, setActiveChallenge] = useState<FindOnBodyChallenge | null>(null);
  const [challengeFeedback, setChallengeFeedback] = useState<{ ok: boolean; msg: string } | null>(
    null,
  );
  const [challengeScore, setChallengeScore] = useState({ hits: 0, attempts: 0 });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    document.body.classList.toggle("dark", dark);
    try {
      localStorage.setItem("atlas-theme", dark ? "dark" : "light");
    } catch {}
  }, [dark]);

  useEffect(() => {
    const abort = new AbortController();
    setProgress(0);
    setError("");
    setAtlas(null);
    setChosen(null);
    setDetails(false);
    setState({ ...initial, visible: DEFAULT_VISIBLE });
    fetch("/models/atlas.json", { signal: abort.signal })
      .then((r) => {
        if (!r.ok) throw new Error("Anatomi kataloğu yüklenemedi.");
        return r.json();
      })
      .then((data) => setAtlas(data as Atlas))
      .catch((e) => {
        if (e.name !== "AbortError") setError(e.message);
      });
    return () => abort.abort();
  }, []);
  useEffect(() => {
    loadTerms()
      .then(setTerms)
      .catch((e) => setError(e instanceof Error ? e.message : "Terim sözlüğü yüklenemedi."));
  }, []);
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();
        setStudyMode(null);
        setPanel("search");
        setDetails(false);
      }
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, []);
  const parts = useMemo(() => new Map(atlas?.parts.map((p) => [p.id, p])), [atlas]);
  const counts = useMemo(
    () =>
      Object.fromEntries(
        SYSTEMS.map((s) => [s.id, atlas?.parts.filter((p) => p.system === s.id).length ?? 0]),
      ),
    [atlas],
  );
  const activeSystems = SYSTEMS.filter((s) => counts[s.id] > 0);
  const labelConcept = useMemo(
    () => (c: Concept) => (terms ? conceptDisplayLabel(termForId(terms, c.id, c.name)) : c.name),
    [terms],
  );
  const labelLatin = useMemo(
    () => (c: Concept) => (terms ? conceptLatinLabel(termForId(terms, c.id, c.name)) : c.name),
    [terms],
  );
  const partLabel = useMemo(() => {
    if (!terms) return undefined;
    return (part: NonNullable<Atlas>["parts"][number]) => {
      const rec = termForId(terms, part.conceptId, part.name);
      return `${rec.tr} · ${rec.la}`;
    };
  }, [terms]);
  const selectedParts = state.selected.map((id) => parts.get(id)).filter((p) => !!p),
    selected = selectedParts[0],
    system = SYSTEMS.find((s) => s.id === selected?.system);
  const visibleCount =
    atlas?.parts.filter((p) =>
      state.isolate
        ? state.selected.includes(p.id)
        : state.visible.includes(p.system) || state.selected.includes(p.id),
    ).length ?? 0;
  const results = useMemo(() => {
    if (!atlas) return [];
    const trimmed = query.trim();
    if (!trimmed)
      return STARTER_EN.map((name) =>
        atlas.concepts.find((c) => c.name.toLowerCase() === name),
      ).filter((x): x is Concept => !!x);
    return atlas.concepts
      .filter((c) => {
        if (!terms)
          return (
            c.name.toLowerCase().includes(trimmed.toLowerCase()) ||
            c.id.toLowerCase().includes(trimmed.toLowerCase())
          );
        return matchesConceptQuery(termForId(terms, c.id, c.name), c.id, trimmed);
      })
      .sort((a, b) => labelConcept(a).length - labelConcept(b).length)
      .slice(0, 80);
  }, [atlas, query, terms, labelConcept]);
  const choose = (c: Concept) => {
    setChosen(c);
    setState((s) => ({ ...s, selected: c.elements, isolate: false, rotate: false }));
    setDetails(true);
    setPanel(null);
  };
  useEffect(() => {
    if (!atlas) return;
    return registerAtlasTools(atlas, (c) => flushSync(() => choose(c)), terms);
  }, [atlas, terms]);

  const inspectConceptById = (conceptId: string) => {
    if (!atlas) return;
    const found = atlas.concepts.find((c) => c.id === conceptId);
    if (found) {
      const firstPart = parts.get(found.elements[0]);
      setState((s) => ({
        ...s,
        visible:
          firstPart && !s.visible.includes(firstPart.system)
            ? [...s.visible, firstPart.system]
            : s.visible,
        selected: found.elements,
        isolate: false,
        rotate: false,
      }));
      setChosen(found);
      setDetails(true);
      setPanel(null);
    }
  };

  const startChallenge = (ch: FindOnBodyChallenge | null) => {
    setActiveChallenge(ch);
    setChallengeFeedback(null);
    if (ch) {
      setState((s) => ({
        ...s,
        visible: [ch.system],
        selected: [],
        isolate: false,
        explode: 0,
        rotate: false,
      }));
      setDetails(false);
    }
  };

  const choosePart = (id: string) => {
    const p = parts.get(id);
    if (!p) return;
    if (activeChallenge && atlas) {
      const targetConcept = atlas.concepts.find((c) => c.id === activeChallenge.conceptId);
      const clickedTerm = terms
        ? termForId(terms, p.conceptId, p.name)
        : { tr: p.name, la: p.name };
      const isHit =
        p.conceptId === activeChallenge.conceptId ||
        (targetConcept?.elements.includes(id) ?? false) ||
        clickedTerm.la.toLowerCase().includes(activeChallenge.latin.split(" ")[0].toLowerCase());
      setChallengeScore((sc) => ({ hits: sc.hits + (isHit ? 1 : 0), attempts: sc.attempts + 1 }));
      if (isHit) {
        setChallengeFeedback({
          ok: true,
          msg: `Tebrikler! Doğru yapı: ${activeChallenge.latin} (${activeChallenge.turkish})`,
        });
      } else {
        setChallengeFeedback({
          ok: false,
          msg: `Seçilen: ${clickedTerm.tr} (${clickedTerm.la}) — Hedef: ${activeChallenge.latin}`,
        });
      }
    }
    setChosen({ id: p.conceptId, name: p.name, elements: [id] });
    setState((s) => ({ ...s, selected: [id], isolate: false, rotate: false }));
    setDetails(true);
    setPanel(null);
  };

  const toggle = (id: SystemId) => {
    setDetails(false);
    setState((s) => ({
      ...s,
      selected: [],
      isolate: false,
      visible: s.visible.includes(id) ? s.visible.filter((x) => x !== id) : [...s.visible, id],
    }));
  };
  const reset = () => {
    setState((s) => ({ ...initial, visible: DEFAULT_VISIBLE, reset: s.reset + 1 }));
    setChosen(null);
    setDetails(false);
    setPanel(null);
    setActiveChallenge(null);
    setChallengeFeedback(null);
  };
  const openPanel = (next: "layers" | "search") => {
    setDetails(false);
    setStudyMode(null);
    setPanel((p) => (p === next ? null : next));
  };
  const chosenLabel = chosen ? labelConcept(chosen) : "";
  const chosenLatin = chosen ? labelLatin(chosen) : "";
  return (
    <main className={`studio ${dark ? "dark" : ""}`}>
      {atlas && (
        <AnatomyScene
          atlas={atlas}
          state={{ ...state, dark, inspectorOpen: details && selectedParts.length > 0 }}
          onSelect={choosePart}
          onProgress={(n) => {
            setProgress(n);
            if (n === 100) setError("");
          }}
          onError={setError}
          partLabel={partLabel}
        />
      )}
      <div className="vignette" />
      <header className="identity">
        <div className="eyebrow">
          <span className="status-dot" /> ORTEZ & PROTEZ · ANATOMİ VE FİZYOLOJİ
        </div>
        <h1>
          Corporis Humani Atlas
          <Badge variant="outline" className="edition">
            3B · TA
          </Badge>
        </h1>
        <div className="identity-meta">
          {atlas ? atlas.parts.length.toLocaleString("tr-TR") : "2.234"} 3B yapı <span>·</span>{" "}
          Terminologia Anatomica (Latince/Yunanca)
        </div>
      </header>
      <nav className="top-actions" aria-label="Keşif ve çalışma panelleri">
        <Button
          variant="ghost"
          className={studyMode === "guide" ? "active" : ""}
          onClick={() => {
            setPanel(null);
            setDetails(false);
            setStudyMode((m) => (m === "guide" ? null : "guide"));
          }}
          aria-label="Ders Rehberi (PDF)"
        >
          <BookOpen size={17} />
          <span>Ders Rehberi</span>
        </Button>
        <Button
          variant="ghost"
          className={studyMode === "games" ? "active" : ""}
          onClick={() => {
            setPanel(null);
            setDetails(false);
            setStudyMode((m) => (m === "games" ? null : "games"));
          }}
          aria-label="Ezber Oyunları"
        >
          <Gamepad2 size={17} />
          <span>Ezber Oyunları</span>
        </Button>
        <Button
          variant="ghost"
          className={panel === "search" ? "active" : ""}
          onClick={() => openPanel("search")}
          aria-label="Anatomi ara"
        >
          <Search size={17} />
          <span>Yapı bul</span>
          <kbd>/</kbd>
        </Button>
        <Button
          variant="ghost"
          className="icon-button"
          aria-label={dark ? "Açık temaya geç" : "Koyu temaya (Dark Mode) geç"}
          title={dark ? "Açık Tema" : "Koyu Tema (Dark Mode)"}
          onClick={() => setDark((d) => !d)}
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </Button>
        <Button
          variant="ghost"
          className="icon-button"
          aria-label="Atlas hakkında"
          onClick={() => {
            setDetails(false);
            setPanel(null);
            setStudyMode(null);
            setAbout(true);
          }}
        >
          <Info size={18} />
        </Button>
      </nav>

      {activeChallenge && (
        <div className="challenge-hud glass" role="region" aria-label="Aktif 3B Bulma Görevi">
          <div className="challenge-hud-main">
            <Badge variant="secondary">
              <Crosshair size={12} /> 3B HEDEF
            </Badge>
            <strong>{activeChallenge.latin}</strong>
            <span className="hud-tr">({activeChallenge.turkish})</span>
            <span className="hud-score">
              Skor: {challengeScore.hits}/{challengeScore.attempts}
            </span>
          </div>
          <p className="challenge-hud-clue">{activeChallenge.clue}</p>
          {challengeFeedback && (
            <div className={`challenge-hud-feedback ${challengeFeedback.ok ? "ok" : "err"}`}>
              {challengeFeedback.msg}
            </div>
          )}
          <div className="challenge-hud-actions">
            <Button
              size="sm"
              variant="outline"
              onClick={() => inspectConceptById(activeChallenge.conceptId)}
            >
              Cevabı Göster
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                const idx = BODY_CHALLENGES.findIndex((x) => x.id === activeChallenge.id);
                const next = BODY_CHALLENGES[(idx + 1) % BODY_CHALLENGES.length];
                startChallenge(next);
              }}
            >
              Sonraki Hedef <ChevronRight size={14} />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => startChallenge(null)}
              aria-label="Görevi kapat"
            >
              <X size={15} />
            </Button>
          </div>
        </div>
      )}

      <section
        className={`layers-panel glass ${panel === "layers" ? "mobile-open" : ""}`}
        aria-label="Anatomik katmanlar"
      >
        <div className="panel-heading">
          <span>Sistemler (Systemata)</span>
          <Button
            variant="ghost"
            className="mobile-only icon-button"
            onClick={() => setPanel(null)}
            aria-label="Sistemleri kapat"
          >
            <X size={18} />
          </Button>
          <Badge variant="secondary" className="desktop-only small-number">
            {activeSystems.length}
          </Badge>
        </div>
        <div className="layer-presets">
          <Button
            variant="ghost"
            aria-pressed={activeSystems.every((x) => state.visible.includes(x.id))}
            onClick={() =>
              setState((s) => ({
                ...s,
                selected: [],
                isolate: false,
                visible: activeSystems.map((x) => x.id),
              }))
            }
          >
            Tümü
          </Button>
          <Button
            variant="ghost"
            aria-pressed={state.visible.length === 1 && state.visible[0] === "skeletal"}
            onClick={() =>
              setState((s) => ({ ...s, selected: [], isolate: false, visible: ["skeletal"] }))
            }
          >
            İskelet
          </Button>
          <Button
            variant="ghost"
            aria-pressed={state.visible.length === 1 && state.visible[0] === "muscular"}
            onClick={() =>
              setState((s) => ({ ...s, selected: [], isolate: false, visible: ["muscular"] }))
            }
          >
            Kaslar
          </Button>
          <Button
            variant="ghost"
            aria-pressed={
              state.visible.length === 6 &&
              ["cardiac", "respiratory", "digestive", "urinary", "endocrine", "reproductive"].every(
                (id) => state.visible.includes(id as SystemId),
              )
            }
            onClick={() =>
              setState((s) => ({
                ...s,
                selected: [],
                isolate: false,
                visible: [
                  "cardiac",
                  "respiratory",
                  "digestive",
                  "urinary",
                  "endocrine",
                  "reproductive",
                ],
              }))
            }
          >
            Organlar
          </Button>
        </div>
        <div className="system-list">
          {activeSystems.map((s) => (
            <div
              className={`system-row ${state.visible.includes(s.id) ? "enabled" : ""}`}
              key={s.id}
            >
              <Button
                variant="ghost"
                className="system-name"
                title={`Yalnızca ${s.name.toLowerCase()} (${s.latin})`}
                onClick={() =>
                  setState((v) => ({ ...v, visible: [s.id], isolate: false, selected: [] }))
                }
              >
                <span className="system-dot" style={{ background: s.color }} />
                {s.name}
                <span className="system-latin">{s.latin}</span>
                <span className="system-count">{counts[s.id]}</span>
              </Button>
              <Switch
                checked={state.visible.includes(s.id)}
                onCheckedChange={() => toggle(s.id)}
                aria-label={`${s.name} göster`}
              />
            </div>
          ))}
        </div>
        <div className="panel-foot">
          <span>{visibleCount.toLocaleString("tr-TR")} parça görünür</span>
          <Button
            variant="ghost"
            onClick={() => setState((s) => ({ ...s, visible: [], selected: [], isolate: false }))}
          >
            Tümünü gizle
          </Button>
        </div>
      </section>
      {panel === "search" && (
        <section className="search-panel glass" aria-label="Anatomi ara">
          <div className="panel-heading">
            <span>Yapı bul (Latince / Türkçe)</span>
            <Button
              variant="ghost"
              className="icon-button"
              onClick={() => setPanel(null)}
              aria-label="Aramayı kapat"
            >
              <X size={18} />
            </Button>
          </div>
          <Combobox<Concept>
            items={results}
            value={null}
            onValueChange={(value) => {
              if (value) choose(value);
            }}
            inputValue={query}
            onInputValueChange={setQuery}
            itemToStringLabel={labelConcept}
            filter={null}
            open
            onOpenChange={(open) => {
              if (!open) setPanel(null);
            }}
          >
            <ComboboxInput
              autoFocus
              placeholder="Cor, femur, thalamus, musculus, nervus…"
              aria-label="Adlandırılmış anatomik yapıları ara"
              showTrigger={false}
            />
            <ComboboxContent className="anatomy-search-results">
              <ComboboxEmpty>Aramanızla eşleşen yapı yok.</ComboboxEmpty>
              <ComboboxList>
                {(c: Concept) => (
                  <ComboboxItem key={c.id} value={c}>
                    <div className="search-result-stack">
                      <span className="search-result-name">{labelConcept(c)}</span>
                      <span className="search-result-latin">{labelLatin(c)}</span>
                    </div>
                    <span className="small-number">{c.elements.length} parça</span>
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
          <p className="search-note">
            {query
              ? "En fazla 80 sonuç. Latince, Yunanca veya Türkçe terim yazabilirsiniz."
              : "Temel bir kemik, kas veya organdan başlayın ya da tüm 3.432 kavramda arayın."}
          </p>
        </section>
      )}
      <nav className="view-controls glass" aria-label="Kamera kontrolleri">
        <Button
          variant="ghost"
          className={`camera-mode-btn ${state.freeCamera !== false ? "active" : ""}`}
          aria-pressed={state.freeCamera !== false}
          title={
            state.freeCamera !== false
              ? "Serbest Kamera Aktif (Merkez kilidi kapalı: Tıklanan eklemi merkez alır, imlece yakınlaşır ve 360° serbest döner)"
              : "Merkez Kilidi Aktif (Sabit gövde merkezine kilitli)"
          }
          onClick={() => setState((s) => ({ ...s, freeCamera: s.freeCamera === false }))}
        >
          {state.freeCamera !== false ? <Unlock size={15} /> : <Lock size={15} />}
          <span className="cam-btn-label">
            {state.freeCamera !== false ? "Serbest Kamera" : "Merkez Kilitli"}
          </span>
        </Button>
        <Button
          variant="ghost"
          className={`camera-mode-btn ${state.panMode ? "active" : ""}`}
          aria-pressed={!!state.panMode}
          title="Sol Tık Kaydırma (Pan) Modu: Kamerayı yukarı, aşağı, sağa ve sola serbestçe sürükleyin"
          onClick={() => setState((s) => ({ ...s, panMode: !s.panMode }))}
        >
          <Move size={15} />
          <span className="cam-btn-label">{state.panMode ? "Kaydırılıyor" : "Kaydır (Pan)"}</span>
        </Button>
        {state.selected.length > 0 && (
          <Button
            variant="ghost"
            className="camera-mode-btn"
            title="Seçili ekleme veya kemiğe yakınlaş (Çevre anatomiyi gizlemeden odakla)"
            onClick={() =>
              setState((s) => ({ ...s, isolate: false, focusTrigger: (s.focusTrigger ?? 0) + 1 }))
            }
          >
            <ZoomIn size={15} />
            <span className="cam-btn-label">Ekleme Odakla</span>
          </Button>
        )}
        <i />
        {(["three-quarter", "front", "side", "back"] as View[]).map((v, i) => (
          <Button
            variant="ghost"
            key={v}
            className={state.view === v ? "active" : ""}
            aria-pressed={state.view === v}
            disabled={state.explode > 0.8 && v !== "front"}
            onClick={() =>
              setState((s) => ({
                ...s,
                view: v,
                reset: s.reset + 1,
                rotate: false,
                focusPreset: null,
              }))
            }
            title={VIEW_LABEL[v]}
            aria-label={VIEW_LABEL[v]}
          >
            <span>{["¾", "Ö", "Y", "A"][i]}</span>
          </Button>
        ))}
        <i />
        <Button
          variant="ghost"
          disabled={state.explode >= 0.4}
          aria-label={state.rotate ? "Döndürmeyi durdur" : "Vücudu döndür"}
          title="Otomatik döndür"
          className={state.rotate ? "active" : ""}
          onClick={() => setState((s) => ({ ...s, rotate: !s.rotate }))}
        >
          {state.rotate ? <Pause size={17} /> : <RotateCw size={18} />}
        </Button>
        <Button
          variant="ghost"
          aria-label="Görünümü ve katmanları sıfırla"
          title="Sıfırla"
          onClick={reset}
        >
          <RotateCcw size={17} />
        </Button>
      </nav>
      <nav className="joint-presets glass" aria-label="Hızlı eklem ve bölge odakları">
        <span className="joint-presets-title">Eklem Odakla:</span>
        {JOINT_PRESETS.map((jp) => (
          <Button
            key={jp.id}
            variant="ghost"
            size="xs"
            className={state.focusPreset?.id === jp.id ? "active" : ""}
            title={jp.title}
            onClick={() =>
              setState((s) => ({
                ...s,
                isolate: false,
                rotate: false,
                focusPreset: { id: jp.id, seq: (s.focusPreset?.seq ?? 0) + 1 },
              }))
            }
          >
            {jp.label}
          </Button>
        ))}
      </nav>
      <div className="scene-caption">
        <span className="caption-line" />
        <span>
          {state.isolate
            ? chosenLatin
              ? `${chosenLatin} · ${chosenLabel}`
              : chosenLabel || "SEÇİLİ YAPI"
            : state.explode > 0.95
              ? "ANATOMİ ENVANTERİ"
              : state.explode > 0.05
                ? "AYRIŞTIRILMIŞ YAPILAR"
                : state.freeCamera !== false
                  ? "SERBEST KAMERA · ÇİFT TIKLA VEYA EKLEME ODAKLA (WASD / PAN AKTİF)"
                  : "POSITIO ANATOMICA · REFERANS"}
        </span>
        <span className="caption-line" />
      </div>
      <div className="bottom-dock glass">
        <Button
          variant="ghost"
          className="mobile-only dock-layers"
          onClick={() => openPanel("layers")}
          aria-label="Sistem katmanlarını aç"
        >
          <Layers3 size={20} />
          <span>Sistemler</span>
        </Button>
        <div className="explode-control">
          <div className="explode-label">
            <label id="explode-label">Anatomiyi ayır (Diseksiyon)</label>
            <output>
              {Math.round(state.explode * 100)}
              <span>%</span>
            </output>
          </div>
          <Slider
            aria-labelledby="explode-label"
            min={0}
            max={100}
            step={1}
            value={[state.explode * 100]}
            onValueChange={(v) =>
              setState((s) => ({
                ...s,
                explode: (Array.isArray(v) ? v[0] : v) / 100,
                view: (Array.isArray(v) ? v[0] : v) > 80 ? "front" : s.view,
                rotate: false,
              }))
            }
          />
          <div className="slider-endpoints">
            <span>Birleşik (Anatomik Duruş)</span>
            <span>Tüm Parçalar</span>
          </div>
        </div>
        <Button
          variant="ghost"
          className="dock-reset"
          onClick={reset}
          aria-label="Birleştir ve sıfırla"
        >
          <RotateCcw size={18} />
          <span>Sıfırla</span>
        </Button>
      </div>
      <footer className="studio-footer">
        <span>
          {state.explode > 0.8 ? "Sürükleyerek kaydır" : "Sürükleyerek döndür"} <b>·</b>{" "}
          Yakınlaştırmak için sıkıştır <b>·</b> İncelemek için dokun
        </span>
        <Button
          variant="ghost"
          onClick={() => {
            setDetails(false);
            setPanel(null);
            setStudyMode(null);
            setAbout(true);
          }}
        >
          Kaynak ve atıf <ArrowUpRight size={12} />
        </Button>
      </footer>
      {progress < 100 && !error && (
        <div className="loading glass" role="status">
          <Activity size={18} />
          <div>
            <strong>Anatomi hazırlanıyor</strong>
            <span>
              {progress}% · {atlas?.parts.length.toLocaleString("tr-TR") ?? "2.234"} parça
              yükleniyor
            </span>
            <div className="loading-track">
              <i style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      )}
      {error && (
        <div className="loading glass error" role="alert">
          <p>{error}</p>
          <Button variant="ghost" onClick={() => location.reload()}>
            Görüntüleyiciyi yenile
          </Button>
        </div>
      )}
      <Sheet
        open={details && selectedParts.length > 0}
        modal={false}
        disablePointerDismissal
        onOpenChange={setDetails}
      >
        <SheetContent
          initialFocus={detailTitle}
          className={`detail-sheet glass ${state.isolate ? "is-isolated" : ""}`}
          showCloseButton={true}
        >
          <div className="detail-header">
            <div className="detail-accent" style={{ background: system?.color }} />
            <div className="eyebrow">{system ? `${system.name} · ${system.latin}` : "ANATOMİ"}</div>
            <SheetTitle ref={detailTitle} tabIndex={-1} className="structure-title">
              {chosenLatin || chosenLabel}
            </SheetTitle>
            <p className="structure-latin">{chosenLabel}</p>
          </div>
          <div className="detail-scroll" key={`${chosen?.id}-${state.isolate}`}>
            <SheetDescription className="structure-description">
              {chosen && selected
                ? explanation(
                    chosen.id,
                    selected.system,
                    terms ? { tr: chosenLabel, la: chosenLatin } : undefined,
                  )
                : ""}
            </SheetDescription>
            <div className="structure-meta">
              <span>
                Atlas referansı<strong>{chosen?.id}</strong>
              </span>
              <span>
                Seçili parçalar<strong>{state.selected.length.toLocaleString("tr-TR")}</strong>
              </span>
            </div>
            {selectedParts.length > 1 && (
              <div className="member-list">
                <h3>Dahil yapılar (Latince / Türkçe)</h3>
                {selectedParts.slice(0, 50).map((p) => (
                  <Button variant="ghost" key={p.id} onClick={() => choosePart(p.id)}>
                    <span>{partLabel ? partLabel(p) : p.name}</span>
                    <ChevronRight size={14} />
                  </Button>
                ))}
                {selectedParts.length > 50 && (
                  <p>Ve {selectedParts.length - 50} model parça daha.</p>
                )}
              </div>
            )}
            <div className="detail-study-links">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setState((s) => ({
                    ...s,
                    isolate: false,
                    focusTrigger: (s.focusTrigger ?? 0) + 1,
                  }))
                }
              >
                <ZoomIn size={14} /> Ekleme Yakınlaş (Çevreyi Koru)
              </Button>
              <Button variant="outline" size="sm" onClick={() => setStudyMode("guide")}>
                <BookOpen size={14} /> Ders Notunu Aç
              </Button>
              <Button variant="outline" size="sm" onClick={() => setStudyMode("games")}>
                <Gamepad2 size={14} /> Kendini Test Et
              </Button>
            </div>
            <a
              className="source-link"
              href="https://lifesciencedb.jp/bp3d/"
              target="_blank"
              rel="noreferrer"
            >
              Anatomi kaynağını görüntüle <ArrowUpRight size={14} />
            </a>
          </div>
          <div className="detail-actions">
            <Button
              className={`primary-action ${state.isolate ? "active" : ""}`}
              onClick={() => setState((s) => ({ ...s, isolate: !s.isolate, explode: 0 }))}
            >
              <Focus size={18} />
              {state.isolate ? "Çevre anatomiyi göster" : "Yapıyı izole et"}
              <ChevronRight size={16} />
            </Button>
            <Button
              variant="ghost"
              className="secondary-action"
              onClick={() => {
                setState((s) => ({ ...s, selected: [], isolate: false }));
                setDetails(false);
              }}
            >
              Seçimi temizle
            </Button>
          </div>
        </SheetContent>
      </Sheet>
      <Sheet open={about} onOpenChange={setAbout}>
        <SheetContent className="about-sheet glass">
          <div className="eyebrow">KAYNAK VE KAPSAM</div>
          <SheetTitle className="structure-title">
            Ortez ve Protez · 3B Anatomi ve Fizyoloji Atlası
          </SheetTitle>
          <SheetDescription>
            Terminologia Anatomica (Latince/Yunanca) standartlarında 3B insan modeli ve sınava
            hazırlık platformu.
          </SheetDescription>
          <div className="about-copy">
            <p>
              <strong>Erkek · BodyParts3D & Ortez-Protez Müfredatı</strong>
              <br />
              Yetişkin erkek referans anatomisinden 2.234 ayrı mesh, 3.432 adlandırılmış kavram, 6
              Fizyoloji modülü ve 6 İskelet/Eklem/Biyomekanik modülü.
            </p>
            <p>
              Kemikler (Ossa), kaslar (Musculi), eklemler (Articulationes), kalp (Cor), duyu
              organları (Organa sensoria), sinir sistemi (Systema nervosum) ve tüm iç organların
              Latince/Yunanca terminolojileri ve fizyolojik mekanizmaları ders rehberlerinize göre
              eksiksiz yapılandırılmıştır.
            </p>
            <h3>Kaynak</h3>
            <p>
              BodyParts3D, © The Database Center for Life Science, CC Attribution 4.0 International
              lisansı.
            </p>
            <a
              href="https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html"
              target="_blank"
              rel="noreferrer"
            >
              Veri seti lisansı <ArrowUpRight size={14} />
            </a>
            <a
              href="https://dbarchive.biosciencedbc.jp/en/bodyparts3d/download.html"
              target="_blank"
              rel="noreferrer"
            >
              Orijinal geometri ve metadata <ArrowUpRight size={14} />
            </a>
            <a
              href="https://academic.oup.com/nar/article/37/suppl_1/D782/1000752"
              target="_blank"
              rel="noreferrer"
            >
              Kaynak yayını oku <ArrowUpRight size={14} />
            </a>
          </div>
        </SheetContent>
      </Sheet>
      {studyMode && (
        <StudyHub
          mode={studyMode}
          onClose={() => setStudyMode(null)}
          onInspectConcept={inspectConceptById}
          activeChallenge={activeChallenge}
          onStartBodyChallenge={startChallenge}
          challengeScore={challengeScore}
          onResetChallengeScore={() => {
            setChallengeScore({ hits: 0, attempts: 0 });
            setChallengeFeedback(null);
          }}
        />
      )}
    </main>
  );
}
