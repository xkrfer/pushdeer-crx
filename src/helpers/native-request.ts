import {State} from "@/helpers/state";


export const request = async (path: string, init?: RequestInit | undefined) => {
    const endpoint = await State.getInstance().getEndpoint()
    if (!endpoint) return
    const response = await fetch(`${endpoint}${path}`, {
        ...init,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    })
    return await response.json()
}
