import {useRequest} from "@/hooks/useRequest";
import {ElMessage} from "element-plus/es";

export function useRegen() {
    const {run, loading} = useRequest("/key/regen", {
        method: "POST",
    })

    return {
        regenKey: async (id: number) => {
            const data = await run({
                data: {
                    id
                }
            })
            if (data.code === 0) {
                ElMessage.success('重置Key成功')
            }
        },
        regenLoading: loading
    }
}
