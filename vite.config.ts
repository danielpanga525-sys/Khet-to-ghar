import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // bind 0.0.0.0 so the sandboxed preview proxy can reach the dev server
    allowedHosts: true, // allow the *.e2b.app preview host (Vite 5 host check)
  },
  preview: {
    host: true,
    allowedHosts: true,
  },
});
