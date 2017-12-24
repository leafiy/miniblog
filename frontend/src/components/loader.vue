<template>
  <transition name="fade">
    <div class="loading-spinner" v-if="show">
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
  props: {
    show: {
      type: Boolean,
      default: false
    }
  }

}

</script>
<style lang="scss">
@import '../assets/scss/loader.scss';

</style>
