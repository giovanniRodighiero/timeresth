const autoprefixer = require('autoprefixer');
const postcss = require('postcss');
const postcssNested = require('postcss-nested');
const fs = require('fs');
const EsBuild = require('esbuild');
const tailwindcss = require('tailwindcss');

console.info('NODE_ENV is set to:', process.env.NODE_ENV);

const postCssPlugin = {
    name: 'postCssPlugin',
        setup(build) {
        build.onResolve({ filter: /.\.(jsx)$/ }, () => {
            fs.readFile('src/styles.css', (err, css) => {
                postcss([autoprefixer, postcssNested, tailwindcss])
                    .process(css, { from: 'src/styles.css', to: 'dist/styles.css', map: { inline: false } })
                    .then(result => {
                        fs.writeFile('dist/styles.css', result.css, () => true)
                        if (result.map) {
                            fs.writeFile('dist/styles.css.map', result.map.toString(), () => true)
                        }
                    })
            })
        })
    }
};

const BASE_CONFIG = {
    entryPoints: {
        main: 'app.jsx',
    },
    sourcemap: true,
    platform: 'browser',
    bundle: true,
    outdir: 'dist',
    plugins: [postCssPlugin]
};

if (process.env.NODE_ENV === 'development') {
    EsBuild.serve({
        servedir: 'dist'
    }, BASE_CONFIG)
        .then(server => {
            console.log(`serving static contents at ${server.host}:${server.port}`);
        })
        .catch(() => process.exit(1));
}