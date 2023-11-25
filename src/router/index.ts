import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/pages/auth/login.vue'
import homescreen from '../views/pages/dashboard/homescreen.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },{
      path:"/home",
      name:"home",
      component:homescreen
    }
  ]
})

export default router
