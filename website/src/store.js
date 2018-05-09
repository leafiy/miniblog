import Vue from 'vue'
import Vuex from 'vuex'
import api from './api/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authInfo: null,
    token: '',
    fileUploading: false,
    currentArticle: {},
    siteContent: {},
    articleList: {}
  },
  actions: {
    getArticleList({ commit, state }, categroy) {
      api.getArticleList(categroy).then(res => {
        commit('articleList', { data: res.data, categroy: categroy })
      }).catch(err => {
        console.log(err)
      })
    },
    getAllContent({ commit, state }) {
      api.getAllContent().then(res => {
        commit('allContent', res.data)
      }).catch(err => {
        console.log(err)
      })
    },
    updateContent({ commit, state }, data) {
      commit('updateContent', data)
    }
  },
  mutations: {
    allContent(state, data) {
      data.forEach(content => {
        state.siteContent[content.articleType] = content
      })
      state.siteContent = Object.assign({}, state.siteContent)
    },
    updateContent(state, data) {
      let type = data.articleType
      state.siteContent[type] = data
      state.siteContent = Object.assign({}, state.siteContent)
    },
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
    articleList(state, data) {
      let articleList = data.data.articleList
      state.articleList[data.categroy] = articleList
      state.articleList = Object.assign({}, state.articleList)
    }
  },
  getters: {
    authInfo: state => state.authInfo,
    token: state => state.token,
    fileUploading: state => state.fileUploading,
    currentArticle: state => state.currentArticle,
    siteContent: state => state.siteContent,
    articleList: state => state.articleList
  }
})