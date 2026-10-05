/**
 * サイト全体のデータ。文言や作品を直すときはこのファイルだけ触れば反映されます。
 *
 * 新しい作品を追加するとき：
 *   1. WORKS に1件追加する（URLがない講座などは url を省略）
 *   2. マップ上に置くなら PLACES にホットスポットを1件追加する
 *      （座標はイラスト原寸 1536×1024px 上の矩形 [x1, y1, x2, y2]）
 */

export type Category = "homepage" | "app" | "game" | "lecture";

/** イラスト原寸 1536×1024 上の矩形 [x1, y1, x2, y2] */
export type Rect = [number, number, number, number];

export type Work = {
  id: string;
  category: Category;
  name: string;
  /** ご依頼先（掲載してよいものだけ） */
  client?: string;
  /** マップの吹き出しに出す一言 */
  balloon: string;
  /** 説明文（やさしい言葉で2文以内） */
  summary: string;
  /** 公開中のページ。講座などページがないものは省略 */
  url?: string;
  /** カードのサムネイルに使うイラストの範囲 */
  thumb: Rect;
};

/** 4つの分野。強み・弱みを補い合うよう、どれも同じ重さで見せる */
export const CATEGORIES: {
  id: Category;
  label: string;
  /** 分野の一言（何をするものか） */
  lead: string;
  /** こんな方に */
  forWhom: string[];
  /** 実績が少ない分野は「ご相談できること」で中身を補う */
  canDo?: string[];
  /** 作品がない分野の空状態 */
  empty?: string;
}[] = [
  {
    id: "homepage",
    label: "ホームページ",
    lead: "お店や施設のことを、インターネットで知ってもらう入口をつくります。",
    forWhom: ["ホームページを作りたい・古いものを直したい", "Googleマップにお店を正しく載せたい", "電話や問い合わせを増やしたい"],
  },
  {
    id: "app",
    label: "便利アプリ",
    lead: "毎日の手作業を、パソコンやスマホで楽にする道具をつくります。",
    forWhom: ["アンケートの集計に時間がかかっている", "紙やエクセルの整理が追いつかない", "同じ作業を毎回くり返している"],
  },
  {
    id: "game",
    label: "楽しいゲーム",
    lead: "ブラウザですぐ遊べるゲームで、お店や活動を楽しく知ってもらいます。",
    forWhom: ["イベントやSNSで話題をつくりたい", "子どもから大人まで楽しめる企画がほしい"],
  },
  {
    id: "lecture",
    label: "講座・研修",
    lead: "AIやスマホの使い方を、むずかしい言葉を使わずにお伝えします。",
    forWhom: ["職場や団体でAIを使い始めたい", "スマホやパソコンの基本から学びたい"],
    canDo: ["AI活用講座", "SNSの始め方・運用のコツ", "ホームページの更新のしかた"],
  },
];

export const categoryOf = (id: Category) => CATEGORIES.find((c) => c.id === id)!;

export const WORKS: Work[] = [
  {
    id: "kenkyukai",
    category: "homepage",
    name: "地域支え合い研究会",
    balloon: "地域の支え合いを伝えるホームページ",
    summary: "地域デジタル相談室が生まれた「地域支え合い研究会」のホームページです。活動の内容をまとめて発信しています。",
    url: "https://tiikisasaeai-kenkyukai.web.app",
    thumb: [270, 262, 530, 385],
  },
  {
    id: "associe",
    category: "homepage",
    name: "ケアマネ・訪問介護事業所「アソシエ」",
    balloon: "ケアマネ・訪問介護のホームページ",
    summary: "宇都宮のケアマネジャー・訪問介護事業所のホームページです。サービスの内容や相談先をわかりやすく案内しています。",
    url: "https://associe-utsunomiya.web.app",
    thumb: [30, 375, 345, 515],
  },
  {
    id: "rian",
    category: "homepage",
    name: "生活介護事業所「りあん」",
    balloon: "生活介護事業所のホームページ",
    summary: "ホームページの作成とあわせて、Googleマップに施設の情報を整えました。日々の活動の様子を発信しています。",
    url: "https://lien-supportcenter-hp.web.app",
    thumb: [30, 580, 335, 760],
  },
  {
    id: "tat",
    category: "homepage",
    name: "美容室「TAT」",
    balloon: "街の美容室のホームページ",
    summary: "街の美容室のホームページです。お店の魅力を発信しています。",
    url: "https://tat-hair-salon.vercel.app",
    thumb: [905, 285, 1095, 460],
  },
  {
    id: "ogawa",
    category: "homepage",
    name: "小川自動車整備工場",
    balloon: "自動車整備工場のホームページ",
    summary: "地域の自動車整備工場のホームページです。工場の紹介と問い合わせ窓口をまとめています。",
    url: "https://ogawaauto1963.vercel.app/",
    thumb: [300, 755, 730, 945],
  },
  {
    id: "survey",
    category: "app",
    name: "アンケート結果集計アプリ",
    client: "子育て支援株式会社",
    balloon: "アンケートの回答を自動で集計",
    summary: "アンケートフォームの回答を読み込むだけで、グラフにまとめて見やすく整理します。集計の手間を減らしました。",
    url: "https://kosodatetaxi.vercel.app",
    thumb: [935, 650, 1230, 805],
  },
  {
    id: "storage",
    category: "app",
    name: "ストレージ容量対応アプリ",
    balloon: "いっぱいになった保存容量を整理",
    summary: "パソコンやクラウドの保存容量がいっぱいになったときに、データの整理を手助けするアプリです。",
    // TODO: 本番ドメインが決まったら差し替える（現在はプレビューデプロイのURL）
    url: "https://aerudatacleaner-3jkyoavp7-wa-craken.vercel.app",
    thumb: [1240, 650, 1495, 805],
  },
  {
    id: "drmurai",
    category: "game",
    name: "Dr.MURAI",
    balloon: "落ちものパズルゲーム",
    summary: "ブラウザですぐ遊べる落ちものパズルゲームです。インストールはいりません。",
    url: "https://drmurai-game.vercel.app",
    thumb: [1115, 335, 1360, 500],
  },
  {
    id: "otonagenainger",
    category: "game",
    name: "大人げナインジャー",
    balloon: "ヒーローのミニゲーム",
    summary: "「自由戦隊オトナゲナインジャー」の世界で遊べるミニゲームです。",
    url: "https://wa-otonagenainger.vercel.app",
    thumb: [1150, 345, 1500, 545],
  },
  {
    id: "ai-lecture",
    category: "lecture",
    name: "AI活用講座",
    client: "チャレンジドコミュニティー",
    balloon: "AIの使い方を学ぶ講座",
    summary: "AIを仕事や暮らしに役立てる方法を、実際に手を動かしながら学ぶ講座を開きました。",
    thumb: [560, 540, 880, 688],
  },
];

export const workById = (id: string) => WORKS.find((w) => w.id === id)!;
export const worksIn = (c: Category) => WORKS.filter((w) => w.category === c);

/** マップ上の場所。no は地図の番号（案内図の凡例と対応） */
export type Place = {
  id: string;
  no: number;
  label: string;
  /** 地図の下の番号一覧に出す短い名前 */
  short: string;
  /** 押せる範囲 */
  rect: Rect;
  /** 番号ピンの位置 [x, y] */
  pin: [number, number];
  /** 開くもの：作品 / 複数の作品（ゲームコーナー・公民館）/ 相談室 / 建設予定地 */
  opens:
    | { kind: "work"; workId: string }
    | { kind: "group"; title: string; lead: string; workIds: string[] }
    | { kind: "hq" }
    | { kind: "construction" };
  /** マップの吹き出し（PCでマウスを乗せたとき） */
  tip: string;
};

export const MAP_W = 1536;
export const MAP_H = 1024;

export const PLACES: Place[] = [
  { id: "hq", no: 1, label: "地域デジタル相談室", short: "相談室", rect: [565, 330, 895, 615], pin: [884, 338], opens: { kind: "hq" }, tip: "相談室の本拠点" },
  {
    id: "kominkan",
    no: 2,
    label: "公民館（地域支え合い研究会・講座）", short: "公民館",
    rect: [270, 195, 565, 380],
    pin: [558, 206],
    opens: {
      kind: "group",
      title: "公民館",
      lead: "地域の集まりと学びの場。研究会のホームページと、講座の実績をまとめています。",
      workIds: ["kenkyukai", "ai-lecture"],
    },
    tip: "研究会のホームページと講座",
  },
  { id: "associe", no: 3, label: "アソシエ", short: "アソシエ", rect: [25, 320, 345, 510], pin: [254, 332], opens: { kind: "work", workId: "associe" }, tip: "ケアマネ・訪問介護のホームページ" },
  { id: "rian", no: 4, label: "りあん", short: "りあん", rect: [25, 515, 335, 760], pin: [242, 527], opens: { kind: "work", workId: "rian" }, tip: "生活介護事業所のホームページ" },
  { id: "tat", no: 5, label: "美容室 TAT", short: "美容室 TAT", rect: [880, 200, 1095, 460], pin: [1088, 212], opens: { kind: "work", workId: "tat" }, tip: "街の美容室のホームページ" },
  { id: "ogawa", no: 6, label: "小川自動車整備工場", short: "小川自動車", rect: [300, 685, 730, 885], pin: [682, 696], opens: { kind: "work", workId: "ogawa" }, tip: "自動車整備工場のホームページ" },
  {
    id: "arcade",
    no: 7,
    label: "駄菓子屋のゲームコーナー", short: "ゲーム",
    rect: [1110, 262, 1505, 548],
    pin: [1414, 274],
    opens: {
      kind: "group",
      title: "駄菓子屋のゲームコーナー",
      lead: "どの筐体で遊びますか？ ブラウザですぐに遊べます。",
      workIds: ["drmurai", "otonagenainger"],
    },
    tip: "ゲーム2本で遊べます",
  },
  { id: "survey", no: 8, label: "アンケート集計アプリ", short: "集計アプリ", rect: [930, 585, 1232, 805], pin: [1204, 596], opens: { kind: "work", workId: "survey" }, tip: "アンケートの回答を自動で集計" },
  { id: "storage", no: 9, label: "ストレージ容量対応アプリ", short: "整理アプリ", rect: [1236, 585, 1498, 805], pin: [1476, 596], opens: { kind: "work", workId: "storage" }, tip: "保存容量の整理をお手伝い" },
  { id: "construction", no: 10, label: "建設予定地", short: "建設予定地", rect: [820, 815, 1365, 1015], pin: [930, 838], opens: { kind: "construction" }, tip: "次の作品をつくっています" },
];

/** イラストの中の「作品数」パネルの位置（数字をデータに合わせて上書きする） */
export const LEGEND_RECT: Rect = [22, 888, 482, 980];

/** 相談室の情報（チラシ掲載の公開情報） */
export const HQ = {
  name: "地域デジタル相談室",
  origin: "「地域支え合い研究会」から生まれた相談室です。",
  catch: "デジタルの「わからない」を、地域で支え合う。",
  /** 見出しの改行位置（スマホで言葉の途中で折り返さないように） */
  catchPhrases: ["デジタルの", "「わからない」を、", "地域で", "支え合う。"],
  lead: "宇都宮で、ホームページづくりから便利なアプリ、ゲーム、講座まで、地域のデジタル活用をお手伝いしています。この街に並ぶ建物は、これまでみなさんと一緒につくってきたものです。",
  services: ["ホームページ作成・改善", "AI活用サポート", "SNS運用支援", "動画作成", "講義・研修の実施", "その他なんでもご相談ください"],
  staff: "チーフ相談員 大倉 健太郎",
  tel: "080-6807-7166",
  mail: "desitalsodanzyo@gmail.com",
};

/** ご相談の流れ（チラシの記載に基づく） */
export const STEPS = [
  { title: "まずはご相談（無料）", body: "電話かメールでお気軽にどうぞ。お困りごとをうかがいながら、必要なサポートをご提案します。" },
  { title: "内容と費用をご提示", body: "制作や設定、講座など実際の作業が必要なときは、先に内容と費用をお伝えします。" },
  { title: "ご了承いただいてから開始", body: "ご納得いただいてから、制作や講座を始めます。知らないうちに費用がかかることはありません。" },
];

/** よくある質問 */
export const FAQ = [
  {
    q: "パソコンやスマホが苦手でも大丈夫ですか？",
    a: "大丈夫です。「何がわからないのか、わからない」というところから一緒に整理します。専門用語はなるべく使わずにお話しします。",
  },
  { q: "相談だけでもいいですか？", a: "はい。ご相談は無料です。話を聞いてみてから決めていただいて構いません。" },
  {
    q: "費用はどのくらいかかりますか？",
    a: "内容によって変わります。作業が必要なときは、始める前に内容と費用をお伝えし、ご了承をいただいてから進めます。",
  },
  {
    q: "どんなところからの依頼がありますか？",
    a: "福祉・介護の事業所、地域のお店、子育て支援の会社、地域の団体などから、ホームページづくりや講座のご依頼をいただいています。",
  },
];
