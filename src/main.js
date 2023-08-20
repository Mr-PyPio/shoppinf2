import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'assets/css/reset.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import VueLazyload from 'vue-lazyload'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import axios from 'axios'

axios.defaults.baseURL = 'http://192.168.0.102:8086/api/'

// 通过axios请求拦截器添加token，保证拥有获取数据的权限
axios.interceptors.request.use(config => {
  // console.log(config);
  // 为请求头对象，添加token 验证的 Authorization字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 在最后必须return config
  return config;
})


const loadimage = require('assets/image/bannerDefaultImg.gif')
const errorimage = require('assets/image/defaultImg.gif')

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)
app.use(pinia)
app.use(router).use(ElementPlus).use(VueLazyload, {
  preLoad: 1,
  error: errorimage,
  loading: loadimage,
  attempt: 1
}).mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.config.globalProperties.$axios = axios
app.provide('$axios', axios)
