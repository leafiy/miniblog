<template>
  <div>
    <!--
action {String} 服务端上传地址*
headers {String} http 头
show-upload-list {Boolean} 是否显示上传文件列表
show-upload-list-after-success {Boolean} 上传成功后是否显示上传按钮
format {Array} 接受的文件扩展名
accept {String} input 按钮接受的文件类型
multiple {Boolean} 是否支持多文件同时上传
shape {String | circle | } 预览图片的形状
max-size {Number} 单个文件尺寸限制
max-number {Number} multiple 为 true 时最多可上传的文件数量
on-preview {Function} 点击预览图片的事件
on-exceeded-size {Function} 文件大小超出时的事件
on-exceeded-number {Function} 文件数量超出的事件
on-format-error {Function} 文件扩展名出错的事件
on-success {Function} 上传成功的事件
on-error {Function} 上传失败的事件
on-remove {Function} 删除已上传的图片事件
on-cancel {Function} 取消当前正在上传的文件事件
on-retry {Function} 重试失败或已取消的文件事件
file-list {Array} 传入默认文件列表
before-upload {Function} 上传开始之前的事件
langObj 传入语言，默认中文
fileType {String | cover | gallery | music | avatar | document } 控制预览格式，默认为图片，为avatar时直接保存，不存入tmp文件
icon {String} tip的图标，默认为camera
 -->
    <Upload ref="uploader" :action="uploadApi" :headers="headers" :show-upload-list="true" :show-upload-list-after-success="showUploadListAfterSuccess" :format="format" :accept="accept" :multiple="multiple" :shape="shape" :max-size="maxSize" :max-number="maxNumber" :on-preview="handlePreview" :on-exceeded-size="handleMaxSize" :on-exceeded-number="handleMaxNumber" :on-format-error="handleFormatError" :on-success="handleSuccess" :on-error="handleError" :on-remove="handleRemove" :on-cancel="handleCancel" :on-retry="handleRetry" :file-list="fileList" :before-upload="handleBeforeUpload" :fileType="fileType">
      <span class="upload-tip"><icon :name="icon"></icon>{{tip}}</span>
    </Upload>
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
      uploadApi: config[process.env.NODE_ENV].apiPort + '/uploader/upload'
    }
  },
  props: {
    icon: {
      type: String,
      default: 'camera'
    },
    format: {
      type: Array,
      default: ['gif', 'jpg', 'jpeg', 'png', 'bmp', 'webp']
    },
    accept: {
      type: String,
      default: 'image/*'
    },
    maxSize: {
      type: Number,
      default: 12000
    },
    multiple: {
      type: Boolean,
      default: true
    },
    tip: {
      type: String,
      default: ''
    },
    maxNumber: {
      type: Number,
      default: 12
    },
    shape: {
      type: String,
      default: ''
    },
    fileList: {
      type: Array,
      default () {
        return []
      }
    },
    fileType: {
      type: String,
      default: 'cover'
    },
    showUploadListAfterSuccess: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapGetters(['fileUploading'])
  },
  methods: {
    handlePreview(file) {
      this.$Modal({
        type: 'image',
        src: file.url || file.trueUrl
      })
    },
    handleMaxSize(file) {
      this.$Toast({
        group: 'top-center',
        text: `file size exceed ${this.maxSize}KB`,
        type: 'warning',
        duration: 3000
      });
    },
    handleMaxNumber() {
      this.$Toast({
        group: 'top-center',
        text: `file number exceed, max ${this.maxNumber}`,
        type: 'warning',
        duration: 3000
      });
    },
    handleFormatError(file) {
      this.$Toast({
        group: 'top-center',
        text: `only accept ${this.format.join(',')} type`,
        type: 'warning',
        duration: 3000,
      });
    },
    handleBeforeUpload(file) {
      this.$store.commit('fileUploading', true)
      return true;
    },
    handleSuccess(file) {

      this.$store.commit('fileUploading', false)
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
      this.$store.commit('fileUploading', false)
    },
    handleRemove(file) {
      this.fileList.splice(this.fileList.indexOf(file.data), 1);
      this.$store.commit('fileUploading', false)
      this.$emit('on-remove');
    },
    handleCancel(file) {
      this.$store.commit('fileUploading', false)
    },
    handleRetry(file) {
      this.$store.commit('fileUploading', file)
    }
  },
  mounted() {


  }
}

</script>
