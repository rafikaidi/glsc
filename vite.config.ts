import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// En build, l'app est servie sous /glsc/ (GitHub Pages). En dev, elle reste à la racine.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/glsc/' : '/',
  plugins: [react()],
}))
