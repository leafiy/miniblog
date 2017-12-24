import Vue from 'vue'
import Router from 'vue-router'

const Index = () =>
  import ( /* webpackChunkName: "index" */ '../pages/index.vue')
const DefaultPage = () =>
  import ( /* webpackChunkName: "index" */ '../pages/defaultPage.vue')
const ResearchPage = () =>
  import ( /* webpackChunkName: "index" */ '../pages/research.vue')
const ProjectPage = () =>
  import ( /* webpackChunkName: "index" */ '../pages/project.vue')
const ArticlePage = () =>
  import ( /* webpackChunkName: "index" */ '../pages/article.vue')

const Login = () =>
  import ( /* webpackChunkName: "user" */ '../pages/login.vue')
const Reg = () =>
  import ( /* webpackChunkName: "user" */ '../pages/reg.vue')
const Admin = () =>
  import ( /* webpackChunkName: "user" */ '../pages/admin.vue')
const Create = () =>
  import ( /* webpackChunkName: "user" */ '../pages/create.vue')

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
