import { createRouter, createWebHistory } from 'vue-router'
import { useAuth, currentUser } from "../firebase"
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../layouts/Home.vue'),
            children:[
                {
                    path: '/:id',
                    name: 'home-chat',
                    component: () => import('../views/Client.vue'),
                }
            ]
        },
        {
            path: '/welcome',
            name: 'welcome',
            component: () => import('../layouts/Welcome.vue'),
            children:[
                {
                    path: 'login',
                    name: 'login',
                    component: () => import('../views/LoginForm.vue'),
                }
            ]
        },
    ]
})
// router.beforeEach(async (to, from, next) => {
//     if (
//       // make sure the user is authenticated
//       !currentUser && to.name !== 'login'
//     ) {
//       // redirect the user to the login page
//       next({ name: 'login' })
//     } else{
//         next()
//         console.log('useAuth().isLogin', currentUser, isLogin.value, user.value, to.name)
//     }
//   })

export default router
