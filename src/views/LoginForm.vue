<template>
    <v-container class="flex justify-center align-center h-screen">
        <div class="container flex flex-column card justify-center bg-cyan-200 rounded-shaped">
            <h2
                class="flex justify-center align-center font-medium text-3xl rounded-shaped border-b-cyan-300 border-b h-28 mb-10"
            >
                Sign In
            </h2>
            <button
                class="login-button bg-gradient-to-r from-cyan-300 to-cyan-500 text-black m-10"
                @click="callSignIn()"
            >
                <h2>Sign In With Google</h2>
            </button>
            <button
                class="login-button bg-gradient-to-r from-cyan-300 to-cyan-500 text-black m-10 hover:"
                @click="callAnonymousSignIn()"
            >
                <h2>Sign in anonymously</h2>
            </button>
            <!-- <button class="login-button bg-gradient-to-r from-cyan-300 to-cyan-500 text-black m-10 hover:" @click="logOff()"><h2>Sign out</h2></button>
            <button class="login-button bg-gradient-to-r from-cyan-300 to-cyan-500 text-black m-10" @click="displayUser()"><h2>displayUser</h2></button> -->
            <!-- <button class="login-button bg-gradient-to-r from-cyan-300 to-cyan-500 text-black m-10" @click="getChats()"><h2>Get Chats</h2></button>
            <button class="login-button bg-gradient-to-r from-cyan-300 to-cyan-500 text-black m-10">
                <h2>{{ chats }}</h2>
            </button> -->
        </div>
    </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useAuth } from '../firebase'
import { firestore } from '../firebase'
import { collection, getDocs } from 'firebase/firestore'
import router from '@/router'
const { user, isLogin, signIn, logInAnonymously } = useAuth()

const chats = ref()

function displayUser() {
    console.log(user.value, isLogin.value)
}
async function callSignIn() {
    console.log(user)
    await signIn()
    router.push('/')
}
function callAnonymousSignIn() {
    console.log(user)
    logInAnonymously()
    router.push('/')
}
</script>

<style lang="scss">
.card {
    width: 20rem;
    height: 30rem;
    padding: 1rem;
    border: 1px solid rgb(121, 121, 121);
    box-shadow: 0.5rem 0.5rem 1.5rem rgb(117, 142, 145);
}
.login-button {
    border-radius: 10px;
    min-height: 2rem;
}
</style>
