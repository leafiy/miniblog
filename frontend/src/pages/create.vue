<template>
  <div class="create-container">
    <places v-if="showPlace" :location="article.location" @changeLocation="changeLocation" ref="placeInput"></places>
    </places>
    <el-input type="text" :maxlength="80" :placeholder="showPlace? 'project location name' : 'research title'" v-model="article.title" class="mb20"></el-input>
    <el-input type="textarea" :maxlength="600" placeholder="文章摘要" v-model="article.intro" :autosize="{ minRows: 4}" class="mb20"></el-input>
    <uploader v-if="!showPlace" ref="uploader" :file-list="article.fileList" :format="['gif', 'jpg', 'jpeg', 'png', 'bmp', 'webp']" accept="image/*" :multiple="false" :max-number="1" tip="upload article cover photo" fileType="cover" :show-upload-list-after-success="false"></uploader>
    <div id="editor" class="mb20"></div>
    <UIButton type="primary" @click="save(false)">save</UIButton>
    <UIButton type="border" @click="save(true)">save as draft</UIButton>
  </div>
</template>
<script>
import api from '../api/index.js'
import Uploader from '../components/uploader.vue';
import wangEditor from 'wangeditor'
import config from '../config'
import handleFileList from '../utils/fileList.js'
const headers = api.getHeader().headers
const uploadApi = config[process.env.NODE_ENV].apiPort + '/uploader/upload'
import Places from '../components/admin/places.vue';

export default {
  data() {
    return {

      article: {
        fileList: [],
        title: '',
        content: '',
        intro: '',
        location: {}
      },
      showPlace: false
    }
  },
  components: {
    Uploader,
    Places
  },
  methods: {
    changeLocation(data) {
      this.article.location = data
    },
    save(isDraft) {
      let title = this.article.title;
      let fileList;
      if (this.$refs.uploader) {
        fileList = handleFileList(this.$refs.uploader.fileList);
      }
      let content = this.$editor.txt.html();
      let intro = this.article.intro;

      if (!title) {
        return this.$Toast({
          group: 'top-center',
          text: '需要一个标题',
          type: 'warning'
        });
      }

      if (this.showPlace && !this.article.location.lat) {
        return this.$Toast({
          group: 'top-center',
          text: '创建project必须设置一个位置',
          type: 'warning'
        });
      }

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
        api.createContent({
          articleType: 'article',
          category: this.$route.params.type,
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
      }


    }
  },
  mounted() {

    if (this.$route.params.type === 'project') {
      this.showPlace = true;
    }

    const el = this.$el.querySelector('#editor')
    const editor = new wangEditor(el)
    editor.customConfig.uploadImgHeaders = headers
    editor.customConfig.uploadImgServer = uploadApi
    //editor.customConfig.debug = true
    editor.customConfig.uploadImgMaxSize = 12 * 1024 * 1024
    editor.customConfig.uploadImgMaxLength = 1
    editor.customConfig.customAlert = (info) => {
      // info 是需要提示的内容
      this.$Toast({
        group: 'top-center',
        text: info,
        type: 'warning'
      });
    }


    editor.create()


    if (this.$route.params.id) {
      api.getContentById(this.$route.params.id).then(response => {
        this.article = response.data.content
        if (this.article.category == 'project') {
          this.showPlace = true
        }
        editor.txt.html(this.article.content)
      }).catch(error => {
        console.log(error)
      })
    }

    if (this.article.content) {
      editor.txt.html(this.article.content)
    }





    this.$editor = editor

  }

}

</script>
<style lang="scss">
@import '../assets/scss/editor.scss';

</style>
