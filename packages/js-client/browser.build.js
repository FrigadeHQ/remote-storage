let { build } = require('esbuild')
let files = ['src/index.ts']

build({
  entryPoints: files,
  outdir: './dist',
  minify: true,
  bundle: true,
  minifyWhitespace: true,
  minifyIdentifiers: false,
  target: 'chrome58',
}).catch(() => process.exit(1))
