// этот файл работает как инструмент для сборки и не идёт дополнением к основному приложению

const isDev = process.env.NODE_ENV === 'development'; //определение режима в котором мы находимся (true или false)
//настройки в скриптах файла package.json
const isProd = !isDev;

const path = require('path'); //подключаем встроенный модуль NodeJS для output/path
const HTMLWebpackPlugin = require('html-webpack-plugin');  //установив (см п4.1 в comments), подкючаем плагин
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); //установка CleanWebpackPlugin (см п4.2 в comments)
const CopyWebpackPlugin = require('copy-webpack-plugin');  //подключаем плагин копирования (п.10 в comments)
const MiniCSSExtractPlugin = require('mini-css-extract-plugin'); //подключаем плагин для CSS

const OptimizeAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin'); // подключаем два плагина для оптимизации CSS

const optimization = () => {
    const config = { //используется, если несколько файлов используют одну и ту же библиотеку
        splitChunks: {
            chunks: 'all'
        }
    };
    if (isProd) {
        config.minimizer = [
            new OptimizeAssetsWebpackPlugin(),
            new TerserWebpackPlugin()
        ];
    }
    return config;
};

function filename(ext) { //динамическое изменение имен файлов
    return isDev ? `[name]${ext}` : `[name].[hash].${ext}`;
}

/* function cssLoaders(extra) { //функция обработки лоадеров
    const config = [{
        loader: MiniCSSExtractPlugin.loader, 
        options: {
          publicPath: '', 
        },
      }, 'css-loader']
      if (extra) {
          config.push(extra)
      }
      return config;
} */
module.exports = {      //экспортируем объект
    context: path.resolve(__dirname, 'src'),     //показываем webpack, где лежат исодники файлов
    mode: "development",        //режим работы. По умолчанию -- production
    entry: {        //entry -- точка входа. Отсюда webpack начинает. Может содержать несколько точек
        index: ['@babel/polyfill', './index.js'],//здесь подкл. полифилы из правила[4]
        analyticks: './analyticks.js'
    },        
    output: {       //указываем, куда webpack должен отдать код
        filename: filename('.js'),       //паттерн name, динамически указывает на ключ entry
                        //паттерн contenthash, на выходе задает именем хэш файла 
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: [       //тут мы говорим webpack, какие расширения нужно понимать по-умолчанию
            ".js", ".json", ".png"
        ],
        alias: {    //указывать абсолютный путь вместо относительного
            "@assets": path.resolve(__dirname, './src/assets'),
        },
    },
    optimization: optimization(), //используется, если несколько файлов используют одну и ту же библиотеку
    //watch: true,        //отслеживать изменения в файлах
    plugins: [      //массив плагинов для подключения, всегда добавляем через new NamePlugin
        new HTMLWebpackPlugin({
            template: './index.html',        //параметр плагина. Передаем в созданный index.html
                    //наш index.html, где вся верстка и т.п. (обращать внимание на link к css!)
            
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({   //настраиваем ОТКУДА и КУДА копируем файл.
            patterns: [
            { 
                from: path.resolve(__dirname, 'src/favicon.ico'), 
                to: path.resolve(__dirname, 'dist')
            }
        ], 
        }),
        new MiniCSSExtractPlugin({ //настраиваем создание css-файла
            filename: filename('.css')
        }),
    ],
    devtool: isDev ? 'source-map' : '', //исходные карты кода
    module: {       //тут делаем лоадер
        rules: [        //тут пишем правила
            {
                test: /\.css$/,     //как только webpack видит что-то с расширением css
                use: [{
                    loader: MiniCSSExtractPlugin.loader, //хз почему так, но по-другому не работает
                    options: {
                      publicPath: '', //должен быть пустой, влияет на пути в упакованном файле
                    },
                  }, 'css-loader'] //он пропускает все через css-loader, а потом
                //упаковывает в файл через плагин
            },
            {
                test: /\.png$/, //правила такие же, как и с css
                use: ['file-loader']
            },
            {
                test: /\.ttf$/, //правила такие же, как и с css
                use: ['file-loader']
            },
            {
                test: /\.less$/,     //как только webpack видит что-то с расширением less
                use: [{
                    loader: MiniCSSExtractPlugin.loader, 
                    options: {
                      publicPath: '',
                    },
                  }, 
                  'css-loader',
                  'less-loader'] //он пропускает все через less-loader, потом css-loader, а потом
                //упаковывает в файл через плагин
            },
            {
                test: /\.js$/, //для babel если видим js
                exclude: /node_modules/, //то проходим через лоадер, за исключением node_modules
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env'
                    ],
                    plugins: [
                        '@babel/plugin-proposal-class-properties'
                    ]
                }
            },
        ]
    },
};

