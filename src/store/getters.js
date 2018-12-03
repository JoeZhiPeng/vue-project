const getters = {
    menus: state => state.permission.menus,
    perms: state => state.permission.perms,
    userInfo: state => state.user.userInfo, //用户所有信息
    accont: state => state.user.accont, //当前登录账号
}

export default getters