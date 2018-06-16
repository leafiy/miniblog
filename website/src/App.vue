<template>
    <div id="app" :class="$route.name ? 'page-'+$route.name.toLowerCase() : 'index'">
        <transition name="zoom" @afterEnter="afterEnter">
            <div id="logo" class="logo" v-if="showLogo">
                <router-link to="/">QIAN.SMILE</router-link>
            </div>
        </transition>
        <transition name="fade">
            <div class="current-project" v-if="currentProject">{{currentProject}}</div>
        </transition>
        <loader :show="!show" style="position: absolute;top:40px;left:40px;"></loader>
        <div id="wrap" v-if="show">
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </div>
        <toast group="top-center" position="top center" />
        <toast group="top-right" position="top right" />
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'app',
    data() {
        return {
            show: false
        }
    },
    computed: {
        ...mapGetters(['showLogo', 'currentProject'])
    },
    methods: {
        afterEnter() {
            this.$store.commit('logoShowed', true)
        }
    },
    mounted() {
        this.$store.dispatch('getArticleList').then(_ => {
            this.show = true
        }).catch(_ => {
            this.show = true
        })
    }

}
</script>
<style lang="scss">
@import './assets/scss/style.scss';
</style>