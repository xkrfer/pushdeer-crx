import axios from 'axios';
import {ElMessage} from "element-plus";
import {UNAUTHORIZED_CODE} from "@/helpers/constants";
import {router} from "@/edge/popup/router";

const service = axios.create({
    timeout: 2000, // 超时时间
});

service.interceptors.request.use(
    (config) => (config),
    (error) => {
        return Promise.reject(error);
    },
);

service.interceptors.response.use(
    async (response) => {
        if (response.data?.code == 0) return response.data
        ElMessage.error(response.data.error);
        if (response.data?.code === UNAUTHORIZED_CODE) {
            await router.push({
                name: "Login"
            })
            return
        }
        return response.data
    },
    (error) => {
        const message = error.message
        if (message) {
            if (message.includes('Network Error')) {
                ElMessage.error('请检查endpoint是否正确！')
            } else {
                ElMessage.error(error.message)
            }
        } else {
            ElMessage.error('网络错误请重试')
        }
        return Promise.reject(error);
    },
);

export const request = service
