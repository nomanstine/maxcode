"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { useSettingsStore, type ArabicFontOption } from "@/store/settings-store";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";

const fontOptions: Array<{ value: ArabicFontOption; label: string }> = [
  { value: "naskh", label: "Noto Naskh Arabic" },
  { value: "amiriQuran", label: "Amiri Quran" },
  { value: "kufi", label: "Noto Kufi Arabic" },
  { value: "nastaliq", label: "Noto Nastaliq Urdu" },
  { value: "reemFun", label: "Reem Kufi Fun" },
  { value: "reemInk", label: "Reem Kufi Ink" },
  { value: "arefInk", label: "Aref Ruqaa Ink" },
  { value: "mirza", label: "Mirza" },
  { value: "lalezar", label: "Lalezar" },
  { value: "gulzar", label: "Gulzar" },
  { value: "lateef", label: "Lateef" },
];

export function SettingsSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const {
    arabicFont,
    arabicFontSize,
    translationFontSize,
    setArabicFont,
    setArabicFontSize,
    setTranslationFontSize,
  } = useSettingsStore();

  const renderSettingsContent = () => (
    <div className="mt-4 space-y-5">
      <div>
        <Label className="mb-2 block text-sm font-medium text-slate-700">Arabic Font</Label>
        <Select
          value={arabicFont}
          onValueChange={(value: string) => setArabicFont(value as ArabicFontOption)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Choose Arabic font" />
          </SelectTrigger>
          <SelectContent>
            {fontOptions.map((font) => (
              <SelectItem key={font.value} value={font.value}>
                {font.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="mb-3 block text-sm font-medium text-slate-700">
          Arabic Font Size: {arabicFontSize}px
        </Label>
        <Slider
          min={24}
          max={64}
          step={1}
          value={[arabicFontSize]}
          onValueChange={(value: number[]) => setArabicFontSize(value[0] ?? arabicFontSize)}
        />
      </div>

      <div>
        <Label className="mb-3 block text-sm font-medium text-slate-700">
          Translation Font Size: {translationFontSize}px
        </Label>
        <Slider
          min={14}
          max={30}
          step={1}
          value={[translationFontSize]}
          onValueChange={(value: number[]) =>
            setTranslationFontSize(value[0] ?? translationFontSize)
          }
        />
      </div>
    </div>
  );

  return (
    <>
      <div className="md:hidden">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              type="button"
              className="fixed right-4 top-4 z-50 h-9 w-9 border border-slate-300 bg-white/95 p-0 text-slate-900 shadow-sm backdrop-blur hover:bg-slate-100"
              aria-label="Open settings"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Settings</SheetTitle>
            </SheetHeader>
            {renderSettingsContent()}
          </SheetContent>
        </Sheet>
      </div>

      <aside className="hidden md:fixed md:inset-y-0 md:right-0 md:z-40 md:block md:w-80 md:border-l md:border-slate-200 md:bg-white/95 md:p-6 md:backdrop-blur">
        <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">
          Settings
        </h2>
        {renderSettingsContent()}
      </aside>
    </>
  );
}
