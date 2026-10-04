import type { Metadata, Viewport } from "next";
import "./globals.css";

/** 公開URL（正規URL・OGP画像の基準） */
const SITE_URL = "https://craken-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  title: "地域デジタル相談室 作品マップ",
  description:
    "相談室から始まった、街のデジタル化の記録。地域デジタル相談室がこれまで制作したホームページ・便利アプリ・ミニゲームを、街のイラストで振り返れます。",
  openGraph: {
    title: "地域デジタル相談室 作品マップ",
    description: "相談室から始まった、街のデジタル化の記録",
    url: "/",
    siteName: "地域デジタル相談室 作品マップ",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "地域デジタル相談室 作品マップ" }],
    locale: "ja_JP",
    type: "website",
  },
  twitter: { card: "summary_large_image", images: ["/og.jpg"] },
};

export const viewport: Viewport = {
  themeColor: "#7cc6ea",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@500;700&display=swap"
        />
        <link rel="preload" as="image" href="/town-map.webp" type="image/webp" />
      </head>
      <body>{children}</body>
    </html>
  );
}
