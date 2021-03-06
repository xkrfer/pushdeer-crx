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
    POPUP_CLOSE = 'POPUP_CLOSE',
    CLEAR = 'CLEAR',
    PIN_STATE = 'PIN_STATE',
    PIN_PASS = 'PIN_PASS',
    REFRESH = 'REFRESH',
}
