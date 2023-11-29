import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/authstore'
import MainRoutes from './MainRoutes';
import AuthRoutes from './AuthRoutes';

let routers:RouteRecordRaw[]=[];
routers.push(...MainRoutes)
routers.push(...AuthRoutes)
routers.push({
  path: '/:pathMatch(.*)*',
  component: () => import('@/views/components/shared/Error.vue')
},)

const router = createRouter(
{
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: routers

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


// {
//   path: '/',
//   name: 'home',
//   component: Home
// },
// {
//   path: '/login',
//   name: 'login',
//   component: Login
// },
// {
//   path: '/companyselection',
//   name: 'companyselect',
//   component: ComapnySelection
// },
// {
//   path:'/form/:UrlController/:UrlAction',
//   name:'building-forms',
//   component:BuilderPage
// }
