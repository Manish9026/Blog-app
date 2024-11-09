import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss  from 'tailwindcss'
import { VitePWA } from 'vite-plugin-pwa';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate', // automatically updates the service worker
    manifest: {
      name: 'rapid-blog',
      short_name: 'rapid-blog',
      description: 'A Vite-based Progressive Web App',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'logo.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src:'logo.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ],
      workbox: {
        globPatterns: ['**/*.{js,css,html,,scss,jsx,png,svg,ico}']
      }
    }
  })],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
})



// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     react(),
   
//   ]
// });

