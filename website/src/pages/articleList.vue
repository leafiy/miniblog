<template>
  <div class="page-container">
    <loader :show="!list.length"></loader>
    <div class="article-list" v-if="list.length">
      <gmap-map v-if="category=='case' && loadMap" @dragover.prevent :center="center" :zoom="zoom" style="width: 100%; height: 320px" :options="{scrollwheel: scrollwheel,draggable: draggable,zoomControl: zoomControl,styles: styles}">
        <gmap-marker :key="index" v-for="(m, index) in markers" :position="m.position" :clickable="true" :draggable="true" @click="center=m.position" :icon="markerIcon"></gmap-marker>
        <!-- <div>
          <gmap-info-window :key="item.infoText" v-for="item in markers" :content="item.content" :position="item.position" :options="item.options">{{item.infoText}}</gmap-info-window>
        </div> -->
      </gmap-map>
      <h4 class="mb light" v-if="category=='tag'">Articles tagged by: <i>{{$route.params.tag}}</i></h4>
      <article-card @mouseover.native="mouseOver(item)" @mouseleave.native="mouseLeave(item)" :article="item" v-for="item of list" :key="item._id"></article-card>
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
      loadMap: false,
      locationList: [],
      styles: mapStyle,
      markerIcon: markerIcon,
      center: { lat: 39.95, lng: 116.43 },
      markers: [],
      scrollwheel: false,
      draggable: false,
      zoomControl: false,
      list: []
    }
  },
  components: {
    ArticleCard,
    Loader
  },
  activated() {
    this.$nextTick(() => {
      this.category = this.$route.name.toLowerCase()
      if (this.category == 'tag') {
        this.fetchDataByTag()

      } else {
        this.fetchData()

      }
    })
  },
  computed: {
    ...mapGetters(['articleList'])
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
      this.$store.dispatch('getArticleList', { category: this.category, isDraft: false })
    },
    fetchDataByTag() {
      this.$store.dispatch('getArticleByTag', this.$route.params.tag).then(articleList => {
        this.list = articleList
      })
    }
  },
  watch: {
    articleList: function(list) {
      if (this.category !== 'tag') {
        this.list = list[this.category]
        if (this.category == 'case') {
          this.setMap()
        }
      }

    }
  }


}
</script>