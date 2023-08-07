const fs = require("fs");

const copyAssetsPlugin = {
    name: "copyAssetsPlugin",
    setup() {
        try {
            fs.cpSync("./src/assets", "./dist/assets", { recursive: true });
            fs.cpSync("./src/manifest.json", "./dist/manifest.json");
        } catch (error) {
            console.warn("error while copying the assets");
            console.error(error);
        }
    },
};

module.exports = copyAssetsPlugin;
