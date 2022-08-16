const { exec } = require('node:child_process');
const EsBuild = require('esbuild');


console.info('NODE_ENV is set to:', process.env.NODE_ENV);

const BASE_CONFIG = {
    entryPoints: {
        main: 'app.jsx',
    },
    sourcemap: true,
    platform: 'browser',
    bundle: true,
    outdir: 'dist',
    plugins: [
        {
            name: 'tailwind',
            setup(build) {
                build.onResolve({ filter: /.\.(jsx)$/}, () => {
                    exec('npx tailwindcss -i ./src/styles.css -o ./dist/styles.css');
                })
            }
        }
    ]
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