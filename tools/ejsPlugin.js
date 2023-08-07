const fs = require("fs");
const ejs = require("ejs");

const ejsPlugin = ({ templateData }) => ({
    name: "ejsPlugin",
    setup() {
        try {
            const template = fs.readFileSync("./src/index.html", {
                encoding: "utf-8",
            });
            const html = ejs.render(template, templateData);
            fs.writeFileSync("./dist/index.html", html, { encoding: "utf-8" });
        } catch (error) {
            console.warn("error while rendering ejs");
            console.error(error);
        }
    },
});

module.exports = ejsPlugin;
