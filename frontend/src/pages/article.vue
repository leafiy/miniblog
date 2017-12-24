<template>
  <div class="page-container" v-if="article">
    <loader :show="showLoader"></loader>
    <div class="article">
      <h1 class="font-exo">{{article.title}}</h1>
      <p class="muted">Published at: {{article.dateObj.day}} {{article.dateObj.month}} - {{article.dateObj.year}}</p>
      <div class="hr"></div>
      <div class="content" v-html="article.content"></div>
    </div>
  </div>
</template>
<script>
import api from '../api/index.js';
import Loader from '../components/loader.vue';

export default {
  data() {
    return {
      showLoader: true,
      article: null
    }
  },
  components: {

    Loader
  },
  mounted() {

    let name = this.$route.params.name;
    api.getContentByName(name).then(response => {

      if (!response.data.content) {
        return this.$Toast({
          group: 'top-center',
          text: `cannot find article ${name}`,
          type: 'error',
          cb: () => {
            this.$router.go(-1)
          }
        })

      }
      let article = response.data.content;
      let date = new Date(article.created);
      article.dateObj = {
        year: date.getFullYear(),
        month: date.toLocaleString('en', { month: "long" }),
        day: date.getDate(),
        hour: date.getHours(),
        minute: date.getMinutes()
      }
      this.article = response.data.content;

      this.showLoader = false;
    }).catch(error => {
      this.showLoader = false;
      this.$router.go(-1)
    })

  }
}

</script>
