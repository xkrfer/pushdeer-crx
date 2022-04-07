export enum MessageType {
    GET_BACKGROUND_CHROME_ID = 'GET_BACKGROUND_CHROME_ID',
    TO_CONTENT = 'TO_CONTENT',
    PING = 'PING',
    PONG = 'PONG',
    POPUP_OPEN = 'POPUP_OPEN',
    POPUP_CLOSE = 'POPUP_CLOSE'
}

function main() {
    document.addEventListener("__PUSH_DEER_TOKEN__", () => {
        chrome.runtime.sendMessage({type: MessageType.GET_BACKGROUND_CHROME_ID});
    })
}

main()
