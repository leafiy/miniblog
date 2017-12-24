<template>
  <div class="page-container">
    <page-section name="research"></page-section>
    <research-list></research-list>
  </div>
</template>
<script>
import PageSection from '../components/section.vue';
import ResearchList from '../components/researchList.vue';
export default {
  data() {
    return {

    }
  },
  components: {
    PageSection,
    ResearchList
  }
}

</script>
