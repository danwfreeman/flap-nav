import postcss from 'rollup-plugin-postcss'
import babel from '@rollup/plugin-babel';

// the entry point for the library
const input = 'src/index.js'

// 
var MODE = [
  {
    fomart: 'cjs'
  },
  {
    fomart: 'esm'
  },
  {
    fomart: 'umd'
  }
]


var config = []


MODE.map((m) => {
    var conf = {
        input: input,
        output: {
            // then name of your package
            name: "FlapNav",
            file: `dist/index.${m.fomart}.js`,
            format: m.fomart,
            exports: "auto",
            globals: {
              react: 'React'
            }
        },
        // this externelizes react to prevent rollup from compiling it
        external: ["react", /@babel\/runtime/, 'react-dom'],
        plugins: [
            // these are babel comfigurations
            babel({
                exclude: 'node_modules/**',
                plugins: ['@babel/transform-runtime'],
                babelHelpers: 'runtime'
            }),
            postcss({
              
            })
            // this adds sourcemaps
            //sourcemaps(),
            // this adds support for styles
            // styles({
            //     postcss: {
            //         plugins: [
            //             autoprefixer()
            //         ]
            //     }
            // })
        ]
    }
    config.push(conf)
})

export default [
  ...config,
]