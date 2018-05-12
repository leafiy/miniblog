<template>
  <header class="site-header">
    <h1 class="logo">
    <router-link to="/">Qian<span class="color-text">.</span>Smile</router-link>
  </h1>
    <ul class="navbar">
      <li>
        <router-link to="/about">About</router-link>
      </li>
      <li>
        <router-link to="/concepts">Concepts</router-link>
      </li>
      <li>
        <router-link to="/methods">Methods</router-link>
      </li>
      <li>
        <router-link to="/cases">Cases</router-link>
      </li>
      <li v-if="authInfo">
        <router-link to="/admin">Admin</router-link>
      </li>
      <li v-if="authInfo"><span @click="logout">Logout</span></li>
    </ul>
  </header>
</template>
<script>
import { mapGetters } from 'vuex'
import api from '../api/index'
export default {
  data() {
    return {

    }
  },
  methods: {

    logout: function() {
      this.$store.commit('authInfo', null)
      this.$router.push('/')
      localStorage.removeItem('user')
    }

  },
  computed: {
    ...mapGetters(['authInfo'])
  }
}
</script>