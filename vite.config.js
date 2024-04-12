import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vitePluginMock from 'vite-plugin-mock-server'; // Importing the default export

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vitePluginMock({  // Use the imported plugin here
      // Plugin options
      mockPath: 'mock',  // Directory to sync mock files from
      // localEnabled: process.env.NODE_ENV === 'development',  // Enable in development mode
      localEnabled: true,
      prodEnabled: false,  // Disable in production
      logLevel: 'debug',
      injectCode: `
        import { setupProdMockServer } from './mockProdServer';
        setupProdMockServer();
      `
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
      // '@': path.resolve(__dirname, './src'),
    }
  }
})
