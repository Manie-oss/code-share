import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import prism from 'vite-plugin-prismjs';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    prism({
      languages: ['javascript', 'css', 'html', 'typescript'],
      plugins: ['line-numbers'],
      theme: 'tomorrow',
      css: true,
    }),
  ],
})
