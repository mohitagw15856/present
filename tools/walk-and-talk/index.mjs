import { fileURLToPath } from 'node:url';

/** Astro integration: injects /walk-and-talk/ */
export default function walkAndTalk() {
  return {
    name: '@present/walk-and-talk',
    hooks: {
      'astro:config:setup': ({ injectRoute }) => {
        injectRoute({
          pattern: '/walk-and-talk',
          entrypoint: fileURLToPath(new URL('./src/page.astro', import.meta.url)),
        });
      },
    },
  };
}
