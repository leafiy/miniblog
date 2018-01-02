// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
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
import 'normalize.css'
import authInfo from './utils/authInfo.js'

authInfo()

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
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
