import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({ site: 'https://angelspoolbali.com', output: 'static', trailingSlash: 'always', integrations: [sitemap({ filter: page => !/\/404(?:\.html)?\/?$/.test(page) })], vite: { plugins: [tailwindcss()] } });
