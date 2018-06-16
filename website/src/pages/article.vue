<template>
  <div class="article-container" :style="styles">

    this is an article
   <!--  <loader :show="!article"></loader>
    <div class="article" v-if="article">
      <div class="head">
              <h2>{{article.title}}</h2>
              <p class="intro">{{article.intro}}</p>
      </div>
      <div class="date">{{article.dateObj.day}} {{article.dateObj.month}} {{article.dateObj.year}}</div>

      <div class="content markdown-body" id="content" v-html="article.html"></div>
       <div class="toc" v-if="article.showMenu && article.toc">
        <affix relative-element-selector="#content" style="width: 200px">
          <scrollactive ref="scrollactive" v-html="article.toc" active-class="active"></scrollactive>
        </affix>
      </div>
    </div> -->
  </div>
</template>
<script>
import Vue from 'vue'
import api from '../api/index.js'
import VueAffix from 'vue-affix'
import {mapGetters} from 'vuex'
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
  computed:{
    ...mapGetters(['showTab', 'logoShowed']),
    styles() {
            if (!this.logoShowed) {
                return { display: 'none' }
            } else {

                return this.setPosition()
            }

        }
  },
  methods:{
    setPosition() {
            let p = document.getElementById('logo').getBoundingClientRect()
            let styles = {
                left: `${p.x + p.width +40}px`,
                width: `calc(100% - ${p.left}px)`,
                top: `${p.y + p.height + 48}px`,
                minHeight: `calc(100% - ${p.y + p.height + 48}px)`
            }


            return styles
        },
      },
  mounted() {
    // let title = this.$route.params.title;
    // api.getArticle(title).then(res => {
    //   if (!res.data.article) {
    //     return this.$Toast({
    //       group: 'top-center',
    //       text: `cannot find article ${title}`,
    //       type: 'error',
    //       cb: () => {
    //         this.$router.go(-1)
    //       }
    //     })

    //   }
    //   let article = res.data.article;
    //   let date = new Date(article.created);
    //   article.dateObj = {
    //     year: date.getFullYear(),
    //     month: date.toLocaleString('en', { month: "long" }),
    //     day: date.getDate(),
    //     hour: date.getHours(),
    //     minute: date.getMinutes()
    //   }
    //   this.article = article;

    //   this.showLoader = false;
    // }).catch(error => {
    //   console.log(error)
    //   this.showLoader = false;
    //   this.$router.go(-1)
    // })

  }
}
</script>