<template>
  <div class="toasts" :class="toastPosition">
    <transition-group name="toast-fade" tag="p">
      <div v-for="item of list" v-if="item.state != 2" class="toast-wrapper" :key="item.id" :data-id="item.id">
        <div :class="notifyClass(item)" @click="closeOnClick ? destroy(item) : ()=>{}">
          <div v-if="item.icon" class="toast-icon">
            <icon :name="item.icon"></icon>
          </div>
          <div v-if="item.title" class="toast-title" v-html="item.title"></div>
          <div class="toast-content" v-html="item.text"></div>
          <div v-if="item.actions" class="toast-actions">
            <span class="toast-action" v-for="action of item.actions" @click="()=>{action.cb();destroy(item)}">{{action.text}}</span>
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>
<script>
import plugin from './index'
import { events } from '../events.js'
import { Id, split } from './util'

const STATE = {
  IDLE: 0,
  DESTROYED: 2
}

export default {
  name: 'Toast',
  props: {
    group: {
      type: String,
      default: ''
    },

    reverse: {
      type: Boolean,
      default: false
    },

    position: {
      type: [String, Array],
      default: () => {
        return ['top', 'right']
      }
    },

    duration: {
      type: Number,
      default: 3000
    },



    max: {
      type: Number,
      default: Infinity
    }
  },
  data() {
    return {
      list: [],
      closeOnClick: false
    }
  },
  mounted() {

    events.$on('add', this.addItem);
  },
  computed: {

    toastPosition() {
      return this.position.split(' ').map(p => 'toast-' + p)

    },

    active() {
      return this.list.filter(v => v.state !== STATE.DESTROYED)
    }
  },
  methods: {
    addItem(event) {
      event.group = event.group || 'top-center'
      if (this.group !== event.group) {
        return
      }

      if (event.clean || event.clear) {
        this.destroyAll()
        return
      }

      let duration = typeof event.duration === 'number' ?
        event.duration :
        this.duration



      let { title, text, type, icon, actions, closeOnClick, group, cb } = event
      if (typeof actions === "object" && !Array.isArray(actions)) {
        actions = [actions]
      }
      if (closeOnClick) {
        this.closeOnClick = true;
      }
      const item = {
        id: Id(),
        title,
        text,
        type,
        icon,
        state: STATE.IDLE,
        actions,
        group,
        cb
      }
      if (duration >= 0) {
        item.timer = setTimeout(() => {
          this.destroy(item)
        }, duration)
      }

      let indexToDestroy = -1
      this.list.unshift(item)

      if (this.active.length > this.max) {
        indexToDestroy = -1
      }

      if (indexToDestroy !== -1) {
        this.destroy(this.active[indexToDestroy])
      }
      //this.sortToastsEl(item)
    },
    sortToastsEl(item) {
      if (this.group !== item.group) {
        return
      }
      // let list = this.$el.querySelectorAll('.toast-wrapper');
      // for (var i = 0; i < list.length; i++) {
      //   list[i].style.top = `${ 20 + list[i].offsetHeight*(i+1) }px`
      // }


    },
    notifyClass(item) {
      return [
        'toast',
        item.type,
        item.actions ? 'toast-with-footer' : '',
        item.icon ? 'toast-with-icon' : ''
      ]
    },



    destroy(item) {
      clearTimeout(item.timer)
      item.state = STATE.DESTROYED
      this.sortToastsEl(item)
      this.clean()
      item.cb ? item.cb() : ''
    },

    destroyAll() {
      this.active.forEach(this.destroy)
    },

    clean() {
      this.list = this.list
        .filter(v => v.state !== STATE.DESTROYED)
    }
  }
}

</script>
<style lang="scss">
@import '../assets/style/toast.scss'

</style>
