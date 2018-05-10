<template>
  <div class="article-list">
    <loader :show="showLoader"></loader>
    <div class="research-article" v-if="!showLoader" v-for="item of list">
      <article-card :article="item"></article-card>
    </div>
  </div>
</template>
<script>
import Loader from '../loader.vue';
import api from '../../api/index.js';
import { mapGetters } from 'vuex'
import ArticleCard from '../articleCard.vue'
export default {
  data() {
    return {
      showLoader: true,
      category: ''
    }
  },
  computed: {
    ...mapGetters(['articleList']),
    list() {
      return this.articleList && this.articleList[this.category]
    }

  },
  components: {
    Loader,
    ArticleCard
  },
  mounted() {
    this.category = this.$route.path.split('/')[2]
    if (!this.list || !this.list.length) {
      this.$store.dispatch('getArticleList', this.category).then(_ => {
        this.showLoader = false
      }).catch(err => {
        this.showLoader = false
      })
    } else {
      this.showLoader = false
    }
  }


}
</script>