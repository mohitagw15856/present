// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import serviceWorker from './integrations/sw.mjs';
import phoneParking from '@present/phone-parking';
import conversationRoulette from '@present/conversation-roulette';
import oneQuestion from '@present/one-question';
import tablePact from '@present/table-pact';

// Tools register themselves as Astro integrations that inject a route each.
// Add a tool here after creating it in tools/<name>/.
const toolIntegrations = [tablePact(), oneQuestion(), conversationRoulette(), phoneParking()];

const base = process.env.BASE_PATH || '/';
const site = process.env.SITE_URL || 'https://mohitagw15856.github.io';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [...toolIntegrations, serviceWorker()],
  vite: {
    plugins: [tailwindcss()],
    server: { fs: { allow: ['..'] } },
  },
});
