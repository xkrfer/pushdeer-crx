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
        .catch(function (err) {
            console.log('Failed to subscribe the user: ', err);
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
}
