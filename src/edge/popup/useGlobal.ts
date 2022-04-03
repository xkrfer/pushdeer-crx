import {defineStore} from "pinia";
import {adapter} from "@/helpers/adapter";
import {ENDPOINT, GITHUB, TOKEN, DEVICE_ID} from "@/helpers/constants";
import {request} from "@/helpers/request";

type IKey = typeof ENDPOINT | typeof GITHUB | typeof TOKEN | typeof DEVICE_ID;

export interface IUser {
    id: number;
    uid: string;
    name: string;
    email: string;
    apple_id: string;
    wechat_id?: any;
    level: number;
    created_at: Date;
    updated_at: Date;
}

export const useGlobalStore = defineStore<'global', {
    endpoint: string,
    github: string,
    token: string,
    userInfo?: IUser,
    mounted: boolean,
    device_id: string,
    devices: any[]
}, any, any>("global", {
    state() {
        return {
            endpoint: "",
            github: "",
            token: "",
            userInfo: undefined,
            mounted: false,
            device_id: "",
            devices: []
        }
    },
    actions: {
        async set(key: IKey, value: string) {
            this[key] = value
            await adapter.setStorage(key, value)
        },
        async init() {
            if (this.mounted) return
            const data = await adapter.getStorage([ENDPOINT, GITHUB, TOKEN])
            this.endpoint = data[ENDPOINT]
            this.github = data[GITHUB]
            this.token = data[TOKEN]
            this.device_id = data[DEVICE_ID]
            this.mounted = true
            if (import.meta.env.DEV) {
                this.token = "1622adf32458455b805e4e1fd38b4a2d"
            }
        },
        async getUserInfo(): Promise<any> {
            const data = await request({
                url: `${this.endpoint}/user/info`,
                method: "POST",
                data: {
                    token: this.token
                }
            })
            // @ts-ignore
            this.userInfo = data.content
            return data
        }
    },
})
