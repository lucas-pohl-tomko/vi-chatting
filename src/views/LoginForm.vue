<template>
    <form @submit.prevent="login()">
        <h2>Log in</h2>
        <input type="email" placeholder="Email" required v-model="email" />
        <input type="password" placeholder="Password" required v-model="password" />
        <button>Log in</button>
    </form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
let email = ref('')
let password = ref('')

function login() {
    console.log('Email:', email.value)
    console.log('Password:', password.value)
}
</script>
