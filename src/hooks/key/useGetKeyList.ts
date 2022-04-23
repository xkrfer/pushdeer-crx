import {useGlobalStore} from "@/edge/useGlobal";
import {useRequest} from "@/hooks/useRequest";
import {computed, onMounted} from "vue";
import {Utils} from "@/helpers/utils";

export function useGetKeyList() {
    const store = useGlobalStore()
    const {run, data, loading} = useRequest("/key/list", {
        method: "POST"
    })

    const getKeyList = async () => {
        const res = await run()
        if (res.code === 0) {
            const keys = res?.content?.keys ?? []
            let pushkeys = keys.map((item: any) => item.key)
            store.$patch({
                pushkeys
            })
        }
    }

    onMounted(async () => {
        await getKeyList()
    })

    const keyList = computed(() => {
        return (data.value?.content?.keys ?? []).map((key: any) => {
            const {created_at} = key
            return {
                ...key,
                created_at: Utils.format(created_at)
            }
        })
    })


    return {
        keyList,
        getKeyList,
        listLoading: loading
    }
}
