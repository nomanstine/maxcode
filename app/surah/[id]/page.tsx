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
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#dcfce7_0%,_#f8fafc_55%,_#ffffff_100%)] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-500 hover:text-slate-900"
        >
          Back to Surah List
        </Link>

        <header className="mt-4 rounded-3xl border border-emerald-200 bg-white/85 p-6 shadow-sm backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Surah {surah.id}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">{surah.englishName}</h1>
          <p className="mt-2 text-right text-4xl arabic-text">{surah.arabicName}</p>
          <p className="mt-2 text-sm text-slate-600">{surah.ayahCount} ayahs</p>
        </header>

        <section className="mt-6 space-y-4">
          {ayahs.map((ayah) => (
            <article
              key={ayah.ayahNumber}
              id={`ayah-${ayah.ayahNumber}`}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                Ayah {ayah.ayahNumber}
              </p>
              <p className="mt-3 text-right leading-[2.2] arabic-text">
                {ayah.arabicText}
              </p>
              <p className="mt-4 leading-8 translation-text text-slate-800">
                {ayah.translationText}
              </p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
