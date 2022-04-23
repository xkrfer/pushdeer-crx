import {useGlobalStore} from "@/edge/useGlobal";
import {createFingerprint} from "@/helpers/createFingerprint";
import {DEVICE_ID} from "@/helpers/constants";
import {onMounted} from "vue";

export function useGetFingerprint() {
    const store = useGlobalStore();
    const handleDeviceId = async () => {
        const device_id = await createFingerprint();
        store.set(DEVICE_ID, device_id);
    }
    onMounted(async () => {
        await handleDeviceId();
    });
}
