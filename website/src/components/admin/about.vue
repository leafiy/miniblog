<template>
  <div>
    <uploader ref="uploader" @uploadSuccess="uploadSuccess" accept="application/pdf" :format="format" :tip="tip" :multiple="false"></uploader>
    <editor v-model="about"></editor>
    <UIButton type="primary" @click="save('about')" :loading="saveSpin">save
    </UIButton>
  </div>
</template>
<script>
import api from '../../api/index.js';
import editor from './editor.vue'
import { mapGetters } from 'vuex'
import uploader from '../uploader.vue'
export default {
  data() {
    return {
      about: '',
      saveSpin: false,
      format: ['pdf'],
      cv_link: ''
    }
  },
  components: {
    editor,
    uploader
  },
  computed: {
    ...mapGetters(['siteContent']),
    tip() {
      return this.siteContent && this.siteContent.about && this.siteContent.about.link ? '更新简历pdf' : '上传简历pdf'
    }
  },
  watch: {
    siteContent: function(val) {
      this.setModel(val)
    }
  },
  mounted() {
    this.setModel(this.siteContent)
  },
  methods: {
    uploadSuccess(data) {
      this.cv_link = data.data
    },
    setModel(val) {
      if (val && val.about) {
        this.about = val.about.content

      }
    },
    save(name) {
      this.saveSpin = true;
      let article = {}
      article.articleType = name
      article.content = this.about
      article.link = this['cv_link']

      api.updateContent(article).then(res => {
        this.saveSpin = false;
        this.$Toast({
          group: 'top-center',
          text: 'about update succsee'
        });
        this.$store.dispatch('updateContent', res.data)
      }).catch(error => {
        this.$Toast({
          group: 'top-center',
          type: 'error',
          text: 'update failed'
        });
        this.saveSpin = false;
      })
    }
  }
}
</script>