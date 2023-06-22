<template>
    <v-card>
        <v-layout>
            <v-navigation-drawer elevation="10" class="bg-cyan-lighten-4">
                <v-list>
                    <v-container>
                        <v-toolbar class="rounded-shaped" density="comfortable"
                            ><template #title><h3 class="title-text">Vi-Chatting</h3></template>
                        </v-toolbar>
                    </v-container>
                    <div class="m-3 border-b-sm"></div>
                    <v-list-item class="flex flex-column justify-center">
                        <v-list-item v-for="item in items" :key="item.title">
                            <v-btn>item.title</v-btn>
                        </v-list-item>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>

            <v-main style="height: 100vh">
                <router-view></router-view>
            </v-main>
        </v-layout>
    </v-card>
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router'
import { ref } from 'vue'
const items = ref([{ title: `Assistant Kraut` }])
</script>

<style lang="scss">
.title-text {
    text-align: center;
    margin-left: -1rem;
}
</style>
