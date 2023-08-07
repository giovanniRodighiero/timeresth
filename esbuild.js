const EsBuild = require("esbuild");

const serve = require("./tools/serve");
const postCssPlugin = require("./tools/postCssPlugin");
const dotEnvPlugin = require("./tools/dotEnvPlugin");
const copyAssetsPlugin = require("./tools/copyAssetsPlugin");
const ejsPlugin = require("./tools/ejsPlugin");

const templateData = require('./rootPageData');

console.info("NODE_ENV is set to:", process.env.NODE_ENV);

const BASE_CONFIG = {
    entryPoints: {
        main: "./src/app.jsx",
    },
    sourcemap: true,
    platform: "browser",
    bundle: true,
    outdir: "dist",
    plugins: [
        dotEnvPlugin,
        postCssPlugin,
        copyAssetsPlugin,
        ejsPlugin({ templateData })
    ],
    define: {
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

    case "production":
        EsBuild.build({ ...BASE_CONFIG, minify: true })
            .then(() => console.log("built"))
            .catch(console.error);
        break;

    case "test":
        EsBuild.build(BASE_CONFIG)
            .then(() => console.log("css generated"))
            .catch(console.error);
    default:
        break;
}
