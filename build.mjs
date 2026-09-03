// Flattens the Claude Design .dc.html artboards into a plain static site in dist/.
// Hoists <helmet> into <head>, unwraps <x-dc>, drops the dc-runtime, resolves the
// handful of {{ }} bindings, and rewrites internal links to clean paths.
import { readFileSync, writeFileSync, mkdirSync, cpSync, rmSync, readdirSync, statSync } from 'node:fs';

const PAGES = {
  'Portfolio Home.dc.html': 'index',
  'Portfolio About.dc.html': 'about',
  'Case - EduVision.dc.html': 'eduvision',
  'Case - HRMS.dc.html': 'hrms',
  'Case - Learning Vision.dc.html': 'learning-vision',
  'Case - NurtureSync.dc.html': 'nurturesync',
  'Case - Offboarding.dc.html': 'offboarding',
  'Case - PeopleVision.dc.html': 'peoplevision',
  'Case - SalesVision.dc.html': 'salesvision',
};

// Renders the two live values the artboards bound via DCLogic.
const RUNTIME = `<script>
(function () {
  var y = String(new Date().getFullYear());
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = y; });
  function tick() {
    var t = new Date().toLocaleTimeString('en-IN', {
      hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata'
    }) + ' IST';
    document.querySelectorAll('[data-clock]').forEach(function (el) { el.textContent = t; });
  }
  tick();
  setInterval(tick, 30000);
})();
</script>`;

const slice = (src, open, close) => {
  const a = src.indexOf(open);
  const b = src.indexOf(close, a);
  if (a === -1 || b === -1) throw new Error(`missing ${open}`);
  return src.slice(a + open.length, b);
};

rmSync('dist', { recursive: true, force: true });
mkdirSync('dist', { recursive: true });

for (const [file, slug] of Object.entries(PAGES)) {
  let src = readFileSync(file, 'utf8');

  // Some artboards carry a duplicated trailing block; keep only the first document.
  src = src.slice(0, src.indexOf('</x-dc>') + '</x-dc>'.length);

  const head = slice(src, '<head>', '</head>').replace(
    /[ \t]*<script src="\.\/support\.js"><\/script>\r?\n?/,
    ''
  );
  const helmet = slice(src, '<helmet>', '</helmet>');
  let body = slice(src, '</helmet>', '</x-dc>');

  // All three sc-if conditions were bound to true.
  body = body.replace(/<\/?sc-if[^>]*>/g, '');

  body = body
    .replace(/\{\{\s*clockText\s*\}\}/g, '<span data-clock>--:-- IST</span>')
    .replace(/\{\{\s*yearText\s*\}\}/g, '<span data-year></span>');

  // Internal links: "Case - HRMS.dc.html" -> "/hrms", home -> "/", fragments preserved.
  for (const [target, targetSlug] of Object.entries(PAGES)) {
    const href = targetSlug === 'index' ? '/' : `/${targetSlug}`;
    const pattern = new RegExp(
      `href="${target.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(#[^"]*)?"`,
      'g'
    );
    body = body.replace(pattern, (_, frag) => `href="${href}${frag || ''}"`);
  }

  const leftover = body.match(/\{\{[^}]*\}\}/g);
  if (leftover) console.warn(`  ! ${file}: unresolved ${[...new Set(leftover)].join(', ')}`);

  writeFileSync(
    `dist/${slug}.html`,
    `<!DOCTYPE html>
<html lang="en">
<head>${head}${helmet}</head>
<body>${body}
${RUNTIME}
</body>
</html>
`
  );
  console.log(`  ${file} -> dist/${slug}.html`);
}

for (const asset of ['frame-fit.js', 'motion-desk.js', 'uploads']) {
  cpSync(asset, `dist/${asset}`, { recursive: true });
}

// Drop top-level uploads/ scratch files (pasted screenshots, .docx sources, duplicate
// PDFs) that no page references. Matched by basename across every HTML in the output,
// including the nested prototypes, so anything actually used is kept.
const referenced = new Set();
const collect = (html) => {
  for (const m of html.matchAll(/(?:href|src)="([^"]*)"/g)) {
    referenced.add(decodeURIComponent(m[1].split('#')[0].split('?')[0]).split('/').pop());
  }
};
for (const f of readdirSync('dist').filter((f) => f.endsWith('.html'))) {
  collect(readFileSync(`dist/${f}`, 'utf8'));
}
const walk = (dir) => {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = `${dir}/${e.name}`;
    if (e.isDirectory()) walk(p);
    else if (/\.html?$/i.test(e.name)) collect(readFileSync(p, 'utf8'));
  }
};
walk('dist/uploads');

let freed = 0;
for (const e of readdirSync('dist/uploads', { withFileTypes: true })) {
  if (e.isDirectory() || referenced.has(e.name)) continue;
  freed += statSync(`dist/uploads/${e.name}`).size;
  rmSync(`dist/uploads/${e.name}`);
}
console.log(`  pruned ${(freed / 1024 / 1024).toFixed(1)} MB of unreferenced uploads`);

writeFileSync('dist/vercel.json', JSON.stringify({ cleanUrls: true, trailingSlash: false }, null, 2) + '\n');
console.log('done');
