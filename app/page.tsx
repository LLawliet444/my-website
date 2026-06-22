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
          <a href="mailto:hello@example.com">留言板 ♡</a>
        </nav>
        <div className="sun-doodle" aria-hidden="true">☀</div>
      </header>

      <section className="hero-spread" aria-labelledby="hero-title">
        <div className="portrait-zone">
          <div className="thought-bubble">
            又写完一坨<br />代码啦！
          </div>
          <p className="bug-note">bug 退退退 !!</p>
          <div className="portrait-paper">
            <Image
              src="/images/my_image.png"
              alt="手绘程序员日记风格的张欣欣小站参考图"
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
        <div className="tech-logo-sheet">
          <Image
            src="/images/tech-stack-logos.png"
            alt="手绘技术栈 logo：Golang、Gin、gRPC、Kafka、Redis、SQL、MySQL、MQTT、PHP、LangGraph、MCP、FastAPI、RAG"
            width={1400}
            height={992}
            sizes="(max-width: 760px) 94vw, 1080px"
            style={{ width: "100%", height: "auto" }}
          />
          <ul className="sr-only">
            {site.skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="desk-grid" aria-label="最近内容">
        <div className="paper-panel recent-notes">
          <h2><span>最近写了啥</span> ✎</h2>
          <ul>
            {recentPosts.map((post) => (
              <li key={post.title}>
                <span className="dot" aria-hidden="true" />
                <div>
                  <Link href="/blog">{post.title}</Link>
                  <time>{post.date}</time>
                </div>
              </li>
            ))}
          </ul>
          <Link className="text-link" href="/blog">查看全部文章 →</Link>
        </div>

        <div className="paper-panel project-notes">
          <h2><span>我的项目</span> 📁</h2>
          <div className="project-list">
            {featuredProjects.map((project) => (
              <article key={project.title}>
                <strong>{project.title}</strong>
                <p>{project.summary}</p>
              </article>
            ))}
          </div>
          <Link className="text-link" href="/projects">查看全部项目 →</Link>
        </div>

        <aside className="about-scrap">
          <h2>关于我 🙂</h2>
          <div className="photo-tape">
            <Image
              src="/images/crayon-dev-diary-reference.png"
              alt="张欣欣的手绘风格小站插画"
              width={320}
              height={240}
            />
          </div>
          <ul>
            {site.profile.aside.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>生活除了代码，还有诗和远方（和火锅）。</p>
        </aside>
      </section>

      <footer className="footer-doodle">
        <span>© 2026 {site.profile.name}</span>
        <span>用 ♡ 和代码搭建</span>
        <span className="fish-line">~ &lt;&gt;&lt; ~</span>
      </footer>
    </main>
  );
}
