import {reactive, ref} from "vue";
import {useRequest} from "@/hooks/useRequest";
import {ElMessage} from "element-plus";

export function usePushMessage() {
    const Form = ref()
    const rules = {
        pushkey: [
            {required: true, message: '请选择key', trigger: 'change'},
        ],
        text: [
            {required: true, message: '请输入消息标题', trigger: 'change'},
        ],
    }
    const form = reactive({
        type: 'markdown',
        text: '',
        pushkey: '',
        desp: '',
    })

    const {run} = useRequest("/message/push", {
        method: "POST"
    })
    const onPush = () => {
        Form.value?.validate(async (valid: boolean) => {
            if (valid) {
                const data = await run({
                    data: {
                        ...form,
                        token: undefined
                    }
                })

                if (data.code === 0) {
                    ElMessage.success("发送成功")
                }
            }
        })
    }
    return {
        Form,
        form,
        rules,
        onPush
    }
}
