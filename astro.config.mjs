// @ts-check
import { defineConfig } from "astro/config";

import node from "@astrojs/node";

import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

import db from "@astrojs/db";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://astro-auth-passkeys.discoverlance.com",
  prefetch: true,

  output: "server",

  security: {
    checkOrigin: true,
  },

  adapter: node({
    mode: "standalone",
  }),

  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    db(),
    sitemap({
      filter: (page) =>
        page !== "https://astro-auth-passkeys.discoverlance.com/dashboard/",
    }),
  ],
});
