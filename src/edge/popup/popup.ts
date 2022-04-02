import {createApp} from 'vue'
import Popup from '@/components/popup.vue'
import "@/styles/popup.less"
import {createPinia} from 'pinia'
import {router} from "./router"
import 'element-plus/dist/index.css'
const app = createApp(Popup)
app.use(createPinia())
app.use(router)
app.mount('#app')
