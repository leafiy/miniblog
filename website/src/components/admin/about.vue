<template>
  <div>
    <uploader ref="uploader" @uploadSuccess="uploadSuccess" accept="application/pdf" :format="format" :tip="tip" :multiple="false"></uploader>
    <uploader ref="uploader" @uploadSuccess="uploadSuccess2" accept="application/pdf" :format="format" :tip="tip2" :multiple="false"></uploader>
    <editor v-model="content"></editor>
    <UIButton type="primary" @click="save('about')" :loading="saveSpin">save
    </UIButton>
  </div>
</template>
<script>
import api from '../../api/index.js';
import { mapGetters } from 'vuex'


export default {
  data() {
    return {
      about: null,
      content: '',
      saveSpin: false,
      format: ['pdf'],
      cv_link: '',
      cv_link2: '',
      tip2: '上传中文简历'
    }
  },
  components: {
    editor: () =>
      import ( /* webpackChunkName: "Admin" */ './editor.vue'),
    uploader: () =>
      import ( /* webpackChunkName: "Admin" */ '../uploader.vue')
  },
  computed: {
    tip() {
      return this.siteContent && this.siteContent.about && this.siteContent.about.link ? '更新简历pdf' : '上传简历pdf'
    }
  },
  mounted() {
    api.getContentByName('about').then(res => {
      this.about = res.data.content
      this.content = this.about.content
    })
  },
  methods: {
    uploadSuccess(data) {
      this.cv_link = data.data
    },
    uploadSuccess2(data) {
      this.cv_link2 = data.data
    },
    save() {
      this.saveSpin = true;
      let article = {}
      article.articleType = 'about'
      article.content = this.content
      article.link = this['cv_link']
      article.link2 = this['cv_link2']

      api.updateContent(article).then(res => {
        this.saveSpin = false;
        this.$Toast({
          group: 'top-center',
          text: 'about update succsee'
        });
        this.$store.dispatch('updateContent', res.data)
      }).catch(error => {
        console.log(error)
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