<template>
  <div class="background" :style="styles">
    <transition name="fade">
      <div class="background-image" v-if="!loading" :style="backgroundStyle"></div>
    </transition>
    <div class="background-cover" v-if="cover" :style="coverStyles"></div>
    <transition name="fade">
      <icon name="spinner" class="spin" v-if="loading"></icon>
    </transition>
  </div>
</template>
<script>
import imgLoader from '../util/imgLoader.js'

export default {
  name: 'Background',
  props: {
    src: String,
    type: {
      type: String,
      default: 'cover'
    },
    width: {
      type: [Number, String],
      default: '100%'
    },
    height: {
      type: [Number, String],
      default: '100%'
    },
    cover: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: true,
      failed: false
    };
  },
  mounted() {
    imgLoader(this.src).then(url => {
      this.loading = false;
      this.$emit('loadFinished')
    }).catch(err => {
      this.loading = false;
      this.failed = true;
      this.$emit('loadFinished')
    })
  },
  computed: {
    styles() {
      return {
        'width': typeof this.width == 'number' ? `${this.width}px` : `${this.width}`,
        'height': typeof this.height == 'number' ? `${this.height}px` : `${this.height}`,

      }
    },
    backgroundStyle() {
      return {
        backgroundImage: `url(${this.src})`
      }
    },
    coverStyles() {
      if (!this.loading && !this.failed) {
        return {
          backgroundColor: `rgba(0,0,0,.2)`,
          backgroundImage: `url()`
        }
      }
    }

  }
};

</script>
<style lang="scss">
@import '../assets/style/background.scss';

</style>
