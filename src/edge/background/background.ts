// 插件id
import {MessageType, receiveMessageFromContent} from "@/helpers/message";
import {adapter} from "@/helpers/adapter";
import {ENDPOINT, TOKEN} from "@/helpers/constants";

const CHROME_ID = chrome.runtime.id
receiveMessageFromContent(async (message, sendResponse) => {
    switch (message.type) {
        case MessageType.GET_BACKGROUND_CHROME_ID:
            sendResponse(CHROME_ID)
            await handlerToken(message.data)
            break
        default:
            break
    }
})

// 处理token
async function handlerToken(data: { token: string, origin: string }) {
    if (data.token && data.origin) {
        const endpoint = await adapter.getStorage(ENDPOINT)
        if (data.origin === endpoint) {
            await adapter.setStorage(TOKEN, data.token)
        }
    }
}
