<template>
  <div :class="[classes,alignDirection,gutterMargin]">
    <slot></slot>
  </div>
</template>
<script>
const prefixCls = 'btn-group';

export default {
  name: 'UIButtonGroup',
  props: {
    size: {
      validator(value) {
        return ['small', 'large'].includes(value);
      }
    },
    shape: {
      validator(value) {
        return ['circle', 'circle-outline'].includes(value);
      }
    },
    vertical: {
      type: Boolean,
      default: false
    },
    align: {
      type: String,
      default: 'left'
    },
    gutter: {
      type: Number,
      default: 0,
      validator(value) {
        return [0, 20, 40, 60].includes(value);
      }
    }
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-${this.size}`]: !!this.size,
          [`${prefixCls}-${this.shape}`]: !!this.shape,
          [`${prefixCls}-vertical`]: this.vertical
        }
      ];
    },
    alignDirection() {
      return `${prefixCls}-${this.align}`
    },
    gutterMargin() {
      return `${prefixCls}-gutter-${this.gutter}`
    }
  }
};

</script>
