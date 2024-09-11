"use client";

import { useContext } from "react";
import { lang_array_native, languages } from "./gtranslate-common";
import {
  getTargetLanguage,
  LanguageTranslationContext,
  LanguageTranslationContextType,
} from "./language-translation-context";

export function GTranslateSelect() {
  const { gTranslateCookie, setGTranslateCookie } = useContext(
    LanguageTranslationContext,
  ) as LanguageTranslationContextType;

  const sourceLanguage = (gTranslateCookie || "").split("|")[0];

  function onSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    if (value) {
      const targetLanguage = getTargetLanguage(value);
      setGTranslateCookie(value);
      const element = document.querySelector(".goog-te-combo");
      if (element) {
        (element as HTMLSelectElement).value = targetLanguage;
        element.dispatchEvent(new Event("change"));
      }
    }
  }

  return (
    <div>
      <select
        onChange={onSelectChange}
        className="gt_selector notranslate"
        value={gTranslateCookie || ""}
      >
        {languages.map((k) => (
          <option key={k} value={`${sourceLanguage}|${k}`}>
            {lang_array_native[k as keyof typeof lang_array_native]}
          </option>
        ))}
      </select>
    </div>
  );
}
