import { createApp } from 'vue'
import Options from '@/components/options.vue'
import "@/styles/main.less"
import 'element-plus/dist/index.css'
import '@/assets/styles/highlight/highlight.js@11.5.0.default.css'
import {createPinia} from 'pinia'
import {router} from "./router"

const app = createApp(Options)

app.use(createPinia())
app.use(router)
app.mount('#app')
