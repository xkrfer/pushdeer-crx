import {adapter} from "@/helpers/adapter";
import {TOKEN} from "@/helpers/constants";

let INITIAL: State

export class State {
    private token: string
    private last_id: number
    private endpoint: string
    private popup_open: boolean
    constructor() {
        this.token = ''
        this.last_id = 0
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

    async getLastId(): Promise<number> {
        if (this.last_id === 0) {
            this.last_id = await adapter.getStorage('last_id')
        }
        return this.last_id;
    }

    async setLastId(id: number): Promise<number> {
        if (id !== this.last_id) {
            this.last_id = id
            await adapter.setStorage('last_id', id)
        }
        return id
    }

    async setEndpoint(endpoint: string): Promise<string> {
        this.endpoint = endpoint
        await adapter.setStorage('endpoint', endpoint)
        return this.endpoint
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
        console.log('popup_open', open)
        this.popup_open = open
    }

    static getInstance(): State {
        if (!INITIAL) {
            INITIAL = new State();
        }
        return INITIAL;
    }
}



