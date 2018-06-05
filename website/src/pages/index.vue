<template>
    <div class="page-container">
        <canvas-component id="yellow-light" :height="750" :width="750" shape="circle" fill="#f8edd9" :jelly="true"></canvas-component>
        <div class="line line-vertical line-solid line-arrow-down">
        </div>
        <div class="content" :style="{marginTop:contentTop + 'px'}">
            <div class="content-item" @mouseover="currentDesp=0">
                <p class="blue">Image Text Geo-Location</p>
                <div class="title">
                    <span><span class="light font-light">The</span> Visual Analysis <span class="light font-light">of</span></span>
                </div>
            </div>
            <div class="content-item" @mouseover="currentDesp=1">
                <p class="green">Beijing Shanghai</p>
                <div class="title"><span>Urban Experience</span></div>
            </div>
            <div class="content-item" @mouseover="currentDesp=2">
                <p class="brown">Instagram Flickr</p>
                <div class="title"><span><span class="light font-light">Using</span> Social Media Data</span>
                </div>
            </div>
        </div>
        <div class="clearfix"></div>
        <div class="index-desp" :class="despClass">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" class="pie">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M60 120C26.8628 120 0 93.1371 0 60C0 26.8629 26.8628 0 60 0C93.1372 0 120 26.8629 120 60H60V120Z" fill="#FEED49" />
            </svg>
            <h2 v-html="desp[currentDesp].title"></h2>
            <p v-html="desp[currentDesp].content"></p>
            <p class="m20">
              <router-link :to="'/tag/'+desp[currentDesp].tag">More details</router-link>
            </p>
        </div>
        <split color="blue" type="dotted"></split>
        <div class="clearfix"></div>
        <div class="about-me">
            <canvas-component id="about-me-oval1" :height="180" :width="180" shape="circle" fill="#feed49" :jelly="true"></canvas-component>
            <canvas-component id="about-me-oval2" :height="120" :width="120" shape="circle" fill="#4F9BA8" :jelly="true"></canvas-component>
            <div class="about-me-photo"></div>
            <p style="margin-bottom:62px">Hi, this is <span class="strong">Dr. Xiao (Smile) Qian</span>, an independent <span class="strong">Urban Researcher</span>
                <br> focusing on <span class="strong">Urban Experience</span> & <span class="strong">Urban Space</span>.</p>
            <p style="margin-bottom:22px">Explore <span class="strong">New Techniques</span> that will improve
                <br> the capacity to understand how people
                <br> perceive, experience and negotiate their
                <br> relationships with urban spaces.</p>
            <p>Think about the potential
                <br> impact of social networks
                <br> on <span class="strong"><i>Urban Design</i></span>. </p>
        </div>
        <div class="clearfix"></div>
        <div class="about-me-oval">
            <canvas-component id="about-me-oval3" :height="500" :width="500" shape="circle" fill="#1A237E" :jelly="true"></canvas-component>
            <p>Conducted a series of experimental studies on
                <br> the <span class="strong">"virtual expression"</span> of <span class="strong">urban experience</span>
                <br> on <span class="strong">social networks</span>.
                <br> Will extend these studies to include more
                <br> emphasis on the real urban experience.</p>
            <hero ref="hero" class="hero2" text="QIAN.SMILE" :size="90"></hero>
            <div class="line line-bottom line-arrow-left">
                <span class="prefix">Contact me: <a href="mailto:qian.smile85@gmail.com">qian.smile85@gmail.com</a></span>
            </div>
            <div class="white-cover"></div>
        </div>
        <div class="clearfix"></div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { throttle } from 'lodash'
import Hero from '../components/hero.vue'
import CanvasComponent from '../components/canvasComponent.vue'
import Split from '../components/split.vue'
export default {
    data() {
        return {
            linePrefixLeft: '',
            lineSuffixLeft: '',
            lineVerticalTop: '',
            lineVerticalHeight: '',
            contentTop: '',
            aboutMeLeft: '',
            currentDesp: 0,
            desp: [{
                    title: 'VISUAL ANALUSIS',
                    content: `<span class="strong">Visual Analysis</span> is the exploration and analysis of a large collection of visual images - including <span class="black">digital photos & videos</span>. It is an effective way to understand and contextualise pictures, relying on the quantitative description and qualitative interpretation of visual content. <br />
                      A new method called <span class="strong">“People-generated Image Analysis”</span> is then developed to overcome researcher biases and build a higher level of objectivity in <span class="black">people-oriented researches</span>. The method comprises three analytical steps: perform visual content analysis with Cultural Analytics; identify the subjects of images; make a semantic interpretation of the subjects with Content Analysis techniques.
                    `,
                    tag:'visual analysis'
                },
                {
                    title: 'URBAN EXPERIENCE',
                    content: `<span class="strong">Urban Experience</span> is derived from interactions between people and the urban environment involving considerable empirical knowledge concerning the realities of everyday life. In order to make sense of this knowledge, a <span class="strong">“Theme-Interaction-Emotion”</span> model is proposed here, which simulates how people experience the city at three interrelated levels. The engaging and varied urban experience can thus be translated into three interrelated descriptions. <br />
                    This analytical model can help the researcher to concretise the <span class="strong">Indefinable Impressions</span> derived from urban life and thus provide an approach to the intrinsic relationship between human activities and <span class="strong">Urban Spaces</span>.
                    `,
                    tag:'urban experience'
                },
                {
                    title: 'SOCIAL MEDIA DATA',
                    content: `Sharing photos & videos on <span class="strong">Social Networks</span> is no longer just a way of documenting self-expression or maintaining communication with family and friends but also aims to fulfil the natural desires for exploring togetherness in an unknown virtual world. The <span class="strong">Urban Experience</span> that comes from everyday urban life can thus be captured, shared, and interpreted through various social media applications, thereby mixing together spatial experiences with mental representations.
                    `,
                    tag:'social media data'
                }

            ]
        }
    },
    components: {
        Hero,
        CanvasComponent,
        Split
    },
    computed: {
        ...mapGetters(['articleList']),
        despClass() {
            if (this.currentDesp == 0) {
                return 'blue'
            }
            if (this.currentDesp == 1) {
                return 'green'
            }
            if (this.currentDesp == 2) {
                return 'brown'
            }
        }

    },
    activated() {
        // this.setPosition()
        // window.onresize = throttle(this.setPosition, 500)

    },
    methods: {
        setPosition() {
            // let p = this.$el.querySelector('.hero h1').getBoundingClientRect()
            // this.linePrefixLeft = p.left - 100
            // this.lineSuffixLeft = p.right - this.$el.querySelector('.line-dashed .suffix').offsetWidth - 46
            // let bottom = this.$el.querySelector('.line-dashed').getBoundingClientRect().bottom
            // this.lineVerticalTop = bottom
            // this.lineVerticalHeight = `calc(100% - ${bottom + 100}px)`
            // this.aboutMeLeft = p.left
        }
    }

}
</script>