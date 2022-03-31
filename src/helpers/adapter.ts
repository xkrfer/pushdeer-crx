class Adapter {

    private static instance: Adapter;

    setStorage(key: string, value: any) {
        return new Promise<boolean>((resolve) => {
            if (import.meta.env.DEV) {
                localStorage.setItem(key, value)
            }
            resolve(true)
        })

    }

    getStorage(key: string) {
        return new Promise<any>((resolve) => {
            let value: any = undefined
            if (import.meta.env.DEV) {
                value = localStorage.getItem(key)
            }
            resolve(value)
        })

    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new Adapter()
        }
        return this.instance
    }
}

export const adapter = Adapter.getInstance()
