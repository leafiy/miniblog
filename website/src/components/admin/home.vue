<template>
  <div>
    <template>
      <el-input type="textarea" placeholder="大字内容" v-model="home" :autosize="{ minRows: 4}" class="mb20"></el-input>
      <el-input placeholder="大字日期" v-model="date" :autosize="{ minRows: 4}" class="mb20"></el-input>
      <UIButton type="primary" @click="save('home')" :loading="saveSpin">保存大字
      </UIButton>
    </template>
    <hr>
    <el-input type="textarea" placeholder="小字内容" v-model="cv_intro" :autosize="{ minRows: 4}" class="mb20"></el-input>
    <UIButton type="primary" @click="save('cv_intro')" :loading="saveSpin">保存小字
    </UIButton>
  </div>
</template>
<script>
import api from '../../api/index.js';
import editor from './editor.vue'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      home: '',
      cv_intro: '',
      date: '',
      saveSpin: false,
    }
  },
  computed: {
    ...mapGetters(['siteContent'])
  },
  watch: {
    siteContent: function(val) {
      this.setModel(val)
    }
  },
  components: {
    editor
  },
  mounted() {
    this.setModel(this.siteContent)
  },
  methods: {
    setModel(val) {
      this.home = val.home && val.home.content || ''
      this.date = val.home && val.home.date || ''
      this['cv_intro'] = val['cv_intro'] && val['cv_intro'].content || ''
    },
    save(name) {
      this.saveSpin = true;
      let article = {}
      article.articleType = name
      if (name == 'home') {
        article.content = this.home
        article.date = this.date
      }
      if (name == 'cv_intro') {
        article.content = this['cv_intro']
      }
      api.updateContent(article).then(res => {
        this.saveSpin = false;
        this.$Toast({
          group: 'top-center',
          text: 'home update succsee'
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