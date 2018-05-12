<template>
  <div class="page-container">
    <div class="hero hero-index">
      <h3>What I am doing</h3>
      <h2>The <b>Visual Analysis</b> of <b>Urban Experience</b> <br> using
         <b>Social Media Data</b></h2>
      <span class="date">2013 - 2017</span>
    </div>
    <div class="index-case-list">
      <carousel v-if="articleList && articleList['case']" ref="carousel" :autoSlideWidth="true" :perPage="perPage" :scrollPerPage="false" :navigationEnabled="false" :showPagination="false" :extendWrapper="false" :autoplay="true" :autoplayTimeout="5000" :autoplayHoverPause="true" :loop="true">
        <slide v-for="article of articleList['case']" :key="article._id">
          <background :height="260" :src="article.thumb" @click.native="$router.push('/case/'+article.shortName)"></background>
          <p>{{article.title}}</p>
        </slide>
      </carousel>
    </div>
    <!-- <div class="flex-container">
      <div class="grid-8  grid-4-offset">

      </div>
    </div> -->
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import fetchData from '../mixins/fetchData.js'
import throttle from 'lodash.throttle'
export default {
  data() {
    return {
      perPage: 2,
      list: null
    }
  },
  components: {},
  computed: {
    ...mapGetters(['articleList'])
  },
  activated() {
    this.fetchData()
    window.addEventListener('resize', throttle(_ => {
      if (window.innerWidth < 720) {
        this.perPage = 1
      } else {
        this.perPage = 2
      }
    }))
  },
  methods: {
    fetchData() {
      this.$store.dispatch('getArticleList', { category: 'case', isDraft: false })
    }
  }
}
</script>