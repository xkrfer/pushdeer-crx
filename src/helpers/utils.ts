import dayjs from "dayjs";

export const Utils = {
    format(date: string | number | Date | dayjs.Dayjs | null | undefined = new Date(), formatStr: string = "YYYY/MM/DD"): string {
        return dayjs(date).format(formatStr)
    }
}
