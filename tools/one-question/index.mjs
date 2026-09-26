import { fileURLToPath } from 'node:url';

/** Astro integration: injects /one-question/ */
export default function oneQuestion() {
  return {
    name: '@present/one-question',
    hooks: {
      'astro:config:setup': ({ injectRoute }) => {
        injectRoute({
          pattern: '/one-question',
          entrypoint: fileURLToPath(new URL('./src/page.astro', import.meta.url)),
        });
      },
    },
  };
}
