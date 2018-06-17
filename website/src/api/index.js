import axios from 'axios'
import Vue from 'vue'
import siteConfig from '../config.js';
if (!siteConfig[process.env.NODE_ENV]) {
    alert('请先完成配置文件和指定node环境')
}
const baseURL = siteConfig[process.env.NODE_ENV].apiPort;
let errorToasted = false;


let instance = axios.create({
    timeout: process.env.NODE_ENV == 'production' ? 100000 : 10000,
    validateStatus: function(status) {
        if (status == 502) {
            if (!errorToasted) {
                Vue.prototype.$Toast({
                    group: 'top-center',
                    title: 'network error',
                    text: 'server communicate faild',
                    icon: 'block',
                    duration: -1,
                    type: 'error',
                    actions: {
                        text: 'retry',
                        cb: () => {
                            location.reload()
                        }
                    }
                })


                errorToasted = true
            }
        }
        return status >= 200 && status < 300; // default
    },
})


function config() {
    const base = {
        baseURL: baseURL
    };
    if (localStorage.getItem('user')) {
        base.headers = { Authorization: 'Bearer ' + localStorage.getItem('user').replace(/(^\")|(\"$)/g, '') };
    }
    return base
}




export default {
    getHeader() {
        return config();
    },
    doReg(data) {
        return instance.post('/user/addUser', data, config())
    },
    logout(data) {
        return instance.post('/user/logout', data, config())
    },
    auth(data) {
        return instance.post('/auth/token', data, config())
    },
    doLogin(data) {
        return instance.post('/auth/local', data, config())
    },
    getAllContent() {
        return instance.get('/article/getAllContent/', config())
    },
    getContent(name) {
        return instance.get('/article/getContent/' + name, config())
    },
    getContentById(id) {
        return instance.get('/article/getContentById/' + id, config())
    },
    getContentByName(name) {
        return instance.get('/article/getContentByName/' + name, config())
    },
    getArticleListAll() {
        return instance.get('/article/getArticleList/all', config())
    },
    getArticleList(category, isDraft = false) {
        // if (isDraft) {
        //   return instance.get('/article/getArticleList/' + category + '/all', config())

        // } else {
        //   return instance.get('/article/getArticleList/' + category, config())

        // }
        return instance.get('/article/getArticleList/', config())
    },
    updateContent(data) {
        return instance.put('/article/updateContent/', data, config())
    },
    createArticle(data) {
        return instance.post('/article/createArticle/', data, config())
    },
    updateArticle(data) {
        return instance.put('/article/updateArticle/', data, config())
    },
    deleteContent(id) {
        return instance.delete('/article/deleteContent/' + id, config())
    },
    updateOrder(data) {
        return instance.post('/article/updateOrder/', data, config())
    },
    upload(data) {
        return instance.post('/uploader/upload', data, config())
    },
    setAsDraft(id) {
        return instance.put('/article/setAsDraft/', { id: id }, config())
    },
    cancleDraft(id) {
        return instance.put('/article/cancleDraft/', { id: id }, config())
    },
    getArticleByTag(tag) {
        return instance.get('/article/getArticleByTag/' + tag, config())
    },
    getArticle(title) {
        return instance.get('/article/getArticle/' + title, config())

    }
}