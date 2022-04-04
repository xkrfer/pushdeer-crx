import {useGlobalStore} from "@/edge/popup/useGlobal";
import {useRequest} from "@/hooks/useRequest";

export function useRemoveDevice() {
    const store = useGlobalStore();

    const {run} = useRequest("/device/remove", {
        method: "POST"
    })

    return {
        removeDevice: async (id: number) => {
            await run({
                data: {
                    id
                }
            });
        }
    }
}
