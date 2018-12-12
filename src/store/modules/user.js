import { resolve } from "url";
import { rejects } from "assert";
import Cookies from 'js-cookie';
import instance from '@/global/http'

const user = {
    state: {
        accont: "",
        password: "",
        userInfo: null
    },
    mutations: {
        SET_USERINFO: (state, userInfo) => {
            state.userInfo = userInfo
        },
        SET_ACCONT: (state, accont) => {
            state.accont = accont
        }
    },
    actions: {
        Login({commit}, userInfo) {
            return new Promise( (resolve, reject) => {
                instance.post('/proxy/login', userInfo).then(res => { 
                    if (res.status == 200 && res.data.data.success) {
                        Cookies.set('accont', userInfo.user)
                        Cookies.set('refresh', true)
                        resolve()
                    } else {
                        reject(res.data.errorMsg)
                    }
                })
            })
        },
        getUserInfo({dispatch, commit, state}) {
            return new Promise( (resolve, reject) => {
                // instance.post('/proxy/findMenuPerms').then(res => {
                instance.post('/proxy/find/newMenus').then(res => {
                    let accont = Cookies.get('accont')
                    commit('SET_ACCONT', accont)
                    let menusArr = res.data.data.menus
                    // let permsArr = res.data.data.perms
                    dispatch('GetMenus', menusArr) // 菜单
                    // dispatch('GetPerms', permsArr) // 权限
                    resolve(res)
                }).catch(err => {
                    reject(res.data.errorMsg)
                })
            })
        }     
    }
}

export default user