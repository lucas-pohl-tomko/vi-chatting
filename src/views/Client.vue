<template>
    <div class="flex flex-column px-5 justify-evenly container min-w-full h-100 md:h-[100vh]">
        <div
            class="chat-container flex flex-column border-4 rounded-lg bg-grey-lighten-3 min-h-[75%] md:max-h-[75%] max-h-[80%] overflow-scroll md:overflow-auto"
        >
            <Message
                v-for="messageIndex of 10"
                :key="messageIndex"
                :sender="messageIndex % 2 === 0 ? 'user' : 'assistant'"
                message="Servus! Der Hechtsuppe verhaspeln der bräsig Tölpel. Die pfundig Kuppelei. Das butterweich Franzosenkrankheit. Die famos Groschengrab. Das einfältig Haderlump picheln. Die halbstark Halunke. Die schnieke Kinkerlitzchen. Das piesacken Steckenpferd erquicken. Der pompös Naschkatze stagnieren. Das einfältig Kummerspeck krakelen. Die ausgemergelt Fernweh. Der Sättigungsbeilage katzbuckeln der hanebüchen Springinsfeld. Das Kerbholz foppen der dufte Missetäter. Himmel, Arsch und Zwirn!"
            ></Message>
        </div>
        <div class="flex justify-center border-4 rounded-lg bg-grey-lighten-3 min-h-[4rem] px-4">
            <input
                class="w-4/5 h-1/2 self-center p-[1rem] bg-white rounded-shaped shadow-md"
                type="text"
                placeholder="Talk to your assistant..."
                name=""
                id=""
            />
            <v-btn class="rounded-shaped w-20 ms-3 self-center cursor-pointer"
                ><box-icon class="" name="send"></box-icon
            ></v-btn>
        </div>
    </div>
</template>

<script setup lang="ts">
import Message from '../components/chat/Message.vue'
</script>

<style lang="scss">
@import '../assets/variables.scss';

.my-message{
    float: right!important;
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
