import {useRequest} from "@/hooks/useRequest";
import {ElMessage} from "element-plus/es";

export function useCreateKey() {
    const {run, loading} = useRequest("/key/gen", {
        method: "POST"
    })

    return {
        createKey: async () => {
            const data = await run()
            if (data.code === 0) {
                ElMessage.success('新增Key成功')
            }
        },
        createLoading: loading
    }
}
