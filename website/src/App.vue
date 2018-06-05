<template>
    <div id="app" :class="$route.name ? 'page-'+$route.name.toLowerCase() : 'index'">
        <site-nav></site-nav>
        <div id="wrap">
            <!-- <site-header></site-header> -->
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive" :key="$route.fullPath"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
            <!-- <site-footer></site-footer> -->
            <!-- <side-bar></side-bar> -->
        </div>
        <toast group="top-center" position="top center" />
        <toast group="top-right" position="top right" />
    </div>
</template>
<script>
// import SiteHeader from './components/header.vue';
// import SiteFooter from './components/footer.vue';
// import SideBar from './components/sidebar.vue'
import { mapGetters } from 'vuex'
import SiteNav from './components/nav.vue'
export default {
    name: 'app',
    data() {
        return {

        }
    },
    components: {
        SiteNav
        // SiteHeader,
        // SiteFooter,
        // SideBar
    },
    // computed: {
    //   ...mapGetters(['siteContent'])
    // },
    // mounted() {
    //   if (!this.siteContent) {
    //     this.$store.dispatch('getAllContent').then(_ => {
    //       this.showLoader = false
    //     }).catch(err => {
    //       this.showLoader = false
    //     })
    //   }
    // }
}
</script>
<style lang="scss">
@import './assets/scss/style.scss';
</style>