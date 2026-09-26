import { fileURLToPath } from 'node:url';

/** Astro integration: injects /coupons/ */
export default function coupons() {
  return {
    name: '@present/coupons',
    hooks: {
      'astro:config:setup': ({ injectRoute }) => {
        injectRoute({ pattern: '/coupons', entrypoint: fileURLToPath(new URL('./src/page.astro', import.meta.url)) });
      },
    },
  };
}
