import Vue from 'vue'
import Router from 'vue-router'

import Index from './pages/index.vue'
import DefaultPage from './pages/defaultPage.vue'
import ArticleList from './pages/articleList.vue'
import ArticlePage from './pages/article.vue'
import Login from './pages/login.vue'
import Reg from './pages/reg.vue'
import AboutPage from './pages/about.vue'
import Admin from './pages/admin.vue'
import Create from './components/admin/create.vue'
import AdminHome from './components/admin/home.vue'
import AdminAbout from './components/admin/about.vue'
import ArticleManage from './components/admin/articleManage.vue'
import addCopyText from './utils/addCopyText.js'
Vue.use(Router)

const routes = [{
    path: '/',
    name: 'Index',
    component: Index,
    meta: { auth: false, keepAlive: true }
  }, {
    path: '/about',
    name: 'About',
    component: AboutPage,
    meta: { auth: false, keepAlive: true }
  }, {
    path: '/concepts',
    name: 'Concept',
    component: ArticleList,
    meta: { auth: false, keepAlive: true }
  },
  {
    path: '/concept/:title',
    name: 'ConceptArticle',
    component: ArticlePage,
    meta: { auth: false, keepAlive: true }
  }, {
    path: '/methods',
    name: 'Method',
    component: ArticleList,
    meta: { auth: false, keepAlive: true }
  }, {
    path: '/method/:title',
    name: 'MethodsArticle',
    component: ArticlePage,
    meta: { auth: false, keepAlive: true }
  }, {
    path: '/cases',
    name: 'Case',
    component: ArticleList,
    meta: { auth: false, keepAlive: true }
  }, {
    path: '/case/:title',
    name: 'CaseArticle',
    component: ArticlePage,
    meta: { auth: false, keepAlive: true }
  },
  {
    path: '/tag/:tag',
    name: 'Tag',
    component: ArticleList,
    meta: { auth: false, keepAlive: true }
  }, {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { auth: false }
  }, {
    path: '/reg',
    name: 'Reg',
    component: Reg,
    meta: { auth: false }
  }, {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: { auth: true },
    children: [{
        path: '',
        name: 'AdminHome',
        component: AdminHome,
        meta: { auth: true }
      },
      {
        path: 'home',
        name: 'AdminHome',
        component: AdminHome,
        meta: { auth: true }
      },
      {
        path: 'about',
        name: 'AdminAbout',
        component: AdminAbout,
        meta: { auth: true }
      },
      {
        path: 'concept',
        name: 'AdminConcept',
        component: ArticleManage,
        meta: { auth: true }
      },
      {
        path: 'method',
        name: 'AdminMethod',
        component: ArticleManage,
        meta: { auth: true }
      },
      {
        path: 'case',
        name: 'AdminCase',
        component: ArticleManage,
        meta: { auth: true }
      }
    ]
  }, {
    path: '/admin/create/:category',
    name: 'Create',
    component: Create,
    meta: { auth: true }
  }, {
    path: '/admin/articleEdit/:id',
    name: 'ArticleEdit',
    component: Create,
    meta: { auth: true }
  },
  {
    path: '*',
    name: '404',
    component: DefaultPage,
    meta: { auth: false }
  }
]

const router = new Router({
  mode: 'history',
  saveScrollPosition: true,
  routes,
})


let copyListened = false
router.beforeEach(({ meta, path }, from, next) => {
  let { auth = true } = meta;
  let isLogin = !!localStorage.getItem('user');
  if (isLogin && (path == '/login' || path == '/reg')) {
    return next({ path: '/*' })
  }
  if (auth && !isLogin) {
    return next({ path: '/' })
  }
  if (path.indexOf('admin') == -1) {
    if (!copyListened) {
      document.addEventListener('copy', addCopyText);
      copyListened = true
      console.log(addCopyText)
    }
  } else {
    if (copyListened) {
      document.removeEventListener('copy', addCopyText);
      copyListened = false
    }
  }
  next()
})

router.afterEach((to, from, next) => {

});


export default router;