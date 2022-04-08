import {adapter} from "@/helpers/adapter";
import {request} from "@/helpers/native-request";
import {State} from "@/helpers/state";

export async function polling() {
    const state = State.getInstance()
    await state.getLastId()
    const token = await state.getToken()
    if (!token) { // token 不存在
        // 通知登录
        state.setPolling(false)
        await State.getInstance().setLoginBadge()
    } else {
        const response = await ping(token)
        if (response && response.content) {
            if (await state.getLastId() !== response.content.id) {
                await state.setLastId(response.content.id)
                if (response.content.id !== 0) {
                    await adapter.setBadge()
                    await adapter.notifications(response.content.text)
                } else {
                    await adapter.clearBadge()
                }
            }
        }
    }
    if (state.getPolling()) {
        setTimeout(polling, 1000)
    }
}

export async function ping(token: any) {
    const res = await request(`/message/ping?token=${token}`).catch(() => {
        console.error('ping error');
        State.getInstance().setPolling(false)
    })
    if (res?.code === 0) return res
    State.getInstance().setPolling(false)
    return false
}
