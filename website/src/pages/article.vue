<template>
  <div class="page-container">
    <loader :show="!article"></loader>
    <div class="article" v-if="article">
      <h2>{{article.title}}</h2>
      <p><small class="light">Published at: {{article.dateObj.day}} {{article.dateObj.month}} {{article.dateObj.year}}</small></p>
      <div class="content" id="content" v-html="article.html"></div>
      <div class="toc" v-if="article.showMenu && article.toc">
        <affix relative-element-selector="#content" style="width: 200px">
          <scrollactive ref="scrollactive" v-html="article.toc" active-class="active"></scrollactive>
        </affix>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import api from '../api/index.js'
import VueAffix from 'vue-affix'
import Scrollactive from 'vue-scrollactive';
Vue.use(Scrollactive);
Vue.use(VueAffix)
export default {
  data() {
    return {
      showLoader: true,
      article: null
    }
  },
  components: {
    VueAffix
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

      this.showLoader = false;
    }).catch(error => {
      console.log(error)
      this.showLoader = false;
      this.$router.go(-1)
    })

  }
}
</script>