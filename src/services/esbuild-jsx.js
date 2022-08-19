const esbuild = require('esbuild');

module.exports = {
    process(sourceText) {
        return esbuild.transformSync(sourceText, {
            jsx: 'transform',
            loader: 'jsx',
            format: 'cjs',
        });
    },
    processAsync(sourceText) {
        return esbuild.transform(sourceText, {
            jsx: 'transform',
            loader: 'jsx',
            format: 'cjs',
        });
    },
};
