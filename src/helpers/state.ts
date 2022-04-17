import {adapter} from "@/helpers/adapter";
import {TOKEN} from "@/helpers/constants";

let INITIAL: State

export class State {
    private token: string
    private endpoint: string
    private popup_open: boolean

    constructor() {
        this.token = ''
        this.endpoint = ''
        this.popup_open = false
    }


    clear() {
        this.token = ''
        this.endpoint = ''
        this.popup_open = false
    }

    async getToken(): Promise<string> {
        if (this.token === '') {
            this.token = await adapter.getStorage(TOKEN)
        }
        return this.token;
    }

    async setToken(token: string): Promise<string> {
        this.token = token
        await adapter.setStorage('token', token)
        return this.token
    }

    async getEndpoint(): Promise<string> {
        if (this.endpoint === '') {
            this.endpoint = await adapter.getStorage('endpoint')
        }
        return this.endpoint
    }

    getPopupOpen(): boolean {
        return this.popup_open
    }

    setPopupOpen(open: boolean): void {
        this.popup_open = open
    }

    async setLoginBadge() {
        await adapter.setBadge('login', [75, 75, 75, 1])
    }

    static getInstance(): State {
        if (!INITIAL) {
            INITIAL = new State();
        }
        return INITIAL;
    }
}



