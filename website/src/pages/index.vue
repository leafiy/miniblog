<template>
  <div class="page-container">
    <h1 class="logo">
    Qian<span class="color-text">.</span>Smile
  </h1>
    <div class="hero hero-index" v-if="siteContent && siteContent.home">
      <span class="title">What I am doing</span>
      <p class="content" v-html="siteContent.home.content"></p>
      <p class="date" v-html="siteContent.home.date"></p>
    </div>
    <div class="flex-container">
      <div class="grid-4 grid-12-s">
        <div class="cv_intro" v-if="siteContent && siteContent['cv_intro']">{{siteContent['cv_intro'].content}}</div>
      </div>
      <div class="grid-8 grid-12-s border-bottom">
      </div>
    </div>
    <div class="flex-container">
      <div class="grid-4 grid-12-s">

      </div>
    </div>
  </div>
</template>
<script>
import PageSection from '../components/section.vue';
import { mapGetters } from 'vuex'
export default {
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters(['siteContent'])
  },
  components: {
    PageSection
  },
}
</script>