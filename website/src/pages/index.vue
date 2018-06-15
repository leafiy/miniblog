<template>
    <div class="index-container">
        <transition name="zoom">
            <div class="logo" v-if="show">QIAN.SMILE</div>
        </transition>
        <transition name="fade">
            <div v-if="show" class="line" ref="line"></div>
        </transition>
        <div class="typer typer-1">
            <span class="blue" ref="typer1"></span>
        </div>
        <!--         <transition name="fade">
            <p v-if="show" class="m30"><i><b>The latest project I am doing</b></i></p>
        </transition> -->
        <transition name="fadeLeft">
            <div v-if="show" class="hero">
                <h2><span class="light">The </span> <b>Visual Analysis</b> <span class="light"> of</span><br>
                <b>Urban Experience</b><br>
                <span class="light">Using </span> <b>Social Media Data</b></h2>
                <router-link to="projects/visual_analysis">more details</router-link>
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
</template>
<script>
import { mapGetters } from 'vuex'
import { throttle } from 'lodash'
import CanvasComponent from '../components/canvasComponent.vue'
import Typed from 'typed.js'
export default {
    data() {
        return {
            show: false,
            typed: false
        }
    },
    components: {
        CanvasComponent,
    },
    computed: {
        ...mapGetters(['articleList']),


    },
    activated() {
        if (!this.typed) {
            let typer1 = new Typed(this.$refs['typer1'], {
                strings: ['Hi, this is <b>Dr. Xiao (Smile) Qian</b>^500 <br> an independent <b>Urban Researcher</b>^500 <br> focusing on <b>Urban Experience</b> and <b>Urban Space</b>'],
                typeSpeed: 30,
                loop: false,
                onComplete: (self) => {
                    this.show = true
                    this.typed = true
                },
                // preStringTyped: function(pos, self) { prettyLog('preStringTyped ' + pos + ' ' + self); },
                // onStringTyped: function(pos, self) { prettyLog('onStringTyped ' + pos + ' ' + self) },
                // onLastStringBackspaced: function(self) { prettyLog('onLastStringBackspaced ' + self) },
                // onTypingPaused: function(pos, self) { prettyLog('onTypingPaused ' + pos + ' ' + self) },
                // onTypingResumed: function(pos, self) { prettyLog('onTypingResumed ' + pos + ' ' + self) },
                // onReset: function(self) { prettyLog('onReset ' + self) },
                // onStop: function(pos, self) { prettyLog('onStop ' + pos + ' ' + self) },
                // onStart: function(pos, self) { prettyLog('onStart ' + pos + ' ' + self) },
                // onDestroy: function(self) { prettyLog('onDestroy ' + self) }
            });
        }


    },
    methods: {


    }

}
</script>