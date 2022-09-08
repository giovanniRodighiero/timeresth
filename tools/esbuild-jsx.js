const esbuild = require("esbuild");

const TRANSFORM_CONFIG = {
    jsx: "transform",
    loader: "jsx",
    format: "cjs",
    sourcemap: true,
    sourcesContent: false,
};

module.exports = {
    process(sourceText, filename) {
        return esbuild.transformSync(sourceText, {
            ...TRANSFORM_CONFIG,
            sourcefile: filename,
        });
    },
    processAsync(sourceText, filename) {
        return esbuild.transform(sourceText, {
            ...TRANSFORM_CONFIG,
            sourcefile: filename,
        });
    },
};
