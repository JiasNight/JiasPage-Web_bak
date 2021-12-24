import { defineConfig } from 'vite';
import VuePlugin from '@vitejs/plugin-vue';
import THREE from 'three';

import * as path from 'path';
const resolve = (str: string): string => path.resolve(__dirname, str);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [VuePlugin()],
  resolve: {
    alias: {
      // 取相对路径别名, @表示当前的src目录路径
      '@': resolve('src')
    }
  },
  // 样式相关规则
  css: {
    preprocessorOptions: {
      // 导入global.scss, 这样就可以在vue全局中使用global.scss中定义的变量了
      // scss: {
      //   additionalData: '@import "./src/assets/css/global.scss";'
      // }
      scss: {
        // 加载全局样式
        additionalData: `@use './src/assets/css/global.scss';`
      }
    }
  },
  // 打包相关规则
  build: {
    target: 'es2020', // 指定es版本,浏览器的兼容性
    outDir: 'dist', // 指定打包输出路径
    assetsDir: 'assets', // 指定静态资源存放路径
    cssCodeSplit: true, // css代码拆分,禁用则所有样式保存在一个css里面
    sourcemap: false, // 是否构建source map 文件
    terserOptions: {
      // 生产环境移除console
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  // 为服务器设置代理规则
  server: {
    host: '127.0.0.1',
    port: 3000, // 设置服务启动端口号
    strictPort: true, // 若端口被占用,直接结束项目
    https: false, // 是否开启 https
    cors: true, // 默认启用并允许任何源
    open: false // 在服务器启动时自动在浏览器中打开
    // 反向代理配置，注意rewrite写法
    // proxy: {
    //   '/api': {
    //     target: serveApi,
    //     changeOrigin: true,
    //     rewrite: path => path.replace(/^\/api/, '')
    //   }
    // }
  }
});
