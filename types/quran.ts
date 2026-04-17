export type Surah = {
  id: number;
  arabicName: string;
  englishName: string;
  ayahCount: number;
};

export type Ayah = {
  surahId: number;
  ayahNumber: number;
  arabicText: string;
  translationText: string;
};

export type SearchEntry = {
  surahId: number;
  ayahNumber: number;
  translationText: string;
};
