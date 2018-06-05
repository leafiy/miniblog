<template>
  <div class="admin-container">
    <div class="admin-nav">
      <ul>
        <li>
          <router-link to="/admin/concepts">管理concept</router-link>
        </li>
        <li>
          <router-link to="/admin/methods">管理method</router-link>
        </li>
        <li>
          <router-link to="/admin/caseStudies">管理Case</router-link>
        </li>
      </ul>
    </div>
    <div class="admin-panel">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {

    }
  }
}
</script>
<style lang="scss">
@import '../assets/scss/admin.scss'
</style>