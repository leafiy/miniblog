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
          <router-link to="concept">管理concept</router-link>
        </li>
        <li>
          <router-link to="method">管理method</router-link>
        </li>
        <li>
          <router-link to="case">管理Case</router-link>
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