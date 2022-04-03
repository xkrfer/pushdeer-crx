import axios from 'axios';
import {ElMessage} from "element-plus";
import {UNAUTHORIZED_CODE} from "@/helpers/constants";

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
        if (response.data.code == 0) return response.data
        ElMessage.error(response.data.error);
        if (response.data.code === UNAUTHORIZED_CODE) {
           window.location.href = "/login"
        }
        return response.data
    },
    (error) => {
        if (error.response) {
            ElMessage.error(error.message)
        }
        return Promise.reject(error);
    },
);

export const request = service
