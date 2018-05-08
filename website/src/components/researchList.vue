<template>
  <div class="research-list">
    <loader :show="showLoader" v-if="!researchList.length"></loader>
    <div class="research-article" v-else v-for="item of researchList">
      <div class="date">
        <p class="muted">{{item.dateObj.month}} {{item.dateObj.day}}</p>
        <p class="muted">{{item.dateObj.year}}</p>
      </div>
      <div class="content">
        <h3 class="title hover-line mb20"><router-link :to="'article/'+ item.shortName">{{item.title}}</router-link></h3>
        <p v-if="item.intro">{{item.intro}}</p>
        <background width="100%" height="260px" v-if="item.fileList[0]" :src="item.fileList[0].url"></background>
      </div>
    </div>
  </div>
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

    api.getList('research').then(response => {

      this.showLoader = false;
      let researchList = response.data.articleList;
      for (let item of researchList) {
        let date = new Date(item.created)
        item.dateObj = {
          year: date.getFullYear(),
          month: date.toLocaleString('en', { month: "short" }),
          day: date.getDate()
        }
      }
      this.researchList = researchList

    }).catch(error => {
      this.showLoader = false;
      console.log(error)
    })
  }


}

</script>
