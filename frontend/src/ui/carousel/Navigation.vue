<template>
  <div class="VueCarousel-navigation">
    <a href="#" class="VueCarousel-navigation-button VueCarousel-navigation-prev" v-on:click.prevent="triggerPageAdvance('backward')" v-bind:class="{ 'VueCarousel-navigation--disabled': !canAdvanceBackward }">
      <icon name="angle-left"></icon>
    </a>
    <a href="#" class="VueCarousel-navigation-button VueCarousel-navigation-next" v-on:click.prevent="triggerPageAdvance()" v-bind:class="{ 'VueCarousel-navigation--disabled': !canAdvanceForward }">
      <icon name="angle-right"></icon>
    </a>
  </div>
</template>
<script>
export default {
  name: "navigation",
  data() {
    return {
      parentContainer: this.$parent,
    }
  },
  computed: {
    canAdvanceForward() {
      return this.parentContainer.canAdvanceForward || false
    },
    canAdvanceBackward() {
      return this.parentContainer.canAdvanceBackward || false
    },
  },
  methods: {
    triggerPageAdvance(direction) {
      if (direction) {
        this.$parent.advancePage(direction)
      } else {
        this.$parent.advancePage()
      }
    },
  },
}

</script>
<style scoped>
.VueCarousel-navigation-button {
  position: absolute;
  top: -50px;
  right: 0;
  font-size: 32px;
}

.VueCarousel-navigation-next {

}

.VueCarousel-navigation-prev {
  transform: translateX(-30px);
}

.VueCarousel-navigation--disabled {
  opacity: 0.5;
  cursor: default;
}

</style>
