<template>
  <div class="page-container">
    <el-form :model="user" :rules="rules" ref="regForm">
      <h2>Signup</h2>
      <el-form-item prop="email">
        <el-input v-model="user.email" placeholder="type email here" :maxlength="40" @keyup.enter.native="doReg"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="user.password" placeholder="type password here" type="password" @keyup.enter.native="doReg"></el-input>
      </el-form-item>
      <el-form-item prop="invitation">
        <el-input v-model="user.invitation" placeholder="type invitation code here" type="text" @keyup.enter.native="doReg"></el-input>
      </el-form-item>
      <UIButton type="primary" @click="doReg" :loading="showSpin">signup
      </UIButton>
    </el-form>
  </div>
</template>
<script>
import { usernameValidator, passwordValidator, emailValidator } from '../utils/validator';
import api from '../api/index';
import config from '../config.js';
const siteConfig = config[process.env.NODE_ENV];
export default {
  data() {
    return {
      user: {
        email: '',
        password: '',
        invitation: ''
      },
      rules: {
        email: [
          { validator: emailValidator, trigger: 'submit' },
          { required: true, message: 'type email', trigger: 'submit' },


        ],
        password: [
          { validator: passwordValidator, trigger: 'submit' }
        ],
        invitation: [
          { required: true, message: 'type invitation code', trigger: 'submit' }
        ]
      },
      emailInactived: false,
      mailSending: false,
      showSpin: false
    };

  },

  methods: {

    doReg: function() {
      this.$refs['regForm'].validate((valid) => {
        if (valid) {
          this.reg()
          this.showSpin = true;
        } else {
          return
        }
      });
    },
    reg: function() {
      let user = {
        email: this.user.email,
        password: this.user.password,
        invitation: this.user.invitation
      }
      api.doReg(user).then((response) => {
        let token = response.data.token;
        token = token.toString();

        let authInfo = response.data.authInfo;
        this.$store.commit('authInfo', authInfo)
        localStorage.setItem('user', token)
        localStorage.setItem('user', token)
          this.$Toast({
            group: 'top-center',
            text: 'SignUp Success',
            duration: 2000,
            type: 'success'
          });
        this.showSpin = false
        setTimeout(() => {
          this.$router.push('/')
        }, 1000)

      }).catch((error) => {
        this.showSpin = false
        this.$Toast({
          group: 'top-center',
          text: error.response ? error.response.data.errorType : 'Sever Error, try again later',
          type: 'warning',
          duration: 2000,
          icon:'block'
        });
        console.log(error)

      })
    }
  }
}

</script>
