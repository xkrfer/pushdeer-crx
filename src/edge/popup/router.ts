import {createWebHashHistory, createRouter} from "vue-router"
import BasicLayout from "@/components/layout/basic-layout.vue";
import Login from "@/components/popup/login.vue"
import Init from "@/components/popup/init.vue"
import BlankLayout from "@/components/layout/blank-layout.vue";
import UserLayout from "@/components/layout/user-layout.vue";
import {useGlobalStore} from "@/edge/popup/useGlobal";

export const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            redirect: "/login",
            component: BlankLayout,
            children: [
                {
                    path: "login",
                    name: "LoginLayout",
                    redirect: "/login/panel",
                    component: BasicLayout,
                    children: [
                        {
                            path: "panel",
                            name: "Login",
                            component: Login
                        },
                        {
                            path: "init",
                            name: "Init",
                            component: Init
                        }
                    ]
                },
                {
                    path: "user",
                    name: "User",
                    component: UserLayout
                }
            ]
        }
    ]
});

router.beforeEach(async (to, from) => {
    // 如果不是打开login页面，则需要判断是否登录
    if (!to.path.startsWith("/login")) {
        const store = useGlobalStore()
        if (!store.token) {
            await store.init()
        }
        if (!store.token) {
            return router.push("/login")
        }
    }
});
