/**
 * 作品マップのデータ。
 *
 * 新しい作品を追加するとき：
 *   1. WORKS に1件追加する
 *   2. マップ上に置くなら PLACES にホットスポットを1件追加する
 *      （座標はイラスト原寸 1536×1024px 上の矩形。px で書けば自動で％に変換）
 */

export type Category = "homepage" | "game" | "app";

export type Work = {
  id: string;
  category: Category;
  name: string;
  /** 吹き出しに出す一言 */
  balloon: string;
  /** 作品カードの説明 */
  summary: string;
  url: string;
};

export const CATEGORY_LABEL: Record<Category, string> = {
  homepage: "ホームページ",
  game: "ゲーム",
  app: "便利アプリ",
};

export const WORKS: Work[] = [
  {
    id: "kenkyukai",
    category: "homepage",
    name: "地域支え合い研究会",
    balloon: "地域の支え合いを伝えるホームページ",
    summary:
      "地域デジタル相談室の母体となった「地域支え合い研究会」のホームページ。活動内容をまとめて発信しています。",
    url: "https://tiikisasaeai-kenkyukai.web.app",
  },
  {
    id: "associe",
    category: "homepage",
    name: "ケアマネ・訪問介護事業所「アソシエ」",
    balloon: "ケアマネ・訪問介護のホームページ",
    summary:
      "宇都宮のケアマネジャー・訪問介護事業所「アソシエ」のホームページ。サービス内容や相談先をわかりやすく案内しています。",
    url: "https://associe-utsunomiya.web.app",
  },
  {
    id: "tat",
    category: "homepage",
    name: "美容室「TAT」",
    balloon: "街の美容室のホームページ",
    summary: "美容室「TAT」のホームページ。お店の魅力を発信しています。",
    url: "https://tat-hair-salon.vercel.app",
  },
  {
    id: "rian",
    category: "homepage",
    name: "生活介護事業所「りあん」",
    balloon: "生活介護事業所のホームページ",
    summary:
      "生活介護事業所「りあん」のホームページ。Googleマップの整備とあわせて、施設の様子や日々の活動を発信しています。",
    url: "https://lien-supportcenter-hp.web.app",
  },
  {
    id: "ogawa",
    category: "homepage",
    name: "小川自動車整備工場",
    balloon: "自動車整備工場のホームページ",
    summary: "地域の自動車整備工場「小川自動車整備工場」のホームページ。工場の紹介と問い合わせ窓口をまとめています。",
    url: "https://ogawaauto1963.vercel.app/",
  },
  {
    id: "drmurai",
    category: "game",
    name: "Dr.MURAI",
    balloon: "落ちものパズルゲーム",
    summary: "ブラウザですぐ遊べる落ちものパズルゲーム。",
    url: "https://drmurai-game.vercel.app",
  },
  {
    id: "otonagenainger",
    category: "game",
    name: "大人げナインジャー",
    balloon: "大人げナインジャーのゲーム",
    summary: "「自由戦隊オトナゲナインジャー」の世界で遊べるミニゲーム。",
    url: "https://wa-otonagenainger.vercel.app",
  },
  {
    id: "survey",
    category: "app",
    name: "アンケート分析・整理アプリ",
    balloon: "アンケート回答を集計・整理",
    summary: "アンケートフォームの回答を読み込み、グラフで集計・整理する業務アプリ。",
    url: "https://kosodatetaxi.vercel.app",
  },
  {
    id: "storage",
    category: "app",
    name: "ストレージ容量対応アプリ",
    balloon: "ストレージ容量の整理をお手伝い",
    summary: "ストレージの容量不足に対応するため、データの整理を手助けする便利アプリ。",
    // TODO: 本番ドメインが決まったら差し替える（現在はプレビューデプロイのURL）
    url: "https://aerudatacleaner-3jkyoavp7-wa-craken.vercel.app",
  },
];

export const workById = (id: string) => WORKS.find((w) => w.id === id);

/** マップ上のホットスポット */
export type Place = {
  id: string;
  label: string;
  /** 原寸 1536×1024 上の矩形 [x1, y1, x2, y2] */
  rect: [number, number, number, number];
  /** 開くもの：作品カード / 相談室 / ゲームコーナー / 建設予定地 */
  opens:
    | { kind: "work"; workId: string }
    | { kind: "hq" }
    | { kind: "arcade" }
    | { kind: "construction" };
  /** 稼働中の印（光るピン）を出す位置。原寸 px [x, y]。吹き出しの右上あたり */
  pin?: [number, number];
};

export const MAP_W = 1536;
export const MAP_H = 1024;

export const PLACES: Place[] = [
  { id: "hq", label: "地域デジタル相談室（本拠点）", rect: [565, 330, 895, 615], opens: { kind: "hq" }, pin: [884, 338] },
  { id: "kenkyukai", label: "地域支え合い研究会", rect: [270, 195, 565, 380], opens: { kind: "work", workId: "kenkyukai" }, pin: [558, 206] },
  { id: "associe", label: "アソシエ", rect: [25, 320, 345, 510], opens: { kind: "work", workId: "associe" }, pin: [254, 332] },
  { id: "tat", label: "美容室 TAT", rect: [880, 200, 1095, 460], opens: { kind: "work", workId: "tat" }, pin: [1088, 212] },
  { id: "rian", label: "りあん", rect: [25, 515, 335, 760], opens: { kind: "work", workId: "rian" }, pin: [242, 527] },
  { id: "ogawa", label: "小川自動車整備工場", rect: [300, 685, 730, 885], opens: { kind: "work", workId: "ogawa" }, pin: [682, 696] },
  { id: "arcade", label: "駄菓子屋＋ゲームコーナー", rect: [1110, 262, 1505, 548], opens: { kind: "arcade" }, pin: [1414, 274] },
  { id: "survey", label: "アンケート分析・整理アプリ", rect: [930, 585, 1232, 805], opens: { kind: "work", workId: "survey" }, pin: [1204, 596] },
  { id: "storage", label: "ストレージ容量対応アプリ", rect: [1236, 585, 1498, 805], opens: { kind: "work", workId: "storage" }, pin: [1476, 596] },
  { id: "construction", label: "建設予定地", rect: [820, 815, 1365, 1015], opens: { kind: "construction" } },
];

/** 相談室の連絡先（チラシ掲載の公開情報） */
export const HQ = {
  name: "地域デジタル相談室",
  catch: "デジタルの「わからない」を、地域で支え合う",
  lead: "相談から実践まで、地域のデジタル活用をサポートします。この街に並ぶ建物は、これまで一緒につくってきた作品です。",
  services: ["ホームページ作成・改善", "AI活用サポート", "SNS運用支援", "動画作成", "講義・研修の実施"],
  staff: "チーフ相談員 大倉 健太郎",
  tel: "080-6807-7166",
  mail: "desitalsodanzyo@gmail.com",
};
