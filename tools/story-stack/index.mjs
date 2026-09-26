import { fileURLToPath } from 'node:url';

/** Astro integration: injects /story-stack/ */
export default function storyStack() {
  return {
    name: '@present/story-stack',
    hooks: {
      'astro:config:setup': ({ injectRoute }) => {
        injectRoute({ pattern: '/story-stack', entrypoint: fileURLToPath(new URL('./src/page.astro', import.meta.url)) });
      },
    },
  };
}
