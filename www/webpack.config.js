const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoader = require("vue-loader/lib/plugin");

const outPath = path.resolve(__dirname, "dist");

module.exports =  {
    entry: "./js/app.js",
    output: {
	path: outPath,
	filename: "bundle.js"
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
		    "vue-style-loader",
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
	new HtmlWebpackPlugin({
	    template: path.resolve(__dirname, "index.html")
	}),
	new VueLoader()
    ]
};
