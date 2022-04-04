import {useRequest} from "@/hooks/useRequest";
import {ElMessage} from "element-plus";

export function useRemoveKey() {
    const {run} = useRequest("/key/remove", {
        method: "POST",
    })

    return {
        removeKey: async (id: number) => {
            const data = await run({
                data: {
                    id
                }
            })
            if (data.code === 0) {
                ElMessage.success('删除Key成功')
            }
        }
    }
}
