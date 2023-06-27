<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { onMounted, watch } from 'vue';
import { useAuth } from './firebase';
import router from './router';
const { user, isLogin } = useAuth()

watch(user, ()=> {
    if(!user.value){
        router.push('/welcome/login')
    }
    console.log('user: ',user.value)
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
