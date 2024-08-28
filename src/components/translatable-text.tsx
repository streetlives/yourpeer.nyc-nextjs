"use client";

import { useContext } from "react";
import {
  getTargetLanguage,
  LanguageTranslationContext,
  LanguageTranslationContextType,
} from "./language-translation-context";
import classNames from "classnames";
import translations from "./translations";
import assert from "assert";

export function TranslatableText({
  text,
  id,
  className,
}: {
  text: string;
  id?: string;
  className?: string;
}) {
  const { gTranslateCookie } = useContext(
    LanguageTranslationContext,
  ) as LanguageTranslationContextType;

  const targetLanguage = gTranslateCookie
    ? getTargetLanguage(gTranslateCookie)
    : null;
  const targetLanguageTranslations =
    targetLanguage && translations[targetLanguage];
  const translation =
    targetLanguageTranslations &&
    ((id && translations[targetLanguage][id]) ||
      translations[targetLanguage][text]);
  assert(
    !targetLanguageTranslations || translation,
    `Expected a translation to exist for target language ${targetLanguage} and translatable text "${text}"`,
  );
  const classnames = `${className ? `${className} ` : ""}${classNames({ notranslate: !!translation })}`;
  return (
    <span id={id} className={classnames}>
      {translation || text}
    </span>
  );
}
