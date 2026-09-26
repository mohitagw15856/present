import { fileURLToPath } from 'node:url';

/** Astro integration: injects /toast/ */
export default function toast() {
  return {
    name: '@present/toast',
    hooks: {
      'astro:config:setup': ({ injectRoute }) => {
        injectRoute({ pattern: '/toast', entrypoint: fileURLToPath(new URL('./src/page.astro', import.meta.url)) });
      },
    },
  };
}
