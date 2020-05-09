---
title: vue  vw 配置
date: 2020-05-09 13:59:02
tags: vue
---
## vw 配置
```
cnpm i postcss-import postcss-url autoprefixer less less-loader postcss-aspect-ratio-mini postcss-px-to-viewport postcss-write-svg postcss-cssnext cssnano postcss-viewport-units -S
```
.postcssrc.js
```
module.exports = {
    "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    "postcss-aspect-ratio-mini": {},
    "postcss-write-svg": { utf8: false },
    "postcss-cssnext": {},
    "postcss-px-to-viewport": {
        viewportWidth: 750,
        viewportHeight: 1334,
        unitPrecision: 3,
        viewportUnit: 'vw',
        selectorBlackList: ['.ignore', '.hairlines'],
        minPixelValue: 1,
        mediaQuery: false
         },
    "postcss-viewport-units":{
    <!--图片出现样式问题  ios不显示 还要加上 img{ content: normal !important;}-->

      filterRule: rule => rule.selector.indexOf('::after') === -1 && rule.selector.indexOf('::before') === -1 && rule.selector.indexOf(':after') === -1 && rule.selector.indexOf(':before') === -1
    },
    "cssnano": {
        preset: "advanced",
        autoprefixer: false,
        "postcss-zindex": false
        }
    }
}
```

## less 配置

webpack.base.conf.js
```
 {
    test: /\.less$/,
    loader: "style-loader!css-loader!less-loader",
  },

 ```
 下载依赖
```
// cnpm i less less-loader -S

```

<hr/><hr/><hr/>

# vue-cli 3.0

```
    npm i postcss-px-to-viewport -save -dev
```

```
"postcss": {
        "plugins": {
            "autoprefixer": {},
            "postcss-px-to-viewport": {
                "viewportWidth": 750,
                "minPixelValue": 1
            }
        }
    }
```
