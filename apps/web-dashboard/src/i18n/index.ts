import si from "./si.json";
import ta from "./ta.json";
import { useLanguageStore, type Language } from "../store/languageStore";

const catalogs: Record<Language, Record<string, string>> = { en: {}, si, ta };
export type Translate = (message: string, values?: Record<string, string | number>) => string;

function translator(language: Language): Translate {
  return (message, values) => {
    const catalog = catalogs[language];
    const template = Object.prototype.hasOwnProperty.call(catalog, message) ? catalog[message] : message;
    return values
      ? template.replace(/\{(\w+)\}/g, (token, key: string) => String(values[key] ?? token))
      : template;
  };
}

const translators = { en: translator("en"), si: translator("si"), ta: translator("ta") };

export function useTranslation() {
  const language = useLanguageStore((state) => state.language);
  return { language, t: translators[language] };
}
