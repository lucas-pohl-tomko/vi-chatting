import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from "../firebase"
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
        },
    ]
})
// router.beforeEach(async (to, from) => {
//     if (
//       // make sure the user is authenticated
//       !useAuth().signIn()
//     ) {
//       // redirect the user to the login page
//       return { name: 'Login' }
//     }
//   })

export default router
