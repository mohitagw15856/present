import { fileURLToPath } from 'node:url';

/** Astro integration: injects /guest-book/ */
export default function guestBook() {
  return {
    name: '@present/guest-book',
    hooks: {
      'astro:config:setup': ({ injectRoute }) => {
        injectRoute({ pattern: '/guest-book', entrypoint: fileURLToPath(new URL('./src/page.astro', import.meta.url)) });
      },
    },
  };
}
