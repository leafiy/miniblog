<template>
  <transition name="fade">
    <div class="loading-spinner" :class="classes" v-if="show">
      <div class="rect1"></div>
      <div class="rect2"></div>
      <div class="rect3"></div>
    </div>
  </transition>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  name: 'loader',
  props: {
    center: Boolean,
    show: Boolean
  },
  computed: {
    classes() {

      return this.center ? 'loading-center' : ''
    }
  }

}
</script>
<style lang="scss">
@import '../assets/style/loader.scss';
</style>