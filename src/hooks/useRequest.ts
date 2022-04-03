import {ref} from "vue";
import {useGlobalStore} from "@/edge/popup/useGlobal";
import {request} from "@/helpers/request";
import {AxiosRequestConfig} from "axios";

type IConfig = AxiosRequestConfig<any> | undefined

type IConfigFunc = () => IConfig


export const useRequest = (path: string, config?: IConfig | IConfigFunc) => {
    const loading = ref(false)
    const store = useGlobalStore()
    const result = ref()
    const run = async function (body: any = {}): Promise<any> {
        loading.value = true
        const conf = typeof config === 'function' ? config() : config
        const {data = {}, params = {}} = conf ?? {}
        const res = await request(`${store.endpoint}${path}`, {
            ...conf,
            data: Object.assign({}, data, body?.data ?? {}),
            params: Object.assign({}, params, body?.params ?? {}),
        })
        result.value = res
        loading.value = false
        return res
    }
    return {loading, run, data: result};
};
