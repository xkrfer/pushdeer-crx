// 处理token
import {State} from "@/helpers/state";

export async function setToken(data: { token: string, origin: string }) {
    if (data?.token && data?.origin) {
        const endpoint = await State.getInstance().getEndpoint()
        if (data.origin === endpoint) {
            await State.getInstance().setToken(data.token)
        }
    }
}
