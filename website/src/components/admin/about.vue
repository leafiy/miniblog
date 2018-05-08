<template>
  <div v-if="about">
    <editor v-model="about.content"></editor>
    <UIButton type="primary" @click="save('about')" :loading="saveSpin">save
    </UIButton>
  </div>
</template>
<script>
import api from '../../api/index.js';
import editor from './editor.vue'
export default {
  data() {
    return {
      about: null,
      saveSpin: false,
      id: ''
    }
  },
  components: {
    editor
  },
  methods: {
    save(name, type) {
      this.saveSpin = true;

      api.updateContent(this.about).then(response => {
        this.saveSpin = false;
        this.$Toast({
          group: 'top-center',
          text: 'about update succsee'
        });
      }).catch(error => {
        this.$Toast({
          group: 'top-center',
          type: 'error',
          text: 'update failed'
        });
        this.saveSpin = false;
      })
    }
  },
  mounted() {
    const param = this.$route.params.panel;
    api.getContent(param).then(response => {
      this.about = response.data.content;
      this.id = response.data.content._id;
    }).catch(error => {
      console.log(error)
    })
  }
}
</script>