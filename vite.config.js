import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname,'src')
    }
  },
  server:{
    proxy:{
      "/api":"http://localhost:8002",
      "/file":"http://localhost:8002"
    },
    port:8080,
    host:'0.0.0.0'
  }
})
