---
title: 对axios封装中，在登录token过期，返回401状态码，react-router怎么进行路由跳转
date: 2020-06-05 10:58:03
tags: react
categories: 教程
---
```
// Auth.jsx
export const AuthContext = React.createContext({children});
export const useAuth = ()=> React.useContext(AuthContext);
export const AuthProvider = ({localStorageKey = "token", children })=> {
   const [token, setToken] = React.useState(()=> localStorage.getItem(localStorageKey)||"");
   const saveToken = React.useCallback((v)=> {
       localStorage.setItem(localStorageKey, JSON.stringify(v));
      setToken(v);
   }, [localStorageKey])
   const [isLogin, setIsLogin] = React.useState(false);
   const login = React.useCallback((nextToken)=> {
      setIsLogin(true);
      saveToken(nextToken)
   }, []);
   const logout = React.useCallback(()=> {
      setIsLogin(false);
      saveToken("")
   }, [])
   const value = { token, saveToken, login, logout, isLogin }
   return <AuthContext.Provider value={value} children={children} />
}
```
```
// ajax.jsx
import { useAuth } from "./Auth"
import axios from "axios"
const AjaxContext = React.createContext();
export const useAjax = ()=> React.useContext(AjaxContext);
export function AjaxProvider({timeout, baseURL, children}){
    const instance = React.useMemo(()=> axios.create({timeout, baseURL}), [timeout, baseURL]);
    const {isLogin, saveToken, token} = useAuth();
    React.useEffect(()=> {
      // request 拦截器
      const onError = (err)=> Promise.reject(err)
      const onRequest = (config)=> {
            if (token) {
               config.headers.Authorization = `Bearer ${token}`;
           }
           return config;
      }
      const flag = axios.interceptors.request.use(onRequest, onError);
      return ()=> instance.interceptors.request.eject(flag)
    }, [instance, isLogin, token])
   React.useEffect(()=> {
      const onResp = (res)=> res
      const onError = (error)=> {
           if (err.response) {
               if (error.response.status === 401){ saveToken("") }
               Message.error(error.response.data.message || "服务器异常");
           }
      }
      const flag = axios.interceptors.response.use(onResp, onError);
      return ()=> instance.interceptors.response.eject(flag)
   }, [instance, saveToken])
   const ajax = React.useCallback((params)=> {
      const onSuccess = res=> params.success && params.success(res);
      const onError = err=> params.error && params.error(err);
      return instance({
            method: params.method.toLowerCase(),
            url: `${axios.defaults.baseURL}${params.url}`,
            data: params.method !== "get" ? params.data : "",
            params: params.method === "get" ? params.data : "",
            responseType: params.file ? "blob" : ""
      }).then(onSuccess, onError)
   }, [instance]);
   const value = { ajax, axios: instance }
   return <AjaxContext.Provider value={value} children={children} />
}
```
```
// ProductPage.jsx
import { useAjax } from "./Ajax"
export function ProductPage({match: { params: { id } }}){
    const { ajax } = useAjax();
    const [data, setData] = React.useState(null);
    const [error, setError] = React.useState(null);
    React.useEffect(()=> {
       ajax({url: `/product/${id}`, error: setError, success: (res)=> setData(res.data)})
    }, [id])
    return (
       <>
          {!error && !data && <Loading /> }
          {error && <ErrorDisplayer error={error}/>}
          {data && <DataDsplayer data={data}}/>}
       </>
    )
}
```
```
// index.jsx
ReactDOM.render(
  <AuthProvider localStorageKey="fake_token">
     <AjaxProvider baseURL="/api" timeout={30000}>
       <BrowserRouter>
          <Application />
       </BrowserRouter>
     </AjaxProvider>
  </AuthProvider>
, ROOT_DOM)
```
```
// Application.jsx
import {useAuth} from "./useAuth";
export function Application(){
     return (
        <Switch>
           <Route path="/home" component={HomePage} />
           <Route path="/login" component={LoginPage} />
           <AuthRoute path="/product/:id" component={ProductPage} />
        </Switch>
     )
}
function LoginRedirect(props) {
   // 你确定 state 有用吗, 我没看到有这个api.....,
   // 觉得还是把url改成 `/login?redirect=${encodeURLComponent(location.href)}`
   // 这种方式会好点, 在login成功后分析url来处理
   return <Redirect path="/login" state={{from: props.location}} />
}
function AuthRoute = (props)=> {
   const { token, isLogin } = useAuth();
   const component = !token || !isLogin ? LoginRedirect : props.component;
   return <Route {...props} component={component} />
}
```
以上都是裸写的， 大概跑步通，意思就是这个意思，还有，typescript大法好，你有空可以学学。
还有就是我比较喜欢用 useApi,
const { getProduct, removeProduct } = useApi();
这种，直接封装干净，然后，在开发阶段可以做mock
```
const sleep = (ms)=> new Promise(r=> setTimeout(r, ms))
export function MockApiProvider({delay = 400}){
    const getProduct = async (id)=> {
        await sleep(delay);
        return { id, name: "mock product name" }
    }
    const removeProduct = ()=> sleep(delay).then(()=> throw new Error("权限不足不能删除"))
    return <ApiContext.Provider value={{getProduct, removeProduct}} children={children}/>
}
```