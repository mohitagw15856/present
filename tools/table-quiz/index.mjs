import { fileURLToPath } from 'node:url';

/** Astro integration: injects /table-quiz/ */
export default function tableQuiz() {
  return {
    name: '@present/table-quiz',
    hooks: {
      'astro:config:setup': ({ injectRoute }) => {
        injectRoute({
          pattern: '/table-quiz',
          entrypoint: fileURLToPath(new URL('./src/page.astro', import.meta.url)),
        });
      },
    },
  };
}
