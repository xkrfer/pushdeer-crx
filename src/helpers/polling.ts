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
        const response = await request(`/message/ping?token=${token}`).catch(() => {
            console.error('ping error');
            state.setPolling(false)
        })
        if (response?.code === 0) {
            if (await state.getLastId() !== response.content.id) {
                await state.setLastId(response.content.id)
                if (response.content.id !== 0) {
                    await adapter.setBadge()
                    await adapter.notifications(response.content.text)
                } else {
                    await adapter.clearBadge()
                }
            }
        } else {
            state.setPolling(false)
        }
    }
    if (state.getPolling()) {
        setTimeout(polling, 1000)
    }
}
