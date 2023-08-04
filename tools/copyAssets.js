const fs = require("fs");

const copyAssets = {
    name: "copyAssets",
    setup() {
        try {
            fs.cpSync("./src/assets", "./dist/assets", { recursive: true })
        } catch (error) {
            console.warn("error while copying the assets");
            console.error(error);
        }
    },
};

module.exports = copyAssets;
