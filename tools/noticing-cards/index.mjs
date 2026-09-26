import { fileURLToPath } from 'node:url';

/** Astro integration: injects /noticing-cards/ */
export default function noticingCards() {
  return {
    name: '@present/noticing-cards',
    hooks: {
      'astro:config:setup': ({ injectRoute }) => {
        injectRoute({
          pattern: '/noticing-cards',
          entrypoint: fileURLToPath(new URL('./src/page.astro', import.meta.url)),
        });
      },
    },
  };
}
