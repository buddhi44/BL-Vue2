import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const AuthRoutes:RouteRecordRaw[] = [
    {
        path: '/login',
        component: () => import('@/views/pages/auth/login.vue'),
        meta: {
            requiresAuth: false
        },
    },
    {
        path: '/companyselection',
        name: 'companyselect',
        component:()=> import('@/views/pages/auth/companyselection.vue'),
        meta: {
            requiresAuth: true
        },
    },

];

export default AuthRoutes;
