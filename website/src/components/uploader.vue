<template>
  <div class="uploader" @click="handleClick">
    <input ref="input" type="file" class="uploader-input" @change="handleChange" :accept="accept" :multiple="multiple">
    <span>{{tip}}
      <loader v-if="loading"></loader></span>
  </div>
</template>
<script>
import Vue from 'vue'
import api from '../api/index';
import config from '../config'
import { mapGetters } from 'vuex'


export default {
  data() {
    return {
      headers: api.getHeader().headers,
      uploadApi: config[process.env.NODE_ENV].apiPort + '/uploader/upload',
      loading: false
    }
  },
  props: {
    format: {
      type: Array,
      default () {
        return ['gif', 'jpg', 'jpeg', 'png', 'bmp', 'webp']
      }
    },
    accept: {
      type: String,
      default: 'image/*'
    },
    multiple: {
      type: Boolean,
      default: true
    },
    tip: {
      type: String,
      default: ''
    },
    fileList: {
      type: Array,
      default () {
        return []
      }
    },
  },
  methods: {
    handleClick() {
      this.$refs.input.click()
    },
    handleChange(e) {
      let files = e.target.files;
      if (files.length) {
        this.handleBeforeUpload(files)
      }
    },
    handleFormatError() {
      this.$Toast({
        group: 'top-center',
        text: `only accept ${this.format.join(',')} type`,
        type: 'warning',
        duration: 3000,
      });
    },

    handleBeforeUpload(files) {
      let p = []
      for (let file of files) {
        p.push(this.checkFileType(file))
      }
      Promise.all(p).then(data => {
        this.doUpload(data)
      }).catch(err => {
        this.handleFormatError()
      })

    },
    checkFileType(file) {
      return new Promise((resolve, reject) => {
        const fileType = file.name.split('.').pop().toLowerCase();
        const checked = this.format.includes(fileType);
        if (!checked) {
          reject(file)
        } else {
          resolve(file)
        }
      })
    },
    doUpload(data) {
      var formdata = new FormData();
      this.loading = true;
      data.forEach(file => {
        formdata.append('file', file)
        api.upload(formdata).then(data => {
          this.handleSuccess(data)
          this.loading = false
        }).catch(err => {
          console.log(err)
          this.handleError(err, file)
          this.loading = false
        })
      })

    },
    handleSuccess(data) {
      this.$emit('uploadSuccess', data)

    },
    handleError(err, file) {
      if (err) {
        this.$Toast({
          group: 'top-center',
          text: `upload Failed`,
          type: 'error',
          duration: 2000
        });

      }
    }
  },
  mounted() {


  }
}
</script>