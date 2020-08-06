---
title: vue-cli4.X 建项目
date: 2020-05-28 15:40:50
tags: vue
categories: 教程
---

# 安装

```
npm install -g @vue/cli
# OR
yarn global add @vue/cli
// 是否ok
vue -V
```
# 创建项目

```
vue create hello-world


// 拉取 2.x 模板 (旧版本)
npm install -g @vue/cli-init
// `vue init` 的运行效果将会跟 `vue-cli@2.x` 相同
vue init webpack my-project
```

# webpack 配置
 安装px2vw autoprefixer
```
npm install postcss-px-to-viewport autoprefixer --save-dev
```

 根目录下创建 vue.config.js 内容如下
    ```
    const pxtovw = require('postcss-px-to-viewport');
    const autoprefixer = require('autoprefixer');
    module.exports = {
        publicPath: process.env.NODE_ENV === 'production' ? '/' : '/', //配置根目录
        outputDir: 'dist',
        productionSourceMap: false,//不需要生产环境的 source map，可以将其设置为 false
        configureWebpack: {}, //webpack配置
        css: {
            loaderOptions: {
                postcss: {
                    plugins: [
                        new autoprefixer({
                            overrideBrowserslist: [
                              "Android 4.1",
                              "iOS 7.1",
                              "Chrome > 31",
                              "ff > 31",
                              "ie >= 8"
                            ]
                          }),
                        new pxtovw({
                            unitToConvert: 'px', //需要转换的单位，默认为"px"；
                            viewportWidth: 375, //设计稿的视口宽度
                            unitPrecision: 5, //单位转换后保留的小数位数
                            propList: ['*'], //要进行转换的属性列表,*表示匹配所有,!表示不转换
                            viewportUnit: 'vw', //转换后的视口单位
                            fontViewportUnit: 'vw', //转换后字体使用的视口单位
                            selectorBlackList: [], //不进行转换的css选择器，继续使用原有单位
                            minPixelValue: 1, //设置最小的转换数值
                            mediaQuery: false, //设置媒体查询里的单位是否需要转换单位
                            replace: true, //是否直接更换属性值，而不添加备用属性
                            exclude: [/node_modules/] //忽略某些文件夹下的文件
                        })
                      ]
                },
            }
        },
        devServer: {
            overlay: { // 让浏览器 overlay 同时显示警告和错误
                warnings: true,
                errors: true
            },
            host: '0.0.0.0',
            port: 8082,
            https: false,// https:{type:Boolean}
            open: false, //配置自动启动浏览器
            hotOnly: true,// 热更新
        }
    }
    ```

# 配置环境变量
  根目录下创建 .env.production(生产) 和 .env.development(开发)
    必须以VUE_APP_ 开头
  ```
  VUE_APP_API_ROOT="https://test-xxx.xxx.com.cn"
  VUE_APP_ATHENA_API_ROOT="https://xxx.xxx.com.cn/"
  VUE_APP_ORDER_API_ROOT="https://xxx.xxx.com.cn:8085/"
  ```

# 骨架屏 vue-skeleton-webpack-plugin
  安装
    ```

     npm install vue-skeleton-webpack-plugin
     ```
  骨架屏vue  （例如：src==> skeleton.vue）
     ```
     <template>
       <div class="container">
         <div>骨架屏1</div>
       </div>
     </template>

     <script>
     export default {
       components: {},
       data () {
         return {}
       },
       mounted () {},
       methods: {}
     }
     </script>

     <style scoped lang="less">
        无作用貌似 写内联
     </style>
     ```
  建入口 src => skeleton.js
```
import Vue from 'vue'
// 创建的骨架屏 Vue 实例
import skeleton from './skeleton.vue';
import skeleton2 from './skeleton2.vue';
console.log(skeleton)
export default new Vue({
    components: {
        skeleton,
        skeleton2
    },
    template: `
    <div>
      <skeleton id="skeleton" style="display:none;" />
      <skeleton2 id="skeleton2" style="display:none;" />
    </div>
    `
});
```
 webpack 配置  vue.config.js

```
const pxtovw = require('postcss-px-to-viewport');
const autoprefixer = require('autoprefixer');
// ======== 引入SkeletonWebpackPlugin start=====================
const path = require('path')
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin')
// ======== 引入SkeletonWebpackPlugin end=====================
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/' : '/', //配置根目录
    outputDir: 'dist',
    productionSourceMap: false,//不需要生产环境的 source map，可以将其设置为 false
    // =========== 主要代码 start========================================================================
    configureWebpack: (config)=>{
        config.plugins.push(
            new SkeletonWebpackPlugin({
                webpackConfig: {
                    entry: {
                        app: path.join(__dirname, "./src/skeleton.js")
                    }
                },
                minimize: true,
                quiet: true,
                router: {
                    mode: "history",
                    routes: [
                        { path: '/', skeletonId: 'skeleton' },
                        { path: '/about', skeletonId: 'skeleton2' },
                    ]

                }
            })
        );
    }, //webpack配置
     // =========== 主要代码 end========================================================================
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    new autoprefixer({
                        overrideBrowserslist: [
                          "Android 4.1",
                          "iOS 7.1",
                          "Chrome > 31",
                          "ff > 31",
                          "ie >= 8"
                        ]
                      }),
                    new pxtovw({
                        unitToConvert: 'px', //需要转换的单位，默认为"px"；
					    viewportWidth: 375, //设计稿的视口宽度
					    unitPrecision: 5, //单位转换后保留的小数位数
					    propList: ['*'], //要进行转换的属性列表,*表示匹配所有,!表示不转换
					    viewportUnit: 'vw', //转换后的视口单位
					    fontViewportUnit: 'vw', //转换后字体使用的视口单位
					    selectorBlackList: [], //不进行转换的css选择器，继续使用原有单位
					    minPixelValue: 1, //设置最小的转换数值
					    mediaQuery: false, //设置媒体查询里的单位是否需要转换单位
					    replace: true, //是否直接更换属性值，而不添加备用属性
					    exclude: [/node_modules/] //忽略某些文件夹下的文件
                    })
                  ]
            },
        }
    },
    devServer: {
        overlay: { // 让浏览器 overlay 同时显示警告和错误
            warnings: true,
            errors: true
        },
        host: '0.0.0.0',
        port: 8082,
        https: false,// https:{type:Boolean}
        open: false, //配置自动启动浏览器
        hotOnly: true,// 热更新
    }
}

```