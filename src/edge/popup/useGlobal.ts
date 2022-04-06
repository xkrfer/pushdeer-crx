import {defineStore} from "pinia";
import {adapter} from "@/helpers/adapter";
import {DEVICE_ID, ENDPOINT, GITHUB, TOKEN} from "@/helpers/constants";
import {request} from "@/helpers/request";
import {ElMessage} from "element-plus";
import {MessageType} from "@/helpers/message";

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
    devices: any[],
    pushkeys: string[],
    messageRandom: number,
}, any, any>("global", {
    state() {
        return {
            endpoint: "",
            github: "",
            token: "",
            userInfo: undefined,
            mounted: false,
            device_id: "",
            devices: [],
            pushkeys: [],
            messageRandom: 0,
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
                this.token = "97e63159f2934a35a3508cbd5ecd1785"
            }
        },
        async getUserInfo(): Promise<any> {
            if (!this.endpoint) {
                ElMessage.error("请先配置服务器地址")
                return false
            }
            const data = await request({
                url: `${this.endpoint}/user/info`,
                method: "POST",
                data: {
                    token: this.token
                }
            }).catch(async () => {
                await adapter.setStorage(TOKEN, "")
            })
            // @ts-ignore
            if (data?.code === 0) {
                // @ts-ignore
                this.userInfo = data.content
            }

            return !!data
        },

        async clear() {
            this.endpoint = ""
            this.github = ""
            this.token = ""
            this.userInfo = undefined
            this.mounted = false
            this.device_id = ""
            this.devices = []
            this.pushkeys = []
            this.messageRandom = 0
            await adapter.clearStorage()
            await adapter.emit({
                type: MessageType.CLEAR
            })
        }
    },
})
