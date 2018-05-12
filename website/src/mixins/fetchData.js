const fetchData = (type) => {
  return {
    methods: {
      fetchData(type) {
        if (this.articleList && this.articleList[type] && this.articleList[type].length) {
          this.list = this.articleList[type]
        } else {
          this.$store.dispatch('getArticleList', type).then(articleList => {
            this.list = this.articleList[type].filter(a => !a.isDraft)
          })
        }
      }
    }
  }
}


export default fetchData