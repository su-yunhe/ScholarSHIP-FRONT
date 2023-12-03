import { fileURLToPath, URL } from 'node:url'
import * as path from 'path';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// elementPlus按需导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [
        // 1. 配置elementPlus采用sass样式配色系统
        //ElementPlusResolver({ importStyle: "sass" }),
       [ElementPlusResolver()],
      ],
    }),
  ],
  server:{
    host: 'localhost',
    port: '8080',
    proxy:{
      '/api': {
        // target:'http://127.0.0.1:8000',
        // target: 'http://127.0.0.1:4523/m1/3177387-0-default',
        target:'http://8.130.107.193',  
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
      
    }
  },
  resolve: {
    // 实际的路径转换  @  -> src
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 2. 自动导入定制化样式文件进行样式覆盖
        additionalData: `
          @use "@/styles/element/index.scss" as *;
          @use "@/styles/var.scss" as *;
        `,
      }
    }
  }
})

