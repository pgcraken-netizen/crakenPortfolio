import TownMap from "./TownMap";
import ExternalLink from "./ExternalLink";
import { CATEGORY_LABEL, HQ, WORKS, type Category } from "@/data/works";

const ORDER: Category[] = ["homepage", "game", "app"];

export default function Page() {
  return (
    <main>
      <TownMap />

      {/* リスト表示：急いでいる人・スクリーンリーダー・検索エンジン向けに全作品をテキストでも出す */}
      <section id="list" className="list" aria-labelledby="list-title">
        <div className="list-inner">
          <h2 id="list-title">作品一覧</h2>
          <p className="list-lead">マップと同じ作品を、リストでも見られます。作品はすべて新しいタブで開きます。</p>
          {ORDER.map((cat) => {
            const items = WORKS.filter((w) => w.category === cat);
            return (
              <div key={cat} className="list-group">
                <h3 className={`cat-chip cat-${cat}`}>
                  {CATEGORY_LABEL[cat]} <span>{items.length}作品</span>
                </h3>
                <ul>
                  {items.map((w) => (
                    <li key={w.id}>
                      <ExternalLink href={w.url}>
                        <strong>{w.name}</strong>
                        <span>{w.summary}</span>
                      </ExternalLink>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <footer className="footer">
        <div className="footer-inner">
          <p className="footer-name">{HQ.name}</p>
          <p>{HQ.catch}</p>
          <p className="footer-contact">
            <a href={`tel:${HQ.tel.replace(/-/g, "")}`}>{HQ.tel}</a>
            <span aria-hidden>／</span>
            <a href={`mailto:${HQ.mail}`}>{HQ.mail}</a>
          </p>
          <p className="footer-staff">{HQ.staff}</p>
        </div>
      </footer>
    </main>
  );
}
