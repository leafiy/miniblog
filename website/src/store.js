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
        articleList: [],
        showLogo: false,
        showTab: false,
        logoShowed: false,
        currentProject: ''
    },
    actions: {
        getArticleByTag({ commit, state }, tag) {
            return new Promise((resolve, reject) => {
                api.getArticleByTag(tag).then(res => {
                    let list = res.data.articleList.filter(a => !a.isDraft)
                    resolve(list)
                }).catch(err => {
                    console.log(err)
                    reject(err)
                })
            })
        },
        getArticleList({ commit, state }, data) {
            return new Promise((resolve, reject) => {
                api.getArticleList().then(res => {
                    if (res.data.articleList && res.data.articleList.length) {
                        commit('articleList', res.data.articleList)
                    }
                    resolve()
                }).catch(err => {
                    reject()
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
            if (!state.siteContent) {
                state.siteContent = {}
            }
            state.siteContent[type] = data
            state.siteContent = Object.assign({}, state.siteContent)
        },
        authInfo(state, data) {
            state.authInfo = data;
        },
        token(state, data) {
            state.token = data;
        },
        fileUploading(state, status) {
            state.fileUploading = status;
        },
        currentProject(state, text) {
            state.currentProject = text
        },
        showLogo(state, status) {
            state.showLogo = status
        },
        logoShowed(state, status) {
            state.logoShowed = status
        },
        showTab(state, status) {
            state.showTab = status
        },
        currentArticle(state, data) {
            state.currentArticle = data
        },
        articleList(state, articleList) {
            state.articleList = articleList
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
        articleList: state => state.articleList,
        showLogo: state => state.showLogo,
        showTab: state => state.showTab,
        logoShowed: state => state.logoShowed,
        currentProject: state => state.currentProject
    }
})