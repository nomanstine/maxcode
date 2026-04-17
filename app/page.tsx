import Link from "next/link";
import { SearchPanel } from "@/components/search-panel";
import { getSearchIndex, getSurahs } from "@/lib/quran-data";

export default async function HomePage() {
  const surahs = await getSurahs();
  const searchIndex = await getSearchIndex();

  return (
    <main className="page-shell">
      <div className="mx-auto max-w-6xl">
        <header className="panel-surface reveal-up mb-8 rounded-3xl p-6 sm:p-8" style={{ animationDelay: "40ms" }}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">
            Quran Explorer
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
            114 Surahs
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
            Browse every surah with Arabic and English names, open full ayahs with translation,
            and search across translation text.
          </p>
        </header>

        <div className="mb-10 reveal-up" style={{ animationDelay: "120ms" }}>
          <SearchPanel searchIndex={searchIndex} surahs={surahs} />
        </div>

        <section className="reveal-up" style={{ animationDelay: "180ms" }}>
          <h2 className="mb-5 text-2xl font-semibold text-slate-900 sm:text-3xl">Surah List</h2>
          <div className="grid gap-4 md:gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {surahs.map((surah, index) => (
              <Link
                key={surah.id}
                href={`/surah/${surah.id}`}
                className="panel-surface floating-card group reveal-up rounded-2xl p-5"
                style={{ animationDelay: `${220 + index * 26}ms` }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                  Surah {surah.id}
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-900">{surah.englishName}</h3>
                <p className="mt-3 text-right text-2xl leading-[1.8] arabic-text">{surah.arabicName}</p>
                <p className="mt-4 text-sm font-medium text-slate-600">{surah.ayahCount} ayahs</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
