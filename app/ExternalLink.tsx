"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";

/**
 * 作品サイトを必ず別タブ（別ウィンドウ）で開くリンク。
 *
 * - 通常のブラウザ：target="_blank" で新しいタブ。
 * - LINE のアプリ内ブラウザ：_blank でも同じ画面で開いてしまい戻りにくいため、
 *   LINE の公式パラメータ openExternalBrowser=1 を付けて外部ブラウザで開く。
 *   作品マップは LINE 側にそのまま残る。
 */
const isLineInApp = () => typeof navigator !== "undefined" && / Line\//i.test(navigator.userAgent);

const withLineParam = (url: string) => {
  const u = new URL(url);
  u.searchParams.set("openExternalBrowser", "1");
  return u.toString();
};

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "target" | "rel"> & { href: string };

export default function ExternalLink({ href, onClick, title, children, ...rest }: Props) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (isLineInApp()) {
      e.preventDefault();
      window.location.href = withLineParam(href);
    }
  };

  return (
    <a
      {...rest}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={title ?? "新しいタブで開きます"}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
