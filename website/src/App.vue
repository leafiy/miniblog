<template>
  <div id="app">
    <site-header></site-header>
    <loader :show="showLoader" center></loader>
    <div id="wrap" :class="'page-'+$route.name.toLowerCase()">
      <template v-if="!showLoader">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive" :key="$route.fullPath"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </template>
    </div>
    <site-footer></site-footer>
    <toast group="top-center" position="top center" />
    <toast group="top-right" position="top right" />
  </div>
</template>
<script>
import SiteHeader from './components/header.vue';
import SiteFooter from './components/footer.vue';
import { mapGetters } from 'vuex'
import Loader from './components/loader.vue';

export default {
  name: 'app',
  data() {
    return {
      showLoader: true
    }
  },
  components: {
    SiteHeader,
    SiteFooter,
    Loader
  },
  computed: {
    ...mapGetters(['siteContent'])
  },
  mounted() {
    if (!this.siteContent) {
      this.$store.dispatch('getAllContent').then(_ => {
        this.showLoader = false
      }).catch(err => {
        this.showLoader = false
      })
    }
  }
}
</script>
<style lang="scss">
@import './assets/scss/style.scss';
</style>