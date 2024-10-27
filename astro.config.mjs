// @ts-check
import { resolve } from "node:path";
import { defineConfig } from "astro/config";

import node from "@astrojs/node";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import db from "@astrojs/db";
import sitemap from "@astrojs/sitemap";
import { shield } from "@kindspells/astro-shield";

const rootDir = new URL(".", import.meta.url).pathname;
const modulePath = resolve(rootDir, "src", "generated", "sriHashes.mjs");

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
    shield({
      // sri: {
      //   enableMiddleware: true, // MUST be enabled for dynamic pages!
      //   hashesModule: modulePath, // SHOULD be set!
      // },
      securityHeaders: {
        contentSecurityPolicy: {
          cspDirectives: {
            "default-src": "'self'",
            "connect-src": "'self'",
            "base-uri": "'self'",
            "form-action": "'self'",
            "script-src":
              "'self' 'strict-dynamic' fonts.googleapis.com fonts.gstatic.com https://*.clarity.ms https://c.bing.com",
            "style-src": "'self' font.googleapis.com",
            "font-src": "'self' fonts.gstatic.com fonts.googleapis.com",
            "img-src": "'self' data: ui-avatars.com",
            "frame-ancestors": "'self'",
          },
        },
      },
    }),
  ],
});
