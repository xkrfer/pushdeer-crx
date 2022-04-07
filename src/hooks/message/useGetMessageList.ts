import {useRequest} from "@/hooks/useRequest";
import {computed, ref} from "vue";
import {Utils} from "@/helpers/utils";


export function useGetMessageList() {
    const {run, loading} = useRequest("/message/list_v2", {
        method: "POST"
    })
    const page = ref(1)
    const keyword = ref("")
    const list = ref<any[]>([])
    const totalPage = ref(1)

    const getMessageList = async () => {
        const data = await run({
            data: {
                page: page.value,
                keyword: keyword.value
            }
        })
        if (data.code === 0 && data.content.totalPage >= page.value) {
            totalPage.value = data.content.totalPage
            page.value = data.content.page + 1
            const content: any[] = data.content.messages as any[]
            list.value = [...list.value, ...content].map(message => {
                return {
                    ...message,
                    date: Utils.format(message.created_at, 'YYYY/MM/DD HH:mm:ss').split(" ")
                }
            })
        }
    }
    return {
        getMessageList,
        list,
        page,
        keyword,
        loading,
        disabled: computed(() => {
            return totalPage.value < page.value
        })
    }
}
