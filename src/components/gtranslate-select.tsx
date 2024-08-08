"use client";

import { useCookies } from "next-client-cookies";
import { useState } from "react";
import { lang_array_native, languages } from "./gtranslate-common";

const GOOGLE_TRANLATE_COOKIE_NAME = "googtrans";

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
      const newCookieValue =
        targetLanguage === "en" ? undefined : `/${value.replace("|", "/")}`;
      setGTranslateCookie(value);
      const element = document.querySelector(".goog-te-combo");
      if (element) {
        (element as HTMLSelectElement).value = targetLanguage;
        element.dispatchEvent(new Event("change"));
      }
      // we clear the cookie if it's english so that we do not run google translate
      if (newCookieValue) {
        cookies.set(GOOGLE_TRANLATE_COOKIE_NAME, newCookieValue);
      } else {
        cookies.remove(GOOGLE_TRANLATE_COOKIE_NAME);
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
