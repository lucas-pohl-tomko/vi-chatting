<template>
    <h2>Sign In With Google</h2>
    <button @click="signIn()"></button>
</template>

<script lang="ts" setup>
import { useAuth } from '../firebase';

const { user, isLogin, signOut, signIn } = useAuth()
</script>
