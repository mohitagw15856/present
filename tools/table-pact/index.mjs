import { fileURLToPath } from 'node:url';

/** Astro integration: injects /table-pact/ */
export default function tablePact() {
  return {
    name: '@present/table-pact',
    hooks: {
      'astro:config:setup': ({ injectRoute }) => {
        injectRoute({
          pattern: '/table-pact',
          entrypoint: fileURLToPath(new URL('./src/page.astro', import.meta.url)),
        });
      },
    },
  };
}
