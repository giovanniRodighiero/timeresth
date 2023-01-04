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
        ENV: {},
    },
};

switch (process.env.NODE_ENV) {
    case "development":
        serve("dist", 8080, BASE_CONFIG)
            .then(server => {
                console.log(
                    `serving static contents at ${server.host}:${server.port}`
                );
            })
            .catch(() => process.exit(1));
        break;

    case "test":
        EsBuild.build(BASE_CONFIG)
            .then(() => console.log("css generated"))
            .catch(console.error);
    default:
        break;
}
