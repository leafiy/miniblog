import Vue from 'vue'
import Vuex from 'vuex'
import api from './api/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authInfo: null,
    token: '',
    fileUploading: false,
    currentArticle: null,
    siteContent: null,
    articleList: null
  },
  actions: {
    getArticleByTag({ commit, state }, tag) {
      return new Promise((resolve, reject) => {
        api.getArticleByTag(tag).then(res => {
          resolve(res.data.articleList)
        }).catch(err => {
          console.log(err)
          reject(err)
        })
      })
    },
    getArticleList({ commit, state }, categroy) {
      return new Promise((resolve, reject) => {
        api.getArticleList(categroy).then(res => {
          if (res.data.articleList && res.data.articleList.length) {
            commit('articleList', { data: res.data, categroy: categroy })
          }
          resolve(res.data)
        }).catch(err => {
          reject(err)
          console.log(err)
        })
      })
    },
    getAllContent({ commit, state }) {
      return new Promise((resolve, reject) => {
        api.getAllContent().then(res => {
          if (res.data.length) {
            commit('allContent', res.data)
          }
          resolve(res.data)
        }).catch(err => {
          reject(err)
          console.log(err)
        })
      })
    },
    updateContent({ commit, state }, data) {
      commit('updateContent', data)
    }
  },
  mutations: {
    allContent(state, data) {
      data.forEach(content => {
        if (!state.siteContent) {
          state.siteContent = {}
        }
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
      if (!state.articleList) {
        state.articleList = {}
      }
      state.articleList[data.categroy] = articleList
      state.articleList = Object.assign({}, state.articleList)
    },
    newArticle(state, data) {
      let category = data.category
      let id = data._id
      if (!state.articleList) {
        state.articleList = {}
      }
      if (!state.articleList[category]) {
        state.articleList[category] = [data]
      } else {
        let list = state.articleList[category].map(o => o['_id'])
        if (list.includes(id)) {
          for (let [index, article] of state.articleList[category].entries()) {
            if (article._id == id) {
              state.articleList[category].splice(index, 1, data)
            }
          }

        } else {
          state.articleList[category].unshift(data)
        }

      }


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