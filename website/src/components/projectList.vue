<template>
  <div class="project-list" v-if="projectList">
    <ul>
      <li v-for="item of projectList" :key="item._id" @mouseleave="$emit('leave-project',item)" @click="$emit('foucs-project',item)">
        <popover-trigger trigger="mouseover" type="tooltip" :offset="5">
          <span slot="trigger">{{item.title}}</span>
          <div slot="menu">
            {{item.location.formatted_address}}
          </div>
        </popover-trigger>
      </li>
    </ul>
  </div>
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

    api.getList('project').then(response => {

      this.projectList = response.data.articleList;
      this.$emit('loaded', this.projectList)
      this.showLoader = false;


    }).catch(error => {
      this.showLoader = false;
      console.log(error)
    })
  }


}

</script>
