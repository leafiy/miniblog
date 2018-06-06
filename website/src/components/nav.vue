<template>
    <div class="site-header">
        <div class="page-container" style="padding:0;min-height: 0">
            <nav class="site-nav" v-if="$route.name!=='Article'">
                <router-link to="/concepts">Concepts</router-link>
                <router-link to="/methods">Methods</router-link>
                <router-link to="/cases">Case Studies</router-link>
                <router-link to="/admin" v-if="authInfo">Admin</router-link>
            </nav>
            <hero ref="hero" :text="text" :size="size">
            </hero>
            <div class="clearfix"></div>
        </div>
        <div class="line line-dashed">
            <transition name="fade">
                <span v-if="show && $route.path == '/'" class="prefix" :style="{left:linePrefixLeft + 'px'}">2013</span>
            </transition>
            <transition name="fade"><span v-if="show &&  $route.path == '/'" class="suffix" :style="{left:lineSuffixLeft + 'px'}">2017</span></transition>
        </div>
        <canvas-component v-if="showOval && $route.path != '/'" :fill="fill" id="header-oval" :height="250" :width="250" shape="circle" :jelly="true">
        </canvas-component>
        <div class="label" v-if="$route.path != '/' "><span class="blue strong"><i><router-link to="/">{{label}}</router-link></i></span></div>
        <div class="clearfix"></div>
    </div>
</template>
<script>
import Hero from './hero.vue'
import CanvasComponent from './canvasComponent.vue'
import { throttle } from 'lodash'
import { mapGetters } from 'vuex'
import ResizeSensor from 'resize-sensor'
export default {
    data() {
        return {
            show: false,
            lineVerticalTop: '',
            linePrefixLeft: '',
            lineSuffixLeft: '',
            fill: '#d0e6f1',
            showOval: false
        }
    },
    components: {
        Hero,
        CanvasComponent
    },
    computed: {
        ...mapGetters(['authInfo']),
        label() {
            if (this.$route.name == 'Article') {
                return this.transformCamel(this.$route.params.category)
            } else {
                return 'QIAN.SMILE'
            }
        },
        text() {
            if (this.$route.path == '/') {
                return 'QIAN.SMILE'
            }
            if (this.$route.name == 'Tag') {
                return this.transformCamel(this.$route.params.tag)


            } else if (this.$route.name == 'Article') {
                return 'QIAN.SMILE'
            } else {
                return this.transformCamel(this.$route.name)
            }
        },
        size() {
            if (this.$route.path == '/') {
                return 110
            } else {
                return 50
            }
        }
    },
    watch: {
        $route(to, from) {
            if (to.name == 'concepts') {
                this.fill = '#BDD0E7'
            }
            if (to.name == 'methods') {
                this.fill = '#F7ECDA'
            }
            if (to.name == 'caseStudies') {
                this.fill = '#C1E2E8'
            }
            if (to.name != 'Index' || to.name != 'Article') {
                this.showOval = true
            }

        }
    },
    mounted() {
        window.onresize = throttle(this.setPosition, 100)
        setTimeout(() => {
            this.show = true
            this.setPosition()
        }, 500)
        let rs = new ResizeSensor(this.$el.querySelector('.hero'), () => {
            this.setPosition()
        })

    },
    methods: {
        setPosition() {
            let p = this.$el.querySelector('.hero h1').getBoundingClientRect()
            this.linePrefixLeft = p.left - 80
            this.lineSuffixLeft = p.left + p.width - 40
        },
        transformCamel(str) {
            return str.replace(/([A-Z])/g, ' $1').replace(/^./, function(str) { return str.toUpperCase(); })
        }
    }


}
</script>