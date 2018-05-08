<template>
  <div class="page-container">
    <h1 class="logo">
    <router-link to="/">Qian<span class="color-text">.</span>Smile</router-link>
  </h1>
    <div class="hero hero-index">
      <span class="title">What I am doing</span>
      <h2></h2>
    </div>
    <!-- <page-section name="about"></page-section>
    <page-section name="publication"></page-section> -->
  </div>
</template>
<script>
import PageSection from '../components/section.vue';
export default {
  data() {
    return {

    }
  },
  components: {
    PageSection
  }
}
</script>