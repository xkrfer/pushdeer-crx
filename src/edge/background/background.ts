import {State} from "@/helpers/state";
import {initPush} from "@/edge/background/sw-push";
import {addListener} from "@/edge/background/addListener";

(async () => {
    addListener()
    const token = await State.getInstance().getToken()
    if (!token) {
        await State.getInstance().setLoginBadge()
    }else{
        await initPush()
    }
})()
