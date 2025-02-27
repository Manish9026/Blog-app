// vite.config.js
import { defineConfig } from "file:///D:/Disk%20e/MERN%20project/Blog%20app/node_modules/vite/dist/node/index.js";
import react from "file:///D:/Disk%20e/MERN%20project/Blog%20app/node_modules/@vitejs/plugin-react-swc/index.mjs";
import tailwindcss from "file:///D:/Disk%20e/MERN%20project/Blog%20app/node_modules/tailwindcss/lib/index.js";
import { VitePWA } from "file:///D:/Disk%20e/MERN%20project/Blog%20app/node_modules/vite-plugin-pwa/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [react(), VitePWA({
    registerType: "autoUpdate",
    // automatically updates the service worker
    manifest: {
      name: "Rapid Blog",
      short_name: "Rapid Blog",
      description: "A Vite-based Progressive Web App",
      theme_color: "#080d1f",
      background_color: "#080d1f",
      icons: [
        {
          src: "logo.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "logo.png",
          sizes: "512x512",
          type: "image/png"
        }
      ],
      workbox: {
        globPatterns: ["**/*.{js,css,html,,scss,jsx,png,svg,ico}"]
      }
    }
  })],
  css: {
    postcss: {
      plugins: [tailwindcss()]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxEaXNrIGVcXFxcTUVSTiBwcm9qZWN0XFxcXEJsb2cgYXBwXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxEaXNrIGVcXFxcTUVSTiBwcm9qZWN0XFxcXEJsb2cgYXBwXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9EaXNrJTIwZS9NRVJOJTIwcHJvamVjdC9CbG9nJTIwYXBwL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2MnXG5pbXBvcnQgdGFpbHdpbmRjc3MgIGZyb20gJ3RhaWx3aW5kY3NzJ1xuaW1wb3J0IHsgVml0ZVBXQSB9IGZyb20gJ3ZpdGUtcGx1Z2luLXB3YSc7XG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3JlYWN0KCksIFZpdGVQV0Eoe1xuICAgIHJlZ2lzdGVyVHlwZTogJ2F1dG9VcGRhdGUnLCAvLyBhdXRvbWF0aWNhbGx5IHVwZGF0ZXMgdGhlIHNlcnZpY2Ugd29ya2VyXG4gICAgbWFuaWZlc3Q6IHtcbiAgICAgIG5hbWU6ICdSYXBpZCBCbG9nJyxcbiAgICAgIHNob3J0X25hbWU6ICdSYXBpZCBCbG9nJyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnQSBWaXRlLWJhc2VkIFByb2dyZXNzaXZlIFdlYiBBcHAnLFxuICAgICAgdGhlbWVfY29sb3I6ICcjMDgwZDFmJyxcbiAgICAgIGJhY2tncm91bmRfY29sb3I6XCIjMDgwZDFmXCIsXG4gICAgICBpY29uczogW1xuICAgICAgICB7XG4gICAgICAgICAgc3JjOiAnbG9nby5wbmcnLFxuICAgICAgICAgIHNpemVzOiAnMTkyeDE5MicsXG4gICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZydcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHNyYzonbG9nby5wbmcnLFxuICAgICAgICAgIHNpemVzOiAnNTEyeDUxMicsXG4gICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZydcbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIHdvcmtib3g6IHtcbiAgICAgICAgZ2xvYlBhdHRlcm5zOiBbJyoqLyoue2pzLGNzcyxodG1sLCxzY3NzLGpzeCxwbmcsc3ZnLGljb30nXVxuICAgICAgfVxuICAgIH1cbiAgfSldLFxuICBjc3M6IHtcbiAgICBwb3N0Y3NzOiB7XG4gICAgICBwbHVnaW5zOiBbdGFpbHdpbmRjc3MoKV0sXG4gICAgfSxcbiAgfSxcbn0pXG5cblxuXG4vLyAvLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuLy8gZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbi8vICAgcGx1Z2luczogW1xuLy8gICAgIHJlYWN0KCksXG4gICBcbi8vICAgXVxuLy8gfSk7XG5cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNlIsU0FBUyxvQkFBb0I7QUFDMVQsT0FBTyxXQUFXO0FBQ2xCLE9BQU8saUJBQWtCO0FBQ3pCLFNBQVMsZUFBZTtBQUV4QixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxHQUFHLFFBQVE7QUFBQSxJQUN6QixjQUFjO0FBQUE7QUFBQSxJQUNkLFVBQVU7QUFBQSxNQUNSLE1BQU07QUFBQSxNQUNOLFlBQVk7QUFBQSxNQUNaLGFBQWE7QUFBQSxNQUNiLGFBQWE7QUFBQSxNQUNiLGtCQUFpQjtBQUFBLE1BQ2pCLE9BQU87QUFBQSxRQUNMO0FBQUEsVUFDRSxLQUFLO0FBQUEsVUFDTCxPQUFPO0FBQUEsVUFDUCxNQUFNO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxVQUNFLEtBQUk7QUFBQSxVQUNKLE9BQU87QUFBQSxVQUNQLE1BQU07QUFBQSxRQUNSO0FBQUEsTUFDRjtBQUFBLE1BQ0EsU0FBUztBQUFBLFFBQ1AsY0FBYyxDQUFDLDBDQUEwQztBQUFBLE1BQzNEO0FBQUEsSUFDRjtBQUFBLEVBQ0YsQ0FBQyxDQUFDO0FBQUEsRUFDRixLQUFLO0FBQUEsSUFDSCxTQUFTO0FBQUEsTUFDUCxTQUFTLENBQUMsWUFBWSxDQUFDO0FBQUEsSUFDekI7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
