import { fileURLToPath } from 'node:url';

/** Astro integration: injects /two-truths/ */
export default function twoTruths() {
  return {
    name: '@present/two-truths',
    hooks: {
      'astro:config:setup': ({ injectRoute }) => {
        injectRoute({ pattern: '/two-truths', entrypoint: fileURLToPath(new URL('./src/page.astro', import.meta.url)) });
      },
    },
  };
}
