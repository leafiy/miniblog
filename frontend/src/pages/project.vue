<template>
  <div class="page-container">
    <page-section name="project"></page-section>
    <project-list @loaded="dataLoaded" class="mb20" @leave-project="leaveProject" @foucs-project="foucsProject"></project-list>
    <div class="map mb20">
      <transition name="fade">
        <gmap-map :draggable="false" @idle="mapIdel" v-if="loadMap" :center="center" :zoom="zoom" style="width: 100%; height: 400px" :options="{styles: styles}">
          <gmap-marker :key="item.lat" v-for="item of markers" :position="item.position" :clickable="true" :draggable="false" @click="center=item.position" :icon="item.icon"></gmap-marker>
          <gmap-info-window v-show="mapRendered" :key="item.infoText" v-for="item in markers" :content="item.content" :position="item.position" :options="item.options">{{item.infoText}}</gmap-info-window>
        </gmap-map>
      </transition>
      <loader v-if="!loadMap"></loader>
    </div>
  </div>
</template>
<script>
import Loader from '../components/loader.vue';
import PageSection from '../components/section.vue';
import ProjectList from '../components/projectList.vue';
import config from '../config.js';
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps2'
import mapStyle from '../utils/mapStyle.json';
Vue.use(VueGoogleMaps, {
  load: {
    key: config.googleMapKey,
    libraries: 'places,drawing',
    language: 'en',
    draggable: false

  }
})

export default {
  data() {
    return {
      mapRendered: false,
      loadMap: false,
      locationList: [],
      styles: mapStyle,
      center: { lat: 39.95, lng: 116.43 },
      markers: []
    }
  },
  components: {
    PageSection,
    ProjectList,
    Loader
  },
  methods: {
    leaveProject(item) {

    },
    foucsProject(item) {
      this.zoom = 12;
      this.center = {
        lat: item.location.lat,
        lng: item.location.lng
      }
      this.markers.splice(0, 1, {
        position: {
          lat: item.location.lat,
          lng: item.location.lng
        },
        icon: location.origin + '/static/marker.png',
        content: `<div class="infoWindow">
                  <div class="infoWindow-title"><a href="article/${item.shortName}">${item.title}</a></div>
                  <div class="infoWindow-intro">${item.intro}</div>
                </div>`
      })
    },
    mapIdel() {
      if (this.mapRendered) {
        return
      }
      this.mapRendered = true
    },
    dataLoaded(arr) {
      if (arr.length) {
        this.locationList = arr;
        this.setMap()
      }

    },
    setMap() {
      this.center = {
        lat: this.locationList[0].location.lat,
        lng: this.locationList[0].location.lng
      }
      this.zoom = 9
      this.markers = [{
        position: {
          lat: this.locationList[0].location.lat,
          lng: this.locationList[0].location.lng
        },
        icon: location.origin + '/static/marker.png',
        content: `<div class="infoWindow">
                  <div class="infoWindow-title"><a href="article/${this.locationList[0].shortName}">${this.locationList[0].title}</a></div>
                  <div class="infoWindow-intro">${this.locationList[0].intro}</div>
                </div>`
      }]

      this.loadMap = true
    }
  }
}

</script>
