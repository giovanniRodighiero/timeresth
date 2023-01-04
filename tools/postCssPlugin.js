const fs = require("fs");
const postcss = require("postcss");

const { plugins } = require("../postcss.config");

const INPUT_PATH = "src/styles.css";
const OUTPUT_PATH = "dist/styles.css";

const postCssPlugin = {
    name: "postCssPlugin",
    setup(build) {
        build.onResolve({ filter: /.\.(jsx|tsx)$/ }, () => {
            fs.readFile(INPUT_PATH, (err, css) => {
                if (err) {
                    console.error(err);
                    return;
                }
                postcss(plugins)
                    .process(css, {
                        from: INPUT_PATH,
                        to: OUTPUT_PATH,
                        map: { inline: false },
                    })
                    .then(result => {
                        fs.writeFile(OUTPUT_PATH, result.css, () => true);
                        if (result.map) {
                            fs.writeFile(
                                `${OUTPUT_PATH}.map`,
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

module.exports = postCssPlugin;
