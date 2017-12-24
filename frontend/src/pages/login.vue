<template>
  <div class="page-container">
    <el-form :model="user" :rules="rules" ref="loginForm">
      <h2>Signin</h2>
      <el-form-item prop="email">
        <el-input v-model="user.email" placeholder="type email here" :maxlength="40" @keyup.enter.native="doLogin"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="user.password" placeholder="type password here" type="password" @keyup.enter.native="doLogin"></el-input>
      </el-form-item>
      <UIButton type="primary" @click="doLogin" :loading="showSpin">signin
      </UIButton>
    </el-form>
  </div>
</template>
<script>
import { usernameValidator, passwordValidator, emailValidator } from '../utils/validator';
import api from '../api/index';
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
        ]
      },
      showSpin: false
    };

  },

  methods: {

    doLogin: function() {
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          this.login()
        } else {
          return
        }
      });
    },
    login: function() {
      this.showSpin = true;
      let user = {
        email: this.user.email,
        password: this.user.password,
      }
      api.doLogin(user).then((response) => {
          let token = response.data.token;
          let userInfo = response.data.userInfo;
          this.$store.commit('token', token);
          this.$store.commit('authInfo', userInfo);
          localStorage.setItem('user', token);
          this.showSpin = false;
          this.$router.push('/')
        })
        .catch((error) => {
          console.log(error)
          this.$Toast({
            group: 'top-center',
            text: error.response ? error.response.data.errorType : 'Sever Error, try again later',
            type: error.response.data.errorType === 'wrongPassword' ? 'error' : 'warning',
            icon: error.response.data.errorType === 'wrongPassword' ? 'block' : 'info-circled'
          });
          this.showSpin = false;


        });
    }
  }
}

</script>
