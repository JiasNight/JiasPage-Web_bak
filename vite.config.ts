import { defineConfig, loadEnv } from 'vite';
import VuePlugin from '@vitejs/plugin-vue';
// 组件样式按需加载
import usePluginImport from 'vite-plugin-importer';
// 自动引入vue函数
import autoImport from 'unplugin-auto-import/vite';
// 添加tsx和jsx语法
import vueJsx from '@vitejs/plugin-vue-jsx';
// 打包压缩
import viteCompression from 'vite-plugin-compression';

const path = require('path');
const resolve = (dir: string): string => path.join(__dirname, dir);

// https://vitejs.dev/config/
export default ({ mode }) => {
  return defineConfig({
    plugins: [
      VuePlugin({
        // 开启ref转换
        refTransform: true
      }),
      autoImport({
        // dts: 'src/auto-imports.d.ts', // 可以自定义文件生成的位置，默认是根目录下
        imports: ['vue']
      }),
      vueJsx(),
      // gzip压缩
      viteCompression()
      // usePluginImport({
      //   libraryName: 'naive-ui',
      //   libraryDirectory: 'es',
      //   style: (name) => `${name}/styles/index`,
      // })
    ],
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
        scss: {
          additionalData: '@import "./src/assets/css/global.scss";'
        }
      }
    },
    // 打包相关规则
    build: {
      target: 'es2020', // 指定es版本,浏览器的兼容性
      outDir: 'dist', // 指定打包输出路径
      assetsDir: 'assets', // 指定静态资源存放路径
      minify: 'terser',
      chunkSizeWarningLimit: 500,
      cssCodeSplit: true, // css代码拆分,false则所有样式保存在一个css里面
      sourcemap: false, // 是否构建source map 文件
      terserOptions: {
        // 生产环境移除console
        compress: {
          drop_console: true, // 打包时删除console
          drop_debugger: true // 打包时删除 debugger
        },
        output: {
          // 去掉注释内容
          comments: true
        }
      },
      rollupOptions: {
        output: {
          manualChunks: {
            // 拆分代码，这个就是分包，配置完后自动按需加载，现在还比不上webpack的splitchunk，不过也能用了。
            vue: ['vue', 'vue-router', 'vuex'],
            echarts: ['echarts']
          }
        }
      },
      brotliSize: false
    },
    // 为服务器设置代理规则
    server: {
      host: '127.0.0.1',
      port: 3000, // 设置服务启动端口号
      strictPort: true, // 若端口被占用,直接结束项目
      https: false, // 是否开启 https
      cors: true, // 默认启用并允许任何源
      open: false, // 在服务器启动时自动在浏览器中打开
      hmr: {
        overlay: false
      },
      // 反向代理配置，注意rewrite写法
      proxy: {
        '/api': {
          target: loadEnv(mode, process.cwd()).VITE_APP_BASE_API,
          ws: true,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
    }
  });
};
