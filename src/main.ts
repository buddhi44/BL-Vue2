

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import App from './App.vue'
import router from './router'
import { createVuetify } from 'vuetify'
import { ManagerPlugin } from './managers/ManagerPlugin'

const app = createApp(App)

app.use(createPinia())
app.use(router)


const managers = {
  install:ManagerPlugin
}

const vuetify = createVuetify({
    components,
    directives,
  })

app.use(managers)

app.use(vuetify).mount('#app')
