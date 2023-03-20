import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import Icon from '@/components/Icon/Icon.vue'
import App from './App.vue'
import router from './router'
import '@/assets/reset.css'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.component('Icon',Icon)
app.use(ElementPlus)
app.use(createPinia())
app.use(router)
app.mount('#app')