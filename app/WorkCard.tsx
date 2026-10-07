import ExternalLink from "./ExternalLink";
import MapCrop from "./MapCrop";
import { categoryOf, type Work } from "@/data/works";

const VISIT_LABEL = {
  homepage: "ホームページを見る",
  app: "アプリを見てみる",
  game: "ゲームで遊ぶ",
  lecture: "",
} as const;

/** 作品1件のカード。分野のページとマップのポップアップの両方で使う */
export default function WorkCard({ work, compact = false }: { work: Work; compact?: boolean }) {
  const cat = categoryOf(work.category);
  return (
    <article className={`work cat-${work.category} ${compact ? "is-compact" : ""}`}>
      {work.image ? (
        <img className="work-thumb work-img" src={work.image} alt={`${work.name}のイラスト`} loading="lazy" />
      ) : (
        work.thumb && <MapCrop rect={work.thumb} label={work.name} className="work-thumb" />
      )}
      <div className="work-body">
        <p className="work-cat">{cat.label}</p>
        <h4 className="work-name">{work.name}</h4>
        {work.client && <p className="work-client">ご依頼：{work.client}</p>}
        <p className="work-summary">{work.summary}</p>
        {work.url ? (
          <ExternalLink className="btn btn-go" href={work.url} aria-label={`${work.name}の${VISIT_LABEL[work.category]}（新しいタブで開きます）`}>
            {VISIT_LABEL[work.category]}
          </ExternalLink>
        ) : (
          <p className="work-note">講座のため、公開ページはありません。</p>
        )}
      </div>
    </article>
  );
}
