import Link from "next/link";
import { SearchPanel } from "@/components/search-panel";
import { getSearchIndex, getSurahs } from "@/lib/quran-data";

export default async function HomePage() {
  const surahs = await getSurahs();
  const searchIndex = await getSearchIndex();

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#e0f2fe_0%,_#f8fafc_55%,_#ffffff_100%)] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 rounded-3xl border border-sky-200 bg-white/80 p-6 shadow-sm backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
            Quran Explorer
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            114 Surahs
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            Browse every surah with Arabic and English names, open full ayahs with translation,
            and search across translation text.
          </p>
        </header>

        <div className="mb-8">
          <SearchPanel searchIndex={searchIndex} surahs={surahs} />
        </div>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-slate-900">Surah List</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {surahs.map((surah) => (
              <Link
                key={surah.id}
                href={`/surah/${surah.id}`}
                className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-300 hover:shadow"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                  Surah {surah.id}
                </p>
                <h3 className="mt-1 text-xl font-bold text-slate-900">{surah.englishName}</h3>
                <p className="mt-2 text-right text-2xl arabic-text">{surah.arabicName}</p>
                <p className="mt-3 text-sm text-slate-600">{surah.ayahCount} ayahs</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
