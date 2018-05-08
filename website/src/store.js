import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authInfo: null,
    token: '',
    fileUploading: false,
    currentArticle: null,
  },
  mutations: {
    authInfo(state, data) {
      state.authInfo = data;
    },
    token(state, data) {
      state.token = data;
    },
    fileUploading(state, data) {
      state.fileUploading = status;
    },
    currentArticle(state, data) {
      state.currentArticle = data
    },
  },
  getters: {
    authInfo: state => state.authInfo,
    token: state => state.token,
    fileUploading: state => state.fileUploading,
    currentArticle: state => state.currentArticle
  }
})