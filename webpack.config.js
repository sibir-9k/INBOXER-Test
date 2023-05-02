const path = require('path'); // Импортируем модуль "path" для работы с путями файлов
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: './src/index.js', // Точка входа для сборки проекта

	output: {
		filename: 'bundle.js', // Имя выходного файла сборки
		path: path.resolve(__dirname, 'dist'), // Путь для выходного файла сборки
		clean: true,
		assetModuleFilename: 'assets/[name][ext]',
	},

	module: {
		rules: [
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
						options: { minimize: true },
					},
				],
			},
			{
				test: /\.(c|sa|sc)ss$/i, // Регулярное выражение для обработки файлов с расширением .css
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'], // Загрузчики, используемые для обработки CSS-файлов
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
				use: [
					{
						loader: 'image-webpack-loader',
						options: {
							mozjpeg: {
								progressive: true,
							},
							// optipng.enabled: false will disable optipng
							optipng: {
								enabled: false,
							},
							pngquant: {
								quality: [0.65, 0.9],
								speed: 4,
							},
							gifsicle: {
								interlaced: false,
							},
							// the webp option will enable WEBP
							webp: {
								quality: 75,
							},
						},
					},
				],
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'fonts/[hash][ext]',
				},
			},
		],
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css',
		}),
	],

	devServer: {
		static: {
			directory: path.join(__dirname, 'dist'), // Каталог, откуда будет раздаваться статика
		},
		open: true, // Автоматически открывать браузер после запуска сервера разработки
	},

	mode: 'development', // Режим сборки (в данном случае - разработка)
};
