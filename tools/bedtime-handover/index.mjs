import { fileURLToPath } from 'node:url';

/** Astro integration: injects /bedtime-handover/ */
export default function bedtimeHandover() {
  return {
    name: '@present/bedtime-handover',
    hooks: {
      'astro:config:setup': ({ injectRoute }) => {
        injectRoute({ pattern: '/bedtime-handover', entrypoint: fileURLToPath(new URL('./src/page.astro', import.meta.url)) });
      },
    },
  };
}
