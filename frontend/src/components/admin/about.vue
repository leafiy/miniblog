<template>
  <div v-if="about">
    <el-input type="textarea" placeholder="请输入内容" v-model="about.content" :autosize="{ minRows: 4}" class="mb20"></el-input>
    <UIButton type="primary" @click="save('about')" :loading="saveSpin">save
    </UIButton>
  </div>
</template>
<script>
import api from '../../api/index.js';
export default {
  data() {
    return {
      about: null,
      saveSpin: false,
      id: ''
    }
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
