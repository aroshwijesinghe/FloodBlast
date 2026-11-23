import { ChevronDown, Languages } from "lucide-react";
import { useTranslation } from "../../i18n";
import { isLanguage, languageNames, useLanguageStore } from "../../store/languageStore";

export function LanguageSwitcher() {
  const { language, t } = useTranslation();
  const setLanguage = useLanguageStore((state) => state.setLanguage);
  return (
    <label className="language-switcher">
      <Languages size={17} aria-hidden="true" />
      <select aria-label={t("Language")} value={language} onChange={({ target }) => {
        if (isLanguage(target.value)) setLanguage(target.value);
      }}>
        {Object.entries(languageNames).map(([code, name]) => (
          <option key={code} value={code} lang={code}>{name}</option>
        ))}
      </select>
      <ChevronDown size={14} aria-hidden="true" />
    </label>
  );
}
