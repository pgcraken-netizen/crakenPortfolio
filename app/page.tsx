import TownMap from "./TownMap";
import WorkCard from "./WorkCard";
import MapCrop from "./MapCrop";
import { CATEGORIES, FAQ, HQ, STEPS, worksIn } from "@/data/works";

const telHref = `tel:${HQ.tel.replace(/-/g, "")}`;
const mailHref = `mailto:${HQ.mail}`;
/** 最初の画面の絵：相談室の建物と前の広場 */
const heroRect: [number, number, number, number] = [470, 330, 990, 680];

export default function Page() {
  return (
    <>
      <header className="topbar">
        <a className="brand" href="#top">
          <img src="/logo-mark.png" alt="" width="40" height="36" />
          <span>{HQ.name}</span>
        </a>
        <a className="topbar-call" href={telHref}>
          電話する
        </a>
      </header>

      <main id="top">
        {/* 最初の画面：誰が・何を・どう頼めるかを、大きな文字で */}
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-text">
            <p className="hero-origin">{HQ.origin}</p>
            <h1 id="hero-title" aria-label={HQ.catch}>
              {HQ.catchPhrases.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </h1>
            <p className="hero-lead">{HQ.lead}</p>
            <div className="hero-actions">
              <a className="btn btn-call btn-big" href={telHref}>
                <span>無料で電話相談</span>
                <small>{HQ.tel}</small>
              </a>
              <a className="btn btn-big" href="#map">
                作品の地図を見る
              </a>
            </div>
          </div>
          <MapCrop rect={heroRect} label="地域デジタル相談室の建物" className="hero-art" />
        </section>

        {/* 4つの分野へのもくじ：数の多い少ないに関係なく、同じ大きさで並べる */}
        <nav className="areas-nav" aria-label="できること">
          <h2 className="areas-nav-title">相談室でできること</h2>
          <ul>
            {CATEGORIES.map((c) => (
              <li key={c.id}>
                <a href={`#${c.id}`} className={`area-chip cat-${c.id}`}>
                  <b>{c.label}</b>
                  <span>{c.lead}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <TownMap />

        {CATEGORIES.map((c) => {
          const works = worksIn(c.id);
          return (
            <section key={c.id} id={c.id} className={`area cat-${c.id}`} aria-labelledby={`${c.id}-title`}>
              <div className="area-inner">
                <div className="area-head">
                  <h2 id={`${c.id}-title`}>{c.label}</h2>
                  <p className="area-lead">{c.lead}</p>
                  <div className="area-for">
                    <h3>こんな方に</h3>
                    <ul>
                      {c.forWhom.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                  </div>
                  {c.canDo && (
                    <div className="area-for">
                      <h3>ご相談できる講座の例</h3>
                      <ul>
                        {c.canDo.map((f) => (
                          <li key={f}>{f}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="area-works">
                  <h3 className="area-works-title">これまでの実績</h3>
                  <div className="works-grid">
                    {works.map((w) => (
                      <WorkCard key={w.id} work={w} />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        <section className="steps" aria-labelledby="steps-title">
          <div className="narrow">
            <h2 id="steps-title">ご相談の流れ</h2>
            <ol>
              {STEPS.map((s) => (
                <li key={s.title}>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="faq" aria-labelledby="faq-title">
          <div className="narrow">
            <h2 id="faq-title">よくある質問</h2>
            {FAQ.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="contact" className="contact" aria-labelledby="contact-title">
          <div className="narrow">
            <h2 id="contact-title">まずはお気軽にご相談ください</h2>
            <p>ご相談は無料です。「こんなこと聞いていいのかな」ということでも大丈夫です。</p>
            <div className="contact-actions">
              <a className="btn btn-call btn-big" href={telHref}>
                <span>電話で相談する</span>
                <small>{HQ.tel}</small>
              </a>
              <a className="btn btn-big" href={mailHref}>
                <span>メールで相談する</span>
                <small>{HQ.mail}</small>
              </a>
            </div>
            <p className="contact-staff">{HQ.staff}</p>
            <ul className="services" aria-label="主なサポート内容">
              {HQ.services.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>{HQ.name}</p>
      </footer>

      {/* スマホの画面下にいつも出る相談ボタン */}
      <div className="callbar" role="region" aria-label="すぐに相談する">
        <a className="btn btn-call" href={telHref}>
          電話で相談
        </a>
        <a className="btn" href={mailHref}>
          メールで相談
        </a>
      </div>
    </>
  );
}
