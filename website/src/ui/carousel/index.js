import carousel from "./Carousel.vue"
import slide from "./Slide.vue"

const Carousel = {
  install(Vue = {}) {
    if (this.installed) {
      return
    }

    this.installed = true

    Vue.component('carousel', carousel);
    Vue.component('slide', slide);

  }
}


export default Carousel;
