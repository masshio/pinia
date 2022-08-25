import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { myPiniaPlugin } from './stores/plugin'
import './assets/main.css'

const app = createApp(App)
const pinia = createPinia()
pinia.use(myPiniaPlugin)
app.use(pinia)

app.mount('#app')
