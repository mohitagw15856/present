import { fileURLToPath } from 'node:url';

/** Astro integration: injects /charger-station/ */
export default function chargerStation() {
  return {
    name: '@present/charger-station',
    hooks: {
      'astro:config:setup': ({ injectRoute }) => {
        injectRoute({ pattern: '/charger-station', entrypoint: fileURLToPath(new URL('./src/page.astro', import.meta.url)) });
      },
    },
  };
}
