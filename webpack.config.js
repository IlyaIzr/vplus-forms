const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {

  entry: {
    index: path.join(__dirname, './src/index.js'),
    transactionsForm: path.join(__dirname, './src/Transactions/index.js'),
    groupForm: path.join(__dirname, './src/Group/index.js'),
    packageForm: path.join(__dirname, './src/Package/index.js'),
    regForm: path.join(__dirname, './src/Reg/index.js'),
    debtForm: path.join(__dirname, './src/Debt/index.js'),
    settingsForm: path.join(__dirname, './src/Settings/index.js'),
    reportForm: path.join(__dirname, './src/Report/index.js'),
    accountsForm: path.join(__dirname, './src/Accs/index.js')
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    chunkFilename: '[name].components.js',
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    // runtimeChunk: 'single',  //chunk per lib and runtime
    // splitChunks: {
    //   chunks: 'all',
    //   maxInitialRequests: Infinity,
    //   minSize: 0,
    //   cacheGroups: {
    //     reactVendor: {
    //       test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
    //       name: "reactvendor"
    //     },
    //     utilityVendor: {
    //       test: /[\\/]node_modules[\\/](react-select)[\\/]/,
    //       name: "utilityVendor"
    //     },
    //     bootstrapVendor: {
    //       test: /[\\/]node_modules[\\/](draft-js)[\\/]/,
    //       name: "bootstrapVendor"
    //     },
    //     vendor: {
    //       test: /[\\/]node_modules[\\/](!react-select)(!draft-js)[\\/]/,
    //       name: "vendor"
    //     },
    //   },
    // },
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      }
    ]
  },

  plugins: [
    new HtmlWebPackPlugin({
      filename: 'transactionsForm.html',
      template: './public/transactionsForm.html',
      chunks: ['transactionsForm']
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
      filename: 'regForm.html',
      template: './public/regForm.html',
      chunks: ['regForm']
    }),
    new HtmlWebPackPlugin({
      filename: 'accountsForm.html',
      template: './public/accountsForm.html',
      chunks: ['accountsForm']
    }),
    new HtmlWebPackPlugin({
      filename: 'debtForm.html',
      template: './public/debtForm.html',
      chunks: ['debtForm']
    }),
    new HtmlWebPackPlugin({
      filename: 'reportForm.html',
      template: './public/reportForm.html',
      chunks: ['reportForm']
    }),
    new HtmlWebPackPlugin({
      filename: 'settingsForm.html',
      template: './public/settingsForm.html',
      chunks: ['settingsForm']
    }),
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      chunks: ['index']
    })
  ]
};