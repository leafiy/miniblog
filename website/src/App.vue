<template>
    <div id="app" :class="$route.name ? 'page-'+$route.name.toLowerCase() : 'index'">
        <div id="wrap">
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive" :key="$route.fullPath"></router-view>
            </keep-alive>
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

        }
    }

}
</script>
<style lang="scss">
@import './assets/scss/style.scss';
</style>