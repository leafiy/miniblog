<template>
  <div class="page-container">
    <loader :show="!about"></loader>
    <div v-if="about">
      <div v-html="about.html" class="content"></div>
      <p v-if="about.link"><a :href="about.link">My CV</a></p>
      <p v-if="about.link2"><a :href="about.link2">简历</a></p>
      <hr>
    </div>
  </div>
</template>
<script>
import Loader from '../components/loader.vue'
import api from '../api/index.js'
export default {
  data() {
    return {
      about: null
    }
  },
  components: {
    Loader
  },
  activated() {
    api.getContentByName('about').then(res => {
      this.about = res.data.content
    })
  }

}
</script>
<style scoped>
.content {
  white-space: pre-wrap;
}
</style>