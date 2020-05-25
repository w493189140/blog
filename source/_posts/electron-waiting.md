---
title: electron-waiting
date: 2020-05-20 09:51:04
tags: electron
categories: 教程
---

安装electron的时候，遇到以下问题，一直waiting...

electron的版本是@8.2.3 

```
Building fresh packages...

[-/5] ⠐ waiting...
[-/5] ⠐ waiting...
[3/5] ⠐ electron
[4/5] ⠈ phantomjs-prebuilt
[5/5] ⠈ electron-chromedriver
```
解决步骤：

1、首先想到的是切换到国内源

```
yarn config set registry https://registry.npm.taobao.org -g
//或
yarn config set sass_binary_site http://cdn.npm.taobao.org/dist/node-sass -g
```
发现还是不行。。。

2、于是使用npm/cnpm，发现一遍通过。。。

3、然后又试了网上说的在项目目录下创建.npmrc或.yarnrc（npm安装就建立.npmrc）文件，发现然并卵

```
registry "https://registry.npm.taobao.org"

sass_binary_site "https://npm.taobao.org/mirrors/node-sass/"
phantomjs_cdnurl "http://cnpmjs.org/downloads"
electron_mirror "https://npm.taobao.org/mirrors/electron/"
sqlite3_binary_host_mirror "https://foxgis.oss-cn-shanghai.aliyuncs.com/"
profiler_binary_host_mirror "https://npm.taobao.org/mirrors/node-inspector/"
chromedriver_cdnurl "https://cdn.npm.taobao.org/dist/chromedriver"
```
4、然后还有的说使用yarn install --no-bin-links，还是不行 

5、最后将electron版本改为@6.1.10或者@6.0.0，成功！

```
yarn install

yarn install v1.22.4
info No lockfile found.
[1/4] Resolving packages...
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...
success Saved lockfile.
Done in 10.51s.
```

F:\VueProj\mail-sender>yarn run dev
yarn run v1.22.4
$ electron .

