---
title: creat-react-app 配置
date: 2020-06-02 10:45:45
tags: react
categories: 教程
---
# 环境变量 env
 根目录下新建 .env.development  && .env.production
 ```
 // 以REACT_APP_ 开头
 // 开发环境 PORT="9999"
 REACT_APP_xxxx_ROOT="https://test-xxx.xxx.com"
 REACT_APP_xxx_API_ROOT="https://test-xxxx.xxx.com.cn/"
 REACT_APP_xxx_API_ROOT="https://test-xxxxx.xxxx.com.cn/"
 ```
# webpack
1. 安装 react-app-rewired
```
create-react-app 2.x with Webpack 4
npm install react-app-rewired --save-dev
create-react-app 1.x or react-scripts-ts with Webpack 3
npm install react-app-rewired@1.6.2 --save-dev
```
2. 根目录创建 config-overrides.js
/* config-overrides.js */
```
module.exports = function override(config, env) {
  //do stuff with the webpack config...
  return config;
}
```
当然我们也可以把config-overrides.js放到其他位置，比如我们要指向node_modules中某个第三方库提供的配置文件，就可以添加下面配置到package.json：
```
"config-overrides-path": "node_modules/other-rewire"
```
3. 替换 react-scripts

打开package.json:
```
/* package.json */

  "scripts": {
-   "start": "react-scripts start",
+   "start": "react-app-rewired start",
-   "build": "react-scripts build",
+   "build": "react-app-rewired build",
-   "test": "react-scripts test --env=jsdom",
+   "test": "react-app-rewired test --env=jsdom",
    "eject": "react-scripts eject"
}
```
4. 配置
定制 Webpack 配置
webpack字段可以用来添加你的额外配置，当然这里面不包含Webpack Dev Server。

安装less less-loader@5.0.0 postcss-px-to-viewport customize-cra babel-plugin-import  autoprefixer
less-loader版本问题 报错Invalid options object. Less Loader has been initialized using an options object that does not ma...

```
cnpm i less less-loader@5.0.0 postcss-px-to-viewport customize-cra babel-plugin-import  autoprefixer -D
```
配置
```
const { override, overrideDevServer, fixBabelImports, addLessLoader, addWebpackAlias, addWebpackModuleRule } = require('customize-cra');
const path = require('path');
const pxtovw = require('postcss-px-to-viewport');
const autoprefixer = require('autoprefixer');


const removeManifest = () => config => {
    config.plugins = config.plugins.filter(
        p => p.constructor.name !== "ManifestPlugin"
    );
    return config;
};

module.exports = {
    webpack: override(
        removeManifest(), //删除manifest
        fixBabelImports('import', {  //antd 按需加载less
            libraryName: 'antd-mobile',
            style: true,
        }),
        addLessLoader({ //less配置antd主题色
                    javascriptEnabled: true,
                    modifyVars: {
                        '@color-text-base':'#333',
                        "@brand-primary": "#2dcbb5",
                        "@brand-primary-tap": "#57d5c4",
                        "@brand-success": "#6abf47",
                        "@brand-warning": "#ffc600",
                        "@brand-error": "#f4333c",
                        "@brand-important": "#ff5b05",
                        "@brand-wait": "#2dcbb5",
                    }
                }),
        addPostcssPlugins([ //vw配置以及autoprefixer
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
                        // exclude: [/node_modules/] //忽略某些文件夹下的文件
                    }),
                    new autoprefixer({
                        overrideBrowserslist: [
                            "Android 4.1",
                            "iOS 7.1",
                            "Chrome > 31",
                            "ff > 31",
                            "ie >= 8"
                        ]
                    })
        ]),
        addWebpackExternals({ //不做打包处理配置，如直接以cdn引入的
            // highcharts:"window.highcharts"
        }),

        addWebpackAlias({ //添加别名
            '@': path.resolve(__dirname, 'src')
        }),
    ),
    devServer: overrideDevServer(

    )
}
```

以下看看就好 =================
定制 Jest 配置 - Testing
jest配置

定制 Webpack Dev Server
通过devServer我们可以做一些开发环境的配置，比如设置proxy代理，调整publicPath，通过disableHostCheck禁用转发域名检查等。

从CRA 2.0开始，推荐搭配customize-cra使用，里面提供了一些常用的配置，可以方便我们直接使用。
```
const { override, overrideDevServer, } = require('customize-cra');

const addProxy = () => (configFunction) => {
    configFunction.proxy = {
        '/v2ex/': {
            target: 'https://www.v2ex.com',
            changeOrigin: true,
            pathRewrite: { '^/v2ex': '/' },
        },
    };

    return configFunction;
}

module.exports = {
    webpack: override(
        ...
    ),
    devServer: overrideDevServer(
        addProxy()
    )
}
```
Paths - 路径变量
paths里面是create-react-app里面的一些路径变量，包含打包目录、dotenv配置地址、html模板地址等。
```
module.exports = {
  dotenv: resolveApp('.env'),
  appPath: resolveApp('.'),
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveModule(resolveApp, 'src/index'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appTsConfig: resolveApp('tsconfig.json'),
  appJsConfig: resolveApp('jsconfig.json'),
  yarnLockFile: resolveApp('yarn.lock'),
  testsSetup: resolveModule(resolveApp, 'src/setupTests'),
  proxySetup: resolveApp('src/setupProxy.js'),
  appNodeModules: resolveApp('node_modules'),
  publicUrl: getPublicUrl(resolveApp('package.json')),
  servedPath: getServedPath(resolveApp('package.json')),
  // These properties only exist before ejecting:
  ownPath: resolveOwn('.'),
  ownNodeModules: resolveOwn('node_modules'), // This is empty on npm 3
  appTypeDeclarations: resolveApp('src/react-app-env.d.ts'),
  ownTypeDeclarations: resolveOwn('lib/react-app.d.ts'),
};
```
比如我们要修改appHtml即html模板的默认位置，可以这样做：
```
const path = require('path');


module.exports = {
    paths: function (paths, env) {

        // 指向根目录的test.html
        paths.appHtml = path.resolve(__dirname, "test.html");

        return paths;
    },
}
```
5. 常用示例
添加多页面入口
首先安装react-app-rewire-multiple-entry。
```
npm install react-app-rewire-multiple-entry --save-dev
```
然后在config-overrides.js配置：
```
const { override, overrideDevServer } = require('customize-cra');

const multipleEntry = require('react-app-rewire-multiple-entry')([{
    entry: 'src/pages/options.tsx',
    template: 'public/options.html',
    outPath: '/options.html',
}]);

const addEntry = () => config => {

    multipleEntry.addMultiEntry(config);
    return config;
};

const addEntryProxy = () => (configFunction) => {
    multipleEntry.addEntryProxy(configFunction);
    return configFunction;
}

module.exports = {
    webpack: override(
        addEntry(),
    ),
    devServer: overrideDevServer(
        addEntryProxy(),
    )
}
```
禁用 ManifestPlugin
```
const { override, } = require('customize-cra');


const removeManifest = () => config => {
    config.plugins = config.plugins.filter(
        p => p.constructor.name !== "ManifestPlugin"
    );
    return config;
};


module.exports = {
    webpack: override(
        removeManifest(),
    ),
}
```
antd 按需加载 && less-loader
```
const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = {
    webpack: override(
        fixBabelImports('import', {
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: 'css',
        }),
        addLessLoader(),
    ),
}
```
antd-mobile PostCSS && rem 配置

移动端使用 rem 布局时，会借助 PostCSS 处理 px 到 rem 单位的转换。
```
const {
    override,
    addLessLoader,
    addPostcssPlugins,
    fixBabelImports,
} = require("customize-cra");

module.exports = override(
    addLessLoader(),
    addPostcssPlugins([require("postcss-px2rem-exclude")({
        remUnit: 16,
        propList: ['*'],
        exclude: ''
    })]),
    fixBabelImports('import', {
        libraryName: 'antd-mobile',
        style: 'css',
    }),
);
```
需要注意的是和 addLessLoader 一起使用时，addPostcssPlugins 要放在后面，这和直接使用 webpack 配置是一样的顺序。

配置Proxy
```
const { override, overrideDevServer } = require('customize-cra');

const addProxy = () => (configFunction) => {
    configFunction.proxy = {
        '/v2ex/': {
            target: 'https://www.v2ex.com',
            changeOrigin: true,
            pathRewrite: { '^/v2ex': '/' },
        },
    };

    return configFunction;
}

module.exports = {
    webpack: override(),
    devServer: overrideDevServer(
        addProxy()
    )
}
```