<template>
  <transition name="fade">
    <div class="publication-list" v-if="publicationList">
      <div class="publication" v-for="pub of publicationList">
        <h3 class="title hover-line font-exo"><a :href="pub.link" target="_blank">{{pub.title}}</a></h3>
        <p class="muted">{{pub.date}}</p>
      </div>
    </div>
  </transition>
</template>
<script>
import Loader from './loader.vue';
import api from '../api/index.js';
export default {
  data() {
    return {
      showLoader: true,
      publicationList: [],
    }
  },
  components: {
    Loader
  },
  mounted() {

    api.getList('publication').then(response => {
      this.showLoader = false;

      this.publicationList = response.data.articleList;


    }).catch(error => {
      this.showLoader = false;
      console.log(error)
    })

  }

}

</script>
