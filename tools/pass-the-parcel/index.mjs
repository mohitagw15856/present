import { fileURLToPath } from 'node:url';

/** Astro integration: injects /pass-the-parcel/ */
export default function passTheParcel() {
  return {
    name: '@present/pass-the-parcel',
    hooks: {
      'astro:config:setup': ({ injectRoute }) => {
        injectRoute({ pattern: '/pass-the-parcel', entrypoint: fileURLToPath(new URL('./src/page.astro', import.meta.url)) });
      },
    },
  };
}
