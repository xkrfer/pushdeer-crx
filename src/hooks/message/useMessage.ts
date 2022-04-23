import {adapter} from "@/helpers/adapter";
import {onMounted} from "vue";
import {useGetMessageList} from "@/hooks/message/useGetMessageList";
import {MessageType} from "@/helpers/message";

export function useMessage() {
    const {getMessageList, list, disabled, page, keyword, refresh, loading} = useGetMessageList()
    const load = async () => {
        if (disabled.value) return
        await getMessageList()
    }

    const search = async () => {
        page.value = 1
        list.value = []
        await getMessageList()
    }
    onMounted(async () => {
        await adapter.clearBadge()
        adapter.on((message, sender, sendResponse) => {
            if (message.type === MessageType.REFRESH) {
                refresh()
                adapter.clearBadge()
            }
            sendResponse('ok')
        })
    })
    return {
        load,
        loading,
        search,
        keyword,
        list,
        getMessageList
    }
}
