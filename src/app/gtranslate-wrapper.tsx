// Copyright (c) 2024 Streetlives, Inc.
//
// Use of this source code is governed by an MIT-style
// license that can be found in the LICENSE file or at
// https://opensource.org/licenses/MIT.

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
