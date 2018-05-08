<template>
  <div class="popover-menu" :style="elStyles" @click.stop="close" @mouseover="mouseover" @mouseleave="mouseleave" v-click-outside="close">
    <slot></slot>
  </div>
</template>
<script>
import Vue from 'vue';
import ClickOutside from '../directive/clickOutSide.js';
export default {

  data() {
    return {
      top: '',
      bottom: '',
      left: '',
      right: ''
    }
  },
  props: ['rect', 'offset', 'align', 'maxWidth', 'type'],
  methods: {
    close() {
      if (this.type !== 'tooltip') {
        this.$emit('close-menu')
      }
    },
    mouseover() {
      if (this.type !== 'dropdown') {
        this.$emit('mouse-over')

      }
    },
    mouseleave() {
      if (this.type !== 'dropdown') {
        this.$emit('mouse-leave')

      }
    }
  },
  mounted() {
    let { left: offsetX, top: offsetY, width: parentWidth, height: parentHeight } = this.rect;
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let elHeight = this.$el.offsetHeight;
    let elWidth = this.$el.offsetWidth;




    let top = this.type === 'tooltip' ? offsetY - this.offset - elHeight + window.scrollY : offsetY + parentHeight + window.scrollY;
    let left = this.type === 'tooltip' ? offsetX - elWidth / 2 + parentWidth / 2 + window.scrollX : window.scrollX + offsetX;
    this.top = `${top}px`
    this.left = `${left}px`


    // auto定位时位置修正
    if (this.align === 'auto') {
      this.$nextTick(() => {
        let { top: newTop, left: newLeft, bottom: newBottom, right: newRight } = this.$el.getBoundingClientRect();
        if (this.type === 'tooltip') {
          if (newTop <= this.offset) {
            this.top = `${parentHeight + this.offset + window.scrollY}px`
          }
          if (newLeft <= 0) {
            this.left = `${this.offset}px`
          }
        } else {
          if (newBottom + this.offset > windowHeight) {
            this.top = `${ offsetY +  window.scrollY -elHeight - this.offset}px`
          }
        }

      })
    }











  },
  computed: {
    elStyles() {
      return {
        top: this.top,
        bottom: this.bottom,
        left: this.left,
        marginRight: `${this.offset}px`,
        maxWidth: `${this.maxWidth}%`

      }
    }
  },
  directives: {
    ClickOutside
  }

}

</script>
