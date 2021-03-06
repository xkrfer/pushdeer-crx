import {createApp} from 'vue'
import Popup from '@/components/popup.vue'
import {createPinia} from 'pinia'
import {router} from "./router"
import "@/styles/main.less"
import 'element-plus/dist/index.css'
import '@/assets/styles/highlight/highlight.js@11.5.0.default.css'
const app = createApp(Popup)

app.use(createPinia())
app.use(router)
app.mount('#app')
