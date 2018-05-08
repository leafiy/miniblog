<template>
  <div class="el-input">
    <gmap-autocomplete :value="locationName" placeholder="Enter place's real location name" @place_changed="setPlace" classes="el-input__inner">
    </gmap-autocomplete>

  </div>
</template>
<script>
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps2'
import config from '../../config.js';
Vue.use(VueGoogleMaps, {
  load: {
    key: config[process.env.NODE_ENV].googleMapKey,
    libraries: 'places',
    language: 'en'
  }
})
export default {
  data() {
    return {
      _location: {}
    }
  },
  props: {
    location: Object
  },
  mounted() {
    if (this.location) {
      this._location = this.location
    }
  },
  computed: {
    locationName() {
      if (this.location.hasOwnProperty('formatted_address')) {
        return this.location.formatted_address
      } else {
        return ''
      }
    }
  },
  methods: {
    setPlace(place) {
      if (!place.geometry) {
        return this.$Toast({
          group: 'top-center',
          text: `no place named '${place.name}'`,
          type: 'warning'
        });
      }
      this._location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        address: place.address,
        formatted_address: place.formatted_address
      };
      this.$emit('changeLocation', this._location)
    }
  }
}

</script>
