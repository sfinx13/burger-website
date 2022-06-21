const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isProductionMode = process.env.NODE_ENV === "production";

let config = {
    mode: process.env.NODE_ENV,
    entry: "./assets/js/main.js",
    output: {
        filename: isProductionMode ? '[name].[hash:8].js' : '[name].js',
        path: path.resolve(__dirname, "dist"),
        assetModuleFilename: 'images/[hash][ext][query]'
    },
    devServer: {
        static: './dist',
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    "autoprefixer"
                                ]
                            }
                        }
                    }
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            }
        ],
    },
    plugins: [].concat([
        new MiniCssExtractPlugin({
            filename: isProductionMode ? "[name].[contenthash:8].css" : "[name].css"
        }),
        new HtmlWebpackPlugin({
            title: "Foodo Burger Restaurant",
            template: './index.html'
        }),
        new CleanWebpackPlugin(),
    ]
    ),
    optimization: {
        minimizer: [],
        minimize: false
    }
};

if (isProductionMode) {
    const plugins = [
        new TerserPlugin(),
        new CssMinimizerPlugin()
    ]
    config.optimization.minimizer = [...plugins];
    config.optimization.minimize = true;
    config.plugins.push(new TerserPlugin());
}

module.exports = config;