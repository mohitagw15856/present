import { fileURLToPath } from 'node:url';

/** Astro integration: injects /bench/ */
export default function bench() {
  return {
    name: '@present/bench',
    hooks: {
      'astro:config:setup': ({ injectRoute }) => {
        injectRoute({ pattern: '/bench', entrypoint: fileURLToPath(new URL('./src/page.astro', import.meta.url)) });
      },
    },
  };
}
