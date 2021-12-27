const HtmlWebpackPlugin = require ("html-webpack-plugin");
const path = require ("path");

module.exports = {
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [ "style-loader", "css-loader" ]
            },
            {
                test: /\.scss$/,
                use: [ "style-loader", "css-loader", "sass-loader" ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin ({
            template: path.resolve (__dirname, "src", "index.html")
        })
    ]
};
