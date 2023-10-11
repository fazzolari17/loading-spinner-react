const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './development/index.tsx',
  devtool: 'inline-source-map',
  output: {
    path: path.join(__dirname, '/dev'),
    filename: 'bundle.js',
  },
  devServer: {
    static: './dev',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React Loading Spinner',
      template: './development/template/index.html',
      inject: 'body',
    }),
  ],
};
