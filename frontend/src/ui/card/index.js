import CardEvent from './card-event.vue'
import CardBook from './card-book.vue'
import CardArticle from './card-article.vue'
import CardComment from './card-comment.vue'


const Card = {
  install(Vue = {}) {
    if (this.installed) {
      return
    }

    this.installed = true

    //Vue.component('card', card)

    Vue.component('CardEvent', CardEvent)
    Vue.component('CardBook', CardBook)
    Vue.component('CardArticle', CardArticle)
    Vue.component('CardComment', CardComment)


  }
}

export default Card
