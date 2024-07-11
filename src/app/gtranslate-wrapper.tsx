"use client";

import Script from "next/script";
import { useEffect } from "react";

export default function GTranslateWrapper() {
  useEffect(() => {
    window["gtranslateSettings" as any] = {
      default_language: "en",
      native_language_names: true,
      languages: ["en", "es", "zh-CN", "bn", "fr"],
      wrapper_selector: ".gtranslate_wrapper",
    } as any;
  }, []);
  return (
    <>
      <Script
        src="https://cdn.gtranslate.net/widgets/latest/dropdown.js"
        defer
      ></Script>
    </>
  );
}
