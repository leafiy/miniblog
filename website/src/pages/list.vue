<template>
    <div class="list-container" :style="styles">
        <div class="list-tab" :style="{width:tabWidth+'px',left:-tabWidth+'px'}">
            <transition-group name="fadeRight" tag="div">
                <div class="list-tab-item" :class="'tab-' + item.tag" v-for="item of tabs" :key="item.name" @click="currentTag = item.tag">{{item.name}}</div>
            </transition-group>
        </div>
        <transition name="fade" @afterEnter="">
            <div class="list-content" v-if="showContent" :class="'content-'+currentTag">
                <div class="desp" v-html="desp[currentTag]"></div>
                <button @click="tabs.push({tag:'asdf',name:'asdfasdf'})">aaaa</button>
            </div>
        </transition>
        <transition :name="transitionName" @beforeEnter="afterArticleEnter">
            <router-view class="child-view"></router-view>
        </transition>

    </div>
</template>
<script>
import api from '../api/index.js'
import { mapGetters } from 'vuex'
import ArticleCard from '../components/articleCard.vue'
export default {
    data() {
        return {
            transitionName: '',
            tabWidth: '',
            showTabs: false,
            showContent: false,
            tabs: [],
            list: {},
            currentTag: 'visual_analysis',
            desp: {
                'visual_analysis': `
<p>
<b>Visual Analysis</b> is the exploration and analysis of a large collection of visual images - including <b>digital photos</b> & <b>videos</b>. It is an effective way to understand and contextualise pictures, relying on the quantitative description and qualitative interpretation of visual content.</p>
              <p>A new method called <b>“People-generated Image Analysis”</b> is then developed to overcome researcher biases and build a higher level of objectivity in <b>people-oriented researches</b>. The method comprises three analytical steps: perform visual content analysis with Cultural Analytics; identify the subjects of images; make a semantic interpretation of the subjects with Content Analysis techniques.</p>

              `,
                'urban_experience': `
<p>
<b>Urban Experience</b> is derived from interactions between people and the urban environment involving considerable empirical knowledge concerning the realities of everyday life. In order to make sense of this knowledge, a <b>“Theme-Interaction-Emotion”</b> model is proposed here, which simulates how people experience the city at three interrelated levels. The engaging and varied urban experience can thus be translated into three interrelated descriptions.
</p>
<p>
This analytical model can help the researcher to concretise the <b>Indefinable Impressions</b> derived from urban life and thus provide an approach to the intrinsic relationship between human activities and <b>Urban Spaces</b>.
</p>
              `,
                'social_media_data': `
<p>
Sharing photos & videos on <b>Social Networks</b> is no longer just a way of documenting self-expression or maintaining communication with family and friends but also aims to fulfil the natural desires for exploring togetherness in an unknown virtual world. The <b>Urban Experience</b> that comes from everyday urban life can thus be captured, shared, and interpreted through various social media applications, thereby mixing together spatial experiences with mental representations. </p>
`
            }
        }
    },
    components: {
        ArticleCard
    },
    computed: {
        ...mapGetters(['showTab', 'logoShowed', 'articleList']),
        styles() {
            if (!this.logoShowed) {
                return { display: 'none' }
            } else {

                return this.setPosition()
            }
        }
    },
    methods: {
        setPosition() {
            let p = document.getElementById('logo').getBoundingClientRect()
            let styles = {
                left: `${p.x + p.width}px`,
                width: `calc(100% - ${p.left+p.width}px)`,
                top: `${p.y + p.height + 8}px`,
                minHeight: `calc(100% - ${p.y + p.height}px)`
            }
            this.tabWidth = p.width
            this.showContent = true
            this.$store.commit('currentProject', 'The Visual Analysis of Urban Experience Using Social Media Data')
            return styles
        },
        contentShowed() {
            let tabs = [{
                    name: 'Visual Analysis',
                    tag: 'visual_analysis'
                },
                {
                    name: 'Urban Experience',
                    tag: 'urban_experience'
                },
                {
                    name: 'Social Media Data',
                    tag: 'social_media_data'
                }

            ]
            let t = 100
            tabs.map((tab, index) => {
                setTimeout(() => {
                    this.tabs.push(tab)
                }, t * (index + 1))
            })

            this.renderArticleList()
        },
        afterArticleEnter() {

        },
        renderArticleList() {
            this.tabs.map(item => {
                this.list[item.tag] = this.articleList.filter(article => article.project == this.$route.params.projectName && article.category == item.tag)
            })
        }
    },
    mounted() {
        console.log('mounted')
        this.showTabs = true;
        this.$nextTick(() => {
            this.contentShowed()
        })
    },
    beforeRouteUpdate(to, from, next) {
        const toDepth = to.meta.level
        const fromDepth = from.meta.level
        this.transitionName = toDepth < fromDepth ? 'slide-out' : 'slide-in'
        next()

    }

}
</script>