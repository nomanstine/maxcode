import Link from "next/link";
import { notFound } from "next/navigation";
import { getAyahsBySurah, getSurahById, getSurahs } from "@/lib/quran-data";

type SurahPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  const surahs = await getSurahs();
  return surahs.map((surah) => ({ id: String(surah.id) }));
}

export default async function SurahPage({ params }: SurahPageProps) {
  const { id } = await params;
  const surahId = Number(id);

  if (!Number.isInteger(surahId) || surahId < 1 || surahId > 114) {
    notFound();
  }

  const surah = await getSurahById(surahId);
  if (!surah) notFound();

  const ayahs = await getAyahsBySurah(surahId);

  return (
    <main className="page-shell">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="panel-surface reveal-up inline-flex items-center rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-500 hover:text-slate-900"
          style={{ animationDelay: "40ms" }}
        >
          Back to Surah List
        </Link>

        <header className="panel-surface reveal-up mt-4 rounded-3xl p-6 sm:p-8" style={{ animationDelay: "100ms" }}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700/90">
            Surah {surah.id}
          </p>
          <h1 className="mt-2 text-4xl font-semibold text-slate-900 sm:text-5xl">{surah.englishName}</h1>
          <p className="mt-3 text-right text-4xl leading-[1.8] arabic-text">{surah.arabicName}</p>
          <p className="mt-3 text-sm font-medium text-slate-600">{surah.ayahCount} ayahs</p>
        </header>

        <section className="mt-7 space-y-4 sm:space-y-5">
          {ayahs.map((ayah, index) => (
            <article
              key={ayah.ayahNumber}
              id={`ayah-${ayah.ayahNumber}`}
              className="panel-surface floating-card reveal-up rounded-2xl p-5 sm:p-6"
              style={{ animationDelay: `${140 + index * 18}ms` }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                Ayah {ayah.ayahNumber}
              </p>
              <p className="mt-4 text-right leading-[2.25] arabic-text">
                {ayah.arabicText}
              </p>
              <p className="mt-5 leading-8 translation-text text-slate-800">
                {ayah.translationText}
              </p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
