import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import mavonEditor from 'mavon-editor'
import './registerServiceWorker'
import 'normalize.css'
import config from './config.js'
Vue.config.productionTip = false
import 'mavon-editor/dist/css/index.css'
// import * as VueGoogleMaps from 'vue2-google-maps'
// Vue.use(VueGoogleMaps, {
//   load: {
//     key: config[process.env.NODE_ENV].googleMapKey,
//     libraries: 'places',
//     language: 'en'
//   }
// })
import {
  UIButton,
  Form,
  FormItem,
  Input,
  Toasts,
  Background,
  Carousel,
  Checkbox,
  Loader
} from './ui/index'
import ScrollTo from './utils/scrollto.js'
import authInfo from './utils/authInfo.js'
authInfo()
Vue.use(UIButton)
Vue.use(Loader)
Vue.use(Input)
Vue.use(Toasts)
Vue.use(Background)
Vue.use(Carousel)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Checkbox)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


import addCopyText from './utils/addCopyText.js'
document.addEventListener('copy', addCopyText);