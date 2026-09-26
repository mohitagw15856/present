import { fileURLToPath } from 'node:url';

/** Astro integration: injects /sky-check/ */
export default function skyCheck() {
  return {
    name: '@present/sky-check',
    hooks: {
      'astro:config:setup': ({ injectRoute }) => {
        injectRoute({ pattern: '/sky-check', entrypoint: fileURLToPath(new URL('./src/page.astro', import.meta.url)) });
      },
    },
  };
}
