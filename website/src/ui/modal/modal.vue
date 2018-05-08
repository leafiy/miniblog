<template>
  <div>
    <div class="modal" :class="modalSizeClasses">
      <transition name="modal">
        <div class="modal-body" :class="modalTypeClasses" v-if="show" @touchmove="notAllowTouchMove($event)">
          <div class="modal-title" v-if="title">
            {{ title }}
          </div>
          <div class="modal-close-btn" v-if="showCloseBtn" @click="dismiss($event)">
            <icon name="cancel"></icon>
          </div>
          <div class="modal-content-image" v-if="type == 'image'">
            <a :href="src" target="_blank"><img :src="src" alt=""></a>
          </div>
          <div class="modal-content" v-else v-html="message"></div>
          <div class="modal-footer" v-if="buttons.length">
            <div class="modal-actions" v-for="item in buttons" @click="item.action">
              {{ item.name }}
            </div>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div v-if="show && showBackdrop" class="modal-backdrop" @click="closable?dismiss($event):''"></div>
    </transition>
  </div>
</template>
<script>
import { events } from '../events.js'

export default {
  name: 'Modal',
  data() {
    return {
      show: false,
      size: 'normal'

    }
  },
  mounted() {

    events.$on('addModal', this.showModal);
    events.$on('removeModal', this.removeModal);
  },
  methods: {
    removeModal() {
      this.show = false

    },
    showModal(event) {
      this.show = true;

      let { title, message, type = 'message', size = 'normal', buttons = [], showCloseBtn = true, closable = true, showBackdrop = true } = event
      if (typeof buttons === "object" && !Array.isArray(buttons)) {
        buttons = [buttons]
      }

      this.title = title;
      this.message = message;
      this.type = type;
      this.buttons = buttons;
      this.size = size;
      this.showCloseBtn = showCloseBtn;
      this.closable = closable;
      this.showBackdrop = showBackdrop;
      if (type == 'image') {
        this.src = event.src;
        this.size = 'large';
        this.title = ''
      }
      if (this.type !== 'image') {
        document.onmousewheel = () => {
          return false
        }
      }

    },
    dismiss(event) {

      this.show = false;
      if (this.type !== 'image') {
        document.onmousewheel = () => {}

      }
    },
    notAllowTouchMove(event) {
      event.preventDefault();
    }
  },
  computed: {
    modalTypeClasses() {
      return `modal-${this.type}`
    },
    modalSizeClasses() {
      return `modal-size-${this.size}`
    }
  }
}

</script>
<style lang="scss">
@import '../assets/style/modal.scss'

</style>
