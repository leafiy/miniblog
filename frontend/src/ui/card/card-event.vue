<template>
  <card type="event" :shadowHover="false" @click.native="go">
    <background :src="event.cover" @loadFinished="loadFinished"></background>
    <div class="card-end-mark" v-if="isEnd">
      <icon name="attention-circled">end</icon>
    </div>
    <transition name="silde-up" v-on:after-enter="afterEnter">
      <div class="card-content" v-show="loaded" :style="contentStyles">
        <div class="card-meta" v-if="event.sponsor">
          <icon name="at">{{event.sponsor}}</icon>
        </div>
        <div class="card-title">{{event.name}}</div>
        <div class="card-desp">{{desp}}</div>
        <router-link :to="link"></router-link>
      </div>
    </transition>
  </card>
</template>
<script>
import card from './card.vue';
import substringAddDot from '../util/substring.js'

export default {
  name: 'CardEvent',
  components: {
    card
  },
  props: {
    event: {
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
      loaded: false,
      offset: ''
    };
  },
  methods: {
    loadFinished() {
      this.loaded = true;
    },
    go() {
      this.$router.push(this.link)
    },
    afterEnter() {
      setTimeout(() => {
        let offset = this.$el.querySelector('.card-desp').offsetHeight
        this.offset = offset;
      }, 2000)
    }
  },

  computed: {
    link() {
      return `/event/${this.event.originalName}`
    },
    desp() {
      return substringAddDot(this.event.desp, 160, true)
    },
    contentStyles() {
      return {
        'transform': `translateY(${this.offset}px)`
      }
    },
    isEnd() {
      if (this.event.end) {
        let now = new Date();
        if (new Date(this.event.end) < now) {
          return true

        }
      }

    }
  },
  mounted() {
    if (!this.event.cover) {
      throw new Error('must set a cover!!')
    }

  }
};

</script>
