<template>
  <div id="app">
    <site-header></site-header>
    <div id="wrap">
      <router-view :key="$route.fullPath"></router-view>
    </div>
    <site-footer></site-footer>
    <toast group="top-center" position="top center" />
    <toast group="top-right" position="top right" />
    <modal></modal>
  </div>
</template>
<script>
import SiteHeader from './components/header.vue';
import SiteFooter from './components/footer.vue';

export default {
  name: 'app',
  components: {
    SiteHeader,
    SiteFooter
  }
}
</script>
<style lang="scss">
@import './assets/scss/style.scss';
</style>