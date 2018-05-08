import affix from './affix.vue';



let Affix = {
  install(Vue, params = {}) {
    if (this.installed) {
      return
    }

    this.installed = true
    Vue.component('affix', affix)
  }
}

export default Affix
