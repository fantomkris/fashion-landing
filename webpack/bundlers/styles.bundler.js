const autoprefixer = require("autoprefixer");
const path = require("path");
const increaseSpecificity = require("postcss-increase-specificity");
const merge = require("webpack-merge");

const ExtractTextPlugin = require("extract-text-webpack-plugin");

var StylesBundler = function (isProd, cachePath) {
    var styleMap = [
        { test: /styles\.scss$/, dist: "content/css/styles.css", wrapped: true },
    ];

    var buildOptions = function (wrap) {
        return {
            publicPath: "../../", // path from compiled styles to dist
            use: []
                .concat(isProd ? [{
                    loader: "cache-loader",
                    options: {
                        cacheDirectory: path.join(cachePath, "cache-loader")
                    }
                }] : [])
                .concat([{
                    loader: "css-loader",
                    options: {
                        sourceMap: true
                    }
                }, {
                    loader: "postcss-loader",
                    options: {
                        plugins: [autoprefixer({ overrideBrowserslist: ["last 5 versions"] })],
                        sourceMap: true
                    }
                }, {
                    loader: "resolve-url-loader"
                }, {
                    loader: "sass-loader",
                    options: {
                        sourceMap: true,
                        sassOptions: {
                            minimize: false,
                            outputStyle: "expanded"
                        }
                    }
                }]),
            fallback: "style-loader"
        };
    };

    var stylesSheets = styleMap.map(styleSheet => {
        return {
            test: styleSheet.test,
            plugin: new ExtractTextPlugin(styleSheet.dist),
            wrapped: styleSheet.wrapped
        };
    });

    this.extend = (webpackConfig) => {
        return merge(webpackConfig, {
            module: {
                rules: stylesSheets.map(styleSheet => {
                    return {
                        test: styleSheet.test,
                        use: styleSheet.plugin.extract(buildOptions(styleSheet.wrapped))
                    };
                })
            },
            plugins: stylesSheets.map(styleSheet => {
                return styleSheet.plugin;
            })
        });
    };
};

module.exports = StylesBundler;
