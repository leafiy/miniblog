import api from '../api/index.js';
import store from '../store.js';


const authInfo = _ => {
  if (!localStorage.getItem('user')) {
    return
  }
  api.auth().then(function(response) {

    let newToken = response.data.token;
    let userInfo = response.data.userInfo;
    if (userInfo.lang) {
      store.commit('lang', userInfo.lang)
    }
    store.commit('authInfo', userInfo)
    store.commit('token', newToken)
    localStorage.setItem('user', newToken)
  }).catch(function(err) {
    if (err.response && err.response.status == 401) {
      localStorage.removeItem('user');
    }
  })
}

export default authInfo;
