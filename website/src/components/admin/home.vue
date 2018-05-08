<template>
  <div>
    <el-input type="textarea" placeholder="请输入内容" v-model="content" :autosize="{ minRows: 4}" class="mb20"></el-input>
    <el-input placeholder="请输入日期" v-model="date" :autosize="{ minRows: 4}" class="mb20"></el-input>
    <UIButton type="primary" @click="save('home')" :loading="saveSpin">save
    </UIButton>
  </div>
</template>
<script>
import api from '../../api/index.js';
import editor from './editor.vue'
export default {
  data() {
    return {
      content: '',
      date: '',
      saveSpin: false,
      id: ''
    }
  },
  components: {
    editor
  },
  methods: {
    save(name) {
      this.saveSpin = true;

      api.updateContent({
        articleType: name,
        content: this.content,
        date: this.date
      }).then(response => {
        this.saveSpin = false;
        this.$Toast({
          group: 'top-center',
          text: 'home update succsee'
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
    const name = this.$route.params.panel;
    api.getContent(name).then(response => {
      this.content = response.data.content || ''
      this.date = response.data.date || ''
      console.log(this.content)
    }).catch(error => {
      console.log(error)
    })
  }
}
</script>