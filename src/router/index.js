import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/iviews/Login/login'
import Home from '@/iviews/Layout/home'
import Article from '@/iviews/About/article'
import Discuss from '@/iviews/About/discuss'
import Err401 from '@/iviews/Error/401'
import Err404 from '@/iviews/Error/404'

Vue.use(Router)

const routerArr = [
  {
    path: '/', name: 'Home', component: Home
  }, {
    path: '/Login', name: 'Login', component: Login
  }, {
    path: 'About',
    component: Home,
    children: [
      {path: '/About/article', component: Article}, 
      {path: '/About/discuss', component: Discuss}
    ]
  }, {
    path: '/404', name: '404', component: Err404
  }, {
    path: '/401', name: '401', component: Err401
  }
]

export default new Router({
  routes: routerArr
})
