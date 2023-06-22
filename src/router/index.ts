import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../layouts/Home.vue'),
            children:[
                {
                    path: '',
                    name: 'home-chat',
                    component: () => import('../views/Client.vue'),
                }
            ]
        }
    ]
})

export default router
