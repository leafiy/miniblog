import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import 'normalize.css'
Vue.config.productionTip = false
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import {
  UIButton,
  Icon,
  Upload,
  UIProgress,
  Form,
  FormItem,
  Input,
  Toasts,
  Background,
  Carousel,
  PopoverMenu,
  Modal,
  Affix
} from './ui/index'
import ScrollTo from './utils/scrollto.js'
import authInfo from './utils/authInfo.js'
authInfo()
Vue.use(mavonEditor)
Vue.use(Affix)
Vue.use(UIButton)
Vue.use(Icon)
Vue.use(Upload)
Vue.use(UIProgress)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Toasts)
Vue.use(Background)
Vue.use(Carousel)
Vue.use(PopoverMenu)
Vue.use(Modal)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')