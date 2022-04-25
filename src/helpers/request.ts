import axios from 'axios';
import {ElMessage} from "element-plus";
import {UNAUTHORIZED_CODE} from "@/helpers/constants";
import {router as popupRouter} from "@/edge/popup/router";
import {router as optionsRouter} from "@/edge/options/router";

let showUnAuthorizedMessage = false;

const service = axios.create({
    timeout: 60000, // 超时时间
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
        if (response.data?.code === UNAUTHORIZED_CODE) {
            if (!showUnAuthorizedMessage) {
                ElMessage.error(response.data.error);
                showUnAuthorizedMessage = true;
            }
            const {pathname} = window.location
            if (pathname === '/popup/popup.html') {
                await popupRouter.push({
                    name: "Login"
                })
            } else {
                await optionsRouter.push({
                    name: "NotAuthorized"
                })
            }
            return
        } else {
            ElMessage.error(response.data.error);
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
