import axios from "axios";
import Element from "element-ui";
import router from "./router";
import store from "./store";

//链接前缀
axios.defaults.baseURL = "http://localhost:8100"



//前置拦截
axios.interceptors.request.use(config => {
    let token = store.getters.getToken;
    if (token===null || token.length!=0){
        config.headers.common['Authorization']=token;
    }
    return config
})

axios.interceptors.response.use(response => {
        let res = response.data;
        console.log("================");
        console.log(res);
        console.log("================");

        if (res.code === 200) {
            return response
        } else if (res.code === 2010 || res.code === 2011 || res.code === 2012){
            //token为空，错误，失效
            store.commit("REMOVE_INFO");
            Element.MessageBox.confirm("Token验证错误，即将跳转到登录页面，是否继续?","提示",{
                confirmButtonText:'确定',
                cancelButtonText:'取消',
                type:'warning'
            }).then(()=>{
                //跳转到登录界面
                setTimeout(() => {
                    router.push("/login");
                }, 2000);
            }).catch(()=>{
                //跳转到主页
                setTimeout(() => {
                    router.push("/");
                }, 2000);
            });
            Element.Message.error(res.msg, {
                duration: 3 * 1000
            })
            return Promise.reject(response.data.msg)
        }else {
            //将服务器返回的错误信息弹窗出来
            Element.Message.error(res.msg, {
                duration: 3 * 1000
            })
            return Promise.reject(response.data.msg)
        }
    },
    error => {
        console.log(error);
        if (error.response.data) {
            error.Message = error.response.data.msg;
        }
        if (error.response.status === 401) {
            store.commit("REMOVE_INFO");
            router.push("/login");
        }
        Element.Message.error(error.Message, {
            duration: 3 * 1000
        });
        return Promise.reject(err);
    }
)