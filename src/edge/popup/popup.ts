import { createApp } from 'vue'
import Popup from '@/components/popup.vue'
import "@/styles/popup.less"
import { createPinia } from 'pinia'
const app = createApp(Popup)

app.use(createPinia())
app.mount('#app')
