<template>
  <div class="article-card" v-if="content">
    <div class="tags" v-if="content.tags && content.tags.length && $route.name!=='Tag'">
      <span v-for="tag of content.tags" v-if="content.tags"><small><router-link :to="'/tag/'+tag">{{tag}}</router-link></small></span>
    </div>
    <div class="title">
      <small v-if="content.isDraft" class="light">【草稿】</small>
      <router-link :to="'/'+ content.category + '/' + content.shortName">{{content.title}}</router-link>
    </div>
    <div class="intro" v-if="content.intro">
      <background :width="200" :height="140" v-if="content.thumb" :src="content.thumb"></background>
      <p>{{content.intro}}</p>
    </div>
    <div class="location" v-if="content.location"><small class="light">- {{content.location.formatted_address}}</small></div>
    <div class="action-bar" v-if="authInfo && $route.path.indexOf('admin') > -1">
      <router-link :to="'/admin/articleEdit/'+content._id">编辑</router-link> <span class="muted">|</span>
      <span @click="setAsDraft(content._id)" class="pointer" v-if="!content.isDraft">转为草稿</span>
      <span @click="cancleDraft(content._id)" class="pointer" v-if="content.isDraft">发布</span>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import api from '../api/index.js'
export default {
  data() {
    return {
      content: null
    }
  },
  props: ['article'],
  computed: {
    ...mapGetters(['authInfo'])
  },
  mounted() {
    this.$nextTick(() => {
      this.content = this.article
    })
  },
  activated() {
    this.$nextTick(() => {
      this.content = this.article
    })
  },
  methods: {
    setAsDraft(id) {
      api.setAsDraft(id).then(res => {
        this.$store.commit('newArticle', res.data.article)
        this.content = res.data.article
      })
    },
    cancleDraft(id) {
      api.cancleDraft(id).then(res => {
        this.$store.commit('newArticle', res.data.article)
        console.log(res.data.article)
        this.content = res.data.article
      })
    }
  }
}
</script>