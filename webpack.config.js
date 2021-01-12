// этот файл работает как инструмент для сборки и не идёт дополнением к основному приложению


const path = require('path'); //подключаем встроенный модуль NodeJS для output/path
const HTMLWebpackPlugin = require('html-webpack-plugin');  //установив (см п4.1 в comments), подкючаем плагин
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); //установка CleanWebpackPlugin (см п4.2 в comments)

module.exports = {      //экспортируем объект
    context: path.resolve(__dirname, 'src'),     //показываем webpack, где лежат исодники файлов
    mode: 'development',        //режим работы. По умолчанию -- production
    entry: {        //entry -- точка входа. Отсюда webpack начинает. Может содержать несколько точек
        index: './index.js',
        analyticks: './analyticks.js'
    },        
    output: {       //указываем, куда webpack должен отдать код
        filename: "[name].[contenthash].js",       //паттерн name, динамически указывает на ключ entry
                        //паттерн contenthash, на выходе задает именем хэш файла 
        path: path.resolve(__dirname, 'dist')
    },
    watch: true,        //отслеживать изменения в файлах
    plugins: [      //массив плагинов для подключения, всегда добавляем через new NamePlugin
        new HTMLWebpackPlugin({
            template: './index.html'        //параметр плагина. Передаем в созданный index.html
                    //наш index.html, где вся верстка и т.п. (обращать внимание на link к css!)
        }),
        new CleanWebpackPlugin(),
    ],
    module: {       //тут делаем лоадер
        rules: [        //тут пишем правила    
            {
                test: /\.css$/,     //как только webpack видит что-то с расширением css
                use: ['style-loader', 'css-loader'] //он пропускает все через css-loader, а потом через style-loader
            }
        ]
    },
};

