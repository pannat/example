const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require("terser-webpack-plugin");
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const magicImporter = require('node-sass-magic-importer');

module.exports = {
    entry: {
        scripts: './index.js',
    },
    output: {
        filename: './js/[name].min.js',
        chunkFilename: './js/[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        hot: true,
        port: 4080
    },
    optimization: {
        minimize: true,
        splitChunks: {
            cacheGroups: {
                default: false,
                vendors: false,
                vendor: {
                    chunks: 'all',
                    test: /node_modules/,
                    name: 'vendor.min',
                }
            }
        },
        minimizer: [
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: {
                    map: {
                        inline: false
                    }
                }
            }),
            new TerserPlugin({
                minify: (file) => {
                    return require("uglify-js").minify(file, {sourceMap: true});
                },
            }),
        ],
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map',
            exclude: /vendor.*.*/
        }),
        new HTMLWebpackPlugin({template: './src/index.html' }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/styles.min.css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                importer: magicImporter()
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|ico)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'img/[name].[ext]',
                            esModule: false
                        }
                    }
                ],
            }
        ]
    }
}
