const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  module: {
    rules: [{
      test: /\.s?[ac]ss$/,
      use: [
        {
          loader: 'css-loader'
        },
        {
          loader: 'postcss-loader',
        },
        {
          loader: 'sass-loader',
          options: {
            query: {
              minimize: true,
              modules: true,
              importLoaders: true,
              localIdentName: '[hash:6]'
            }
          }
        }
      ]
    }]
  },
  loaders: [{
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract(
      "style",
      "css!sass")
    }
  ],
  plugins: [
    new ExtractTextPlugin("style.css")
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  }
}