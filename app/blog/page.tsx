import Link from "next/link";
import { getSiteContent } from "@/lib/cms";

export default async function BlogPage() {
  const site = await getSiteContent();

  return (
    <main className="subpage notebook-shell">
      <Link className="back-link" href="/">← 回到首页</Link>
      <h1 className="subpage-title">debug 日记</h1>
      <section className="blog-list">
        {site.posts.map((post) => (
          <article className="draft-entry" key={post.title}>
            <div>
              <time>{post.date}</time>
              <span>{`// ${post.tag}`}</span>
            </div>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
            <small>{"// TODO: 明天再优化"}</small>
          </article>
        ))}
      </section>
    </main>
  );
}
