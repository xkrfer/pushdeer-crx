import axios from 'axios';
import {ElMessage} from "element-plus";

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
    (response) => {
        if (response.data.code !== 0) {
            ElMessage.error(response.data.error);
            return
        }
        return response
    },
    (error) => {
        if (error.response) {
            ElMessage.error(error.message)
        }
        return Promise.reject(error);
    },
);

export const request = service
