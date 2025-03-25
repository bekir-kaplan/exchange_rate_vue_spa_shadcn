import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { plugin as storePlugin } from './plugins/pinia'

import App from './App.vue'
import router from './router'

import '@/assets/main.css'

const app = createApp(App)

app.use(storePlugin)
app.use(router)

app.mount('#app')
