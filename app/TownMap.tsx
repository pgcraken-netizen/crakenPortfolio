"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import MapCrop from "./MapCrop";
import WorkCard from "./WorkCard";
import {
  ADDONS,
  CATEGORIES,
  HQ,
  LEGEND_RECT,
  MAP_H,
  MAP_W,
  PLACES,
  workById,
  worksIn,
  type Place,
} from "@/data/works";

const pct = (v: number, of: number) => `${(v / of) * 100}%`;
const telHref = `tel:${HQ.tel.replace(/-/g, "")}`;

function PanelBody({ place, onClose }: { place: Place; onClose: () => void }) {
  const o = place.opens;

  if (o.kind === "work") {
    return (
      <>
        <WorkCard work={workById(o.workId)} />
        <div className="panel-foot">
          <button className="btn" onClick={onClose}>
            地図に戻る
          </button>
        </div>
      </>
    );
  }

  if (o.kind === "group") {
    return (
      <>
        <div className="panel-head">
          <h2 id="panel-title">{o.title}</h2>
          <p>{o.lead}</p>
        </div>
        <div className="panel-list">
          {o.workIds.map((id) => (
            <WorkCard key={id} work={workById(id)} compact />
          ))}
        </div>
        <div className="panel-foot">
          <button className="btn" onClick={onClose}>
            地図に戻る
          </button>
        </div>
      </>
    );
  }

  if (o.kind === "hq") {
    return (
      <>
        <MapCrop rect={place.rect} label={HQ.name} />
        <div className="panel-head">
          <h2 id="panel-title">{HQ.name}</h2>
          <p className="panel-catch">{HQ.catch}</p>
          <p>{HQ.origin}ご相談は無料です。</p>
          <ul className="stats">
            {CATEGORIES.map((c) => (
              <li key={c.id} className={`cat-${c.id}`}>
                <b>{worksIn(c.id).length}</b>
                {c.label}
              </li>
            ))}
          </ul>
        </div>
        <div className="panel-foot">
          <a className="btn btn-call" href={telHref}>
            電話で相談する
          </a>
          <button className="btn" onClick={onClose}>
            地図に戻る
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <MapCrop rect={place.rect} label="建設予定地" />
      <div className="panel-head">
        <h2 id="panel-title">次の作品をつくっています</h2>
        <p>この空き地には、これから生まれる作品が建つ予定です。あなたのお店や活動のデジタル化も、ここから始めませんか？</p>
      </div>
      <div className="panel-foot">
        <a className="btn btn-call" href={telHref}>
          電話で相談する
        </a>
        <button className="btn" onClick={onClose}>
          地図に戻る
        </button>
      </div>
    </>
  );
}

export default function TownMap() {
  const [openId, setOpenId] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const place = PLACES.find((p) => p.id === openId) ?? null;
  const close = useCallback(() => setOpenId(null), []);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (place && !d.open) d.showModal();
    if (!place && d.open) d.close();
  }, [place]);

  const [lx1, ly1, lx2, ly2] = LEGEND_RECT;

  return (
    <section id="map" className="town" aria-labelledby="map-title">
      <div className="town-inner">
        <div className="section-head">
          <h2 id="map-title">作品の地図</h2>
          <p>これまでつくってきたものを、ひとつの街にまとめました。番号を押すと、くわしい説明が出ます。</p>
        </div>

        <div className="map">
          <picture>
            <source srcSet="/town-map.webp" type="image/webp" />
            <img
              src="/town-map.jpg"
              alt="地域デジタル相談室を中心に、これまでつくったお店や施設が並ぶ街のイラスト"
              width={MAP_W}
              height={MAP_H}
              draggable={false}
            />
          </picture>

          {/* イラストにない建物（掲示板など）を描き足す */}
          {ADDONS.map((a) => (
            <img
              key={a.id}
              className="addon"
              src={a.src}
              alt=""
              aria-hidden
              style={{
                left: pct(a.rect[0], MAP_W),
                top: pct(a.rect[1], MAP_H),
                width: pct(a.rect[2] - a.rect[0], MAP_W),
                height: pct(a.rect[3] - a.rect[1], MAP_H),
              }}
            />
          ))}

          {/* イラストの「作品数」パネルを、4分野の最新の数に描き直す */}
          <div
            className="legend-patch"
            aria-hidden
            style={{
              left: pct(lx1, MAP_W),
              top: pct(ly1, MAP_H),
              width: pct(lx2 - lx1, MAP_W),
              height: pct(ly2 - ly1, MAP_H),
            }}
          >
            {CATEGORIES.map((c) => (
              <span key={c.id} className={`lp cat-${c.id}`}>
                <i>{c.label}</i>
                <b>{worksIn(c.id).length}</b>
              </span>
            ))}
          </div>

          {PLACES.map((p) => {
            const [x1, y1, x2, y2] = p.rect;
            return (
              <button
                key={p.id}
                className={`spot ${p.opens.kind === "construction" ? "is-soon" : "is-live"}`}
                style={{ left: pct(x1, MAP_W), top: pct(y1, MAP_H), width: pct(x2 - x1, MAP_W), height: pct(y2 - y1, MAP_H) }}
                aria-label={`${p.no}番 ${p.label}：${p.tip}`}
                aria-haspopup="dialog"
                tabIndex={-1}
                onClick={() => setOpenId(p.id)}
              >
                <span className="tip" aria-hidden>
                  {p.tip}
                </span>
              </button>
            );
          })}

          {PLACES.map((p) => (
            <button
              key={`pin-${p.id}`}
              className={`pin ${p.opens.kind === "construction" ? "is-soon" : ""}`}
              style={{ left: pct(p.pin[0], MAP_W), top: pct(p.pin[1], MAP_H) }}
              aria-label={`${p.no}番 ${p.label}`}
              aria-haspopup="dialog"
              onClick={() => setOpenId(p.id)}
            >
              {p.no}
            </button>
          ))}
        </div>

        {/* 案内図の凡例：スマホでは地図の文字が小さいので、番号と名前をここで選べるようにする */}
        <ol className="map-key" aria-label="地図の番号と場所">
          {PLACES.map((p) => (
            <li key={p.id}>
              <button onClick={() => setOpenId(p.id)} aria-haspopup="dialog">
                <span className="key-no">{p.no}</span>
                <span className="key-label">{p.short}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <dialog
        ref={dialogRef}
        className="panel"
        aria-label={place ? place.label : undefined}
        onClose={close}
        onClick={(e) => {
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
