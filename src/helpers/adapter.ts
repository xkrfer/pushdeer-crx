import {ENDPOINT, GITHUB, TOKEN} from "@/helpers/constants";
import mitt from 'mitt'

const emitter = mitt()

class Adapter {

    private static instance: Adapter;

    setStorage(key: string, value: any) {
        return new Promise<boolean>((resolve) => {
            if (import.meta.env.DEV) {
                localStorage.setItem(key, value)
                resolve(true)
            } else {
                chrome.storage.local.set({[key]: value}, () => {
                    resolve(true)
                })
            }
        })
    }

    getStorage(key: string | string[]) {
        return new Promise<any>((resolve) => {
            if (import.meta.env.DEV) {
                if (Array.isArray(key)) {
                    const result = {}
                    key.forEach(k => {
                        // @ts-ignore
                        result[k] = localStorage.getItem(k)
                    })
                    resolve(result)
                } else {
                    resolve(localStorage.getItem(key))
                }
            } else {
                chrome.storage.local.get(key, (result) => {
                    if (Array.isArray(key)) {
                        resolve(result)
                    } else {
                        resolve(result[key])
                    }
                })
            }
        })
    }

    on(event: string, callback: (...args: any[]) => void) {
        emitter.on(event, callback)
    }

    emit(event: string, ...args: any[]) {
        // @ts-ignore
        emitter.emit(event, ...args)
    }

    async loginGithub() {
        const data = await this.getStorage([ENDPOINT, GITHUB])
        if (import.meta.env.DEV) {
            // window.open(`https://github.com/login/oauth/authorize?client_id=${data[GITHUB]}&redirect_uri=${data[ENDPOINT]}/login/github`)
            return "aeee171482304ce2b98d48e214330700"
        }
        return ""
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new Adapter()
        }
        return this.instance
    }
}

export const adapter = Adapter.getInstance()
