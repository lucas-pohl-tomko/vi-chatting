<template>
    <form @submit.prevent="signUp">
        <h2>Sign Up</h2>
        <input type="text" placeholder="Username" required v-model="username" />
        <input type="email" placeholder="Email" required v-model="email" />
        <input type="password" placeholder="Password" required v-model="password" />
        <button>Sign Up</button>
    </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const username = ref('')
const email = ref('')
const password = ref('')

function signUp() {
    console.log('Username:', username.value)
    console.log('Email:', email.value)
    console.log('Password:', password.value)
}
</script>
