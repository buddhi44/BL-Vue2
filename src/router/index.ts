import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authstore'
import Login from '@/views/pages/auth/login.vue'
import Home from '@/views/pages/dashboard/home.vue'
import ComapnySelection from '@/views/pages/auth/companyselection.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/companyselection',
      name: 'companyselect',
      component: ComapnySelection
    },
  ]
})

router.beforeEach(async (to) => {

  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const auth = useAuthStore();

  if (authRequired && !auth.authToken) {
      auth.returnUrl = to.fullPath;
      return '/login';
  }
});

export default router
