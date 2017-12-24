<template>
  <div class="popover-trigger" @click="click" @mouseover="mouseover" :class="tooltip?'tooltip-trigger':''" @mouseleave="mouseleave">
    <slot name="trigger"></slot>
    <transition name="fade">
      <popover-menu v-if="showMenu" v-on:closeMenu="closeMenu" :rect="rect" :offset="offset" :align="align">
        <slot name="menu"></slot>
      </popover-menu>
    </transition>
  </div>
</template>
<script>
import PopoverMenu from './menu.vue'
export default {
  data() {
    return {
      showMenu: false,
      rect: null
    }
  },
  components: {
    PopoverMenu
  },
  props: {
    trigger: {
      type: String,
      default: 'click'
    },
    offset: {
      type: Number,
      default: 20
    },
    tooltip: {
      type: Boolean,
      default: false
    },
    align:''
  },
  methods: {
    click() {
      if (this.trigger === 'click') {

        if (!this.showMenu) {
          this.showPopover()
        }

      }
    },
    mouseover() {
      if (this.trigger === 'mouseover') {
        if (!this.showMenu) {
          this.showPopover()
        }
      }
    },
    mouseleave() {
      if (this.trigger === 'mouseover') {
        if (this.showMenu) {
          this.closeMenu()
        }
      }
    },
    showPopover() {
      this.showMenu = true;
      let rect = this.$el.getBoundingClientRect();
      this.rect = rect;



    },
    closeMenu() {
      this.showMenu = false;

    }
  }
}

</script>
<style lang="scss">
@import '../assets/style/dropdown.scss';

</style>
