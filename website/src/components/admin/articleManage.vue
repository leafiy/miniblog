<template>
  <div>
    <UIButton type="primary" @click="$router.push('/admin/create/'+$route.params.panel)">创建新文章</UIButton>
    <hr>
    <article-list :category="category" v-if="category" :key="key"></article-list>
  </div>
</template>
<script>
import articleList from './articleList.vue'
export default {
  data() {
    return {
      category: '',
      key:Date.now()
    }
  },
  components: {
    articleList
  },

  watch: {
    $route: function() {
     this.category = this.$route.path.split('/')[2]
     console.log(this.category)
     this.key = Date.now()
    }
  }
}
</script>