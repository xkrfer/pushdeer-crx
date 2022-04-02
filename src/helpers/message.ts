interface Message {
    data: any;
    type: MessageType;
}

export enum MessageType {
    GET_BACKGROUND_CHROME_ID = 'GET_BACKGROUND_CHROME_ID',
    TO_CONTENT = 'to_content',
    PING = 'ping',
}

//  background 向 content 主动发送消息
export const sendMessageToContent = (message: Message) => {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(<number>tabs[0].id, message, function (response) {
            console.log(response);
        });
    });
};

// 监听来自content-script的消息
export const receiveMessageFromContent = (callback: (message: Message, sendResponse: any) => void) => {
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        callback(request, sendResponse);
    });
};
