<template>
  <card type="book" :shadowHover="false">
    <background :src="book.cover" @loadFinished="loadFinished" cover></background>
    <div class="card-meta">
  <Avatar :url="book.userInfo.avatar" :nickname="book.userInfo.nickname"></Avatar>
      <span class="right"><slot name="favorite"></slot></span>
    </div>

    <div class="card-content" v-if="loaded">
      <div class="card-userinfo">

        {{book.userInfo.nickname}} - <span>{{book.created}}</span>
      </div>
      <div class="card-title">
        <router-link :to="link"><icon name="lock" v-if="book.passwordProtection" :title="$t('passwordProtection')"></icon>{{book.title}}</router-link>
      </div>
    </div>
  </card>
</template>
<script>
import Card from './card.vue';

export default {
  name: 'CardBook',
  components: {
    Card
  },
  props: {
    book: {
      type: Object,
      required: true
    },
    shadow: {
      type: Boolean,
      default: true
    },
    shadowHover: {
      type: Boolean,
      default: true
    }

  },
  data() {
    return {
      loaded: false
    };
  },
  methods: {
    loadFinished() {
      this.loaded = true;
    },
    go() {
      this.$router.push(this.link)

    }
  },

  computed: {
    link() {

      return `/book/${this.book.id}`
    },

  }
};

</script>
<style lang="scss">
@import '../assets/style/card.scss'

</style>
