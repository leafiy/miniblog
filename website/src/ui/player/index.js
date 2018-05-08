import PlayerComponent from './Player.vue'




let Player = {
  install(Vue = {}) {
    if (this.installed) {
      return
    }
    this.installed = true

    Vue.component('Player', PlayerComponent)


  }
}

export default Player