"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Fuse from "fuse.js";
import type { SearchEntry, Surah } from "@/types/quran";

type SearchPanelProps = {
  searchIndex: SearchEntry[];
  surahs: Surah[];
};

export function SearchPanel({ searchIndex, surahs }: SearchPanelProps) {
  const [query, setQuery] = useState("");

  const surahMap = useMemo(
    () => new Map(surahs.map((s) => [s.id, s])),
    [surahs]
  );

  const fuse = useMemo(
    () =>
      new Fuse(searchIndex, {
        keys: ["translationText"],
        threshold: 0.35,
        ignoreLocation: true,
        minMatchCharLength: 2,
      }),
    [searchIndex]
  );

  const results = useMemo(() => {
    const q = query.trim();
    if (q.length < 2) return [];
    return fuse.search(q, { limit: 20 });
  }, [fuse, query]);

  return (
    <section className="panel-surface rounded-2xl p-5 sm:p-6">
      <h2 className="text-2xl font-semibold text-slate-900">Search Ayahs</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Search by translation text. Minimum 2 characters.
      </p>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="e.g. mercy, guidance, patience"
        className="mt-4 w-full rounded-xl border border-slate-300/80 bg-white/95 px-4 py-3 text-sm outline-none ring-0 transition focus:border-amber-400 focus:shadow-[0_0_0_3px_rgba(251,191,36,0.25)]"
      />

      <div className="mt-4 space-y-3">
        {query.trim().length >= 2 && results.length === 0 ? (
          <p className="text-sm text-slate-500">No matching ayahs found.</p>
        ) : null}

        {results.map(({ item }) => {
          const surah = surahMap.get(item.surahId);
          return (
            <Link
              key={`${item.surahId}-${item.ayahNumber}`}
              href={`/surah/${item.surahId}#ayah-${item.ayahNumber}`}
              className="floating-card block rounded-xl border border-slate-200 bg-slate-50/80 p-3.5 transition hover:border-amber-300/80 hover:bg-white"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {surah?.englishName ?? `Surah ${item.surahId}`} - Ayah {item.ayahNumber}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-slate-800">
                {item.translationText}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
