<template>
  <div class="admin-panel">
    <el-form :model="newPub" :rules="rules" ref="addPubForm">
      <el-form-item prop="title">
        <el-input type="text" placeholder="请输入 publication 标题 *" v-model="newPub.title" @keyup.enter.native="save"></el-input>
      </el-form-item>
      <el-form-item prop="link">
        <el-input type="text" placeholder="请输入 publication 链接 *" v-model="newPub.link" @keyup.enter.native="save"></el-input>
      </el-form-item>
      <el-form-item prop="date">
        <el-input type="text" placeholder="请输入 publication 发布时间和发表地点 （University of Nottingham - 2017）" v-model="newPub.date" @keyup.enter.native="save"></el-input>
      </el-form-item>
      <UIButton type="primary" @click="save" :loading="saveSpin">{{publication? 'save' : 'create'}}</UIButton>
      <UIButton type="primary" @click="cancel">cancel</UIButton>
      <UIButton type="primary" @click="del" v-if="publication">delete</UIButton>
    </el-form>
  </div>
</template>
<script>
import api from '../../api/index.js';
import { urlValidator } from '../../utils/validator.js';
export default {
  data() {
    return {
      newPub: {
        title: '',
        link: '',
        date: ''
      },
      saveSpin: false,
      rules: {
        link: [
          { validator: urlValidator, trigger: 'submit' },
          { required: true, message: 'type a link', trigger: 'submit' },
        ],
        title: [
          { required: true, message: 'type a title', trigger: 'submit' }
        ],
        date: [
          { required: true, message: 'type a date', trigger: 'submit' }
        ]
      }
    }
  },
  props: ['publication'],
  methods: {
    cancel() {
      this.$emit('cancel')
    },
    del() {
      api.deleteContent(this.publication._id).then(response => {
        this.$emit('delete');
        this.$Toast({
          group: 'top-center',
          text: 'publication delete succsee'
        });
      }).catch(error => {
        console.log(error)
      })
    },
    save() {
      this.$refs['addPubForm'].validate((valid) => {
        if (valid) {
          if (this.publication) {
            this.updatePub()
          } else {
            this.createPub()

          }
          this.saveSpin = true;
        } else {
          return
        }
      });

    },
    updatePub() {
      api.updateContent(this.newPub).then(response => {
        this.$emit('complete', response.data.content);
        this.$Toast({
          group: 'top-center',
          text: 'publication update succsee'
        });
      }).catch(error => {
        console.log(error)
      })
    },
    createPub() {
      let data = {
        title: this.newPub.title,
        link: this.newPub.link,
        date: this.newPub.date,
        articleType: 'article',
        category: 'publication'
      }
      api.createContent(data).then(response => {
        this.$emit('complete', response.data.content)
        this.$refs['addPubForm'].resetFields()
      }).catch(error => {
        console.log(error)
        this.$refs['addPubForm'].resetFields()
      })
    }
  },
  mounted() {
    if (this.publication) {
      this.newPub = this.publication
    }
  },
  beforeDestroy() {
    this.$refs['addPubForm'].resetFields()
  }
}

</script>
