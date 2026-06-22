import Link from "next/link";
import { getSiteContent } from "@/lib/cms";

export default async function AboutPage() {
  const site = await getSiteContent();

  return (
    <main className="subpage notebook-shell">
      <Link className="back-link" href="/">← 回到首页</Link>
      <section className="profile-sheet">
        <h1>程序员档案纸</h1>
        <p className="role-highlight">{site.profile.experience} / {site.profile.location} / {site.profile.availability}</p>
        <div className="profile-columns">
          <div>
            <h2>我在做什么</h2>
            {site.profile.intro.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <div className="correction-note">
            <h2>手写批注</h2>
            <ul>
              <li><del>只做后端</del> 正在转向 AI Agent 工程化</li>
              <li>熟悉复杂状态流转，也喜欢把 Agent 当状态机 debug</li>
              <li>人生：仍在 debug 中</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
