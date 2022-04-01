import {createApp} from 'vue'
import Popup from '@/components/popup.vue'
import "@/styles/popup.less"
import {createPinia} from 'pinia'
import {router} from "./router"
const app = createApp(Popup)
app.use(router)
app.use(createPinia())
app.mount('#app')
