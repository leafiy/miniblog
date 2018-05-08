<template>
  <div :class="classes">
    <img :src="src | convertUrl" v-if="src">
    <span ref="children" :class="[prefixCls + '-string']" v-else-if="username">{{username}}</span>
    <icon name="user-o" v-else></icon>
  </div>
</template>
<script>
const prefixCls = 'avatar';

export default {
  name: 'Avatar',
  props: {
    shape: {
      validator(value) {
        return ['circle', 'square'].includes(value);
      },
      default: 'circle'
    },
    size: {
      validator(value) {
        return ['small', 'large', 'default'].includes(value);
      },
      default: 'default'
    },
    url: String,
    nickname: String
  },
  data() {
    return {
      prefixCls: prefixCls,
      scale: 1,
      isSlotShow: false
    };
  },
  computed: {
    src() {

      return this.url ? this.url : ''
    },
    username() {
      return this.nickname ? this.nickname[0].toUpperCase() : false
    },
    classes() {
      return [
        `${prefixCls}`,
        `${prefixCls}-${this.shape}`,
        `${prefixCls}-${this.size}`,
        {
          [`${prefixCls}-image`]: !!this.src,
          [`${prefixCls}-icon`]: !!this.icon
        }
      ];
    }
  }
};

</script>
<style lang="scss">
@import '../assets/style/avatar.scss'

</style>
