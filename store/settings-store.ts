"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type ArabicFontOption =
  | "naskh"
  | "amiriQuran"
  | "kufi"
  | "nastaliq"
  | "reemFun"
  | "reemInk"
  | "arefInk"
  | "mirza"
  | "lalezar"
  | "gulzar"
  | "lateef";

type SettingsState = {
  arabicFont: ArabicFontOption;
  arabicFontSize: number;
  translationFontSize: number;
  setArabicFont: (font: ArabicFontOption) => void;
  setArabicFontSize: (size: number) => void;
  setTranslationFontSize: (size: number) => void;
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      arabicFont: "naskh",
      arabicFontSize: 36,
      translationFontSize: 18,
      setArabicFont: (font) => set({ arabicFont: font }),
      setArabicFontSize: (size) => set({ arabicFontSize: size }),
      setTranslationFontSize: (size) => set({ translationFontSize: size }),
    }),
    {
      name: "quran-settings-v1",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
