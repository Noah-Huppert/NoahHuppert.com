const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoader = require("vue-loader/lib/plugin");

module.exports =  {
    entry: "./js/app.js",
    output: {
	path: path.resolve(__dirname, "dist"),
	filename: "bundle.js"
    },
    devtool: "source-map",
    module: {
	rules: [
	    {
		test: /\.js$/,
		exclude: /node_modules/,
		use: {
		    loader: "babel-loader",
		    options: {
			presets: [ "@babel/preset-env" ]
		    }
		}
	    },
	    {
		test: /\.vue$/,
		use: "vue-loader"
	    },
	    {
		test: /\.css$/,
		use: [
		    "vue-style-loader",
		    "css-loader"
		]
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
