import dayjs from "dayjs";

export const Utils = {
    format(date: string | number | Date | dayjs.Dayjs | null | undefined = new Date(), formatStr: string = "YYYY/MM/DD"): string {
        return dayjs(date).format(formatStr)
    },
    urlB64ToUint8Array(base64String: string) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

        const rawData = self.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }
}
