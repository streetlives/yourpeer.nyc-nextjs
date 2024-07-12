import "./globals.css";
import GTranslateWrapper from "./gtranslate-wrapper";
import { GoogleAnalytics } from '@next/third-parties/google'

const GOOGLE_ANALYTICS_MEASUREMENT_ID = process.env.GOOGLE_ANALYTICS_MEASUREMENT_ID as string

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
      <body>
        {children}
        <GTranslateWrapper />
        <GoogleAnalytics gaId={GOOGLE_ANALYTICS_MEASUREMENT_ID} />
      </body>
    </html>
  );
}
