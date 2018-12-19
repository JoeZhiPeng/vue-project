// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import instance from '@/global/http'
import iview from 'iview'
import Cookies from 'js-cookie';
import 'iview/dist/styles/iview.css'

Vue.config.productionTip = false

Vue.use(iview)
Vue.prototype.$instance = instance; //将封装的axios挂载到vue的原型上


 /*在跳转之前执行*/
router.beforeEach((to, from, next) => {
  if (Cookies.get('refresh')) {
    if (!store.getters.accont) { //判断当前是否是刷新页面的操作，是的话，重新获取菜单
      store.dispatch('getUserInfo').then((res)=> {
        next()
      })
    
    } else {
      if (to.path == '/') {
        next()
      } else if (to.path == '/Login') { //当其再访问登录页面（to.path === '/login'）时，可直接重定向到首页
        next()
      } else {
        next()
      }
    } 
  } else if (to.path != '/Login'){
      next({
        path: 'Login'
      })
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
