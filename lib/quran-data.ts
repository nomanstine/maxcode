import fs from "node:fs/promises";
import path from "node:path";
import type { Ayah, SearchEntry, Surah } from "@/types/quran";

const dataRoot = path.join(process.cwd(), "public", "data");

async function readJsonFile<T>(filePath: string): Promise<T> {
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw) as T;
}

export async function getSurahs(): Promise<Surah[]> {
  return readJsonFile<Surah[]>(path.join(dataRoot, "surahs.json"));
}

export async function getAyahsBySurah(surahId: number): Promise<Ayah[]> {
  return readJsonFile<Ayah[]>(path.join(dataRoot, "ayahs", `${surahId}.json`));
}

export async function getSearchIndex(): Promise<SearchEntry[]> {
  return readJsonFile<SearchEntry[]>(path.join(dataRoot, "search-index.json"));
}

export async function getSurahById(surahId: number): Promise<Surah | null> {
  const surahs = await getSurahs();
  return surahs.find((s) => s.id === surahId) ?? null;
}
