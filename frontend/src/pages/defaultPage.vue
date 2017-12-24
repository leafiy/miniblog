<template>
  <div class="page-container">
    <page-section :title="title" :desp="desp">
      <UIButton type="primary" @click="$router.go('/')">back
      </UIButton>
    </page-section>
  </div>
</template>
<script>
import PageSection from '../components/section.vue';

export default {
  data() {
    return {
      title: 'Page Not Found',
      desp: 'Nothing here',
    }
  },
  components: {
    PageSection
  }
}

</script>
