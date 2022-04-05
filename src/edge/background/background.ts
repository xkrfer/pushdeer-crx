// 插件id
import {MessageType, receiveMessageFromContent} from "@/helpers/message";
import {polling} from "@/helpers/polling";
import {State} from "@/helpers/state";
import {adapter} from "@/helpers/adapter";
import {CONNECT_NAME} from "@/helpers/constants";

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
        const endpoint = await State.getInstance().getEndpoint()
        if (data.origin === endpoint) {
            await State.getInstance().setToken(data.token)
        }
    }
}



adapter.on((message, sender, sendResponse) => {
    switch (message.type) {
        case MessageType.POPUP_OPEN:
            State.getInstance().setPopupOpen(true)
            sendResponse('background:ok')
            break
        case MessageType.POPUP_CLOSE:
            State.getInstance().setPopupOpen(false)
            sendResponse('background:ok')
            break
        case MessageType.PING:
            sendResponse({
                type: MessageType.PONG
            })
            break
        default:
            break
    }
})

chrome.runtime.onConnect.addListener(function (port) {
    if (port.name === CONNECT_NAME) {
        State.getInstance().setPopupOpen(true)
        port.onDisconnect.addListener(function () {
            State.getInstance().setPopupOpen(false)
        });
    }
});

setTimeout(async () => {
    await polling()
}, 2000)
