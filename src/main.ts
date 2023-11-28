import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { ManagerPlugin } from './managers/ManagerPlugin'
import type { AnyObject } from 'yup'
import '@/assets/scss/style.scss';
import PerfectScrollbar from 'vue3-perfect-scrollbar';
import VueTablerIcons from 'vue-tabler-icons';
import vuetify from './plugins/vuetify';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PerfectScrollbar);
app.use(VueTablerIcons);

const managers : any = {
  install:ManagerPlugin
}

// const vuetify = createVuetify({
//     components,
//     directives,
//   })

app.use(managers)

app.use(vuetify).mount('#app')
