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
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Search Ayahs (English Translation)</h2>
      <p className="mt-1 text-sm text-slate-600">
        Search by translation text. Minimum 2 characters.
      </p>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="e.g. mercy, guidance, patience"
        className="mt-4 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none ring-0 transition focus:border-slate-500"
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
              className="block rounded-xl border border-slate-200 bg-slate-50 p-3 transition hover:border-slate-400 hover:bg-white"
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
