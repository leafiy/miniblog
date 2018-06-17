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
import ArticleCard from '../articleCard.vue'
export default {
  data() {
    return {
      showLoader: true,
      // category: '',
      list: []
    }
  },

  components: {
    Loader,
    ArticleCard
  },
  mounted() {
    // this.category = this.$route.path.split('/')[2]
    api.getArticleListAll().then(res => {
      if (res.data.articleList && res.data.articleList.length) {
        this.list = res.data.articleList
        this.showLoader = false
      }
    }).catch(err => {
      this.showLoader = false
      console.log(err)
    })
  }


}
</script>