import logo from "@/assets/logo.png"
import {getFCMPublicKey, setFCM} from "@/edge/background/fcm";
import {adapter} from "@/helpers/adapter";
import {State} from "@/helpers/state";
import {MessageType} from "@/helpers/message";

export async function initPush() {
    await subscribe()
}

async function subscribe() {
    const applicationServerKey = await getFCMPublicKey()
    registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey
    })
        .then(function (subscription) {
            setFCM(JSON.stringify(subscription))
        })
        .catch(async function (err) {
            console.log('Failed to subscribe the user: ', err)
            const subscription = await registration.pushManager.getSubscription()
            await subscription?.unsubscribe()
            await adapter.notifications('请关闭浏览器后重试', '设备绑定失败')
        });
}

export function onPush() {
    self.addEventListener('push', (event: any) => {
        const title = event.data.text();
        const options = {
            body: title,
            icon: logo,
        };
        if (State.getInstance().getPopupOpen()) {
            adapter.emit({
                type: MessageType.REFRESH
            })
        }
        adapter.setBadge().then()
        event.waitUntil(registration.showNotification('新消息！', options));
    })
    // 监听通知点击事件
    self.addEventListener('notificationclick', (event: any) => {
        event.notification.close();
        adapter.clearBadge().then()
        adapter.openOptionsPage()
    });
}
