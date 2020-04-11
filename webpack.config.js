
const path = require('path')

// const webpack = require('webpack')
var htmlWebpackPlugin = require('html-webpack-plugin')

const VueLoaderPlugin = require("vue-loader/lib/plugin")
//这个配置文件，起始就是一个JS 文件，通过 Node 中的模块操作，向外暴露一个配置对象
module.exports = {

  mode: 'development',
  entry: path.join(__dirname, './src/main.js'), //入口，表示要使用 webpack 打包哪个文件

  output: {
    path: path.join(__dirname, './dist'),//指定 打包好的文件，输出到哪个目录中去
    filename: 'bundle.js' //这是指定 输出的文件的名称
  },

  //第二种方式
  devServer: {
    // --open --port 3000 --contentBase src --hot 
    open: true, //自动打开浏览器
    port: 3000, //设置启动时候的运行段楼
    contentBase: 'src', //指定托管的根目录
    hot: true //启动热更新
  },

  //在webpack 3 中需要这样写
  // plugins: [
  //   new webpack.HotModuleReplacementPlugin() //new 一个热跟新的 模块对象，这是启用热更新
  // ]
  plugins: [
    new htmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),
      filename: 'index.html'
    }),
    new VueLoaderPlugin()
  ],

  module: {// 这个节点用于配置 所有第三方模块的加载器
    rules: [ // 所有第三方模块的匹配规则
      {
        test: /\.css$/, use: ['style-loader', 'css-loader'] //配置处理.css文件的第三方 loader  规则
      },
      {
        test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(jpg|png|bmp|gif|jpeg)$/, loader: 'url-loader?limit=40000'
        //&name=[hash:32][name].[ext]表示图片显示的名字与后缀名和原图片一值 加个哈希值防止重名
        // limit 给定的值，是图片的大小，单位是 byte ，如果我们引用的图片大于等于给定的limit值，则不会被转为base64格式的字符串，如果图片小于给定的 limit 值，则会被转为 base64的字符串
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' //处理bootstrap 字体
      },
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },//babel配置
      { test: /\.vue$/, use: 'vue-loader' } //vue 配置
    ]
  },

  // resolve: {
  //   alias: { //修改导入 vue 包的路径
  //     "vue$": "vue/dist/vue.js"
  //   }
  // }
}

//当我们 在控制台，直接输入 webpack 命令执行的时候，webpack 做了以下几步：
/*
  1. 首先，webpack发现，我们并没有通过命令的形式，给它指定入口和出口
  2. webpack 就会去项目的根目录中，查找一个叫做 'webpack.config.js' 的配置文件
  3. 当找到配置文件后，webpack 会去解析执行这个配置文件，当解析执行完配置文件后，就得到了配置文件中，导出的配置对象
  4. 当 webpack 拿到配置对象后，就拿到了配置对象中，指定的入口 和 出口，然后进行打包构建；

 */