const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoader = require("vue-loader/lib/plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const outPath = path.resolve(__dirname, "dist");

module.exports = {
    entry: [
	path.resolve(__dirname, "js/app.js"),
    ],
    output: {
	path: outPath,
	filename: "[name].js"
    },
    mode: "development",
    devtool: "source-map",
    devServer: {
	contentBase: outPath
    },
    module: {
	rules: [
	    {
		test: /\.vue$/,
		use: "vue-loader"
	    },
	    {
		test: /\.js$/,
		loader: "babel-loader"
	    },
	    {
		test: /\.css$/,
		use: [
		    {
			loader: MiniCssExtractPlugin.loader,
			options: {
			    hmr: process.env.NODE_ENV === "development"
			}
		    },
		    "css-loader"
		]
	    },
	    {
		test: /\.(png|svg|jpg|gif)$/,
		use: "file-loader"
	    }
	]
    },
    plugins: [
	new CleanWebpackPlugin(),
	new HtmlWebpackPlugin({
	    template: path.resolve(__dirname, "index.html")
	}),
	new VueLoader(),
	new MiniCssExtractPlugin()
    ]
};
