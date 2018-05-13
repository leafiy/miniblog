<template>
  <div class="page-container">
    <loader :show="!about"></loader>
    <div v-if="about" class="article">
      <div v-html="about.html" class="content markdown-body"></div>
      <p v-if="about.link"><a :href="about.link">My CV</a></p>
      <p v-if="about.link2"><a :href="about.link2">简历</a></p>
      <div class="clearfix"></div>
      <hr>
    </div>
  </div>
</template>
<script>
import api from '../api/index.js'
export default {
  data() {
    return {
      about: null
    }
  },
  activated() {
    api.getContentByName('about').then(res => {
      this.about = res.data.content
    })
  }

}
</script>