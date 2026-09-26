import { fileURLToPath } from 'node:url';

/** Astro integration: injects /silent-minute/ */
export default function silentMinute() {
  return {
    name: '@present/silent-minute',
    hooks: {
      'astro:config:setup': ({ injectRoute }) => {
        injectRoute({ pattern: '/silent-minute', entrypoint: fileURLToPath(new URL('./src/page.astro', import.meta.url)) });
      },
    },
  };
}
