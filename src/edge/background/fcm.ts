import {request} from "@/helpers/native-request";
import {State} from "@/helpers/state";
import {Utils} from "@/helpers/utils";
import {adapter} from "@/helpers/adapter";
import {DEVICE_ID, FCM_TOKEN} from "@/helpers/constants";

export async function setFCM(subscription: string) {
    const token = await State.getInstance().getToken()
    const device_id = await adapter.getStorage(DEVICE_ID)
    const res = await request("/device/list", {
        method: 'POST',
        body: JSON.stringify({
            token
        })
    });
    if (res.code === 0) {
        const devices: any[] = res?.content?.devices ?? []
        const device = devices.find(item => item.device_id === device_id)
        if (device) {
            await bindFCM(device.id, subscription)
            return
        }
        await adapter.notifications('设备不存在', '通知')
        return
    }
    await adapter.notifications('设备绑定失败', '通知')
}


export async function getFCMPublicKey() {
    const token = await State.getInstance().getToken()
    const response = await request(`/user/config?token=${token}`)
    if (response.code === 0) {
        return Utils.urlB64ToUint8Array(response.content.fcm_public_key)
    }
    throw new Error(response.error)
}

export async function bindFCM(id: string, fcm: string) {
    const token = await State.getInstance().getToken()
    const res = await request(`/device/bind/fcm`, {
        method: 'POST',
        body: JSON.stringify({
            fcm,
            id,
            token
        })
    })
    if (res.code === 0) {
        const fcmMD5 = adapter.md5(fcm)
        const storageMD5 = await adapter.getStorage(FCM_TOKEN)
        if (storageMD5 !== fcmMD5) {
            await adapter.notifications('推送已绑定', '通知')
            await adapter.setStorage(FCM_TOKEN, fcmMD5)
        }
    } else {
        await adapter.notifications('推送绑定失败', '通知')
    }
}
