import Link from "next/link";
import type { CSSProperties } from "react";
import { getSiteContent } from "@/lib/cms";

export default async function ProjectsPage() {
  const site = await getSiteContent();

  return (
    <main className="subpage notebook-shell">
      <Link className="back-link" href="/">← 回到首页</Link>
      <h1 className="subpage-title">项目贴纸墙</h1>
      <section className="sticker-board">
        {site.projects.map((project, index) => (
          <article className="project-sticker" key={project.title} style={{ "--tilt": `${(index % 2 === 0 ? -1 : 1) * (2 + index)}deg` } as CSSProperties}>
            <span className="tape" />
            <time>{project.period}</time>
            <h2>{project.title}</h2>
            <p>{project.summary}</p>
            <div className="stack-line">
              {project.stack.map((tech) => <span key={tech}>{tech}</span>)}
            </div>
            <ul>
              {project.notes.map((note) => <li key={note}>{note}</li>)}
            </ul>
          </article>
        ))}
      </section>
    </main>
  );
}
