import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "地域デジタル相談室 作品マップ",
  description:
    "相談室から始まった、街のデジタル化の記録。地域デジタル相談室がこれまで制作したホームページ・便利アプリ・ミニゲームを、街のイラストで振り返れます。",
  openGraph: {
    title: "地域デジタル相談室 作品マップ",
    description: "相談室から始まった、街のデジタル化の記録",
    images: ["/og.jpg"],
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
