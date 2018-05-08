<template>
  <heading :tag="tag" :class="[classes]">
    <slot></slot>
  </heading>
</template>
<script>
export default {
  name: 'Heading',
  components: {
    heading: {
      props: ['tag','classes'],
      render(h) {
        return h(this.tag,{}, this.$slots.default);
      }
    }
  },
  props: {

    tag: {
      type: String,
      default: 'h2',
      validator(value) {
        return ['h1', 'h2', 'h3', 'h4', 'h5'].includes(value);
      }
    },
    className:{
        type:String,
        default:'primary '
    }
  },
  computed:{
    classes:function(){
        return `heading heading-${this.className}`
    }
  }

};

</script>
<style lang="scss">
    @import '../assets/style/heading.scss';
</style>
