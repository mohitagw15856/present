import { fileURLToPath } from 'node:url';

/** Astro integration: injects /phone-parking/ */
export default function phoneParking() {
  return {
    name: '@present/phone-parking',
    hooks: {
      'astro:config:setup': ({ injectRoute }) => {
        injectRoute({
          pattern: '/phone-parking',
          entrypoint: fileURLToPath(new URL('./src/page.astro', import.meta.url)),
        });
      },
    },
  };
}
