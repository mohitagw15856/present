import { fileURLToPath } from 'node:url';

/** Astro integration: injects /venue-kit/ */
export default function venueKit() {
  return {
    name: '@present/venue-kit',
    hooks: {
      'astro:config:setup': ({ injectRoute }) => {
        injectRoute({ pattern: '/venue-kit', entrypoint: fileURLToPath(new URL('./src/page.astro', import.meta.url)) });
      },
    },
  };
}
