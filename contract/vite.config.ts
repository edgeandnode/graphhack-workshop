import * as path from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'index.ts'),
      name: 'posts',
      formats: ['cjs', 'es'],
      fileName: (format) => {
        if (format === 'es') {
          return 'index.js'
        }
        return 'index.cjs.js'
      },
    },
  },
  worker: {
    format: 'es',
  },
  esbuild: {
    include: ['build/**/*'],
    exclude: ['scripts/**/*.ts', 'test/**/*.test.ts', 'artifacts/**/*', 'cache/**/*', 'coverage/**/*'],
  },
  plugins: [dts()],
})
