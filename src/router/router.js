import Vue from 'vue';
import VueRouter from 'vue-router';

const login = () => import( /* webpackChunkName: "login"*/ '@/views/login');
const index = () => import( /* webpackChunkName: "index"*/ '@/views/index');
const notFound = () => import( /* webpackChunkName: "notFound"*/ '@/views/404');

const user = () => import( /* webpackChunkName: "user"*/ '@/components/users/user');
const paying = () => import( /* webpackChunkName: "paying"*/ '@/components/users/paying');
const appointment = () => import( /* webpackChunkName: "appointment"*/ '@/components/users/appointment');
const userInfo = () => import( /* webpackChunkName: "userInfo"*/ '@/components/users/userInfo');
const subscribe = () => import( /* webpackChunkName: "subscribe"*/ '@/components/users/subscribe');
const seats = () => import( /* webpackChunkName: "seats"*/ '@/components/users/seats');
const route = () => import( /* webpackChunkName: "route"*/ '@/components/users/route');
const price = () => import( /* webpackChunkName: "price"*/ '@/components/users/price');
const release = () => import( /* webpackChunkName: "release"*/ '@/components/users/release');
const credentials = () => import( /* webpackChunkName: "credentials"*/ '@/components/users/credentials');
const log = () => import( /* webpackChunkName: "log"*/ '@/components/users/log');
const cities = () => import( /* webpackChunkName: "cities"*/ '@/components/users/cities');
const realname = () => import( /* webpackChunkName: "realname"*/ '@/components/users/realname');

const routes = [
  {
    name: 'index',
    path: '/index',
    component: index,
    children: [{
      name: 'user',
      path: 'user',
      component: user
    }, {
      name: 'paying',
      path: 'paying',
      component: paying
    },
    {
      name: 'appointment',
      path: 'appointment',
      component: appointment
    },
    {
      name: 'userInfo',
      path: 'userInfo',
      component: userInfo
    },
    {
      name: 'subscribe',
      path: 'subscribe',
      component: subscribe
    },
    {
      name: 'seats',
      path: 'seats',
      component: seats
    },
    {
      name: 'route',
      path: 'route',
      component: route
    },
    {
      name: 'price',
      path: 'price',
      component: price
    },
    {
      name: 'release',
      path: 'release',
      component: release
    },
    {
      name: 'credentials',
      path: 'credentials',
      component: credentials
    },
    {
      name: 'log',
      path: 'log',
      component: log
    },
    {
      name: 'cities',
      path: 'cities',
      component: cities
    },
    {
      name: 'realname',
      path: 'realname',
      component: realname
    }
    ]
  },
  {
    name: 'login',
    path: '/login',
    component: login
  },
  {
    name: 'login',
    path: '/',
    redirect: '/login',
    component: login
  },
  {
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