// @ts-check
import { defineConfig } from 'astro/config';

// The landing page lives at the site root ("/").
// `site` is the final deployed URL. `base` stays "/" — Quartz owns the
// /study, /research, /projects subpaths (wired together in the deploy step).
export default defineConfig({
  site: 'https://hajun011103.github.io',
});
