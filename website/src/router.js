import Vue from 'vue'
import Router from 'vue-router'

const Index = () =>
    import ( /* webpackChunkName: "Web" */ './pages/index.vue')
const ListPage = () =>
    import ( /* webpackChunkName: "Web" */ './pages/list.vue')
const DefaultPage = () =>
    import ( /* webpackChunkName: "Web" */ './pages/defaultPage.vue')
const ArticleList = () =>
    import ( /* webpackChunkName: "Web" */ './pages/articleList.vue')
const ArticlePage = () =>
    import ( /* webpackChunkName: "Web" */ './pages/article.vue')
const AboutPage = () =>
    import ( /* webpackChunkName: "Web" */ './pages/about.vue')
const Admin = () =>
    import ( /* webpackChunkName: "Admin" */ './pages/admin.vue')
const Login = () =>
    import ( /* webpackChunkName: "Admin" */ './pages/login.vue')
const Reg = () =>
    import ( /* webpackChunkName: "Admin" */ './pages/reg.vue')
const Create = () =>
    import ( /* webpackChunkName: "Admin" */ './components/admin/create.vue')
const AdminHome = () =>
    import ( /* webpackChunkName: "Admin" */ './components/admin/home.vue')
const AdminAbout = () =>
    import ( /* webpackChunkName: "Admin" */ './components/admin/about.vue')
const ArticleManage = () =>
    import ( /* webpackChunkName: "Admin" */ './components/admin/articleManage.vue')

Vue.use(Router)

const routes = [{
        path: '/',
        name: 'index',
        component: Index,
        meta: { auth: false, level: 0 },
        children: [

            {
                path: '/project/:projectName',
                name: 'list',
                component: ListPage,
                meta: { auth: false, level: 1 },
                children: [{
                    path: '/article/:title',
                    name: 'article',
                    component: ArticlePage,
                    meta: { auth: false, level: 2 }
                }, ]
            },

        ]
    },

    // , {
    //     path: '/concepts',
    //     name: 'concepts',
    //     component: ArticleList,
    //     meta: { auth: false }
    // },
    // {
    //     path: '/article/:category/:title',
    //     name: 'Article',
    //     component: ArticlePage,
    //     meta: { auth: false }
    // }, {
    //     path: '/methods',
    //     name: 'methods',
    //     component: ArticleList,
    //     meta: { auth: false }
    // },
    // {
    //   path: '/methods/:title',
    //   name: 'MethodsArticle',
    //   component: ArticlePage,
    //   meta: { auth: false }
    // },
    // {
    //     path: '/cases',
    //     name: 'caseStudies',
    //     component: ArticleList,
    //     meta: { auth: false }
    // },
    //  {
    //   path: '/caseStudies/:title',
    //   name: 'CaseStudiesArticle',
    //   component: ArticlePage,
    //   meta: { auth: false }
    // },
    {
        path: '/tag/:tag',
        name: 'Tag',
        component: ArticleList,
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
        path: '/admin',
        name: 'Admin',
        component: Admin,
        meta: { auth: true },
        children: [{
                path: '',
                name: 'AdminAbout',
                component: AdminAbout,
                meta: { auth: true }
            },
            {
                path: 'about',
                name: 'AdminAbout',
                component: AdminAbout,
                meta: { auth: true }
            },
            {
                path: 'articles',
                name: 'articles',
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


router.beforeEach(({ meta, path }, from, next) => {
    let { auth = true } = meta;
    let isLogin = !!localStorage.getItem('user');
    if (isLogin && (path == '/login' || path == '/reg')) {
        return next({ path: '/' })
    }
    if (auth && !isLogin) {
        return next({ path: '/' })
    }

    next()
})

router.afterEach((to, from, next) => {

});


export default router;