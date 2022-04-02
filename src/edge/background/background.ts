// 插件id
import {MessageType, receiveMessageFromContent} from "@/helpers/message";

const CHROME_ID = chrome.runtime.id
receiveMessageFromContent((message, sendResponse) => {
    switch (message.type) {
        case MessageType.GET_BACKGROUND_CHROME_ID:
            sendResponse(CHROME_ID)
            break
        default:
            break
    }
})
