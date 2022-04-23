import {useGlobalStore} from "@/edge/useGlobal";
import {useRequest} from "@/hooks/useRequest";
import {onMounted} from "vue";

export function useGetDeviceList() {
    const store = useGlobalStore();
    const listDevice = useRequest('/device/list', {
        method: "POST"
    });
    const list = () => {
        listDevice.run().then(res => {
            store.$patch({
                devices: res?.content?.devices ?? []
            })
        })
    }

    onMounted(() => {
        list();
    });

    return {
        listDevice: list,
        listLoading: listDevice.loading
    }
}
