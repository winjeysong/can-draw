import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import url from '@rollup/plugin-url';
import typescript from '@rollup/plugin-typescript';

import pkgJson from './package.json';
import path from 'path';
import fs from 'fs';

const dir = 'src/Shapes';
const shapesName = fs.readdirSync(path.resolve(dir));
const cModuleMap = shapesName.reduce((prev, name) => {
  const [filename] = name.split('.');
  prev[`Shapes/${filename}`] = `${dir}/${name}`;
  return prev;
}, {});

const plugins = [
  typescript(),
  url(),
  resolve({ extensions: ['.ts'] }),
  commonjs(),
  babel({
    exclude: 'node_modules/**',
    babelHelpers: 'runtime',
    extensions: ['.ts'],
  }),
];

const external = () => [/@babel\/runtime/, /tslib/, /core-js/];

export default [
  {
    input: {
      index: 'src/index.ts',
      util: 'src/util.ts',
      ...cModuleMap,
    },
    plugins,
    output: [
      {
        dir: 'dist/lib',
        entryFileNames: '[name].js',
        format: 'es',
      },
    ],
    external,
  },
  {
    input: 'src/index.ts',
    plugins,
    output: [
      {
        file: path.resolve(__dirname, pkgJson.main),
        format: 'cjs',
        name: 'CanDraw',
        exports: 'default',
      },
    ],
    external: external(),
  },
  {
    input: 'src/index.ts',
    plugins,
    output: [
      {
        format: 'umd',
        file: path.resolve(__dirname, pkgJson.unpkg),
        name: 'CanDraw',
        exports: 'default',
        plugins: [terser()],
      },
    ],
  },
];
