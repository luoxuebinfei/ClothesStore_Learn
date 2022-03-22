import axios from "axios";
import Element from "element-ui";
import router from "./router";
import store from "vuex";

//链接前缀
axios.defaults.baseURL = "http://localhost:8100"

//前置拦截
axios.interceptors.request.use(config => {
    return config
})

axios.interceptors.response.use(response => {
        let res = response.data;
        console.log("================");
        console.log(res);
        console.log("================");

        if (res.code === 200) {
            return response
        } else {
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