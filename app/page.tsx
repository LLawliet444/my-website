import ContactButton from "@/components/ContactButton";
import { getSiteContent } from "@/lib/cms";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const site = await getSiteContent();
  const featuredProjects = site.projects.slice(0, 3);
  const recentPosts = site.posts.slice(0, 4);

  return (
    <main className="notebook-shell">
      <header className="topbar" aria-label="站点导航">
        <Link className="brand-mark scribble-underline" href="/">
          ✦ 我的小站 / ★
        </Link>
        <nav className="nav-links">
          <Link className="active" href="/">首页</Link>
          <Link href="/about">关于我</Link>
          <Link href="/blog">博客</Link>
          <Link href="/projects">项目</Link>
          <a href="mailto:522618640@qq.com">留言板 ♡</a>
        </nav>
        <div className="sun-doodle" aria-hidden="true">☀</div>
        <ContactButton email={site.contact.email} wechat={site.contact.wechat} />
      </header>

      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <filter id="crayon-rough">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" />
            <feDisplacementMap in="SourceGraphic" scale="2.4" />
          </filter>
          <filter id="crayon-rough-soft">
            <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="1" seed="5" />
            <feDisplacementMap in="SourceGraphic" scale="1.6" />
          </filter>
        </defs>
      </svg>

      <section className="hero-spread" aria-labelledby="hero-title">
        <div className="portrait-zone">
          <div className="thought-bubble">
          先跑起来<br />再说🚀
          </div>
          <p className="bug-note">bug 退退退 !!</p>
          <div className="portrait-paper">
            <Image
              src="/images/page_head_image.png"
              alt="手绘程序员日记风格的张嘉鱼小站参考图"
              fill
              priority
              sizes="(max-width: 900px) 90vw, 42vw"
            />
          </div>
          <ul className="todo-note" aria-label="今日待办">
            <li>喝咖啡</li>
            <li>写代码</li>
            <li>修 bug</li>
            <li>做梦</li>
          </ul>
        </div>

        <div className="intro-zone">
          <p className="tiny-comment">{"// 今天写了点 bug"}</p>
          <h1 id="hero-title">
            Hi! 我是 <span>{site.profile.name}</span>
          </h1>
          <p className="role-highlight">{site.profile.role}</p>
          <div className="intro-copy">
            {site.profile.intro.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <p className="tiny-comment second">{"// 也修了点人生"}</p>
          <div className="hero-actions">
            <Link className="paper-button yellow" href="/projects">
              ✦ 查看我的项目
            </Link>
            <Link className="paper-button pink" href="/blog">
              ✎ 阅读我的博客
            </Link>
          </div>
        </div>
      </section>

      <section className="skill-strip" aria-labelledby="skills-title">
        <h2 id="skills-title">我的技术栈</h2>
        <ul role="list">
          {site.techStack.map((tech) => (
            <li key={tech.name}>
              <a
                className="tech-logo-card"
                href={tech.url}
                target="_blank"
                rel="noopener noreferrer"
                title={`访问 ${tech.name} 官网`}
              >
                <Image
                  src={tech.logo}
                  alt={tech.name}
                  width={180}
                  height={220}
                  sizes="(max-width: 760px) 42vw, 180px"
                />
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="desk-grid" aria-label="最近内容">
        <div className="paper-panel recent-notes">
          <div className="panel-title">
            <Image src="/images/cute/title_recent.png" alt="最近写了啥" width={299} height={100} />
          </div>
          <ul>
            {recentPosts.map((post) => (
              <li key={post.title}>
                <span className="dot" aria-hidden="true" />
                <Link href="/blog">{post.title}</Link>
                <time>{post.date}</time>
              </li>
            ))}
          </ul>
          <Link className="text-link" href="/blog">查看全部文章 →</Link>
        </div>

        <div className="paper-panel project-notes">
          <div className="panel-title">
            <Image src="/images/cute/title_projects.png" alt="我的项目" width={254} height={81} />
          </div>
          <div className="project-list">
            {featuredProjects.map((project) => (
              <article key={project.title}>
                <span className="icon" aria-hidden="true">{project.icon}</span>
                <div className="content">
                  <strong>{project.title}</strong>
                  <p>{project.summary}</p>
                </div>
                <span className="badge" aria-hidden="true">{project.badge}</span>
              </article>
            ))}
          </div>
          <Link className="text-link" href="/projects">查看全部项目 →</Link>
        </div>

        <aside className="about-scrap">
          <div className="panel-title">
            <Image src="/images/cute/title_about.png" alt="关于我" width={260} height={100} />
          </div>
          <div className="photo-tape">
            <Image
              src="/images/with_golang.png"
              alt="张嘉鱼和 golang 的合影"
              width={320}
              height={240}
            />
          </div>
          <ul>
            {site.profile.aside.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>生活除了代码，还有诗和远方（和火锅）♡</p>
          <Image
            className="codex-stamp"
            src="/images/codex_logo.png"
            alt="Codex"
            width={80}
            height={80}
          />
        </aside>
      </section>

      <footer className="footer-doodle">
        <Image className="doodle-cat" src="/images/cute/cat.png" alt="" width={50} height={38} />
        <span className="doodle-text">
          © 2026 {site.profile.name} · 用{" "}
          <Image className="doodle-heart" src="/images/cute/heart.png" alt="爱" width={18} height={16} />
          {" "}/Codex/TRAE搭建
        </span>
        <Image className="doodle-fish" src="/images/cute/fish.png" alt="" width={50} height={24} />
      </footer>
    </main>
  );
}
