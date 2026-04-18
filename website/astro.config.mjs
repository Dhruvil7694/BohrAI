// @ts-check

import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import react from "@astrojs/react"
import rehypeSlug from "rehype-slug"

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react()],
  site: process.env.PUBLIC_BOHR_SITE_URL || process.env.BOHR_SITE_URL || "https://bohr.local",
  markdown: {
    rehypePlugins: [rehypeSlug],
    shikiConfig: {
      themes: {
        light: 'vitesse-light',
        dark: 'vitesse-dark',
      },
    },
  },
})
