import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import App from './App.vue'
import router from './router'
import { createVuetify } from 'vuetify'

const app = createApp(App)

app.use(createPinia())
app.use(router)

const vuetify = createVuetify({
    components,
    directives,
  })

app.use(vuetify).mount('#app')
