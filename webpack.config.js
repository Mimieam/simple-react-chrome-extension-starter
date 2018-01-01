const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  // devtool: 'cheap-source-map',
  devtool: 'source-map',
  entry: {
    background: [
      'babel-polyfill',
      './src/background.js'
    ],
    app:'./src/App.js'
  },
  output: {
    path: path.join(__dirname, '/build'),
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js'
  },
  plugins: [
    new UglifyJSPlugin({sourceMap: true}), // remove unused code
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['env',
              {
                "useBuiltIns": true,
                "debug": false
              }
            ]],
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
    ]
  }
}