import {defineStore} from "pinia";
import {adapter} from "@/helpers/adapter";
import {DEVICE_ID, ENDPOINT, GITHUB, PIN, TOKEN} from "@/helpers/constants";
import {request} from "@/helpers/request";
import {ElMessage} from "element-plus";
import {MessageType} from "@/helpers/message";

type IKey = typeof ENDPOINT | typeof GITHUB | typeof TOKEN | typeof DEVICE_ID | typeof PIN

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
    pin: string,
    passed: boolean
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
            pin: '',
            passed: false
        }
    },
    actions: {
        async set(key: IKey, value: string) {
            this[key] = value
            await adapter.setStorage(key, value)
        },
        async init() {
            if (this.mounted) return
            const data = await adapter.getStorage([ENDPOINT, GITHUB, TOKEN, DEVICE_ID, PIN])
            this.endpoint = data[ENDPOINT]
            this.github = data[GITHUB]
            this.token = data[TOKEN]
            this.device_id = data[DEVICE_ID]
            this.pin = data[PIN]
            if (this.pin) {
                this.passed = false
            }
            this.mounted = true
            if (import.meta.env.DEV) {
                this.token = "6e48a9edc5e64f92b9bd7c97fd470019"
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
            this.pin = ''
            await adapter.clearStorage()
            await adapter.emit({
                type: MessageType.CLEAR
            })
        }
    },
})
