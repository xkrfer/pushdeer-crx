import dayjs from "dayjs";
import {ElMessage} from "element-plus";

export const Utils = {
    format(date?: string | number | Date | dayjs.Dayjs | null | undefined) {
        return dayjs(date).format("YYYY/MM/DD");
    }
}
