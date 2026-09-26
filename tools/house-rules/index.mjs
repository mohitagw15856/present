import { fileURLToPath } from 'node:url';

/** Astro integration: injects /house-rules/ */
export default function houseRules() {
  return {
    name: '@present/house-rules',
    hooks: {
      'astro:config:setup': ({ injectRoute }) => {
        injectRoute({ pattern: '/house-rules', entrypoint: fileURLToPath(new URL('./src/page.astro', import.meta.url)) });
      },
    },
  };
}
