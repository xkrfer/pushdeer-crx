import {ENDPOINT} from "@/helpers/constants";
import {adapter} from "@/helpers/adapter";

let host = ""

async function getHost() {
    if (host === "") {
        host = await adapter.getStorage(ENDPOINT)
    }
    return host
}

export const request = async (path: string, init?: RequestInit | undefined) => {
    const prefix = await getHost()
    if (!prefix) return
    const response = await fetch(`${prefix}${path}`, init)
    return await response.json()
}
