import Vue from 'vue'
import Vuex from 'vuex'
import permission from './modules/permission'
import user from './modules/user'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        permission,//权限以及菜单
        user
    },
    getters: getters
})

export default store