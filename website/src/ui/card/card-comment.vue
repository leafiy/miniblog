<template>
  <div class="card" :class="classes" @click="go">
    <div class="card-userinfo" v-if="type !== 'graphic'">
      <div class="avatar-container">
        <Avatar :url="content.userInfo.avatar" :nickname="content.userInfo.nickname"></Avatar> {{content.userInfo.nickname}}
      </div>
    </div>
    <div class="card-flag" v-if="type !== 'graphic'">
      <icon name="lock" v-if="content.passwordProtection" :title="$t('passwordProtection')"></icon>
    </div>
    <div class="card-desp" v-if="loaded">{{content.desp}}</div>
    <background :src="content.cover" @loadFinished="loadFinished" @click.native="articleType === 'book' ? $router.push(link) :''"></background>
    <transition name="fade">
      <div class="card-title" v-if="loaded"><span></span>
        <router-link :to="link">{{content.name || content.title}}</router-link>
      </div>
    </transition>
    <transition name="fade">
      <div class="card-footer" v-if="type !== 'graphic' && loaded">
        <div class="card-footer-wrapper">
          {{content.created}}
          <slot name="favorite"></slot>
          <!-- <Favorite :book="book"></Favorite> -->
        </div>
      </div>
    </transition>
    <slot name="end"></slot>
  </div>
</template>
<script>
// import Favorite from '../Favorite.vue'

export default {
  name: 'CommentCard',
  props: {
    articleType: {
      type: String,
      required: true
    },
    content: {
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
    },
    type: {
      type: String,
      required: true,
      validator: function(value) {
        return ['graphic', 'content', 'basic'].includes(value);
      }
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
      if (this.articleType === 'event') {
        this.$router.push(this.link)

      }
    }
  },

  computed: {
    link() {
      if (this.articleType === 'event') {
        return `/event/${this.content.originalName}`
      }
      if (this.articleType === 'book') {
        return `/book/${this.content.id}`
      }
    },

    classes() {
      return [{
          'card-shadow': this.shadow,
          'card-shadow-hover': this.shadowHover,

        },
        `card-${this.type}`,
      ]
    }
  },
  mounted(){
    if(!this.content.cover){
      throw new Error('must set a cover!!')
    }
  }
};

</script>
<style lang="scss">
@import '../assets/style/card.scss'

</style>
