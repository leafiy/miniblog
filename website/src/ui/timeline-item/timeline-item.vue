<template>
  <li :class="itemClasses">
    <div :class="tailClasses"></div>
    <div :class="headClasses" ref="dot">
      <slot name="dot"></slot>
    </div>
    <div :class="contentClasses">
      <slot></slot>
    </div>
  </li>
</template>
<script>
const prefixCls = 'timeline';

export default {
  name: 'TimelineItem',
  props: {
    color: {
      type: String,
      default: 'blue'
    }
  },
  data() {
    return {
      dot: false
    };
  },
  mounted() {
    this.dot = this.$refs.dot.innerHTML.length ? true : false;
  },
  computed: {
    itemClasses() {
      return `${prefixCls}-item`;
    },
    tailClasses() {
      return `${prefixCls}-item-tail`;
    },
    headClasses() {
      return [
        `${prefixCls}-item-head`,
        {
          [`${prefixCls}-item-head-custom`]: this.dot
        }
      ];
    },
    contentClasses() {
      return `${prefixCls}-item-content`;
    }
  }
};

</script>
