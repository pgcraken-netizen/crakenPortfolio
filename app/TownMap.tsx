"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ExternalLink from "./ExternalLink";
import {
  CATEGORY_LABEL,
  HQ,
  MAP_H,
  MAP_W,
  PLACES,
  WORKS,
  workById,
  type Place,
  type Work,
} from "@/data/works";

const pct = (v: number, of: number) => `${(v / of) * 100}%`;

/** マップの一部を切り出して見せる（作品カードのヘッダー画像用） */
function MapCrop({ rect, label }: { rect: Place["rect"]; label: string }) {
  const [x1, y1, x2, y2] = rect;
  const w = x2 - x1;
  const h = y2 - y1;
  return (
    <div
      className="crop"
      role="img"
      aria-label={`${label}のイラスト`}
      style={{
        aspectRatio: `${w} / ${h}`,
        backgroundSize: `${(MAP_W / w) * 100}% ${(MAP_H / h) * 100}%`,
        backgroundPosition: `${MAP_W === w ? 0 : (x1 / (MAP_W - w)) * 100}% ${
          MAP_H === h ? 0 : (y1 / (MAP_H - h)) * 100
        }%`,
      }}
    />
  );
}

function VisitButton({ work, label = "訪れる" }: { work: Work; label?: string }) {
  return (
    <ExternalLink className="btn btn-primary" href={work.url} aria-label={`${work.name}を${label}（新しいタブで開きます）`}>
      {label}
      <span aria-hidden className="btn-arrow">
        ↗
      </span>
    </ExternalLink>
  );
}

function PanelBody({ place, onClose }: { place: Place; onClose: () => void }) {
  const o = place.opens;

  if (o.kind === "work") {
    const w = workById(o.workId)!;
    return (
      <>
        <MapCrop rect={place.rect} label={w.name} />
        <div className="panel-body">
          <span className={`cat-chip cat-${w.category}`}>{CATEGORY_LABEL[w.category]}</span>
          <h2 id="panel-title">{w.name}</h2>
          <p>{w.summary}</p>
          <p className="url">{w.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}</p>
          <div className="actions">
            <VisitButton work={w} />
            <button className="btn" onClick={onClose}>
              閉じる
            </button>
          </div>
          <p className="newtab-note">作品は新しいタブで開きます。見終わったらそのタブを閉じれば、この街に戻れます。</p>
        </div>
      </>
    );
  }

  if (o.kind === "arcade") {
    const games = WORKS.filter((w) => w.category === "game");
    return (
      <>
        <MapCrop rect={place.rect} label="ゲームコーナー" />
        <div className="panel-body">
          <span className="cat-chip cat-game">ゲームコーナー</span>
          <h2 id="panel-title">駄菓子屋のゲームコーナー</h2>
          <p>どの筐体で遊ぶ？ ブラウザですぐに遊べます。</p>
          <ul className="game-list">
            {games.map((g) => (
              <li key={g.id}>
                <div>
                  <strong>{g.name}</strong>
                  <span>{g.summary}</span>
                </div>
                <VisitButton work={g} label="遊ぶ" />
              </li>
            ))}
          </ul>
          <div className="actions">
            <button className="btn" onClick={onClose}>
              街に戻る
            </button>
          </div>
          <p className="newtab-note">作品は新しいタブで開きます。見終わったらそのタブを閉じれば、この街に戻れます。</p>
        </div>
      </>
    );
  }

  if (o.kind === "hq") {
    const count = (c: Work["category"]) => WORKS.filter((w) => w.category === c).length;
    return (
      <>
        <MapCrop rect={place.rect} label={HQ.name} />
        <div className="panel-body">
          <span className="cat-chip cat-hq">本拠点</span>
          <h2 id="panel-title">{HQ.name}</h2>
          <p className="catch">{HQ.catch}</p>
          <p>{HQ.lead}</p>
          <ul className="stats">
            <li>
              <b>{count("homepage")}</b>ホームページ
            </li>
            <li>
              <b>{count("game")}</b>ゲーム
            </li>
            <li>
              <b>{count("app")}</b>便利アプリ
            </li>
          </ul>
          <ul className="services">
            {HQ.services.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <p className="contact">
            ご相談は無料です。
            <br />
            <a href={`tel:${HQ.tel.replace(/-/g, "")}`}>{HQ.tel}</a>／
            <a href={`mailto:${HQ.mail}`}>{HQ.mail}</a>
          </p>
          <div className="actions">
            <a className="btn btn-primary" href="#list" onClick={onClose}>
              作品一覧を見る
            </a>
            <button className="btn" onClick={onClose}>
              街に戻る
            </button>
          </div>
        </div>
      </>
    );
  }

  // 建設予定地
  return (
    <>
      <MapCrop rect={place.rect} label="建設予定地" />
      <div className="panel-body">
        <span className="cat-chip cat-soon">建設予定地</span>
        <h2 id="panel-title">次の作品をつくっています</h2>
        <p>この空き地には、これから生まれる作品が建つ予定です。あなたのお店や活動のデジタル化も、ここから始めませんか？</p>
        <div className="actions">
          <a className="btn btn-primary" href={`mailto:${HQ.mail}`}>
            相談してみる
          </a>
          <button className="btn" onClick={onClose}>
            街に戻る
          </button>
        </div>
      </div>
    </>
  );
}

export default function TownMap() {
  const [openId, setOpenId] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const place = PLACES.find((p) => p.id === openId) ?? null;

  const open = useCallback((id: string) => setOpenId(id), []);

  const close = useCallback(() => setOpenId(null), []);

  // ダイアログの開閉
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (place && !d.open) d.showModal();
    if (!place && d.open) d.close();
  }, [place]);

  // 初期表示：横スクロールになる幅では相談室を画面中央に
  useEffect(() => {
    const s = scrollRef.current;
    if (!s || s.scrollWidth <= s.clientWidth) return;
    const hq = PLACES.find((p) => p.id === "hq")!;
    const cx = ((hq.rect[0] + hq.rect[2]) / 2 / MAP_W) * s.scrollWidth;
    s.scrollLeft = cx - s.clientWidth / 2;
  }, []);

  return (
    <section className="town" aria-label="作品マップ">
      <div className="map-scroll" ref={scrollRef}>
        <div className="map">
          <picture>
            <source srcSet="/town-map.webp" type="image/webp" />
            <img
              src="/town-map.jpg"
              alt="地域デジタル相談室を中心に、これまで制作した作品のお店や施設が並ぶ街のイラスト"
              width={MAP_W}
              height={MAP_H}
              draggable={false}
            />
          </picture>

          {PLACES.map((p, i) => {
            const [x1, y1, x2, y2] = p.rect;
            const live = p.opens.kind !== "construction";
            const tip =
              p.opens.kind === "work"
                ? workById(p.opens.workId)!.balloon
                : p.opens.kind === "hq"
                  ? "相談室の本拠点。中をのぞいてみよう"
                  : p.opens.kind === "arcade"
                    ? "Dr.MURAI と 大人げナインジャー で遊べる"
                    : "次の作品をつくっています";
            return (
              <button
                key={p.id}
                className={`spot ${live ? "is-live" : "is-soon"} spot-${p.id}`}
                style={{
                  left: pct(x1, MAP_W),
                  top: pct(y1, MAP_H),
                  width: pct(x2 - x1, MAP_W),
                  height: pct(y2 - y1, MAP_H),
                  animationDelay: `${i * 0.35}s`,
                }}
                aria-label={`${p.label}：${tip}`}
                aria-haspopup="dialog"
                onClick={() => open(p.id)}
              >
                <span className="tip" aria-hidden>
                  {tip}
                  {live && <em>タップで詳しく</em>}
                </span>
              </button>
            );
          })}

          {/* 稼働中の印：リンク先があるものだけが光って跳ねる */}
          {PLACES.filter((p) => p.pin).map((p, i) => (
            <span
              key={`pin-${p.id}`}
              className="pin"
              aria-hidden
              style={{
                left: pct(p.pin![0], MAP_W),
                top: pct(p.pin![1], MAP_H),
                animationDelay: `${(i % 5) * 0.4}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="hud">
        <p className="hint">
          <span className="hint-dot" aria-hidden />
          光っている建物を選ぶと、作品をのぞけます
        </p>
        <a className="btn btn-small" href="#list">
          リストで見る
        </a>
      </div>

      <dialog
        ref={dialogRef}
        className="panel"
        aria-labelledby="panel-title"
        onClose={close}
        onClick={(e) => {
          // 背景（ダイアログの外側）クリックで閉じる
          if (e.target === e.currentTarget) close();
        }}
      >
        {place && (
          <div className="panel-card">
            <button className="panel-x" onClick={close} aria-label="閉じる">
              ×
            </button>
            <PanelBody place={place} onClose={close} />
          </div>
        )}
      </dialog>
    </section>
  );
}
