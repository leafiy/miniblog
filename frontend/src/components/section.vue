<template>
  <section>
    <h2 class="section-title">
          <loader :show="showLoader"></loader>

        {{showName}} <span>_</span>
      </h2>
    <transition name="fade">
      <div class="section-desp" v-if="content">{{content}}</div>
    </transition>
    <publication-list v-if="name === 'publication'"></publication-list>
  </section>
</template>
<script>
import Loader from './loader.vue';
import api from '../api/index.js';
import capitalize from '../utils/capitalize.js';
import PublicationList from './publicationList.vue';
export default {
  data() {
    return {
      showLoader: true,
      content: ''
    }
  },
  computed: {
    showName() {
      return capitalize(this.name);
    }
  },
  components: {
    Loader,
    PublicationList
  },
  mounted() {

    api.getContent(this.name).then(response => {
      this.showLoader = false;

      if (this.name === 'about' || this.name === 'research') {
        this.content = response.data.content.content;
      }

    }).catch(error => {
      this.showLoader = false;
      console.log(error)
    })
  },
  props: {
    name: {
      type: String,
      default: 'please assign a name'
    }
  }

}

</script>
