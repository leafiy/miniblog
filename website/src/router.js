import Vue from 'vue'
import Router from 'vue-router'

import Index from './pages/index.vue'
import DefaultPage from './pages/defaultPage.vue'
import ResearchPage from './pages/research.vue'
import ProjectPage from './pages/project.vue'
import ArticlePage from './pages/article.vue'
import Login from './pages/login.vue'
import Reg from './pages/reg.vue'
import Admin from './pages/admin.vue'
import Create from './pages/create.vue'

Vue.use(Router)

const routes = [{
    path: '/',
    name: 'Index',
    component: Index,
    meta: { auth: false }
  }, {
    path: '/research',
    name: 'ResearchPage',
    component: ResearchPage,
    meta: { auth: false }
  }, {
    path: '/project',
    name: 'ProjectPage',
    component: ProjectPage,
    meta: { auth: false }
  }, {
    path: '/article/:name',
    name: 'ArticlePage',
    component: ArticlePage,
    meta: { auth: false }
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
    path: '/admin/:panel',
    name: 'Admin',
    component: Admin,
    meta: { auth: true }
  }, {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: { auth: true }
  }, {
    path: '/admin/create/article/:type',
    name: 'Create',
    component: Create,
    meta: { auth: true }
  }, {
    path: '/admin/create/article/edit/:id',
    name: 'Create',
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



router.beforeEach(({ meta, path }, from, next) => {
  let { auth = true } = meta;
  let isLogin = !!localStorage.getItem('user');
  if (isLogin && (path == '/login' || path == '/reg')) {
    return next({ path: '/*' })
  }
  if (auth && !isLogin) {
    return next({ path: '/' })
  }
  next()
})

router.afterEach((to, from, next) => {

});


export default router;