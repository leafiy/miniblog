<template>
  <div class="page-container">
    <page-section :name="name" :desp="desp">
      <UIButton type="primary" @click="$router.push('/')">back to homepage
      </UIButton>
    </page-section>
  </div>
</template>
<script>
import PageSection from '../components/section.vue';

export default {
  data() {
    return {
      name: 'Page Not Found',
      desp: 'Nothing here',
    }
  },
  components: {
    PageSection
  }
}

</script>
