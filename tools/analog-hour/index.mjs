import { fileURLToPath } from 'node:url';

/** Astro integration: injects /analog-hour/ */
export default function analogHour() {
  return {
    name: '@present/analog-hour',
    hooks: {
      'astro:config:setup': ({ injectRoute }) => {
        injectRoute({
          pattern: '/analog-hour',
          entrypoint: fileURLToPath(new URL('./src/page.astro', import.meta.url)),
        });
      },
    },
  };
}
