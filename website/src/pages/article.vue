<template>
  <div class="page-container">
    <loader :show="!article"></loader>
    <div class="article" v-if="article">
      <h2>{{article.title}}</h2>
      <p><small>Published at: {{article.dateObj.day}} {{article.dateObj.month}} {{article.dateObj.year}}</small></p>
      <hr>
      <div class="content" v-html="content"></div>
    </div>
  </div>
</template>
<script>
import api from '../api/index.js';
import Loader from '../components/loader.vue';
import { mavonEditor } from 'mavon-editor'
export default {
  data() {
    return {
      showLoader: true,
      article: null,
      content:'',
    }
  },
  components: {

    Loader
  },
  activated() {
    let title = this.$route.params.title;
    api.getArticle(title).then(res => {

      if (!res.data.article) {
        return this.$Toast({
          group: 'top-center',
          text: `cannot find article ${title}`,
          type: 'error',
          cb: () => {
            this.$router.go(-1)
          }
        })

      }
      let article = res.data.article;
      let date = new Date(article.created);
      article.dateObj = {
        year: date.getFullYear(),
        month: date.toLocaleString('en', { month: "long" }),
        day: date.getDate(),
        hour: date.getHours(),
        minute: date.getMinutes()
      }
      this.article = article;
      this.content = mavonEditor.getMarkdownIt().render(this.article.content)
      this.showLoader = false;
    }).catch(error => {
      console.log(error)
      this.showLoader = false;
      this.$router.go(-1)
    })

  }
}
</script>