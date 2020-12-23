// UTILS
const merge = require("webpack-merge");

var DevelopmentConfig = function() {
    this.extend = (baseConfig) => {
        return merge(baseConfig, {
            mode: "development",
            devServer: {
                overlay: true,
            }
        });
    };
};

module.exports = DevelopmentConfig;
