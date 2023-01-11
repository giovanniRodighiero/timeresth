const EsBuild = require("esbuild");

const serve = require("./tools/serve");
const postCssPlugin = require("./tools/postCssPlugin");
const dotEnvPlugin = require("./tools/dotEnvPlugin");

console.info("NODE_ENV is set to:", process.env.NODE_ENV);

const BASE_CONFIG = {
    entryPoints: {
        main: "app.jsx",
    },
    sourcemap: true,
    platform: "browser",
    bundle: true,
    outdir: "dist",
    plugins: [dotEnvPlugin, postCssPlugin],
    define: {
        isE2e: false,
        ENV: {},
    },
};

switch (process.env.NODE_ENV) {
    case "development":
        serve("dist", 8080, BASE_CONFIG)
            .then(server => {
                console.log(
                    `serving STATIC contents from ${server.host}:${server.port}\nserving WEB APP from ${server.host}:8080`
                );
            })
            .catch(() => process.exit(1));
        break;

    case "test-e2e":
        serve("dist", 8080, {
            ...BASE_CONFIG,
            define: {
                ...BASE_CONFIG.define,
                isE2e: true
            }
        })
            .then(server => {
                console.log(
                    `serving STATIC contents from ${server.host}:${server.port}\nserving WEB APP from ${server.host}:8080`
                );
            })
            .catch(() => process.exit(1));
        break;

    case "test":
        EsBuild.build(BASE_CONFIG)
            .then(() => console.log("css generated"))
            .catch(console.error);

    case "production":
        EsBuild.build({ ...BASE_CONFIG, format: 'iife' })
            .then(() => console.log("bundle generated"))
            .catch(console.error);
    default:
        break;
}
