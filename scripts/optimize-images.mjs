// 一次性脚本：把 public/images/ 下所有 png/jpg 批量转 webp
// 跑法：node scripts/optimize-images.mjs
//
// 输出：原地把 .png 替换为 .webp（同目录），保留 .png 作为回退
// 注意：代码里如果直接改用 .webp 路径，需要同步修改 site.json 和 components 中的引用

import { readdir, stat, writeFile, readFile } from "node:fs/promises";
import { join, extname, basename, dirname } from "node:path";
import sharp from "sharp";

const ROOT = new URL("../public/images/", import.meta.url).pathname;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

const targets = [];
for await (const f of walk(ROOT)) {
  const ext = extname(f).toLowerCase();
  if (ext === ".png" || ext === ".jpg" || ext === ".jpeg") targets.push(f);
}

let savedBytes = 0;
let originalBytes = 0;
let count = 0;

for (const file of targets) {
  const ext = extname(file);
  const out = file.replace(ext, ".webp");
  const before = (await stat(file)).size;
  originalBytes += before;
  const buf = await readFile(file);
  const webp = await sharp(buf).webp({ quality: 82 }).toBuffer();
  await writeFile(out, webp);
  const after = webp.length;
  savedBytes += before - after;
  count += 1;
  const dir = dirname(file).replace(ROOT, "");
  const name = basename(file);
  const ratio = ((1 - after / before) * 100).toFixed(1);
  console.log(
    `${dir}/${name}: ${(before / 1024).toFixed(1)}KB → ${(after / 1024).toFixed(1)}KB (-${ratio}%)`
  );
}

console.log(
  `\n共 ${count} 张，原 ${(originalBytes / 1024).toFixed(0)}KB → 省 ${(savedBytes / 1024).toFixed(0)}KB`
);
