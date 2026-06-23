import Link from "next/link";
import type { CSSProperties } from "react";
import { getSiteContent, type Project } from "@/lib/cms";

// 三种大卡片的装饰变体：yellow / blue / green / pink
type Variant = "yellow" | "blue" | "green" | "pink";

function FeaturedCard({ project, variant, tilt }: { project: Project; variant: Variant; tilt: string }) {
  return (
    <article
      className={`featured-card featured-card--${variant}`}
      style={{ "--card-tilt": tilt } as CSSProperties}
    >
      {/* 顶部装饰 */}
      {variant === "yellow" && (
        <span className="featured-card__pin" aria-hidden="true">📌</span>
      )}
      {variant === "blue" && (
        <svg
          className="featured-card__rings"
          viewBox="0 0 200 22"
          fill="none"
          aria-hidden="true"
        >
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <g key={i}>
              <ellipse cx={15 + i * 28} cy={11} rx={5} ry={9} stroke="var(--ink)" strokeWidth="1.5" />
              <line x1={15 + i * 28} y1={2} x2={15 + i * 28} y2={20} stroke="var(--ink)" strokeWidth="1" strokeDasharray="1 2" opacity="0.5" />
            </g>
          ))}
        </svg>
      )}

      {/* 主语言角标（yellow/blue/green 都加，pink 自己单独处理） */}
      {variant !== "pink" && project.stack && project.stack[0] && (
        <div className="featured-card__lang" aria-hidden="true">
          {project.stack[0]}
        </div>
      )}

      <div className="featured-card__main">
        <time className="featured-card__period">{project.period}</time>
        <h2 className="featured-card__title">
          {project.title}
          {variant === "blue" && (
            <span className="featured-card__car" aria-hidden="true"> 🚗</span>
          )}
        </h2>
        <p className="featured-card__summary">{project.summary}</p>

        <div className="featured-card__stack">
          {(project.stack ?? []).map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>

        <ul className="featured-card__notes">
          {(project.notes ?? []).map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </div>

      {/* pink 变体装饰：PHP 标签放右上角，黄色便签放右下角 */}
      {variant === "pink" && (
        <>
          <div className="featured-card__php" aria-hidden="true">PHP</div>
          <div
            className="featured-card__sticky-note featured-card__sticky-note--yellow"
            style={{ "--tilt": "-4deg" } as CSSProperties}
          >
            <span>Where it all started</span>
            <span className="featured-card__sticky-smiley" aria-hidden="true">☕</span>
          </div>
        </>
      )}

      {/* 底部装饰：便利贴 / 图表 / 喇叭 */}
      {variant === "yellow" && (
        <>
          <div
            className="featured-card__sticky-note featured-card__sticky-note--pink"
            style={{ "--tilt": "-6deg" } as CSSProperties}
          >
            <span>This one was painful but worth it</span>
            <span className="featured-card__sticky-smiley" aria-hidden="true">☺</span>
          </div>
          <svg
            className="featured-card__chart"
            viewBox="0 0 80 50"
            fill="none"
            aria-hidden="true"
          >
            <line x1="2" y1="48" x2="78" y2="48" stroke="var(--ink)" strokeWidth="1.5" />
            <line x1="2" y1="48" x2="2" y2="6" stroke="var(--ink)" strokeWidth="1.5" />
            <rect x="10" y="30" width="8" height="18" fill="var(--ink)" />
            <rect x="24" y="20" width="8" height="28" fill="var(--ink)" />
            <rect x="38" y="34" width="8" height="14" fill="var(--ink)" />
            <rect x="52" y="12" width="8" height="36" fill="var(--ink)" />
            <rect x="66" y="24" width="8" height="24" fill="var(--ink)" />
            <path d="M 5 42 Q 18 30 28 26 T 50 18 T 74 12" stroke="var(--ink)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            <path d="M 69 10 L 74 12 L 73 17" stroke="var(--ink)" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </>
      )}

      {variant === "blue" && (
        <div
          className="featured-card__sticky-note featured-card__sticky-note--blue"
          style={{ "--tilt": "5deg" } as CSSProperties}
        >
          <span>Kafka almost killed me...</span>
          <span className="featured-card__sticky-smiley" aria-hidden="true">💀</span>
        </div>
      )}

      {variant === "green" && (
        <>
          <div className="featured-card__megaphone" aria-hidden="true">📢</div>
          <div className="featured-card__keep-shipping">
            <span>Keep shipping!</span>
            <span className="featured-card__heart" aria-hidden="true">♡</span>
          </div>
        </>
      )}
    </article>
  );
}

function MiniCard({ project }: { project: Project }) {
  return (
    <article className="mini-card">
      <span className="mini-card__icon" aria-hidden="true">{project.icon}</span>
      <h3 className="mini-card__title">{project.title}</h3>
      <p className="mini-card__stack">{project.shortStack}</p>
    </article>
  );
}

export default async function ProjectsPage() {
  const site = await getSiteContent();
  const all = site.projects;
  const featured = all.filter((p) => p.featured).slice(0, 4);
  const others = all.filter((p) => !p.featured).slice(0, 4);
  // 像贴墙上一样，每张卡片各自带点歪斜
  const tilts = ["-1.8deg", "1.4deg", "-0.9deg", "1.6deg"];
  // 数据驱动的变体：优先读 featuredVariant，否则按位置回退到 yellow/blue/green
  const fallbackVariants: Variant[] = ["yellow", "blue", "green"];

  return (
    <main className="subpage notebook-shell projects-page">
      <Link className="back-link" href="/">← 回到首页</Link>

      {/* 标题区 */}
      <header className="projects-hero">
        <div className="projects-hero__main">
          <h1 className="projects-title">
            <span className="projects-title__sun" aria-hidden="true">☀</span>
            <span className="projects-title__text">My Projects</span>
            <span className="projects-title__star" aria-hidden="true">★</span>
          </h1>
          <p className="projects-subtitle">一些有意思的项目，记录成长的每一步 ♡</p>
        </div>

        {/* 右上角便利贴 */}
        <div className="projects-hero__note" style={{ "--tilt": "4deg" } as CSSProperties}>
          <span className="projects-hero__note-tape" aria-hidden="true" />
          <p>
            Building<br />
            cool things<br />
            and learning<br />
            crazy ideas!
          </p>
          <span className="projects-hero__note-heart" aria-hidden="true">♡</span>
        </div>

        {/* 装饰小元素 */}
        <span className="projects-hero__deco projects-hero__deco--star" aria-hidden="true">✦</span>
        <span className="projects-hero__deco projects-hero__deco--plane" aria-hidden="true">✈</span>
      </header>

      {/* 精选大卡片 */}
      <section className="featured-projects">
        {featured.map((project, i) => {
          const variant =
            (project.featuredVariant as Variant | undefined) ??
            fallbackVariants[i] ??
            "yellow";
          return (
            <FeaturedCard
              key={project.title}
              project={project}
              variant={variant}
              tilt={tilts[i] ?? "0deg"}
            />
          );
        })}
      </section>

      {/* 其他小项目 */}
      <section className="other-projects">
        <h2 className="other-projects__title">
          Other Projects
          <span className="other-projects__arrow" aria-hidden="true"> ✈</span>
        </h2>
        <div className="other-projects__grid">
          {others.map((project) => (
            <MiniCard key={project.title} project={project} />
          ))}
          <article className="mini-card mini-card--more">
            <p>More ideas<br />coming soon...</p>
            <span className="mini-card--more__icon" aria-hidden="true">✿</span>
          </article>
        </div>
      </section>

      {/* 底部装饰条 */}
      <footer className="projects-footer">
        <div className="projects-footer__plant" aria-hidden="true">
          <span className="projects-footer__plant-cup">🌱</span>
          <span className="projects-footer__plant-text">CODE ♡ LIFE</span>
        </div>
        <p className="projects-footer__text">
          Still debugging life <span className="projects-footer__smiley" aria-hidden="true">☺</span>
        </p>
        <div className="projects-footer__social">
          <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.55v-2.02c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.16 1.18.92-.26 1.9-.39 2.88-.39s1.96.13 2.88.39c2.2-1.49 3.16-1.18 3.16-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.66.8.55C20.21 21.38 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z"/>
            </svg>
          </a>
          <a href="https://g.dev" target="_blank" rel="noreferrer" aria-label="Google">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M21.6 12.23c0-.67-.06-1.32-.17-1.94H12v3.67h5.4c-.23 1.25-.94 2.31-2 3.02v2.51h3.23c1.89-1.74 2.97-4.3 2.97-7.26z" fill="#4285F4"/>
              <path d="M12 22c2.7 0 4.96-.9 6.62-2.43l-3.23-2.51c-.9.6-2.04.96-3.39.96-2.6 0-4.81-1.76-5.6-4.13H3.06v2.59A9.99 9.99 0 0 0 12 22z" fill="#34A853"/>
              <path d="M6.4 13.89A6 6 0 0 1 6.07 12c0-.66.11-1.3.32-1.89V7.52H3.06A9.99 9.99 0 0 0 2 12c0 1.61.39 3.13 1.06 4.48l3.34-2.59z" fill="#FBBC05"/>
              <path d="M12 6c1.47 0 2.78.51 3.82 1.5l2.86-2.86C16.95 3.04 14.69 2 12 2A9.99 9.99 0 0 0 3.06 7.52l3.34 2.59C7.19 7.76 9.4 6 12 6z" fill="#EA4335"/>
            </svg>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/>
            </svg>
          </a>
        </div>
      </footer>
    </main>
  );
}
