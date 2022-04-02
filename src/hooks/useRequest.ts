import {ref} from "vue";
import {useGlobalStore} from "@/edge/popup/useGlobal";
import {request} from "@/helpers/request";
import {AxiosRequestConfig} from "axios";

export const useRequest = (path: string, config?: AxiosRequestConfig<any> | undefined) => {
    const loading = ref(false)
    const store = useGlobalStore()
    const data = ref()
    const run = async function () {
        loading.value = true
        const res = await request(`${store.endpoint}${path}`, config)
        data.value = res
        loading.value = false
        return res
    }
    return {loading, run, data};
};
