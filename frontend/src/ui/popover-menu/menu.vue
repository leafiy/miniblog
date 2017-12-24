<template>
  <div class="popover-menu" :style="elStyles" @click.stop="close" v-click-outside="close">
    <slot></slot>
  </div>
</template>
<script>
import ClickOutside from '../directive/clickOutSide.js'
export default {

  data() {
    return {
      top: '',
      bottom: '',
      left: '',
      right: ''
    }
  },
  props: ['rect', 'offset', 'align'],
  methods: {
    close() {
      this.$emit('closeMenu')
    }
  },
  mounted() {
    let { x: offsetX, y: offsetY, width: parentWidth, height: parentHeight } = this.rect;
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let elHeight = this.$el.offsetHeight;
    let elWidth = this.$el.offsetWidth;


    if ((parentHeight + elHeight + this.offset + offsetY) >= windowHeight) {
      this.bottom = `${parentHeight + this.offset/2}px`;
    } else {
      this.top = `${parentHeight + this.offset/2}px`;
    }

    if (!this.align) {
      if ((parentWidth + elWidth + this.offset + offsetX) >= windowWidth) {
        this.right = `0px`;
        this.left = `auto`;
      } else if ((offsetX + parentWidth / 2) <= elWidth / 2) {
        this.left = `0px`;
      } else {
        this.left = `${-(elWidth/2) + parentWidth/2}px`
      }


    }else{
      this[this.align] = `0px`

    }







  },
  computed: {
    elStyles() {
      return {
        top: this.top,
        bottom: this.bottom,
        left: this.left,
        right: this.right
      }
    }
  },
  directives: {
    ClickOutside
  }

}

</script>
