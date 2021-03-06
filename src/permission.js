import router from "./router";

//路由判断登录
router.beforeEach((to, from, next) => {

    if (to.matched.some(record => record.meta.requireAuth)) { // 判断该路由是否需要登录权限

        const token = localStorage.getItem("token")
        console.log("------------" + token)

        if (token) { // 判断当前的token是否存在 ； 登录存入的token
            if (to.path === '/login') {
                //如果路径是登录页面
            } else {
                next()
            }
        } else {
            next({
                path: '/login'
            })
        }
    } else {
        next()
    }
    if (to.path == '/login') {
        //保存当前路由
        localStorage.setItem("preRoute", router.currentRoute.fullPath)
    } else {
        next()
    }

})