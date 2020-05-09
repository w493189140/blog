---
title: vueRouter 设置
date: 2020-05-07 14:28:45
tags: vue
---

### 去掉hash的#
```
export default new Router({
  hashbang: false,
  mode: 'history',
  routes: []
  })
```
hashbang
默认值： true
只在 hash 模式下可用
当 hashbang 值为 true 时，所有的路径都会被格式化为以 #! 开头。例如 router.go('/foo/bar') 会把浏览器的 URL 设为 example.com/#!/foo/bar 。

## 引入全局base.css
main.js
```
import "./assets/base.css"
```
base.css 放在assets 下

## vueX
main.js
```
import Vuex from 'vuex'
import store from './vuex/store'
Vue.use(Vuex)

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
```
新建文件夹vuex  建立store.js

```
//store.js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
  count:0,
  aaa:0
}
const mutations = {
  jia(state){
    state.count++
  }
}
const getters = {
  count:() => {
    return state.count += 100
  },
  aaa: () => {
    return state.aaa += 50
  }
}
const actions = {
  addAction(context){
    setTimeout(()=>{
      context.commit('jia',10)
    },2000)
  }

}
export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
});

```

js使用
```
import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
  export default {
    name: 'App',
    data(){
      return {
        mag:'vuex初体验',
      }
    },
    computed:{
      ...mapState(['count','aaa']),
      ...mapGetters(["count"]),
      sum:function(){
        return this.count + this.aaa
      }
    },
    methods:{
      ...mapMutations(['jia']),
      ...mapActions(['addAction'])
    }
  }
  ```

## vueRouter
```
import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import rank from '../components/rank'
import recommend from '../components/recommend'
import search from '../components/search'
import singer from '../components/singer'
import aa from '../components/aa'
import bb from '../components/bb'
Vue.use(Router)

export default new Router({
  mode:'history',
  base:__dirname,
  routes: [
    {
      path: '/',
      redirect:'/recommend/aa'
    },
    {
      path: '/rank',
      name: 'rank',
      component: rank
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: recommend,
      children:[

        {
          path:'/recommend/aa',
          name:'aa',
          component:aa
        },
        {
          path:'/recommend/bb',
          name:'bb',
          component:bb
        },

      ]
    },
    {
      path: '/search/:a/:b',
      name: 'search',
      component: search
    },
    {
      path: '/singer',
      name: 'singer',
      component: singer
    }
  ]
})
```
html
```
 <div class="navbar">
      <router-link :to="{name:'recommend',params:{romeid:romeId}}" class="recommend">推荐</router-link>
      <router-link  :to="{path:'/singer',query:{id:123}}" class="singer">歌手</router-link>
      <router-link   :to="{path:'/siranknger'}" class="rank">排行</router-link>
      <router-link  :to="{path:'/search/111/222'}" class="search">搜索</router-link>
    </div>
```


    vueRoter  传参
    query   path + query
    params  name + params

    url传参   路由接受  params 参数


    alias  别名 给路由起个名


## 404页面
vueRouter

```
 {
  path: '*',
  component: page404
}
```

## vueRouter 钩子

```
{
      path: '/home',
      name: 'home',
      component: home,
      beforeEnter:(to,from,next) => {
          //to 去的路由
          //from 现在得路由
          // next()继续执行 不加不执行
          //next({path:'/aaa'})
      },
       beforeLeave:(to,from,next) => {
          //to 去的路由
          //from 现在得路由
          // next()继续执行 不加不执行
          //next({path:'/aaa'})
      }
}
```

## js 改变路由
```
router.go(-1)
router.go(1)
router.push('/home')
router.push({path:'/home',query:{aa:0})
router.push({name:'home',params:{aa:0})

这边不可以改变component 不能设置模板

```