import {Utils} from "@/helpers/utils";

const PublicKey = 'BOf8bHJBzeGjYw4Yk2t3dsnxHK8-Mxo4kf3fbFf-yslmHXKGT7dlmy2m5FCKj6NecvOfaKAbZS27I6NLQHiDfvY';

export function initPush() {
    addPushEvent()
    subscribe()
}

function subscribe() {
    const applicationServerKey = Utils.urlB64ToUint8Array(PublicKey);
    registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey
    })
        .then(function (subscription) {
            console.log(JSON.stringify(subscription))
        })
        .catch(function (err) {
            console.log('Failed to subscribe the user: ', err);
        });
}

function addPushEvent() {
    self.addEventListener('push', (event: any) => {
        console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);
    })
}
