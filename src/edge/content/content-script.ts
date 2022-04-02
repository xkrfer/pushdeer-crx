interface Message {
    data: any;
    type: MessageType;
}

export enum MessageType {
    GET_BACKGROUND_CHROME_ID = 'GET_BACKGROUND_CHROME_ID',
    TO_CONTENT = 'to_content',
    PING = 'ping',
}

// content-script主动发消息给后台
export const sendMessageToBackground = (message: Message, callback: (message: Message) => void) => {
    chrome.runtime.sendMessage(message, callback);
};

// 初始化 获取chrome id
sendMessageToBackground({
    type: MessageType.GET_BACKGROUND_CHROME_ID,
    data: {}
}, (chrome_id) => {

})


function init() {
    const app = document.getElementById('pushdeer-app')
    if (app) {
        app.addEventListener("__PUSH_DEER_CHROME_ID__", (e: any) => {
            console.log(e)
        })
    }
}

init()
