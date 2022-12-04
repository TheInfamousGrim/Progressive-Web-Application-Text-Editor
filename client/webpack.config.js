const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = () => ({
    mode: 'development',
    entry: {
        main: './src/js/index.js',
        install: './src/js/install.js',
        database: './src/js/database.js',
        editor: './src/js/editor.js',
        header: './src/js/header.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: '[name][ext]',
    },
    plugins: [
        // Generates HTML file and injects our bundles
        new HtmlWebpackPlugin({
            template: './index.html',
            title: 'JATE',
        }),
        // Injects our custom service worker
        new InjectManifest({
            swSrc: './src-sw.js',
            swDest: 'src-sw.js',
        }),
        // Creates the manifest.json file
        new WebpackPwaManifest({
            name: 'Just Another Text Editor',
            short_name: 'JATE',
            description: 'A text editor that can be run in the browser as well as offline',
            background_color: '#225ca3',
            theme_color: '#225ca3',
            start_url: '/',
            publicPath: '/',
            icons: [
                {
                    src: path.resolve('src/images/logo.png'),
                    sizes: [96, 128, 192, 256, 384, 512],
                    destination: path.join('assets', 'icons'),
                },
            ],
        }),
        // Generates the favicons for the site
        new FaviconsWebpackPlugin({
            logo: './logo.png',
            cache: true,
            outputPath: 'assets/favicons',
            prefix: 'assets/favicons/',
            inject: true,
        }),
    ],

    module: {
        rules: [
            // CSS loaders for the lovely people
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            // Managing output of assets
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                // We use babel-loader in order to use ES6 in older browsers.
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
                    },
                },
            },
        ],
    },
});
