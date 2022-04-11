// 插件id
import {MessageType, receiveMessageFromContent} from "@/helpers/message";
import {ping, polling} from "@/helpers/polling";
import {State} from "@/helpers/state";
import {adapter} from "@/helpers/adapter";
import {CONNECT_NAME} from "@/helpers/constants";

const CHROME_ID = chrome.runtime.id
let LOCKED = true
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
    if (data?.token && data?.origin) {
        const endpoint = await State.getInstance().getEndpoint()
        if (data.origin === endpoint) {
            const res = await ping(data.token)
            if (res) {
                await State.getInstance().setToken(data.token)
                await adapter.clearBadge()
            }
        }
    }
}


adapter.on((message, sender, sendResponse) => {
    switch (message.type) {
        case MessageType.POPUP_OPEN:
            sendResponse('background:ok')
            break
        case MessageType.POPUP_CLOSE:
            sendResponse('background:ok')
            break
        case MessageType.CLEAR:
            sendResponse('background:ok')
            State.getInstance().clear()
            break
        case MessageType.PIN_PASS:
            sendResponse('background:ok')
            LOCKED = false
            break
        default:
            break
    }
})

chrome.runtime.onConnect.addListener(function (port) {
    if (port.name === CONNECT_NAME) {
        State.getInstance().setPolling(true)
        // 如果连接成功，则开始polling
        polling().then()
        State.getInstance().setPopupOpen(true)
        // 通知锁的状态
        adapter.emit({
            type: MessageType.PIN_STATE,
            data: LOCKED
        })
        port.onDisconnect.addListener(function () {
            State.getInstance().setPopupOpen(false)
        });
    }
});


(async () => {
    const token = await State.getInstance().getToken()
    if (!token) {
        await State.getInstance().setLoginBadge()
    }
})()
