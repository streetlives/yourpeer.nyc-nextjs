import "./globals.css";
import GTranslateWrapper from "./gtranslate-wrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <GTranslateWrapper />
      </body>
    </html>
  );
}
