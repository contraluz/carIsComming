import Vue from 'vue';
import VueRouter from 'vue-router';

const login = () => import(/* webpackChunkName: "login"*/ '@/views/login');
const index = () => import(/* webpackChunkName: "index"*/ '@/views/index');
const notFound = () => import(/* webpackChunkName: "notFound"*/ '@/views/404');

const user = () => import(/* webpackChunkName: "user"*/ '@/components/user/user');

const routes = [
  {
    name: 'Index',
    path: '/',
    component: index,
    children: [
      {
        name: 'user',
        path: '/user',
        component: user
      }
    ]
  },
  {
    name: 'login',
    path: '/login',
    component: login
  }, {
    name: 'notFound',
    path: '*',
    component: notFound
  },
]
Vue.use(VueRouter);

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (sessionStorage && to.path !== '/login') {
    sessionStorage.getItem("isLogin") ? next() : next('/login')
    return;
  }
  next()
})

export default router;