import {ElMessage} from "element-plus";

export function useCopy() {
    const copy = (value: string) => {
        let transfer = document.createElement('input');
        document.body.appendChild(transfer);
        transfer.value = value
        transfer.focus()
        transfer.select()
        if (document.execCommand('copy')) {
            transfer.blur()
            ElMessage.success("复制成功")
        }
        document.body.removeChild(transfer)
    }
    return {
        copy
    }
}
