import { fileURLToPath } from 'node:url';

/** Astro integration: injects /placemats/ */
export default function placemats() {
  return {
    name: '@present/placemats',
    hooks: {
      'astro:config:setup': ({ injectRoute }) => {
        injectRoute({ pattern: '/placemats', entrypoint: fileURLToPath(new URL('./src/page.astro', import.meta.url)) });
      },
    },
  };
}
