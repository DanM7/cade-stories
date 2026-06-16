import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { prerenderArticleMeta } from './src/plugins/prerenderArticleMeta'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), prerenderArticleMeta()],
})
