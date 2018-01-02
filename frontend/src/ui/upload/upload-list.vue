<template>
  <ul class="uploader-list">
    <li v-for="file of fileList" :key="file.uid" :class="itemClass(file)">
      <div class="thumb" :style="'background-image:url('+file.url || '/'+file.trueUrl+')'"></div>
      <transition name="fade">
        <player v-if="format(file) === 'audio' && file.status === 'finished'" :showDownload="false" :name="file.name" :file="file.url || '/'+file.trueUrl"></player>
      </transition>
      <div class="file-action">
        <!-- <span class="uploader-list-view" @click="handlePreview(file)" v-if="file.status === 'finished' && format(file) === 'image'">
          <icon name="zoom-in"><span class="hide-on-sm">{{langObj.view}}</span></icon>
        </span> -->
        <span class="uploader-list-remove" v-if="!file.hasOwnProperty('status') || file.status === 'finished' || file.status === 'aborted' || file.status === 'fail'" @click="handleRemove(file)"><icon name="trash"><span class="hide-on-sm">{{langObj.del}}</span></icon>
        </span>
        <span class="uploader-list-cancel" v-if="file.status === 'uploading'" @click="handleAbort(file)"><icon name="cancel"><span class="hide-on-sm">{{langObj.cancel}}</span></icon>
        </span>
        <span class="uploader-list-retry" v-if="file.status === 'aborted' || file.status === 'fail'" @click="handleRetry(file)"><icon name="ccw"><span class="hide-on-sm">{{langObj.retry}}</span></icon>
        </span>
      </div>
      <UIProgress v-if="file.showProgress" :width="progressSize" :height="progressSize" :percent="percentage(file.percentage)" :status="file.status === 'finished' && file.showProgress ? 'success' : 'normal'" :shape="format(file) === 'image' ? 'circle' : ''"></UIProgress>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'UploadList',
  props: {
    fileList: Array,
    langObj: Object,
    fileType: String
  },
  data() {
    return {};
  },
  computed: {
    progressSize() {
      if (this.fileType === 'cover') {
        return 40;
      }
    }
  },
  methods: {

    itemClass(file) {
      return [
        `uploader-list-item`,
        `uploader-file-${file.status}`

      ]
    },
    percentage(percent) {
      return ~~percent
    },
    fileCls(file) {
      return [
        `uploader-list-file`,
        {
          [`uploader-list-file-finish`]: file.status === 'finished',
          [`uploader-list-file-cancel`]: file.status === 'aborted',
          [`uploader-list-file-error`]: file.status === 'fail'
        }
      ];
    },
    // handleClick(file) {
    //   console.log(file)
    //   this.$emit('on-file-click', file);
    // },
    handlePreview(file) {
      this.$emit('on-file-preview', file);
    },
    handleRemove(file) {
      this.$emit('on-file-remove', file);
    },
    handleAbort(file) {
      this.$emit('on-file-abort', file);
    },
    handleRetry(file) {
      this.$emit('on-file-retry', file);
    },
    format(file) {
      const format = file.name.split('.').pop().toLocaleLowerCase() || '';
      let type = 'document';

      if (['gif', 'jpg', 'jpeg', 'png', 'bmp', 'webp'].indexOf(format) > -1) {
        type = 'image';
      }
      if (['mp4', 'm3u8', 'rmvb', 'avi', 'swf', '3gp', 'mkv', 'flv'].indexOf(format) > -1) {
        type = 'video';
      }
      if (['mp3', 'wav', 'wma', 'ogg', 'aac', 'flac'].indexOf(format) > -1) {
        type = 'audio';
      }
      if (['doc', 'txt', 'docx', 'pages', 'epub', 'pdf', 'numbers', 'csv', 'xls', 'xlsx', 'keynote', 'ppt', 'pptx'].indexOf(format) > -1) {
        type = 'document';
      }

      return type;
    }
  },
  // watch: {
  //   file: () => {
  //     console.log(this.file)
  //   }
  // }
};

</script>
