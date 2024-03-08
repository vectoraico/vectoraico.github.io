import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";

import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  redirects: {
    "/vectoraico.github.io/products": "/vectoraico.github.io/products/vfit"
  },
  integrations: [tailwind(), icon(), react(), compress()],
  site: "https://project-mirage.github.io/vectoraico.github.io/",
  base: "/vectoraico.github.io"
});
