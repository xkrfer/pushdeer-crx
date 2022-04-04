import {ENDPOINT, GITHUB} from "@/helpers/constants";

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
                    const result: any = {}
                    key.forEach(k => {
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

    async loginGithub() {
        const data = await this.getStorage([ENDPOINT, GITHUB])
        await chrome.tabs.create({url: `https://github.com/login/oauth/authorize?client_id=${data[GITHUB]}&redirect_uri=${data[ENDPOINT]}/login/github`})
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new Adapter()
        }
        return this.instance
    }
}

export const adapter = Adapter.getInstance()
