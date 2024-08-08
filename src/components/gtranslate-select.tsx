"use client";

import { useCookies } from "next-client-cookies";
import { useState } from "react";
import { lang_array_native, languages } from "./gtranslate-common";

export function GTranslateSelect() {
  const cookies = useCookies();
  const cookie = cookies.get("googtrans");
  const defaultValue = cookie ? cookie.replace(/\//g, "|").slice(1) : "en|en";
  const [gTranslateCookie, setGTranslateCookie] =
    useState<string>(defaultValue);

  const sourceLanguage = gTranslateCookie.split("|")[0];

  function onSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    if (value) {
      const targetLanguage = value.split("|")[1];
      const newCookieValue = `/${value.replace("|", "/")}`;
      cookies.set("googtrans", newCookieValue);
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
        value={gTranslateCookie}
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
