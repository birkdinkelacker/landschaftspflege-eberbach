import { defineConfig } from 'vite';
import { readFileSync } from 'node:fs';

const escapeHtml = value => value.replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[char]));

export default defineConfig({
  plugins: [{
    name: 'cms-metadata',
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        if (request.url === '/admin' || request.url === '/admin/') {
          response.writeHead(302, { Location: '/admin/index.html' });
          response.end();
        } else next();
      });
    },
    transformIndexHtml(html) {
      const site = JSON.parse(readFileSync(new URL('./content/site.json', import.meta.url), 'utf8'));
      return html
        .replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(site.title)}</title>`)
        .replace(/(<meta name="description" content=")[^"]*("\s*\/?>)/, (_match, before, after) => before + escapeHtml(site.description) + after);
    }
  }]
});
