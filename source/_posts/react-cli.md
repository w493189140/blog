---
title: reat 初始化项目配置 @/、less、vw
date: 2020-05-09 14:01:13
tags: ract
---
## @/
###### webpack.config.js
resolve ===> alias ===> 添加 '@':paths.appSrc
```

 alias: {
        // Support React Native Web
        // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
        'react-native': 'react-native-web',
        // Allows for better profiling with ReactDevTools
        ...(isEnvProductionProfile && {
          'react-dom$': 'react-dom/profiling',
          'scheduler/tracing': 'scheduler/tracing-profiling',
        }),
        ...(modules.webpackAliases || {}),
        //todo ======start===========
        '@':paths.appSrc
        //todo ======end===========
      },

```
# less
###### 装依赖
```
yarn add less less-loader -S
```
或
```
npm i less less-loader -S
```
###### webpack.config.js
```
// 添加 style files regexes
const lessRegex = /\.(less)$/;
const lessModuleRegex = /\.module\.(less)$/;

//css rules  ====> sass 后边加上 或更改 sass
 {
      test: lessRegex,
      exclude: lessModuleRegex,
      use: getStyleLoaders(
        {
          importLoaders: 2,
          sourceMap: isEnvProduction && shouldUseSourceMap,
        },
        'less-loader'
      ),
      // Don't consider CSS imports dead code even if the
      // containing package claims to have no side effects.
      // Remove this when webpack adds a warning or an error for this.
      // See https://github.com/webpack/webpack/issues/6571
      sideEffects: true,
  },

```
#  Autoprefixer px2vw
###### 装依赖
```
yarn add  postcss-aspect-ratio-mini postcss-px-to-viewport postcss-write-svg postcss-cssnext postcss-viewport-units cssnano autoprefixer -D
```
或者
```
cnpm i --save postcss-aspect-ratio-mini postcss-px-to-viewport postcss-write-svg postcss-cssnext postcss-viewport-units cssnano autoprefixer
```
###### webpack.config.js
```
//引入新添加
const Autoprefixer = require('autoprefixer');
const postcssAspectRatioMini = require('postcss-aspect-ratio-mini');
const postcssPxToViewport = require('postcss-px-to-viewport');
const postcssWriteSvg = require('postcss-write-svg');
const postcssCssnext = require('postcss-cssnext');
const postcssViewportUnits = require('postcss-viewport-units');
const cssnano = require('cssnano');


//getStyleLoaders ===> plugins
plugins: () => [
        require('postcss-flexbugs-fixes'),
        // add===start===
        Autoprefixer({
            overrideBrowserslist: [
                "Android 4.1",
                "iOS 7.1",
                "Chrome > 31",
                "ff > 31",
                "ie >= 8"
            ]
        }),
        //======end=====
        require('postcss-preset-env')({
            autoprefixer: {
                flexbox: 'no-2009',
            },
            stage: 3,
        }),
        // add ====start ===========
        postcssAspectRatioMini({}),
        postcssPxToViewport({
            viewportWidth: 375, // (Number) The width of the viewport.
            viewportHeight: 667, // (Number) The height of the viewport.
            unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to.
            viewportUnit: 'vw', // (String) Expected units.
            selectorBlackList: ['.ignore', '.hairlines', '.list-row-bottom-line', '.list-row-top-line'], // (Array) The selectors to ignore and leave as px.
            minPixelValue: 1, // (Number) Set the minimum pixel value to replace.
            mediaQuery: false // (Boolean) Allow px to be converted in media queries.
        }),
        postcssWriteSvg({
            utf8: false
        }),
        // postcssPresetEnv({}),
        postcssViewportUnits({
            filterRule: rule => rule.selector.indexOf('::after') === -1 && rule.selector.indexOf('::before') === -1 && rule.selector.indexOf(':after') === -1 && rule.selector.indexOf(':before') === -1
        }),
        // postcssViewportUnits({}),
        cssnano({
            "cssnano-preset-advanced": {
                zindex: false,
                autoprefixer: false
            },
        }),
        // add ====end ===========
        // Adds PostCSS Normalize as the reset css with default options,
        // so that it honors browserslist config in package.json
        // which in turn let's users customize the target behavior as per their needs.
        postcssNormalize(),
    ],
```

# redux
```

```