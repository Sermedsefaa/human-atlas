# Latince / Türkçe dönüşüm — walkthrough

## Tamamlanan

### Terim verisi
- `scripts/data/glossary-pdf.json` — PDF sözlük çıktısı
- `scripts/fetch-wikidata-terms.mjs` + `scripts/data/wikidata-terms.json` — Wikidata etiketleri
- `scripts/group-concepts.mjs` + `scripts/data/concept-groups/` — çeviri grupları
- `scripts/build-terms-tr.mjs` → `public/models/terms.tr.json` (3.432 kavram)
- `scripts/validate-terms.mjs` — atlas kavramları ile bire bir doğrulama

### Uygulama
- `app/terms.ts` — yükleme, TR etiket, normalize arama
- `app/anatomy.ts` — sistemler TR + LA, ~143 FMA açıklaması
- `app/page.tsx` — arayüz Türkçe, başlık *Corporis Humani Atlas*, arama TR/LA/EN
- `app/scene.tsx`, `app/model-download.ts` — hata ve ipuçları Türkçe
- `app/agent-tools.ts` — TR açıklamalar, çok dilli arama
- `web/index.html` — `lang=tr`, Latince `<title>`

### npm
- `validate:terms`, `validate:atlas`, `validate:interactions`, `validate`

## Doğrulama (yerel)

```bash
npm run validate
npm run check
npm run build
npm run dev
```

Tarayıcıda (`http://localhost:3016`):

1. Başlık Latince, paneller Türkçe.
2. `/` veya **Yapı bul** — `kalp`, `femur`, `FMA7088` aramaları.
3. Bir yapı seç — Türkçe başlık, Latince alt satır, FMA açıklaması (varsa).
4. Sistem listesinde TR ad + Latince alt etiket.
5. **Anatomiyi ayır** kaydırıcısı ve izole mod.

## Bilinen sınırlar

- Mesh parça adları atlas kaynağından İngilizce kalır; kavram düzeyinde TR/LA gösterilir.
- ~221 kavram için özel Türkçe açıklama (`EXPLANATIONS`); diğerlerinde **Türkçe ad + Latince ad + sistem açıklaması** otomatik birleştirilir.
- `walkthrough.md` ilk kez bu oturumda eklendi; tarayıcı kontrolü sizin ortamınızda yapılmalıdır.

## Henüz commit edilmedi

Aşağıdaki dosyalar çalışma ağacında (commit istenmedi):

- `app/anatomy.ts`, `app/page.tsx`, `app/terms.ts`, `app/scene.tsx`, …
- `public/models/terms.tr.json`, `scripts/**`, `walkthrough.md`, `package.json`
