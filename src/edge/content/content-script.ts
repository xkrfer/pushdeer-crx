export enum MessageType {
    GET_BACKGROUND_CHROME_ID = 'GET_BACKGROUND_CHROME_ID',
    TO_CONTENT = 'to_content',
    PING = 'ping',
}

function main() {
    document.addEventListener("__PUSH_DEER_TOKEN__", (e: any) => {
        const token = e.detail.token
        chrome.runtime.sendMessage({
            type: MessageType.GET_BACKGROUND_CHROME_ID,
            data: {
                token,
                origin: window.location.origin
            }
        });
    })
}

main()
