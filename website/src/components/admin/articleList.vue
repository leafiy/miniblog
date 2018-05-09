<template>
  <div class="article-list">
    <loader :show="showLoader" v-if="articles && !articles.length"></loader>
    <div class="research-article" v-else v-for="item of articles">
      <div class="content">
        <h3 class="title hover-line mb20"><router-link :to="category+'/'+ item.title">{{item.title}}</router-link></h3>
        <p v-if="item.intro">{{item.intro}}</p>
        <background width="100%" height="260px" v-if="item.thumb" :src="item.thumb"></background>
      </div>
    </div>
  </div>
</template>
<script>
import Loader from '../loader.vue';
import api from '../../api/index.js';
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      showLoader: true
    }
  },
  props: ['category'],
  computed: {
    ...mapGetters(['articleList']),
    articles() {
      return this.articleList[this.category]
    }

  },
  components: {
    Loader
  },
  mounted() {
    this.$nextTick(() => {
      if (this.articleList[this.category]) {

      } else {
        this.$store.dispatch('getArticleList', this.category)

      }
    })

    // api.getList('research').then(response => {

    //   this.showLoader = false;
    //   let articles = response.data.articleList;
    //   for (let item of articles) {
    //     let date = new Date(item.created)
    //     item.dateObj = {
    //       year: date.getFullYear(),
    //       month: date.toLocaleString('en', { month: "short" }),
    //       day: date.getDate()
    //     }
    //   }
    //   this.articles = articles

    // }).catch(error => {
    //   this.showLoader = false;
    //   console.log(error)
    // })
  }


}
</script>