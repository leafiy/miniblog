<template>
  <div class="page-container">
    <div v-html="html"></div>
    <p v-if="link"><a :href="link">My CV</a></p>
    <p v-if="link2"><a :href="link2">简历</a></p>
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
    link() {
      return this.siteContent && this.siteContent.about && this.siteContent.about.link
    },
    link2() {
      return this.siteContent && this.siteContent.about && this.siteContent.about.link2
    }
  },
  activated() {
    this.html = this.siteContent && this.siteContent.about && mavonEditor.getMarkdownIt().render(this.siteContent.about.content)
  }

}
</script>