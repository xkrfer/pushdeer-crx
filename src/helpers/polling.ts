import {adapter} from "@/helpers/adapter";
import {request} from "@/helpers/native-request";
import {State} from "@/helpers/state";

export async function polling() {
    const state = State.getInstance()
    await state.getLastId()
    const token = await state.getToken()
    if (!token) { // token 不存在
        // 通知登录
    } else {
        const response = await request(`/message/ping?token=${token}`).catch(() => {
            console.error('ping error');
        })
        if (response.code === 0) {
            if (await state.getLastId() !== response.content) {
                await state.setLastId(response.content)
                await adapter.setBadge()
            }
        }
    }
    setTimeout(polling, 2000);
}
