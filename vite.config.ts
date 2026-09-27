import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Relative assets make the production build work on GitHub Pages project URLs.
  base: "./",
  plugins: [react()],
});
