import Toast from './ToastComponent.vue'
import { events } from '../events.js'

let Toasts = {
  install(Vue, params = {}) {
    if (this.installed) {
      return
    }

    this.installed = true
    this.params = params

    Vue.component('toast', Toast)

    Vue.prototype.$Toast = (params) => {
      if (typeof params === 'string') {
        params = { title: '', text: params }
      }
      events.$emit('add', params)

    }
  }
}

export default Toasts
