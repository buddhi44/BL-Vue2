import { type RouteRecordRaw } from 'vue-router'
import dynamicRoutes from '@/router/DynamicRoutes'

const MainRoutes:RouteRecordRaw[] = [
    {
        path: '/',
        meta: {
            requiresAuth: true
        },
        component: () => import('@/views/pages/home/home.vue'),
        children: dynamicRoutes
    },
    
    // {
    //         path:'/form/:UrlController/:UrlAction',
    //         name:'building-forms',
    //         component: () => import('@/views/pages/BuilderPage.vue'),
    //         meta: {
    //               requiresAuth: true
    //         },
    // }
    
];

export default MainRoutes;
