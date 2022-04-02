import {RouteLocationRaw, useRoute, useRouter} from "vue-router";

export function useNavigation() {
    const router = useRouter()
    const route = useRoute()
    const routerTo = async (to: RouteLocationRaw) => {
        await router.push(to)
    }
    return {
        route,
        router,
        routerTo
    }
}
