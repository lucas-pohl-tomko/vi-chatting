<template>
    <div class="flex flex-column px-5 justify-evenly container min-w-full h-100 md:h-[100vh]">
        <div
            class="chat-container flex flex-column border-4 rounded-lg bg-grey-lighten-3 min-h-[75%] md:max-h-[75%] max-h-[80%] overflow-scroll md:overflow-auto"
        >
            <Message
                v-for="(message, index) of messages"
                :key="index"
                :sender="message.sender"
                :message="message.message"
            ></Message>
        </div>
        <div class="flex justify-center border-4 rounded-lg bg-grey-lighten-3 min-h-[4rem] px-4">
            <input
                class="w-4/5 h-1/2 self-center p-[1rem] bg-white rounded-shaped shadow-md"
                type="text"
                placeholder="Talk to your assistant..."
                v-model="message"
            />
            <v-btn
                @click="message.length ? promptAssistant(message) : ''"
                class="rounded-shaped w-20 ms-3 self-center cursor-pointer"
                ><box-icon class="" name="send"></box-icon
            ></v-btn>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onActivated, watch, onMounted } from 'vue'
import Message from '../components/chat/Message.vue'
import { firestore, useAuth } from '../firebase'
import {
    collection,
    getDocs,
    query,
    where,
    orderBy,
    addDoc,
    serverTimestamp
} from '@firebase/firestore'
import { userStore } from '../stores/user'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { Configuration, OpenAIApi } from 'openai'

const route = useRoute()
const messages = ref()
const message = ref('')
const user = JSON.parse(localStorage.getItem(`loggedUser`) || ``)
const loading = ref(false)
let assistant = route.params.id
let key: any = ``

onMounted(async () => {
    messages.value = await getChats(user)
    key = await getOpenAiKey()
})

onBeforeRouteUpdate(async (to, from) => {
    if (to.params.id !== from.params.id) {
        assistant = to.params.id
        messages.value = await getChats(user)
    }
})

async function getOpenAiKey() {
    const keys: any = []
    const querySnapshot = await getDocs(query(collection(firestore, 'OpenAi')))
    querySnapshot.forEach((doc) => {
        keys.push(doc.data())
    })
    return keys[0].key
}

async function getChats(user: any) {
    const chats: any = []
    loading.value = true
    const querySnapshot = await getDocs(
        query(
            collection(firestore, 'Chats'),
            where('userID', '==', user.uid),
            where('assistantID', '==', assistant),
            orderBy('createdAt')
        )
    )
    querySnapshot.forEach((doc) => {
        chats.push(doc.data())
    })
    return messagesHistory(chats)
}

async function promptAssistant(prompt: string) {
    const configuration = new Configuration({
        apiKey: key
    })
    const openai = new OpenAIApi(configuration)
    messages.value.push({
        message: prompt,
        sender: {
            id: user.uid,
            name: user.displayName || `anonymous`
        }
    })
    try {
        const chatCompletion = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'user', content: prompt}
            ]
        })
        const response = chatCompletion.data.choices[0].message?.content
        console.log(`chatCompletion.data: `, chatCompletion.data)

        await addDoc(collection(firestore, 'Chats'), {
            prompt: prompt,
            response: response,
            userID: user.uid,
            assistantID: assistant,
            tokensSpent: 0,
            createdAt: serverTimestamp()
        })
        messages.value.push({
            message: response,
            sender: {
                id:assistant,
                name: `Assistant`
            }
        })
    } catch (error) {
        console.log(error)
        messages.value.pop()
    }
}

function messagesHistory(chats: any) {
    const messages: any = []
    chats.forEach((chat: any) => {
        messages.push({ message: chat.prompt, sender: {id: chat.userID, name: user.displayName || `Anonymous`} })
        messages.push({ message: chat.response, sender: {id: chat.assistantID, name: `Assistant`} })
    })
    return messages
}
</script>

<style lang="scss">
@import '../assets/variables.scss';

.my-message {
    float: right !important;
}
/* width */
.chat-container::-webkit-scrollbar {
    width: 10px;
    height: 100%;
}

/* Track */
.chat-container::-webkit-scrollbar-track {
    background: #f1f1f100;
}

/* Handle */
.chat-container::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 20px;
}

/* Handle on hover */
.chat-container::-webkit-scrollbar-thumb:hover {
    background: $message-bg-color;
}
</style>
