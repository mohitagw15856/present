import { fileURLToPath } from 'node:url';

/** Astro integration: injects /presence-ledger/ */
export default function presenceLedger() {
  return {
    name: '@present/presence-ledger',
    hooks: {
      'astro:config:setup': ({ injectRoute }) => {
        injectRoute({
          pattern: '/presence-ledger',
          entrypoint: fileURLToPath(new URL('./src/page.astro', import.meta.url)),
        });
      },
    },
  };
}
