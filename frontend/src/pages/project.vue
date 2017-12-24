<template>
  <div class="page-container">
    <page-section name="project"></page-section>
    <gmap-map :center="center" :zoom="7" style="width: 500px; height: 300px">
      <gmap-marker :key="index" v-for="(m, index) in markers" :position="m.position" :clickable="true" :draggable="true" @click="center=m.position"></gmap-marker>
    </gmap-map>
    <project-list></project-list>
  </div>
</template>
<script>
import PageSection from '../components/section.vue';
import ProjectList from '../components/projectList.vue';
import config from '../config.js';
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
  load: {
    key: config.googleMapKey,
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
  }
})
export default {
  data() {
    return {
      center: { lat: 10.0, lng: 10.0 },
      markers: [{
        position: { lat: 10.0, lng: 10.0 }
      }, {
        position: { lat: 11.0, lng: 11.0 }
      }]
    }
  },
  components: {
    PageSection,
    ProjectList
  },
  mounted() {
    let el = this.$el.querySelector('#map');


  }
}

</script>
