<template>
  <div class="create-container">
    <uploader ref="uploader" @uploadSuccess="uploadSuccess" tip="上传文章缩略图" :multiple="false"></uploader>
    <background :width="300" :height="200" v-if="article.thumb" :src="article.thumb"></background>
    <p><small @click="delThumb" v-if="article.thumb"> 删除缩略图</small></p>
    <places v-if="showPlace" :location="article.location" @changeLocation="changeLocation" ref="placeInput"></places>
    </places>
    <el-input type="text" :maxlength="80" placeholder="文章标题" v-model="article.title" class="mb20"></el-input>
    <el-input type="textarea" :maxlength="600" placeholder="文章摘要" v-model="article.intro" :autosize="{ minRows: 4}" class="mb20"></el-input>
    <vue-tags-input v-model="tag" :tags="tags" @tags-changed="newTags => tags = newTags" />
    <editor v-model="article.content" class="mb20"></editor>
    <UIButton type="primary" @click="save(false)">save</UIButton>
    <UIButton type="border" @click="save(true)">save as draft</UIButton>
  </div>
</template>
<script>
import api from '../../api/index.js'
import Uploader from '../../components/uploader.vue';
import config from '../../config'
import handleFileList from '../../utils/fileList.js'
const headers = api.getHeader().headers
const uploadApi = config[process.env.NODE_ENV].apiPort + '/uploader/upload'
import Places from '../../components/admin/places.vue';
import editor from './editor.vue'
import uploader from '../../components/uploader.vue'
import VueTagsInput from '@johmun/vue-tags-input';
export default {
  data() {
    return {
      category: '',
      article: {
        title: '',
        content: '',
        intro: '',
        location: {},
        thumb: '',
      },
      showPlace: false,
      tag: '',
      tags: [],

    }
  },
  components: {
    Uploader,
    Places,
    editor,
    uploader,
    VueTagsInput
  },
  methods: {
    delThumb() {
      this.article.thumb = ''
    },
    uploadSuccess(data) {
      this.article.thumb = data.data
    },
    changeLocation(data) {
      this.article.location = data
    },
    save(isDraft) {
      if (!this.article.title) {
        return this.$Toast({
          group: 'top-center',
          text: '必需要一个标题',
          type: 'warning'
        });
      }


      if (this.showPlace && !this.article.location.lat) {
        return this.$Toast({
          group: 'top-center',
          text: '创建case必须设置一个位置',
          type: 'warning'
        });
      }
      this.article.category = this.category
      this.article.isDraft = isDraft ? true : false
      this.articleType = 'article'
      this.article.tags = this.tags.map(tag=>tag['text'])
      if (this.$route.params.id) {
        api.updateContent({
          _id: this.$route.params.id,
          content: content,
          fileList: fileList,
          title: title,
          intro: intro,
          isDraft: isDraft ? true : false,
          location: this.article.location
        }).then(response => {

          this.$router.go(-1);
        }).catch(error => {
          console.log(error)
        })
      } else {
        api.createArticle(this.article).then(response => {

          this.$router.go(-1);
        }).catch(error => {
          if (error.response.data.err) {
            this.$Toast({
              group: 'top-center',
              text: error.response.data.err,
              type: 'error'
            });
          }
        })
      }


    }
  },
  mounted() {
    this.category = this.$route.params.category
    if (this.category === 'case') {
      this.showPlace = true;
    }

    if (this.$route.params.id) {
      api.getContentById(this.$route.params.id).then(response => {
        this.article = response.data.content
        if (this.article.category == 'project') {
          this.showPlace = true
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }

}
</script>