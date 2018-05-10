import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mavonEditor from 'mavon-editor'
import './registerServiceWorker'
import 'normalize.css'
import config from './config.js'
Vue.config.productionTip = false
import 'mavon-editor/dist/css/index.css'
import * as VueGoogleMaps from 'vue2-google-maps2'
Vue.use(VueGoogleMaps, {
  load: {
    key: config[process.env.NODE_ENV].googleMapKey,
    libraries: 'places',
    language: 'en'
  }
})
import {
  UIButton,
  Icon,
  Input,
  Toasts,
  Background,
  Carousel,
} from './ui/index'
import ScrollTo from './utils/scrollto.js'
import authInfo from './utils/authInfo.js'
authInfo()
Vue.use(mavonEditor)
Vue.use(UIButton)
Vue.use(Icon)
Vue.use(Input)
Vue.use(Toasts)
Vue.use(Background)
Vue.use(Carousel)
Vue.use(mavonEditor)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')