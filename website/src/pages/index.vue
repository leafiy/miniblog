<template>
  <div class="page-container" v-if="siteContent">
    <h1 class="logo">
    Qian<span class="color-text">.</span>Smile
  </h1>
    <div class="hero hero-index" v-if="siteContent.home">
      <span class="title">What I am doing</span>
      <p class="content" v-html="siteContent.home.content"></p>
      <p class="date" v-html="siteContent.home.date"></p>
    </div>
    <div class="flex-container">
      <div class="grid-4 grid-12-s">
        <div class="cv_intro" v-if="siteContent['cv_intro']">{{siteContent['cv_intro'].content}}</div>
      </div>
      <div class="grid-8 grid-12-s border-bottom">
      </div>
    </div>
    <div class="flex-container">
      <div class="grid-8 grid-12-s grid-4-offset">
        <loader :show="!list"></loader>
        <carousel v-if="list" ref="carousel" :autoSlideWidth="true" :perPage="2" :scrollPerPage="false" :navigationEnabled="false" :showPagination="false" :extendWrapper="false" :autoplay="true" :autoplayTimeout="5000" :autoplayHoverPause="true" :loop="true">
          <slide v-for="article of list" :key="article._id">
            <background :height="260" :src="article.thumb"></background>
          </slide>
        </carousel>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Loader from '../components/loader.vue'
export default {
  data() {
    return {
      list: null
    }
  },
  components: {
    Loader
  },
  computed: {
    ...mapGetters(['siteContent', 'articleList'])
  },
  activated() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      if (this.articleList && this.articleList['case'] && this.articleList['case'].length) {
        this.list = this.articleList['case']
      } else {
        this.$store.dispatch('getArticleList', 'case').then(articleList => {
          this.list = this.articleList['case'].filter(a => !a.isDraft)
        })
      }
    }
  }
}
</script>