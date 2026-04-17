import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const srcRoot = path.join(root, "data", "quranjson", "source");
const surahMetaPath = path.join(srcRoot, "surah.json");
const arDir = path.join(srcRoot, "surah");
const enDir = path.join(srcRoot, "translation", "en");

const outRoot = path.join(root, "public", "data");
const ayahDir = path.join(outRoot, "ayahs");

fs.mkdirSync(outRoot, { recursive: true });
fs.mkdirSync(ayahDir, { recursive: true });

const surahMeta = JSON.parse(fs.readFileSync(surahMetaPath, "utf8"));

if (!Array.isArray(surahMeta) || surahMeta.length !== 114) {
  throw new Error(`Expected 114 surahs in surah.json, got ${surahMeta?.length ?? 0}`);
}

const surahs = surahMeta.map((s, i) => ({
  id: Number(s.index ?? i + 1),
  arabicName: s.titleAr ?? "",
  englishName: s.title ?? `Surah ${i + 1}`,
  ayahCount: Number(s.count ?? 0),
}));

const searchIndex = [];

for (const s of surahs) {
  const surahId = s.id;

  const arPath = path.join(arDir, `surah_${surahId}.json`);
  const enPath = path.join(enDir, `en_translation_${surahId}.json`);

  if (!fs.existsSync(arPath)) throw new Error(`Missing Arabic file: ${arPath}`);
  if (!fs.existsSync(enPath)) throw new Error(`Missing English file: ${enPath}`);

  const arRaw = JSON.parse(fs.readFileSync(arPath, "utf8"));
  const enRaw = JSON.parse(fs.readFileSync(enPath, "utf8"));

  const arVerseObj = arRaw?.verse ?? {};
  const enVerseObj = enRaw?.verse ?? {};

  const ayahs = [];
  for (let ayahNumber = 1; ayahNumber <= s.ayahCount; ayahNumber++) {
    const key = `verse_${ayahNumber}`;
    const arabicText = String(arVerseObj[key] ?? "").replace(/^\uFEFF/, "");
    const translationText = String(enVerseObj[key] ?? "");

    ayahs.push({
      surahId,
      ayahNumber,
      arabicText,
      translationText,
    });

    searchIndex.push({
      surahId,
      ayahNumber,
      translationText,
    });
  }

  fs.writeFileSync(
    path.join(ayahDir, `${surahId}.json`),
    JSON.stringify(ayahs, null, 2)
  );
}

fs.writeFileSync(
  path.join(outRoot, "surahs.json"),
  JSON.stringify(surahs, null, 2)
);

fs.writeFileSync(
  path.join(outRoot, "search-index.json"),
  JSON.stringify(searchIndex, null, 2)
);

console.log("Quran data build complete.");
