import { fileURLToPath } from 'node:url';

/** Astro integration: injects /post-it/ */
export default function postIt() {
  return {
    name: '@present/post-it',
    hooks: {
      'astro:config:setup': ({ injectRoute }) => {
        injectRoute({ pattern: '/post-it', entrypoint: fileURLToPath(new URL('./src/page.astro', import.meta.url)) });
      },
    },
  };
}
