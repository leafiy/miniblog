<template>
  <div class="admin-container">
    <div class="admin-nav">
      <ul>
        <li>
          <router-link to="/admin/articles">文章管理</router-link>
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