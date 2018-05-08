import DrippingArrowTemplate from './dripping-arrow.vue'
import { events } from '../events.js'




const DrippingArrow = {
  install(Vue, params = {}) {
    if (this.installed) {
      return
    }
    this.installed = true
    this.params = params

    Vue.component('DrippingArrow', DrippingArrowTemplate)

  }
}

export default DrippingArrow;