export interface Message {
    data?: any;
    type: MessageType;
}

export enum MessageType {
    GET_BACKGROUND_CHROME_ID = 'GET_BACKGROUND_CHROME_ID',
    TO_CONTENT = 'TO_CONTENT',
    PING = 'PING',
    PONG = 'PONG',
    POPUP_OPEN = 'POPUP_OPEN',
    POPUP_CLOSE = 'POPUP_CLOSE'
}

// 监听来自content-script的消息
export const receiveMessageFromContent = (callback: (message: Message, sendResponse: any) => void) => {
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        callback(request, sendResponse);
    });
};
