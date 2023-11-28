import { type RouteRecordRaw } from 'vue-router'

const MainRoutes:RouteRecordRaw[] = [
    {
        path: '/',
        meta: {
            requiresAuth: true
        },
       // redirect:'/'
        component: () => import('@/views/pages/home/home.vue'),
        children: [
            {
                name: 'Dashboard',
                path: '/',
                component: () => import('@/views/pages/home/homescreen.vue')
            },
       ]
    },
    {
          path:'/form/:UrlController/:UrlAction',
          name:'building-forms',
          component: () => import('@/views/pages/BuilderPage.vue'),
          meta: {
            requiresAuth: true
        },
    }
    
];

export default MainRoutes;
