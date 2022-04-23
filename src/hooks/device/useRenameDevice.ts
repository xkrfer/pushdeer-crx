import {ElMessage, ElMessageBox} from "element-plus";
import {useRequest} from "@/hooks/useRequest";
import {useGlobalStore} from "@/edge/useGlobal";

export function useRenameDevice() {
    const store = useGlobalStore();
    const {run} = useRequest("/device/rename", {
        method: "post"
    });


    const open = (id: number) => {
        return new Promise<boolean>((resolve) => {
            ElMessageBox.prompt('请输入设备名', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern:
                    /[\u4e00-\u9fa5_a-zA-Z0-9_]{4,16}/,
                inputErrorMessage: '4至16位中文，英文字母和数字及_',
                inputPlaceholder: '请输入设备名',
                customClass: "device-remove"
            })
                .then(async ({value}) => {
                    const data = await run({
                        data: {
                            id,
                            name: value
                        }
                    });
                    if (data.code === 0) {
                        ElMessage({
                            type: 'success',
                            message: `修改成功`,
                        })
                    }
                    resolve(true)
                }).catch(() => {
                resolve(false)
            })
        })
    }


    return {
        renameDevice: open
    }

}
