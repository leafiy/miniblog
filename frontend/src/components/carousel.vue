<template>
  <div class="carousel">
    <carousel ref="carousel" :autoSlideWidth="true" :perPage="1" :scrollPerPage="false" :navigationEnabled="false" :showPagination="false" :extendWrapper="false">
      <slide>
        <background height="300px" cover src="../static/PlaceMarketing.jpg">
        </background>
      </slide>
      <slide>
        <background height="300px" cover src="../static/UrbanDesign.jpg"></background>
      </slide>
      <slide>
        <background height="300px" cover src="../static/UrbanImageAnalysis.jpg"></background>
      </slide>
    </carousel>
    <div class="carousel-indicator">
      <span @mouseover="change(0)">Urban Design</span>
      <span @mouseover="change(1)">Place Marketing</span>
      <span @mouseover="change(2)">Urban Image Analysis</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgLoaded: false
    }
  },
  components: {

  },
  methods: {
    loaded() {
      this.imgLoaded = true;

    },
    change(index) {

      this.$refs.carousel.goToPage(index)
    },

  }


}

</script>
