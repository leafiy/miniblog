<template>
  <div :class="wrapperClass">
    <upload-list :file-list="fileList" :lang-obj="langObj" :file-type="fileType" @on-file-remove="handleRemove" @on-file-preview="handlePreview" @on-file-abort="handleAbort" @on-file-retry="handleRetry"></upload-list>
    <div :class="triggerClass" v-show="showUploader" @click="handleClick" @drop.prevent="onDrop" @dragover.prevent="dragOver = true" @dragleave.prevent="dragOver = false">
      <input ref="input" type="file" class="uploader-input" @change="handleChange" :multiple="multiple" :accept="accept">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import UploadList from './upload-list.vue';
import axios from 'axios';
export default {
  name: 'Upload',
  components: { UploadList },
  props: {
    langObj: {
      type: Object,
      default () {
        return {
          del: '删除',
          cancel: '取消',
          retry: '重试',
          view: '查看'
        }
      }
    },
    action: {
      type: String,
      required: true
    },
    headers: {
      type: Object,
      default () {
        return {};
      }
    },
    multiple: {
      type: Boolean,
      default: true
    },
    data: {
      type: Object
    },
    name: {
      type: String,
      default: 'file'
    },
    withCredentials: {
      type: Boolean,
      default: false
    },
    showUploadList: {
      type: Boolean,
      default: false
    },
    showUploadListAfterSuccess: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      validator(value) {
        return ['select', 'drag'].includes(value);
      },
      default: 'drag'
    },
    format: {
      type: Array,
      default () {
        return [];
      }
    },
    accept: {
      type: String
    },
    shape: String,
    maxSize: {
      type: Number
    },
    beforeUpload: Function,
    onProgress: {
      type: Function,
      default () {
        return {};
      }
    },
    onSuccess: {
      type: Function,
      default () {
        return {};
      }
    },
    onError: {
      type: Function,
      default () {
        return {};
      }
    },
    onRemove: {
      type: Function,
      default () {
        return {};
      }
    },
    onCancel: {
      type: Function,
      default () {
        return {};
      }
    },
    onRetry: {
      type: Function,
      default () {
        return {};
      }
    },
    onPreview: {
      type: Function,
      default () {
        return {};
      }
    },
    onExceededSize: {
      type: Function,
      default () {
        return {};
      }
    },
    onExceededNumber: {
      type: Function,
      default () {
        return {};
      }
    },
    onFormatError: {
      type: Function,
      default () {
        return {};
      }
    },
    maxNumber: Number,
    fileType: {
      type: String,
      default: 'cover'
    },
    fileList: {
      type: Array,
      default () {
        return []
      }
    }
  },

  data() {
    return {
      dragOver: false,
      reqs: {},
      rawFileList: {},
    };
  },
  computed: {

    showUploader() {
      if (!this.showUploadListAfterSuccess) {
        if (this.fileList.length) {
          return false
        } else {
          return true
        }
      } else {
        return true
      }
    },
    triggerClass() {
      return [{
        [`uploader-drag`]: this.type === 'drag',
        [`uploader-dragOver`]: this.dragOver
      }];
    },
    wrapperClass() {
      return [
        `uploader`,
        `uploader-${this.fileType}`,
        {
          [`uploader-circle`]: this.shape === 'circle'
        }
      ]
    }

  },
  methods: {
    handleClick() {
      this.$refs.input.click();
    },
    handleChange(e) {
      const files = e.target.files;

      if (!files) {
        return;
      }
      this.handleFiles(files);
      this.$refs.input.value = null;
    },
    onDrop(e) {
      this.dragOver = false;
      this.handleFiles(e.dataTransfer.files);
    },

    handleFiles(files) {

      let postFiles = Array.prototype.slice.call(files);
      if (postFiles.length === 0) return;

      postFiles.forEach(file => {
        this.handleBeforeUpload(file);
      });
    },
    handleBeforeUpload(file) {
      if (!this.beforeUpload) {
        return this.startUpload(file);
      }
      const before = this.beforeUpload(file);
      let checked = this.checkNumber(file) && this.checkFormat(file) && this.checkSize(file)
      if (checked) {
        this.startUpload(file)
      }
    },
    checkNumber(file) {
      if (this.fileList.length >= this.maxNumber) {
        this.onExceededNumber()
        return false
      }
      return true
    },
    checkFormat(file) {
      if (this.format.length) {
        const fileType = file.name.split('.').pop().toLowerCase();
        const checked = this.format.includes(fileType);
        if (!checked) {
          this.onFormatError(file, this.fileList);
          return false;
        } else {
          return true
        }
      }
      return true
    },
    checkSize(file) {
      if (this.maxSize) {
        if (file.size > this.maxSize * 1024) {
          this.onExceededSize(file, this.fileList);
          return false;
        } else {
          return true
        }
      }
      return true
    },


    startUpload(file) {
      let uid = Date.now();
      this.rawFileList[uid] = file;
      let _file = {}
      _file.uid = Date.now();
      _file.status = 'uploading'
      _file.showProgress = true
      _file.percentage = 0
      _file.url = URL.createObjectURL(file)
      _file.name = file.name;
      let formData = new FormData();
      formData.append('fileType', this.fileType)
      formData.append(this.name, file);
      this.post(formData, _file)
      this.fileList.push(_file);
    },
    post(formData, _file) {
      let onUploadProgress = (e) => {
        this.handleProgress(e, _file)
      }
      let CancelToken = axios.CancelToken;
      let source = CancelToken.source();
      axios({ method: 'post', url: this.action, data: formData, headers: this.headers, onUploadProgress: onUploadProgress, cancelToken: source.token })
        .then((res) => {
          this.handleSuccess(res, _file);
        })
        .catch((error) => {
          console.log(error)
          if (error.message != 'canceled') {
            this.handleError(error, _file);
          } else {
            this.handleCanel(_file)
          }
        });

      this.reqs[_file.uid] = source;

    },

    handleProgress(e, _file) {

      let percent = e.loaded / e.total * 100;
      _file.percentage = percent || 0;

      this.onProgress(e, _file, this.fileList);

    },
    handleSuccess(res, _file) {
      _file.status = 'finished';
      _file.trueUrl = res.data.data[0];
      if (res.data.id) {
        _file.id = res.data.id;

      }
      this.onSuccess(res, _file, this.fileList);
      _file.showProgress = false;

    },
    handleError(err, _file) {
      _file.status = 'fail';
      _file.showProgress = false;
      //this.fileList.splice(this.fileList.indexOf(_file), 1);

      this.onError(err, _file);
    },
    handleRemove(_file) {
      this.fileList.splice(this.fileList.indexOf(_file), 1);
      this.onRemove(_file, this.fileList);
    },
    handlePreview(_file) {
      if (_file.status === 'finished') {
        this.onPreview(_file);
      }
    },
    handleCanel(_file) {

    },
    handleAbort(_file) {
      if (_file.status != 'finished') {
        this.reqs[_file.uid].cancel('canceled')
        delete this.reqs[_file.uid];
        //const _file = this.getFileFromFileList(file);
        _file.status = 'aborted';
        this.onCancel(_file);
      }
    },
    handleRetry(_file) {
      let rawFile = this.rawFileList[_file.uid];
      this.startUpload(rawFile)
      delete this.rawFileList[_file.uid];
      this.fileList.splice(this.fileList.indexOf(_file), 1);


    },
    clearFiles() {
      this.fileList = [];
    }
  },
  // watch: {
  //   fileList: {
  //     immediate: true,
  //     handler(fileList) {
  //       console.log(fileList)
  //       // this.fileList = fileList.map(item => {
  //       //   item.status = 'finished';
  //       //   item.percentage = 100;
  //       //   item.uid = Date.now() + this.tempIndex++;
  //       //   item.url = item.url;
  //       //   return item;
  //       // });
  //     }
  //   }
  // }
};

</script>
<style lang="scss">
@import '../assets/style/upload.scss'

</style>
