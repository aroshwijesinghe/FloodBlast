import { create } from "zustand";

export const languageNames = { si: "සිංහල", en: "English", ta: "தமிழ்" } as const;
export type Language = keyof typeof languageNames;
const storageKey = "fb.language";

export function isLanguage(value: string | null): value is Language {
  return value === "si" || value === "en" || value === "ta";
}

function initialLanguage(): Language {
  try {
    const saved = localStorage.getItem(storageKey);
    if (isLanguage(saved)) return saved;
  } catch {
    // Storage may be disabled by browser settings.
  }
  return "en";
}

export const useLanguageStore = create<{
  language: Language;
  setLanguage: (language: Language) => void;
}>((set) => ({
  language: initialLanguage(),
  setLanguage(language) {
    set({ language });
    try {
      localStorage.setItem(storageKey, language);
    } catch {
      // Keep the in-memory selection.
    }
  },
}));
