<template>
  <div>
    <UIButton type="primary" @click="$router.push('/admin/create/'+category)">创建新文章</UIButton>
    <hr>
    <article-list :key="key"></article-list>
  </div>
</template>
<script>
import articleList from './articleList.vue'
export default {
  data() {
    return {
      category: '',
      key: Date.now()
    }
  },
  components: {
    articleList
  },
  mounted(){
   this.category = this.$route.path.split('/')[2]
  },
  watch: {
    $route: function() {
      this.category = this.$route.path.split('/')[2]
      this.key = Date.now()
    }
  }
}
</script>