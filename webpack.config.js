const path = require('path');
const fs = require("fs");

const HtmlWebpackPlugin = require('html-webpack-plugin');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const CopyWebpackPlugin = require("copy-webpack-plugin"); // react-pdf config

const useTypeScript = fs.existsSync(resolveApp("tsconfig.json"));

const moduleFileExtensions = [
    "web.mjs",
    "mjs",
    "web.js",
    "js",
    "web.ts",
    "ts",
    "web.tsx",
    "tsx",
    "json",
    "web.jsx",
    "jsx"
  ];

  
module.exports = {
  mode: "development",
  entry: './index.jsx',
  output: {
    // 최종 번들링된 자바스크립트
    filename: 'main.js',
    // dist를 배포용 폴더로 사용
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [new HtmlWebpackPlugin({
    template: "./index.html" // index.html을 기본 템플릿으로 반영할 수 있도록 설정
  }),
  new CopyWebpackPlugin({
    patterns: [
      {
        from: path.join(path.dirname(require.resolve('xterm/package.json')), 'css'),
        to: 'xterm/css/'
      },
    ],
  }),
  ],
  module: {
    rules: [
        { test: /\.txt$/, use: 'raw-loader' },
        { test: /\.css$/, use: ['style-loader','css-loader'] },
        { test: /\.ts$/, use: 'ts-loader' },
        {
            test: /\.(js|mjs|jsx|ts|tsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', { targets: "defaults" }]
                ]
              }
            }
          }  ,
          {
            test: /\.(otf|pdf)$/,
            loader: 'file-loader'
        }
    ],
  },
  resolve: {
    extensions: moduleFileExtensions.map(ext => `.${ext}`).filter(ext => useTypeScript || !ext.includes("ts")),
    alias: {
      '@': path.resolve(__dirname, 'src') // 경로 alias 설정
    }

  }


}
