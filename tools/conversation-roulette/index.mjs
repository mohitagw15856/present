import { fileURLToPath } from 'node:url';

/** Astro integration: injects /conversation-roulette/ */
export default function conversationRoulette() {
  return {
    name: '@present/conversation-roulette',
    hooks: {
      'astro:config:setup': ({ injectRoute }) => {
        injectRoute({
          pattern: '/conversation-roulette',
          entrypoint: fileURLToPath(new URL('./src/page.astro', import.meta.url)),
        });
      },
    },
  };
}
