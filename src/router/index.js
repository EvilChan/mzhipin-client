import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '../containers/Register.vue'
import Login from '../containers/Login.vue'
import Main from '../containers/Main.vue'
import DashenInfo from '../containers/DashenInfo.vue'
import LaobanInfo from '../containers/LaobanInfo.vue'
import Dashen from '../containers/Dashen.vue'
import Laoban from '../containers/Laoban.vue'
import Message from '../containers/Message.vue'
import Personal from '../containers/Personal.vue'

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
      },
      {
        path: '/laobaninfo',
        name: 'LaobanInfo',
        component: LaobanInfo
      },
      {
        path: '/dashen',
        name: 'Dashen',
        component: Dashen
      },
      {
        path: '/laoban',
        name: 'Laoban',
        component: Laoban
      },
      {
        path: '/message',
        name: 'Message',
        component: Message
      },
      {
        path: '/personal',
        name: 'Personal',
        component: Personal
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
