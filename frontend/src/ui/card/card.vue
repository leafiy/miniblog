<template>
  <div class="card" :class="classes">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'Card',
  props: {
    shadow: {
      type: Boolean,
      default: true
    },
    shadowHover: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      required: true
    }
  },
  data() {
    return {

    };
  },
  computed: {
    classes() {
      return [{
          'card-shadow': this.shadow,
          'card-shadow-hover': this.shadowHover,

        },
        `card-${this.type}`
      ]
    }
  }

};

</script>
<style lang="scss">
@import '../assets/style/card.scss'

</style>
