import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '../containers/Register.vue'
import Login from '../containers/Login.vue'
import Main from '../containers/Main.vue'
import DashenInfo from '../containers/DashenInfo.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      {
        path: '/dasheninfo',
        name: 'DashenInfo',
        component: DashenInfo
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
