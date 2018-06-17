<template>
    <div class="article-list">
     <article-card v-for="article of list" :article="article" :key="article.id"></article-card>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import ArticleCard from './articleCard.vue'
export default {
    props: ['category', 'project'],
    components: {
        ArticleCard,
    },
    computed: {
        ...mapGetters(['articleList']),
        list() {
            return this.articleList.filter(article => article.project == this.project && article.category == this.category)
        }
    }
}
</script>