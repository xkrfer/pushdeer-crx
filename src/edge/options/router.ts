import {createWebHashHistory, createRouter} from "vue-router"
import BlankLayout from "@/components/layout/blank-layout.vue";
import Message from "@/components/options/message.vue";
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
            ]
        }
    ]
});

router.beforeEach(async (to, from, next) => {
    const store = useGlobalStore()
    await store.init()
    next();
});
