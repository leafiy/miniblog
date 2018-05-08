<template>
  <div class="admin-container">
    <div class="admin-nav">
      <ul>
        <li>
          <router-link to="home">管理Home内容</router-link>
        </li>
        <li>
          <router-link to="about">管理About内容</router-link>
        </li>
        <li>
          <router-link to="publication">管理Publication</router-link>
        </li>
        <li>
          <router-link to="research">管理research</router-link>
        </li>
        <li>
          <router-link to="project">管理projects</router-link>
        </li>
      </ul>
    </div>
    <div class="admin-panel">
      <component :is="currentPanel"></component>
    </div>
  </div>
</template>
<script>
import Home from '../components/admin/home.vue';
import About from '../components/admin/about.vue';
import Publication from '../components/admin/publication.vue';
import Research from '../components/admin/research.vue';
import Project from '../components/admin/project.vue';
export default {
  data() {
    return {
      title: 'Page Not Found',
      desp: 'Nothing here',
      defaultPanel: 'home',
      currentPanel: ''
    }
  },
  components: {
    home: Home,
    about: About,
    publication: Publication,
    research: Research,
    project: Project
  },
  mounted() {

    if (!this.$route.params.panel) {
      this.currentPanel = this.defaultPanel;
      this.$router.push(`/admin/${this.defaultPanel}`)
    } else {
      this.currentPanel = this.$route.params.panel;
    }
  }

}
</script>
<style lang="scss">
@import '../assets/scss/admin.scss'
</style>