<template>
  <div class="page-container">
    <page-section name="about"></page-section>
    <carousel></carousel>
    <page-section name="publication"></page-section>
  </div>
</template>
<script>
import PageSection from '../components/section.vue';
import Carousel from '../components/carousel.vue';
export default {
  data() {
    return {

    }
  },
  components: {
    PageSection,
    Carousel
  }
}

</script>
