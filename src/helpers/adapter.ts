import {ENDPOINT, GITHUB} from "@/helpers/constants";
import {Message} from "@/helpers/message";
import logo from "@/assets/logo.png"
// @ts-ignore
import md5 from "md5";

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

    async clearStorage() {
        if (import.meta.env.DEV) {
            localStorage.clear()
            return
        }
        await chrome.storage.local.clear()
    }

    async loginGithub() {
        const data = await this.getStorage([ENDPOINT, GITHUB])
        const url = `https://github.com/login/oauth/authorize?client_id=${data[GITHUB]}&redirect_uri=${data[ENDPOINT]}/login/github`
        await this.openUrl(url)
    }

    async openUrl(url: string) {
        if (import.meta.env.DEV) {
            return window.open(url)
        }
        await chrome.tabs.create({url})
    }

    async setBadge(text: string = "new", color: [number, number, number, number] = [255, 0, 0, 255]) {
        if (import.meta.env.DEV) return
        await chrome.action.setBadgeText({text})
        await chrome.action.setBadgeBackgroundColor({color});
    }

    async clearBadge() {
        if (import.meta.env.DEV) return
        await chrome.action.setBadgeText({text: ""})
    }

    emit(message: Message) {
        if (import.meta.env.DEV) return
        chrome.runtime.sendMessage(message, (response) => {
        })
    }

    on(callback: (message: any, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) => void) {
        if (import.meta.env.DEV) return
        try {
            chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
                callback(message, sender, sendResponse)
            })
        } catch (e) {
            console.log('chrome error', chrome.runtime.lastError?.message)
        }

    }

    async notifications(message: string, title: string = "有新消息啦！") {
        chrome.notifications.create({
            type: "basic",
            iconUrl: logo,
            title,
            message
        });
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new Adapter()
        }
        return this.instance
    }

    md5(message: string) {
        return md5(message)
    }
}

export const adapter = Adapter.getInstance()
