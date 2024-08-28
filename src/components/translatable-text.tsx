"use client";

import classNames from "classnames";
import { useTranslatedText } from "./use-translated-text-hook";

export function TranslatableText({
  text,
  id,
  className,
  expectTranslation = true,
}: {
  text: string;
  id?: string;
  className?: string;
  expectTranslation?: boolean;
}) {
  const translation = useTranslatedText({
    text,
    id,
    expectTranslation,
  });

  const classnames = `${className ? `${className} ` : ""}${classNames({ notranslate: !!translation })}`;
  return (
    <span id={id} className={classnames}>
      {translation || text}
    </span>
  );
}
