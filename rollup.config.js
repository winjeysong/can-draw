import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';
import url from '@rollup/plugin-url';
import typescript from '@rollup/plugin-typescript';

import pkgJson from './package.json';
import path from 'path';

const plugins = [
  url(),
  babel({
    exclude: 'node_modules/**',
    plugins: ['@babel/plugin-external-helpers'],
  }),
  resolve(),
  commonjs(),
];

export default {
  input: 'src/index.ts',
  plugins: [typescript()],
  output: [
    {
      file: path.resolve(__dirname, pkgJson.main),
      format: 'cjs',
      name: 'CanDraw',
      plugins: plugins,
    },
    {
      file: path.resolve(__dirname, pkgJson.module),
      format: 'esm',
      name: 'CanDraw',
      plugins: plugins,
    },
    {
      format: 'umd',
      file: 'dist/umd/can-draw.js',
      name: 'CanDraw',
      plugins: [...plugins, replace({ 'process.env.NODE_ENV': '"development"' })],
    },
    {
      format: 'umd',
      file: path.resolve(__dirname, pkgJson.unpkg),
      name: 'CanDraw',
      plugins: [...plugins, replace({ 'process.env.NODE_ENV': '"production"' }), terser()],
    },
  ].map(item => ({ ...item, exports: 'default' })),
};
