import { createApp } from 'vue'
import Popup from '@/components/Popup.vue'
import "@/styles/popup.less"

const app = createApp(Popup)

// app.use(Antd).mount('#app')
app.mount('#app')
