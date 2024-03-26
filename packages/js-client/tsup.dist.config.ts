import { defineConfig, Options } from 'tsup'

const commonConfig: Options = {
  minify: true,
  dts: false,
  format: ['esm', 'cjs'],
  sourcemap: false,
  clean: false,
  minifyWhitespace: true,
}
export default defineConfig([
  {
    ...commonConfig,
    entry: ['src/index.ts'],
    outDir: 'dist',
    outExtension() {
      return {
        js: `.min.js`,
        dts: `.d.ts`,
      }
    },
    noExternal: [/(.*)/],
  },
])
