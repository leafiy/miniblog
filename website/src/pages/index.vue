<template>
    <div class="page-container">
        <div class="index-container">
            <transition name="fade">
                <div v-if="show" id="index-line" class="line" ref="line"></div>
            </transition>
            <div class="typer typer-1">
                <span class="blue" ref="typer1"></span>
            </div>
            <transition name="slideLeft">
                <div v-if="show" class="hero">
                    <h2 @click="$router.push('/project/visual_analysis')">
                        <span class="light">The </span>

                        <b>Visual Analysis</b>
                        <span class="light"> of</span><br>

                <b>Urban Experience</b><br>
                <span class="light">Using </span>
                <b>Social Media Data</b></h2>
                    <router-link to="/project/visual_analysis"><small>for more details</small></router-link>
                </div>
            </transition>
            <div class="clearfix"></div>
            <transition name="fadeDown">
                <p class="intro blue" v-if="show">
                    I explore new techniques
                    <br> examine the "virtual expression" of urban experience on social networks
                    <br> improve understanding of how people interact with urban spaces
                    <br> think about the impact of social networks on urban design
                </p>
            </transition>
            <transition name="fadeUp">
                <p class="contact blue" v-if="show">
                    <a href="mailto:qiansmile85@gmail.com">Contact me: qiansmile85@gmail.com</a>
                </p>
            </transition>
        </div>
        <transition :name="transitionName" @afterEnter="afterEnter">
            <router-view class="child-view"></router-view>
        </transition>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { throttle } from 'lodash'
import CanvasComponent from '../components/canvasComponent.vue'
import Typed from 'typed.js'
import api from '../api/index.js'
export default {
    data() {
        return {
            show: false,
            typed: false,
            // routerKey: Date.now(),
            transitionName: '',
            text: 'Hi, this is <b>Dr. Xiao (Smile) Qian</b>^500 <br> an independent <b>Urban Researcher</b>^500 <br> focusing on <b>Urban Experience</b> and <b>Urban Space</b>'
        }
    },
    components: {
        CanvasComponent,
    },
    computed: {
        ...mapGetters(['articleList']),
    },

    methods: {
        afterEnter() {

        },
        typer() {
            let typer1 = new Typed(this.$refs['typer1'], {
                strings: [this.text],
                typeSpeed: 3,
                loop: false,
                onComplete: (self) => {
                    this.show = true
                    this.typed = true
                    this.$store.commit('showLogo', true)
                }
            });
        }
    },
    mounted() {
        if (this.$route.name == 'index') {
            this.typer()


        } else {
            this.$refs['typer1'].innerHtml = this.text
            this.$store.commit('showLogo', true)
            this.transitionName = "slide-in"
        }

    },
    watch: {
        // $route(to, from) {
        //     this.routerKey = Date.now()
        // }
    },
    beforeRouteUpdate(to, from, next) {
        if (to.name == 'index' && !this.typed) {
            this.typer()
        }
        if (to.name == 'index') {
            this.$store.commit('currentProject', '')
        }
        const toDepth = to.meta.level
        const fromDepth = from.meta.level
        this.transitionName = toDepth < fromDepth ? 'slide-out' : 'slide-in'
        next()
    }

}
</script>