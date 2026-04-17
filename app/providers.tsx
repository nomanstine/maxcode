"use client";

import { useEffect } from "react";
import { SettingsSidebar } from "@/components/settings-sidebar";
import { useSettingsStore } from "@/store/settings-store";

export default function Providers({ children }: { children: React.ReactNode }) {
  const { arabicFont, arabicFontSize, translationFontSize } = useSettingsStore();

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.arabicFont = arabicFont;
    root.style.setProperty("--arabic-font-size", `${arabicFontSize}px`);
    root.style.setProperty("--translation-font-size", `${translationFontSize}px`);
  }, [arabicFont, arabicFontSize, translationFontSize]);

  return (
    <>
      <div className="md:pr-80">{children}</div>
      <SettingsSidebar />
    </>
  );
}
