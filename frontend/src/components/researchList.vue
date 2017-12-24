<template>

  <div class="research-list">research list</div>
</template>
<script>
import Loader from './loader.vue';
import api from '../api/index.js';

export default {
  data() {
    return {
      showLoader: true,
      researchList: [],
    }
  },
  computed: {

  },
  components: {
    Loader
  },
  mounted() {

    api.getContent('researchList').then(response => {
      console.log(response.data)
      this.showLoader = false;


    }).catch(error => {
      this.showLoader = false;
      console.log(error)
    })
  }


}

</script>
