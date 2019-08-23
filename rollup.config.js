// rollup.config.js
import sucrase from 'rollup-plugin-sucrase';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
    input: ['./src/index.js'],
    output: {
        file: 'index.built.js',
        format: 'cjs',
    },
    plugins: [
        /**
         * rewrite imports to node_modules/{lib_name}
         */
        resolve({
            preferBuiltins: false,
            dedupe: ['react', 'react-dom'],
            only: ['(!?electron)']
        }),
        /**
         * Tell rollup that these are in commonjs format 
         */
        commonjs({
            include: 'node_modules/**',  // Default: undefined
        }),
        /**
         * transform code from jsx to commonjs
         */
        sucrase({
            exclude: ['node_modules/**'],
            transforms: ['jsx']
        }),
    ],
    externals: [
        'fs',
        'path'
    ]
}