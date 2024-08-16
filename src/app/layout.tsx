// Copyright (c) 2024 Streetlives, Inc.
//
// Use of this source code is governed by an MIT-style
// license that can be found in the LICENSE file or at
// https://opensource.org/licenses/MIT.

import "./globals.css";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import type { Viewport } from "next";
import { CookiesProvider } from "next-client-cookies/server";

export const viewport: Viewport = {
  themeColor: "#FFD54F",
};

const GOOGLE_ANALYTICS_MEASUREMENT_ID = process.env
  .GOOGLE_ANALYTICS_MEASUREMENT_ID as string;

const GOOGLE_TAG_MANAGER_API_KEY = process.env
  .GOOGLE_TAG_MANAGER_API_KEY as string;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <GoogleTagManager gtmId={GOOGLE_TAG_MANAGER_API_KEY} />
      <body>
        <CookiesProvider>{children}</CookiesProvider>
        <GoogleAnalytics gaId={GOOGLE_ANALYTICS_MEASUREMENT_ID} />
      </body>
    </html>
  );
}
