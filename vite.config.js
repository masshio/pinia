import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import Inspect from 'vite-plugin-inspect'
// import myExample from './plugin/vite-plugin-my-example'
import mock from './plugin/vite-plugin-mock'

// https://vitejs.dev/config/
export default ({ mode }) => {
  console.log(mode);
  const env = loadEnv(mode, process.cwd());
  console.log(env);
  return defineConfig({
    plugins: [
      vue(),
      {
        ...legacy({
          targets: ['default', 'not IE 11']
        })
        // enforce: 'pre' 强制插件排序  https://cn.vitejs.dev/guide/api-plugin.html#plugin-ordering
        // apply: 'build' 按需引用 指明仅在开发(serve)或生产('build')模式时调用
      },
      mock(),
      Inspect()
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    build: {
      watch: {
        buildDelay: 1000,  // 延迟构建 默认0
        clearScreen: true, // 触发重建时是否清屏 默认true
        exclude: 'node_modules/**', // 防止文件被监视
        include: 'src/**', // 限制为某些文件
        skipWrite: false // 重建时是否跳过 bundle.write() 步骤
      }
    }
  })
}
