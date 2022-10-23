const postcss = require("postcss");
const fs = require("fs");
const EsBuild = require("esbuild");

const { plugins } = require("./postcss.config");
const serve = require("./tools/serve");

console.info("NODE_ENV is set to:", process.env.NODE_ENV);

const postCssPlugin = {
    name: "postCssPlugin",
    setup(build) {
        build.onResolve({ filter: /.\.(jsx)$/ }, () => {
            fs.readFile("src/styles.css", (err, css) => {
                if (err) {
                    console.error(err);
                    return;
                }
                postcss(plugins)
                    .process(css, {
                        from: "src/styles.css",
                        to: "dist/styles.css",
                        map: { inline: false },
                    })
                    .then(result => {
                        fs.writeFile("dist/styles.css", result.css, () => true);
                        if (result.map) {
                            fs.writeFile(
                                "dist/styles.css.map",
                                result.map.toString(),
                                () => true
                            );
                        }
                    })
                    .catch(console.error);
            });
        });
    },
};

const BASE_CONFIG = {
    entryPoints: {
        main: "app.jsx",
    },
    sourcemap: true,
    platform: "browser",
    bundle: true,
    outdir: "dist",
    plugins: [postCssPlugin],
    define: {
        UNIT_TEST: false,
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
