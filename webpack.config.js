const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {

  entry: {
    index: path.join(__dirname, './src/index.js'),
    transactions: path.join(__dirname, './src/Transactions/index.js'),
    groupForm: path.join(__dirname, './src/Group/index.js'),
    packageForm: path.join(__dirname, './src/Package/index.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].common.js',
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },

  plugins: [
    new HtmlWebPackPlugin({
      filename: 'transactions.html',
      template: './public/transactions.html',
      chunks: ['transactions']
    }),
    new HtmlWebPackPlugin({
      filename: 'groupForm.html',
      template: './public/groupForm.html',
      chunks: ['groupForm']
    }),
    new HtmlWebPackPlugin({
      filename: 'packageForm.html',
      template: './public/packageForm.html',
      chunks: ['packageForm']
    }),
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      chunks: ['index']
    })
  ]
};