import { resolve } from "url";

const permission = {
    state: {
       menus: null,
       perms: null
    },
    mutations: {
        SET_MENUS: (state, menus) => {
            state.menus = menus
        },
        SET_PERMS: (state, perms) => {
            state.perms = perms
        }
    },
    actions: {
        GetMenus({ commit }, data) {
            return new Promise(resolve => {
                commit('SET_MENUS', data)
                resolve()
            })
        },
        GetPerms({ commit }, data) {
            return new Promise(resolve => {
                commit('SET_PERMS', data)
                resolve()
            })
        }
    },
}

export default permission