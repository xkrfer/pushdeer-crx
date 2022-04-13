import {ElMessage} from "element-plus";

export function useCopy() {
    const copy = (value: string) => {
        let transfer = document.createElement('input');
        // 不然会出现滚动条
        transfer.style.height = '0px';
        transfer.style.display = 'block';
        document.body.appendChild(transfer);
        transfer.value = value
        transfer.focus()
        transfer.select()
        if (document.execCommand('copy')) {
            transfer.blur()
            ElMessage.success("复制成功")
        }else{
            ElMessage.error("复制失败，请手动复制")
        }
        document.body.removeChild(transfer)
    }

    return {
        copy
    }
}
