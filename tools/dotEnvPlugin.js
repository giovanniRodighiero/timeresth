const fs = require("fs");

const dotEnvPlugin = {
    name: "dotEnvPlugin",
    setup(build) {
        try {
            const ENV = fs
                .readFileSync(".env", "utf-8")
                .split("\n")
                .reduce((acc, envrow) => {
                    const [name, value] = envrow.split("=");
                    acc[name] = value;
                    return acc;
                }, {});
            build.initialOptions.define.ENV = JSON.stringify(ENV);
        } catch (error) {
            console.warn(".env file not found, skipping");
        }
    },
};

module.exports = dotEnvPlugin;
