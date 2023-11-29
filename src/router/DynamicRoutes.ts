import { type RouteRecordRaw } from 'vue-router'

let nav_routes:RouteRecordRaw[]=[]

nav_routes= [
            {
                name: 'Dashboard',
                path: '/',
                component: () => import('@/views/pages/home/homescreen.vue')
            },
            {
                name: 'SO',
                path: '/form/order/specialorderjkg',
                component: () => import('@/views/pages/salesManagement/SalesOrder.vue')
            },
            {
              name: 'Invoice',
              path: '/form/transaction/createtransaction',
              component: () => import('@/views/pages/salesManagement/Invoice.vue')
            }
]
    


export default nav_routes;

