const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const TsCheckerPlugin = require('fork-ts-checker-webpack-plugin');

const buildPath = path.resolve(__dirname, 'dist');
const srcPath = path.resolve(__dirname, 'src');
const isProd = process.env.NODE_ENV === 'production'; 

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const getSettingsForStyles = (withModules = false) => {
    if (isProd) {
        return [
            MiniCssExtractPlugin.loader,
            !withModules ? 'css-loader' : {
                loader: 'css-loader',
                options: {
                    modules: {
                        localIdentName: '[hash:base64]',
                    },
                },
            },
            {
                loader: 'postcss-loader',
                options: {
                    postcssOptions: {
                        plugins: ['autoprefixer'],
                    },
                },
            },
            'sass-loader',
        ];
    } else {
      return [
        'style-loader',
        !withModules ? 'css-loader' : {
            loader: 'css-loader',
            options: {
                modules: {
                    localIdentName: '[path][name]__[local]',
                },
            },
        },
        {
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    plugins: ['autoprefixer'],
                },
            },
        },
        'sass-loader',
      ];
    }
  };

module.exports = {
    entry: path.join(srcPath, 'main.tsx'),
    target: !isProd ? 'web' : 'browserslist',
    devtool: isProd ? 'hidden-source-map' : 'eval-source-map',
    output: {
        path: buildPath,
        filename: "bundle.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'index.html')
        }),
        !isProd && new ReactRefreshWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name]-[hash].css'
        }),
        new TsCheckerPlugin()
    ].filter(Boolean),
    module: 
    {
        rules: [
            {
                test: /\.module\.s?css$/,
                use: getSettingsForStyles(true)
                
             },
            {
                test: /\.s?css$/,
                exclude: /\.module\.s?css$/,
                use: getSettingsForStyles()
            },
            {
                test: /\.[tj]sx?$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.(png|svg|jpg)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024
                    }
                }
            }
        ]
    },
    resolve: {
        // теперь при импорте эти расширения файлов можно не указывать 
        extensions: ['.tsx', '.jsx', '.js', '.ts'],
        alias: {
            components: path.join(srcPath, 'components'),
            config: path.join(srcPath, 'config'),
            styles: path.join(srcPath, 'styles'),
            utils: path.join(srcPath, 'utils'),
            models: path.join(srcPath, 'models'),
            pages: path.join(srcPath, 'pages'),
            Store: path.join(srcPath, 'Store'),
            images: path.join(srcPath, 'images'),
        }
    },
    devServer: {
        host: '127.0.0.1', // хост нашего сервера
        port: 9000, // порт, по которому к нему можно обращаться
        hot: true,
        client: { overlay: true }
    },
    performance: {
        maxAssetSize: 500 * 1024, // Увеличьте этот размер по вашему усмотрению
        maxEntrypointSize: 500 * 1024, // Увеличьте этот размер по вашему усмотрению
    }
}