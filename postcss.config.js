module.exports = {
    plugins: [
        require("postcss-import"),
        require("autoprefixer"),
        require("postcss-nested"),
        require("tailwindcss"),
        require("cssnano")
    ],
};
