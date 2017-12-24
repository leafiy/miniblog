<template>
  <transition name="fade">
    <div v-if="!closed" :class="wrapClasses">
      <span :class="iconClasses" v-if="showIcon">
                <slot name="icon">
                    <icon :name="iconType"></icon>
                </slot>
            </span>
      <span :class="messageClasses"><slot></slot></span>
      <span :class="descClasses"><slot name="desc"></slot></span>
      <a :class="closeClasses" v-if="closable" @click="close">
        <slot name="close">
          <icon name="cancel"></icon>
        </slot>
      </a>
    </div>
  </transition>
</template>
<script>
const prefixCls = 'alert';

export default {
  name: 'Alert',
  props: {
    type: {
      validator(value) {
        return ['success', 'warning', 'error'].includes(value);
      },
      default: 'success'
    },
    closable: {
      type: Boolean,
      default: false
    },
    showIcon: {
      type: Boolean,
      default: false
    },
    banner: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      closed: false,
      desc: false
    };
  },
  computed: {
    wrapClasses() {
      return [
        `${prefixCls}`,
        `${prefixCls}-${this.type}`,
        {
          [`${prefixCls}-with-icon`]: this.showIcon,
          [`${prefixCls}-with-desc`]: this.desc,
          [`${prefixCls}-with-banner`]: this.banner
        }
      ];
    },
    messageClasses() {
      return `${prefixCls}-message`;
    },
    descClasses() {
      return `${prefixCls}-desc`;
    },
    closeClasses() {
      return `${prefixCls}-close`;
    },
    iconClasses() {
      return `${prefixCls}-icon`;
    },
    iconType() {
      let type = '';

      switch (this.type) {
        case 'success':
          type = 'ok';
          break;
        case 'warning':
          type = 'info-circled';
          break;
        case 'error':
          type = 'minus';
          break;
      }

      return type;
    }
  },
  methods: {
    close(e) {
      this.closed = true;
      this.$emit('on-close', e);
    }
  },
  mounted() {
    this.desc = this.$slots.desc !== undefined;
  }
};

</script>

<style lang="scss">
    @import '../assets/style/alert.scss'
</style>
