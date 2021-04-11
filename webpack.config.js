const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "development",
    entry: {
        app: path.join(__dirname, 'src', 'index.tsx')
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, './'), // where dev server will look for static files, not compiled
        publicPath: '/', //relative path to output path where  devserver will look for compiled files
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.js', '.ts', ".tsx"],
        alias: {
            '@': path.resolve(__dirname, 'src') // shortcut to reference src folder from anywhere
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env", "@babel/preset-react"],
                        },
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.ts(x)?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
                options: {
                    // disable type checker - we will use it in fork plugin
                    transpileOnly: true,
                },
            },
            { // config for sass compilation
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader',
                    {
                        loader: "sass-loader"
                    }
                ]
            },
            { // config for images
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images',
                        }
                    }
                ],
            },
            { // config for fonts
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'fonts',
                        }
                    }
                ],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ // plugin for inserting scripts into html
            template: "./src/index.html",
            filename: "index.html",
            title: "IDP"
        }),
        new MiniCssExtractPlugin({ // plugin for controlling how compiled css will be outputted and named
            filename: "css/[name].css",
            chunkFilename: "css/[id].css"
        })
    ]
};
