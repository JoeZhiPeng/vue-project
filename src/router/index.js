import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/iviews/Login/login'
import Home from '@/iviews/Layout/home'
import Article from '@/iviews/About/article'
import Discuss from '@/iviews/About/discuss'

Vue.use(Router)

const routerArr = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: 'Login',
    name: 'Login',
    component: Login
  },
  {
    path: 'About',
    component: Home,
    children: [
      {path: '/About/article', component: Article}, 
      {path: '/About/discuss', component: Discuss}
    ]
  }
]

export default new Router({
  routes: routerArr
})
