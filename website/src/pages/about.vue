<template>
  <div class="page-container">
    <div v-html="html"></div>
    <p v-if="link"><a :href="link">Download my CV</a></p>
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
    }
  },
  activated() {
    this.html = this.siteContent && this.siteContent.about && mavonEditor.getMarkdownIt().render(this.siteContent.about.content)
  }

}
</script>