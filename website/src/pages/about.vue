<template>
  <div class="page-container">
    <div v-html="html"></div>
    <hr>
    <p v-if="siteContent.about.link"><a :href="siteContent.about.link">Download my CV</a></p>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { mavonEditor } from 'mavon-editor'

export default {
  data() {
    return {
      html: ''
    }
  },
  computed: {
    ...mapGetters(['siteContent']),
  },
  activated() {
    this.html = mavonEditor.getMarkdownIt().render(this.siteContent.about.content)
  }

}
</script>