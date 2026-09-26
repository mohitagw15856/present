import { fileURLToPath } from 'node:url';

/** Astro integration: injects /direction-dice/ */
export default function directionDice() {
  return {
    name: '@present/direction-dice',
    hooks: {
      'astro:config:setup': ({ injectRoute }) => {
        injectRoute({ pattern: '/direction-dice', entrypoint: fileURLToPath(new URL('./src/page.astro', import.meta.url)) });
      },
    },
  };
}
