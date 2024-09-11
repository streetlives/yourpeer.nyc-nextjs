// https://vercel.com/guides/react-context-state-management-nextjs

"use client";

import { useCookies } from "next-client-cookies";
import React, { createContext, useState } from "react";

export const LanguageTranslationContext =
  createContext<LanguageTranslationContextType | null>(null);

export type LanguageTranslationContextType = {
  gTranslateCookie: string | null;
  setGTranslateCookie: (gTranslateCookie: string | null) => void;
};

const GOOGLE_TRANLATE_COOKIE_NAME = "googtrans";

export function getTargetLanguage(gTranslateCookie: string) {
  return gTranslateCookie.split("|")[1];
}

export const LanguageTranslationProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const cookies = useCookies();

  const googtransCookie = cookies.get("googtrans");
  const googtransCookieDefaultValue = googtransCookie
    ? googtransCookie.replace(/\//g, "|").slice(1)
    : "en|en";
  const [gTranslateCookie, setGTranslateCookie] = useState<string | null>(
    googtransCookieDefaultValue,
  );
  return (
    <LanguageTranslationContext.Provider
      value={{
        gTranslateCookie,
        setGTranslateCookie: (gTranslateCookie: string | null) => {
          setGTranslateCookie(gTranslateCookie);
          if (gTranslateCookie) {
            const targetLanguage = getTargetLanguage(gTranslateCookie);
            const newCookieValue =
              targetLanguage === "en"
                ? undefined
                : `/${gTranslateCookie.replace("|", "/")}`;
            // we clear the cookie if it's english so that we do not run google translate
            if (newCookieValue) {
              cookies.set(GOOGLE_TRANLATE_COOKIE_NAME, newCookieValue);
            } else {
              cookies.remove(GOOGLE_TRANLATE_COOKIE_NAME);
            }
          }
        },
      }}
    >
      {children}
    </LanguageTranslationContext.Provider>
  );
};
