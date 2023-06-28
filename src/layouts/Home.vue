<template>
    <v-card>
        <v-layout>
            <v-app-bar v-if="mobile" color="cyan-lighten-4" height="55" :elevation="4">
                <template v-slot:prepend>
                    <v-btn icon @click="drawer = !drawer"><box-icon name="menu" class="text-md"></box-icon></v-btn> 
                </template>
            </v-app-bar>
            <v-navigation-drawer v-if="mobile" v-model="drawer" location="bottom" temporary>
                <v-list>
                    <v-container>
                        <v-toolbar class="rounded-shaped" density="comfortable"
                            ><template #title><h3 class="title-text">Vi-Chatting</h3></template>
                        </v-toolbar>
                    </v-container>
                    <div class="m-3 border-b-sm"></div>
                    <v-list-item class="flex flex-column justify-center">
                        <v-list-item v-for="assistant in assistants" :key="assistant.id">
                            <router-link :to="`/${assistant.id}`"
                                ><v-btn
                                    flat
                                    class="rounded-md w-[10rem] bg-gradient-to-bl from-cyan-200 to-cyan-400 justify-start"
                                    >{{ assistant.name }}</v-btn
                                ></router-link
                            >
                        </v-list-item>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>

            <v-navigation-drawer elevation="10" class="bg-cyan-lighten-4">
                <v-list>
                    <v-container>
                        <v-toolbar class="rounded-shaped" density="comfortable"
                            ><template #title><h3 class="title-text">Vi-Chatting</h3></template>
                        </v-toolbar>
                    </v-container>
                    <div class="m-3 border-b-sm"></div>
                    <v-list-item class="flex flex-column justify-center">
                        <v-list-item v-for="assistant in assistants" :key="assistant.id">
                            <router-link :to="`/${assistant.id}`"
                                ><v-btn
                                    flat
                                    class="rounded-md w-[10rem] bg-gradient-to-bl from-cyan-200 to-cyan-400 justify-start"
                                    >{{ assistant.name }}</v-btn
                                ></router-link
                            >
                        </v-list-item>
                    </v-list-item>
                </v-list>
                <template v-slot:append>
                    <div class="pa-2 m-5" v-if="isLogin">
                        <v-btn block @click="logOff()">Logout</v-btn>
                    </div>
                </template>
            </v-navigation-drawer>

            <v-main style="height: 100vh; overflow-y: auto">
                <router-view></router-view>
            </v-main>
        </v-layout>
    </v-card>
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useDisplay } from 'vuetify'
import { collection, getDocs, or, orderBy, query, where } from 'firebase/firestore'
import { firestore, useAuth } from '../firebase'

const { isLogin, logOff } = useAuth()
const mobile = useDisplay().mobile
const assistants = ref()
const user = JSON.parse(localStorage.getItem(`loggedUser`) || ``)
const drawer = ref(false)
onMounted(async () => {
    assistants.value = await getAssistants(user)
})

async function getAssistants(user: any) {
    try {
        const assistants: any = []
        const querySnapshot = await getDocs(
            query(
                collection(firestore, 'Assistants'),
                or(where('userID', '==', user.uid), where('type', '==', `public`))
            )
        )
        querySnapshot.forEach((doc) => {
            console.log('lets go', doc.data())
            assistants.push({ ...doc.data(), id: doc.id })
        })
        return assistants
    } catch (error) {
        console.log(error)
    }
}
</script>

<style lang="scss">
.title-text {
    text-align: center;
    margin-left: -1rem;
}
</style>
