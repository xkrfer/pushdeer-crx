import {useGlobalStore} from "@/edge/popup/useGlobal";
import {useRequest} from "@/hooks/useRequest";
import {storeToRefs} from "pinia";

export function useCreateDevice() {
    const store = useGlobalStore()
    const {device_id} = storeToRefs(store)
    const {run} = useRequest("/device/reg", () => ({
        method: "POST",
        data: {
            name: "Browser",
            device_id: device_id.value,
            is_clip: 0,
            type: "github"
        }
    }))

    return {
        createDevice: async () => {
            await run()
        },
        device_id: device_id
    }
}
