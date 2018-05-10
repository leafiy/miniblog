<template>
  <div class="page-container">
    <div class="article-list">
      <loader :show="showLoader"></loader>
      <gmap-map v-if="category=='case' && loadMap" @dragover.prevent :center="center" :zoom="zoom" style="width: 100%; height: 320px" :options="{scrollwheel: scrollwheel,draggable: draggable,zoomControl: zoomControl,styles: styles}">
        <gmap-marker :key="index" v-for="(m, index) in markers" :position="m.position" :clickable="true" :draggable="true" @click="center=m.position" :icon="markerIcon"></gmap-marker>
        <!-- <div>
          <gmap-info-window :key="item.infoText" v-for="item in markers" :content="item.content" :position="item.position" :options="item.options">{{item.infoText}}</gmap-info-window>
        </div> -->
      </gmap-map>
      <h4 class="mb light" v-if="category=='tag'">Articles tagged by: <i>{{$route.params.tag}}</i></h4>
      <article-card @mouseover.native="mouseOver(item)" @mouseleave.native="mouseLeave(item)" :article="item" v-if="list" v-for="item of list" :key="item._id"></article-card>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import ArticleCard from '../components/articleCard.vue'
import Loader from '../components/loader.vue'
import config from '../config.js';
import mapStyle from '../utils/mapStyle.json';
import markerIcon from '../assets/marker.svg'
export default {
  data() {
    return {
      category: '',
      showLoader: true,
      list: null,
      loadMap: false,
      locationList: [],
      styles: mapStyle,
      markerIcon: markerIcon,
      center: { lat: 39.95, lng: 116.43 },
      markers: [],
      scrollwheel: false,
      draggable: false,
      zoomControl: false
    }
  },
  components: {
    ArticleCard,
    Loader
  },
  activated() {
    this.category = this.$route.name.toLowerCase()
    this.fetchData()
  },
  computed: {
    ...mapGetters(['articleList']),

  },
  methods: {
    mouseOver(article) {
      if (article.category == 'case') {
        this.center = {
          lat: article.location.lat,
          lng: article.location.lng
        }
        this.zoom = 10
      }
    },
    mouseLeave(article) {
      if (article.category == 'case') {
        this.zoom = 5
      }
    },
    setMap() {
      for (let article of this.list) {
        this.markers.push({
          position: {
            lat: article.location.lat,
            lng: article.location.lng
          },
          icon: this.markerIcon,
          content: `<div class="infoWindow">
                  <div class="infoWindow-title"><a href="article/${article.title}">${article.title}</a></div>
                  <div class="infoWindow-intro">${article.intro}</div>
                </div>`

        })
      }
      this.center = {
        lat: this.markers[0].position.lat,
        lng: this.markers[0].position.lng
      }
      this.zoom = 5
      this.loadMap = true


    },
    mapIdel() {
      if (this.mapRendered) {
        return
      }
      this.mapRendered = true
    },
    fetchData() {
      if (this.category !== 'tag') {
        if (this.articleList && this.articleList[this.category] && this.articleList[this.category].length) {
          this.list = this.articleList[this.category].filter(a => !a.isDraft)
          this.showLoader = false
          if (this.category == 'case') {
            this.setMap()
          }
        } else {
          this.$store.dispatch('getArticleList', this.category).then(_ => {
            this.showLoader = false
            this.list = this.articleList[this.category].filter(a => !a.isDraft)
            if (this.category == 'case') {
              this.setMap()
            }
          }).catch(err => {
            this.showLoader = false
          })
        }
      } else {
        this.$store.dispatch('getArticleByTag', this.$route.params.tag).then(articleList => {
          this.list = articleList
          this.showLoader = false
        }).catch(err => {
          this.showLoader = false
        })
      }

    }
  }


}
</script>