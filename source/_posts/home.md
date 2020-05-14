---
title: vue webpack 打包后animation冲突
date: 2020-05-07 14:22:13
tags: vue
categories: 问答
---
### 动画冲突
##### 原因：
@keyframes的名称被缩写成了a造成冲突

##### 解决办法

配置文件发现使用了postcss的cssnano插件压缩css，压缩过程中使用了postcss-reduce-idents插件对自定义的标识符重命名。

修改配置文件postcss.config.js，plugins属性中增加

```
'postcss-reduce-idents': {
    keyframes: false,
},

```

禁止插件对自定义动画名称的重命名。
