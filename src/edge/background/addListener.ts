import {MessageType} from "@/helpers/message";
import {setToken} from "@/edge/background/setToken";
import {adapter} from "@/helpers/adapter";
import {State} from "@/helpers/state";
import {CONNECT_NAME} from "@/helpers/constants";
import {onPush} from "@/edge/background/sw-push";

const CHROME_ID = chrome.runtime.id
let LOCKED = true

export function addListener() {
    onPush()
    onEvent()
    onConnectPopup()
}

function onConnectPopup() {
    chrome.runtime.onConnect.addListener(function (port) {
        if (port.name === CONNECT_NAME) {
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
}

function onEvent() {
    adapter.on(async (message, sender, sendResponse) => {
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
            case MessageType.GET_BACKGROUND_CHROME_ID:
                sendResponse(CHROME_ID)
                await setToken(message.data)
                break
            default:
                break
        }
    })
}

