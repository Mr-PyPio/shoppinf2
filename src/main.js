import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'assets/css/reset.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import VueLazyload from 'vue-lazyload'

const loadimage = require('assets/image/bannerDefaultImg.gif')
const errorimage = require('assets/image/bannerDefaultImg.gif')

const app = createApp(App)
app.use(store).use(router).use(ElementPlus).use(VueLazyload, {
  preLoad: 1,
  error: errorimage,
  loading: loadimage,
  attempt: 1
}).mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
