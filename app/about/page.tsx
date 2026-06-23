import Link from "next/link";
import { getSiteContent } from "@/lib/cms";

export default async function AboutPage() {
  const site = await getSiteContent();
  const { email, wechat } = site.contact;

  return (
    <main className="subpage notebook-shell about-field-notes">
      <Link className="back-link" href="/">← 回到首页</Link>

      {/* 标题区 */}
      <header className="fn-header">
        <div className="fn-title-zone">
          <h1 className="fn-title">
            <span className="fn-title__text">Developer Field Notes</span>
            <span className="fn-title__star" aria-hidden="true">★</span>
          </h1>
          <p className="fn-subtitle">backend engineer from Beijing</p>
        </div>

        <div className="fn-sun-learn" aria-hidden="true">
          <span className="fn-sun">⛅</span>
          <div className="fn-sun-learn__text">
            <p>keep building</p>
            <p><span className="fn-mark">keep learning</span></p>
          </div>
        </div>

        <span className="fn-header__loop" aria-hidden="true">↻</span>
      </header>

      {/* 三张便签 + 右侧大 Notes 纸 */}
      <section className="fn-grid">
        <div className="fn-notes-col">
          <article className="fn-note fn-note--green">
            <span className="fn-note__tape" aria-hidden="true" />
            <h2 className="fn-note__title">
              <span className="fn-note__icon" aria-hidden="true">📦</span>
              I <span className="fn-note__title-underline">build</span>
            </h2>
            <ul>
              <li>用 Golang 构建高并发服务</li>
              <li>熟悉 Kafka、Redis、MySQL</li>
              <li>gRPC、MQTT 等后端基础设施</li>
              <li>关注系统的稳定性与可扩展性</li>
            </ul>
            <svg className="fn-note__deco fn-note__deco--server" viewBox="0 0 60 50" fill="none" aria-hidden="true">
              <rect x="6" y="6" width="48" height="14" rx="2" stroke="var(--ink)" strokeWidth="1.5" />
              <rect x="6" y="22" width="48" height="14" rx="2" stroke="var(--ink)" strokeWidth="1.5" />
              <circle cx="14" cy="13" r="1.5" fill="var(--ink)" />
              <circle cx="14" cy="29" r="1.5" fill="var(--ink)" />
              <line x1="20" y1="13" x2="48" y2="13" stroke="var(--ink)" strokeWidth="1" />
              <line x1="20" y1="29" x2="48" y2="29" stroke="var(--ink)" strokeWidth="1" />
            </svg>
          </article>

          <article className="fn-note fn-note--blue">
            <span className="fn-note__tape" aria-hidden="true" />
            <h2 className="fn-note__title">
              <span className="fn-note__icon" aria-hidden="true">🔍</span>
              I <span className="fn-note__title-underline">explore</span>
            </h2>
            <ul>
              <li>LangGraph</li>
              <li>MCP</li>
              <li>ReAct &amp; RAG</li>
              <li>Agent Engineering</li>
            </ul>
            <svg className="fn-note__deco fn-note__deco--net" viewBox="0 0 60 60" fill="none" aria-hidden="true">
              <circle cx="30" cy="30" r="5" fill="var(--blue-smear)" stroke="var(--ink)" strokeWidth="1.5" />
              <circle cx="6" cy="14" r="4" stroke="var(--ink)" strokeWidth="1.5" />
              <circle cx="54" cy="14" r="4" stroke="var(--ink)" strokeWidth="1.5" />
              <circle cx="6" cy="48" r="4" stroke="var(--ink)" strokeWidth="1.5" />
              <circle cx="54" cy="48" r="4" stroke="var(--ink)" strokeWidth="1.5" />
              <line x1="26" y1="28" x2="10" y2="16" stroke="var(--ink)" strokeWidth="1.2" />
              <line x1="34" y1="28" x2="50" y2="16" stroke="var(--ink)" strokeWidth="1.2" />
              <line x1="26" y1="32" x2="10" y2="46" stroke="var(--ink)" strokeWidth="1.2" />
              <line x1="34" y1="32" x2="50" y2="46" stroke="var(--ink)" strokeWidth="1.2" />
            </svg>
          </article>

          <article className="fn-note fn-note--pink">
            <span className="fn-note__tape" aria-hidden="true" />
            <h2 className="fn-note__title">
              <span className="fn-note__icon" aria-hidden="true">🧠</span>
              I <span className="fn-note__title-underline">think</span>
            </h2>
            <ul>
              <li>代码只是手段，解决问题才是目的</li>
              <li>好的系统应该能持续演进</li>
              <li>工具应该让人更专注于创造</li>
            </ul>
            <span className="fn-note__deco fn-note__deco--bulb" aria-hidden="true">💡</span>
          </article>
        </div>

        {/* 右侧大黄色 Notes 纸 */}
        <aside className="fn-big-note">
          <span className="fn-big-note__tape" aria-hidden="true" />
          <span className="fn-big-note__smiley" aria-hidden="true">☺</span>
          <h2 className="fn-big-note__title">Notes</h2>
          <ul className="fn-big-note__list">
            <li>
              <span className="fn-big-note__icon" aria-hidden="true">🧩</span>
              <p>喜欢把复杂问题<br />拆开，再拼回去</p>
            </li>
            <li>
              <span className="fn-big-note__icon" aria-hidden="true">☕</span>
              <p>热爱写代码，<br />也热爱创造东西</p>
            </li>
            <li>
              <span className="fn-big-note__icon" aria-hidden="true">🐛</span>
              <p>人生：仍在<br />debug 中...</p>
            </li>
          </ul>
          <span className="fn-big-note__deco" aria-hidden="true">🐞</span>
        </aside>
      </section>

      {/* 联系方式 */}
      <section className="fn-contact" aria-label="联系方式">
        <span className="fn-contact__plane" aria-hidden="true">✈</span>
        <div className="fn-contact__box">
          <a className="fn-contact__row" href={`mailto:${email}`}>
            <span className="fn-contact__icon fn-contact__icon--email" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
                <rect x="3" y="6" width="18" height="13" rx="1.5" stroke="var(--ink)" strokeWidth="1.8" />
                <path d="M3 7l9 7 9-7" stroke="var(--ink)" strokeWidth="1.8" fill="none" />
              </svg>
            </span>
            <span className="fn-contact__label">Email</span>
            <span className="fn-contact__value">{email}</span>
          </a>
          <span className="fn-contact__divider" aria-hidden="true" />
          <div className="fn-contact__row">
            <span className="fn-contact__icon fn-contact__icon--wechat" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
                <ellipse cx="9" cy="9.5" rx="6" ry="4.5" stroke="var(--ink)" strokeWidth="1.6" fill="oklch(0.95 0.04 145)" />
                <ellipse cx="15" cy="14.5" rx="5.5" ry="4" stroke="var(--ink)" strokeWidth="1.6" fill="oklch(0.97 0.04 145)" />
                <circle cx="7.5" cy="9" r="0.9" fill="var(--ink)" />
                <circle cx="10.5" cy="9" r="0.9" fill="var(--ink)" />
                <circle cx="13" cy="14.5" r="0.7" fill="var(--ink)" />
                <circle cx="16" cy="14.5" r="0.7" fill="var(--ink)" />
              </svg>
            </span>
            <span className="fn-contact__label">WeChat</span>
            <span className="fn-contact__value">{wechat}</span>
          </div>
          <span className="fn-contact__lets" aria-hidden="true">
            Let&apos;s connect!
            <span className="fn-contact__heart">♡</span>
          </span>
        </div>
        <span className="fn-contact__snail" aria-hidden="true">🐌</span>
      </section>
    </main>
  );
}
