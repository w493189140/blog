---
title: vue上线前的工作
date: 2020-05-07 14:25:53
tags: vue
---

### 1.  去取项目js.map
config -> index.js
```
module.exports = {
  dev: {
       // .........
  },
  build: {
        //.....
    productionSourceMap: true, //改为false
        //.....
    }
}
```
### 2. 去除console.log()
 build -> webpack.prod.conf ->  plugins

 添加  drop_debugger: true,
          drop_console: true

```
 plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false,
          //todo 此处添加
          drop_debugger: true,
          drop_console: true
        }
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true
    }),
```
