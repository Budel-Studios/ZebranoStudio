// Builds one self-contained HTML file of the site and the studio for viewing
// as an artifact. Run `npm run build` first: the compiled CSS and fonts come
// from .next. Usage: node scripts/artifact/build.mjs <out.html>
import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("../..", import.meta.url).pathname;
const out = process.argv[2];
const here = join(root, "scripts/artifact");

const js = execFileSync("npx", ["--yes", "esbuild@0.25.10", join(here, "entry.tsx"), "--bundle", "--minify", "--format=iife", "--jsx=automatic", "--target=es2022",
  `--tsconfig=${join(root, "tsconfig.json")}`, "--loader:.css=empty", "--log-level=warning",
  `--alias:next/link=${join(here, "router.tsx")}`, `--alias:next/navigation=${join(here, "router.tsx")}`, `--alias:next/font/local=${join(here, "font.ts")}`,
  '--define:process.env.NODE_ENV="production"', "--define:process.env.NEXT_PUBLIC_SITE_URL=undefined"], { cwd: root, maxBuffer: 1 << 28 }).toString();

const chunks = join(root, ".next/static/chunks");
const media = join(root, ".next/static/media");
let css = readdirSync(chunks).filter((f) => f.endsWith(".css")).map((f) => readFileSync(join(chunks, f), "utf8")).join("\n");
// Latin faces only, embedded as data URIs (an artifact cannot load font files from elsewhere).
css = css.replace(/@font-face\{[^}]*\}/g, (face) => {
  const file = /url\(([^)]+\.woff2)\)/.exec(face)?.[1].replace(/["']/g, "").split("/").pop();
  if (!file || /latin-ext|cyrillic|greek|vietnamese/.test(file) || !/latin/.test(file)) return "";
  const data = readFileSync(join(media, file)).toString("base64");
  return face.replace(/src:[^;}]*/, `src:url(data:font/woff2;base64,${data}) format("woff2")`);
});
const variables = [...css.matchAll(/\.([\w-]*module__[\w-]*__variable)\{/g)].map((m) => m[1]).join(" ");

const html = `<title>Legato boekenstudio</title>
<style>${css}
body{background:#FBFAF7;color:#0E1630}
</style>
<div id="legato"></div>
<script>window.process=window.process||{env:{}};document.documentElement.classList.add(...${JSON.stringify(variables.split(" "))});</script>
<script>${js.replace(/<\/script/g, "<\\/script")}</script>
`;
writeFileSync(out, html);
console.log(`${out}: ${(html.length / 1e6).toFixed(2)} MB, fonts ${(css.match(/data:font/g) ?? []).length}`);
