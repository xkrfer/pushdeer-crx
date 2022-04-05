import {State} from "@/helpers/state";


export const request = async (path: string, init?: RequestInit | undefined) => {
    const endpoint = await State.getInstance().getEndpoint()
    if (!endpoint) return
    const response = await fetch(`${endpoint}${path}`, init)
    return await response.json()
}
