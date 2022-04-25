import {createWebHashHistory, createRouter} from "vue-router"
import BlankLayout from "@/components/layout/blank-layout.vue";
import Message from "@/components/options/message.vue";
import Locked from "@/components/options/locked.vue";
import NotAuth from "@/components/options/403.vue";
import NotFound from "@/components/options/404.vue";

import {useGlobalStore} from "@/edge/useGlobal";

export const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            redirect: "/message",
            component: BlankLayout,
            children: [
                {
                    path: "message",
                    name: "Message",
                    component: Message
                },
                {
                    path: "locked",
                    name: "Locked",
                    component: Locked
                },
                {
                    path: '403',
                    name: "NotAuthorized",
                    component: NotAuth
                },
                {
                    path: '/:pathMatch(.*)*',
                    name: 'NotFound',
                    component: NotFound
                },
            ]
        }
    ]
});

router.beforeEach(async (to, from, next) => {
    const store = useGlobalStore()
    await store.init()
    // 先做成本地的
    if (to.path === '/locked') {
        if (store.locked) {
            next()
        } else {
            next('/message')
        }
        return
    }
    next();
});
