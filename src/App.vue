<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { onMounted, watch } from 'vue';
import { useAuth } from './firebase';
import router from './router';
const { user, isLogin } = useAuth()
import {userStore} from './stores/user' 

watch(user, ()=> {
    if(!user.value){
        router.push('/welcome/login')
    }
    localStorage.setItem('loggedUser', JSON.stringify(user.value))
    userStore().setUser(user.value)
})
</script>

<template>
    <RouterView />
</template>

<style lang="scss">
// body{
//     background-color: rgb(33, 44, 48);
// }
</style>
