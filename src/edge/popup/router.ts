import {createWebHashHistory, createRouter} from "vue-router"
import BasicLayout from "@/components/layout/basic-layout.vue";
import Login from "@/components/popup/login.vue"
import Init from "@/components/popup/init.vue"
import Setting from "@/components/popup/setting.vue"
import Device from "@/components/popup/device.vue"
import Message from "@/components/popup/message.vue"
import Key from "@/components/popup/key.vue"
import Push from "@/components/popup/push.vue"
import BlankLayout from "@/components/layout/blank-layout.vue";
import UserLayout from "@/components/layout/user-layout.vue";
import {useGlobalStore} from "@/edge/popup/useGlobal";

export const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            redirect: "/user",
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
                    redirect: "/user/message",
                    component: UserLayout,
                    children: [
                        {
                            path: "message",
                            name: "Message",
                            component: Message
                        },
                        {
                            path: "device",
                            name: "Device",
                            component: Device
                        },
                        {
                            path: "key",
                            name: "Key",
                            component: Key
                        },
                        {
                            path: "push",
                            name: "Push",
                            component: Push
                        },
                        {
                            path: "setting",
                            name: "Setting",
                            component: Setting
                        }
                    ]
                }
            ]
        }
    ]
});

router.beforeEach(async (to, from, next) => {
    const store = useGlobalStore()
    await store.init()
    if (!store.endpoint) {
        next({
            name: "Login"
        })
    } else {
        if (!store.userInfo) {
            await store.getUserInfo()
        }
        if (to.path.startsWith("/login")) {
            next({
                name: "User"
            })
        } else {
            next()
        }
    }
});
