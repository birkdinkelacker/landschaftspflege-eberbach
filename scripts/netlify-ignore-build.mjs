import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const docsOnly = new Set(['README.md', 'CMS-ANLEITUNG.md', '.pages.yml', '.gitignore']);

export function canSkipBuild(changedFiles, usedImages) {
  return changedFiles.length > 0 && changedFiles.every(file =>
    docsOnly.has(file) || (file.startsWith('public/images/') && !usedImages.has(file))
  );
}

function collectImages(value, result) {
  if (!value || typeof value !== 'object') return;
  for (const [key, item] of Object.entries(value)) {
    if (key === 'image' && typeof item === 'string' && item.startsWith('/images/')) result.add('public' + item);
    else if (item && typeof item === 'object') collectImages(item, result);
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  // Netlify: exit 0 skips the build; exit 1 continues with a normal build.
  // If Git history is unavailable, always build rather than risk missing an update.
  let skip = false;
  try {
    const base = process.env.CACHED_COMMIT_REF;
    const head = process.env.COMMIT_REF;
    if (base && head && base !== head) {
      const changed = execFileSync('git', ['diff', '--name-only', base, head], { cwd: root, encoding: 'utf8' }).trim().split(/\r?\n/).filter(Boolean);
      const usedImages = new Set();
      for (const file of readdirSync(resolve(root, 'content'))) {
        if (file.endsWith('.json')) collectImages(JSON.parse(readFileSync(resolve(root, 'content', file), 'utf8')), usedImages);
      }
      skip = canSkipBuild(changed, usedImages);
    }
  } catch { /* A normal build is the safe fallback. */ }
  console.log(skip ? 'Nur Dokumentation oder noch unbenutzte Fotos geändert: Veröffentlichung übersprungen.' : 'Webseiteninhalt geändert oder erster Build: Veröffentlichung wird ausgeführt.');
  process.exitCode = skip ? 0 : 1;
}
