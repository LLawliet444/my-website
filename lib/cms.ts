import { readFile } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";

const projectSchema = z.object({
  title: z.string(),
  icon: z.string().optional(),
  badge: z.string().optional(),
  period: z.string().optional(),
  category: z.string().optional(),
  stack: z.array(z.string()).optional(),
  shortStack: z.string().optional(),
  summary: z.string().optional(),
  notes: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
  featuredVariant: z.string().optional()
});

const postSchema = z.object({
  title: z.string(),
  date: z.string(),
  tag: z.string(),
  excerpt: z.string()
});

const techStackItemSchema = z.object({
  name: z.string(),
  logo: z.string(),
  url: z.string().url()
});

const siteSchema = z.object({
  profile: z.object({
    name: z.string(),
    role: z.string(),
    tagline: z.string(),
    location: z.string(),
    experience: z.string(),
    intro: z.array(z.string()),
    aside: z.array(z.string())
  }),
  skills: z.array(z.string()),
  contact: z.object({
    email: z.string(),
    wechat: z.string()
  }),
  techStack: z.array(techStackItemSchema),
  projects: z.array(projectSchema),
  posts: z.array(postSchema)
});

export type SiteContent = z.infer<typeof siteSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Post = z.infer<typeof postSchema>;
export type TechStackItem = z.infer<typeof techStackItemSchema>;

export async function getSiteContent(): Promise<SiteContent> {
  const filePath = path.join(process.cwd(), "content", "site.json");
  const raw = await readFile(filePath, "utf8");
  return siteSchema.parse(JSON.parse(raw));
}
