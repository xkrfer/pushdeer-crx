import {defineStore} from "pinia";
import {adapter} from "@/helpers/adapter";
import {ENDPOINT, GITHUB, TOKEN} from "@/helpers/constants";

type IKey = typeof ENDPOINT | typeof GITHUB | typeof TOKEN

export const useGlobalStore = defineStore("global", {
    state() {
        return {
            endpoint: "",
            github: "",
            token: ""
        }
    },
    actions: {
        async set(key: IKey, value: string) {
            this[key] = value
            await adapter.setStorage(key, value)
        },
        async init() {
            const data = await adapter.getStorage([ENDPOINT, GITHUB, TOKEN])
            this.endpoint = data[ENDPOINT]
            this.github = data[GITHUB]
            this.token = data[TOKEN]
        }
    },
})
