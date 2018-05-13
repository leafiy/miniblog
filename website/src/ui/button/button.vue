<template>
  <button :type="htmlType" :class="classes" :disabled="disabled" :loading="loading" @click="handleClick">
    <span v-if="showSlot" ref="slot"><slot></slot></span>
    <transition name="fade">
      <loader :show="loading"></loader>
    </transition>
  </button>
</template>
<script>
const prefixCls = 'btn';

export default {
  name: 'UIButton',
  props: {
    type: {
      validator(value) {
        return ['primary', 'border', 'dashed', 'warning', 'error', 'link'].includes(value);
      }
    },
    shape: {
      validator(value) {
        return ['circle', 'circle-outline'].includes(value);
      }
    },
    size: {
      validator(value) {
        return ['sm', 'lg'].includes(value);
      }
    },
    loading: Boolean,
    disabled: Boolean,
    htmlType: {
      default: 'button',
      validator(value) {
        return ['button', 'submit', 'reset'].includes(value);
      }
    },
    //icon: String,
    full: {
      type: Boolean,
      default: false
    },
    center: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showSlot: true
    };
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-disabled`]: !!this.disabled,
          [`${prefixCls}-${this.type}`]: !!this.type,
          [`${prefixCls}-full`]: this.full,
          [`${prefixCls}-center`]: this.center,
          [`${prefixCls}-${this.shape}`]: !!this.shape,
          [`${prefixCls}-${this.size}`]: !!this.size,
          [`${prefixCls}-loading`]: this.loading != null && this.loading,
          [`${prefixCls}-icon-only`]: !this.showSlot && (!!this.icon || this.loading)
        }
      ];
    }
  },
  methods: {
    handleClick(event) {
      if (!this.loading) {
        this.$emit('click', event);
      }
    }
  },
  mounted() {
    this.showSlot = this.$slots.default !== undefined;
  }
};

</script>
<style lang="scss">
@import '../assets/style/button.scss';

</style>
