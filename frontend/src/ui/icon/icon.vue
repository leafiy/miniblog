<template>
  <i :class="'icon-' + name" :title="title"><slot></slot></i>
</template>
<script>
export default {
  name: 'Icon',

  props: {
    name: String,
    title: {
      type: String,
      default: ''
    }
  }
};

</script>
<style lang="scss">
.animate-spin {
  animation: spin 3s infinite linear;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

i.spin {
  &::before {
    @extend .animate-spin;
  }
}

</style>
