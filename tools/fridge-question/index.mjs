import { fileURLToPath } from 'node:url';

/** Astro integration: injects /fridge-question/ */
export default function fridgeQuestion() {
  return {
    name: '@present/fridge-question',
    hooks: {
      'astro:config:setup': ({ injectRoute }) => {
        injectRoute({ pattern: '/fridge-question', entrypoint: fileURLToPath(new URL('./src/page.astro', import.meta.url)) });
      },
    },
  };
}
