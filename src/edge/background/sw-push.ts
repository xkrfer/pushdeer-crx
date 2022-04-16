import {Utils} from "@/helpers/utils";

const PublicKey = 'BCVaT2iRT0N1G8fXJFok1_DyloWdrOPkL_kZByYkccjLPdZy6v8PXdGsfDPGSo4uqvMbEAJgadQJDc2dJArH63w';
import logo from "@/assets/logo.png"

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
        const title = event.data.text();
        const options = {
            body: title,
            icon: logo,
        };
        event.waitUntil(registration.showNotification('新消息！', options));
    })
}
