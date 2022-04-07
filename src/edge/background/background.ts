// 插件id
import {MessageType, receiveMessageFromContent} from "@/helpers/message";
import {polling} from "@/helpers/polling";
import {State} from "@/helpers/state";
import {adapter} from "@/helpers/adapter";
import {CONNECT_NAME, TOKEN} from "@/helpers/constants";

const CHROME_ID = chrome.runtime.id

receiveMessageFromContent(async (message, sendResponse) => {
    switch (message.type) {
        case MessageType.GET_BACKGROUND_CHROME_ID:
            sendResponse(CHROME_ID)
            await handlerToken()
            break
        default:
            break
    }
})

// 处理token
async function handlerToken() {
    const endpoint = await State.getInstance().getEndpoint()
    const response = await chrome.cookies.getAll({url: endpoint, name: TOKEN})
    if (response && response.length > 0) {
        const token = response[0]?.value
        if (token) {
            await State.getInstance().setToken(token)
        }
    } else {
        await adapter.clearBadge()
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
        case MessageType.CLEAR:
            sendResponse('background:ok')
            State.getInstance().clear()
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
