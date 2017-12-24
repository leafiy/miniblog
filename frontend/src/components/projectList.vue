<template>

  <div class="project-list">project list</div>
</template>
<script>
import Loader from './loader.vue';
import api from '../api/index.js';

export default {
  data() {
    return {
      showLoader: true,
      projectList: [],
    }
  },
  computed: {

  },
  components: {
    Loader
  },
  mounted() {

    api.getContent('projectList').then(response => {
      console.log(response.data)
      this.showLoader = false;


    }).catch(error => {
      this.showLoader = false;
      console.log(error)
    })
  }


}

</script>
