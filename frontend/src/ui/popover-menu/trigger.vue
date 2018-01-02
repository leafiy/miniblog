<template>
  <div class="popover">
    <div class="popover-trigger" @click="click" @mouseover="mouseover" :class="triggerClasses" @mouseleave="mouseleave">
      <slot name="trigger"></slot>
    </div>
    <transition name="fadeInUp">
      <popover-menu v-if="showMenu" ref="menu" @mouse-over="mouseOverMenu" @mouse-leave="mouseLeaveMenu" @close-menu="closeMenu" :rect="rect" :offset="offset" :align="align" :max-width="maxWidth" :type="type">
        <div :class="menuClass">
          <slot name="menu"></slot>
        </div>
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
      rect: null,
      mouseInMenu: false
    }
  },
  computed: {
    triggerClasses() {
      return `${this.type}-trigger`
    },
    menuClass() {
      return `${this.type}-menu`
    }
  },
  components: {
    PopoverMenu
  },
  props: {
    type: {
      type: String,
      default: 'dropdown',
      validator(value) {
        return ['dropdown', 'tooltip'].includes(value);
      },
    },
    trigger: {
      type: String,
      default: 'click'
    },
    offset: {
      type: Number,
      default: 0
    },
    tooltip: {
      type: Boolean,
      default: false
    },
    align: {
      type: String,
      default: 'auto',
      validator(value) {
        return ['auto', 'top', 'right', 'bottom', 'left'].includes(value);
      },
    },
    maxWidth: {
      type: String,
      default: '100%'
    }
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
      if (this.trigger === 'mouseover' && !this.mouseInMenu) {
        if (this.showMenu) {
          this.closeMenu()
        }
      }
    },
    mouseOverMenu() {
      this.mouseInMenu = true
    },
    mouseLeaveMenu() {
      this.mouseInMenu = false
      if (this.showMenu) {
        this.closeMenu()
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
@import '../assets/style/popover.scss';

</style>
