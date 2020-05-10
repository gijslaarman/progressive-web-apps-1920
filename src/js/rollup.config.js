import alias from '@rollup/plugin-alias'
import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import {terser} from 'rollup-plugin-terser'

const config = {
  input: 'src/js/scripts.js',
  output: {
    file: 'public/main.js',
    format: 'cjs'
  },
  plugins: [
    resolve(),
    babel({ babelHelpers: 'bundled' }),
    alias({
      entries: [
        { find: '@templates', replacement: './templates' },
        { find: '@utils', replacement: './utils' }
      ]
    }),
    terser()
  ]
}

export default config