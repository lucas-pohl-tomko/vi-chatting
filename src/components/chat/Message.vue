<template>
    <div class="m-4">
        <div v-if="!mobile" :class="isAssistantMessage(sender) ? 'arrow' : 'right-arrow'">
            <div :class="isAssistantMessage(sender) ? 'outer' : 'right-outer'"></div>
            <div :class="isAssistantMessage(sender) ? 'inner' : 'right-inner'"></div>
        </div>
        <div
            class="text-bubble rounded-shaped md:max-w-[50%] max-w-[90%] shadow-lg bg-cyan-lighten-4"
            :class="isAssistantMessage(sender) ? '' : 'my-message'"
        >
            <h3 class="font-weight-medium mb-1"> {{ sender }} </h3>
            <p v-html="message"></p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useDisplay } from 'vuetify'

defineProps<{
    sender: string
    message?: string
}>()

const mobile = useDisplay().mobile

function isAssistantMessage(sender: string): boolean {
    if (sender === 'user') return false
    return true
}

</script>

<style lang="scss" scoped>
@import '../../assets/variables.scss';

.arrow {
    width: 15px;
    height: 30px;
    overflow: hidden;
    position: relative;
    float: left;
    top: 20px;
    right: -1px;
}

.arrow .outer {
    width: 0;
    height: 0;
    border-right: 15px solid #b1abab;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    position: absolute;
    top: 0;
    left: 0;
}

.arrow .inner {
    width: 0;
    height: 0;
    border-right: 15px solid $message-bg-color;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    position: absolute;
    top: 0;
    left: 2px;
}

// inverted arrow
.right-arrow {
    width: 15px;
    height: 30px;
    overflow: hidden;
    position: relative;
    float: right;
    top: 20px;
    left: -1px;
}

.right-arrow .right-outer {
    width: 0;
    height: 0;
    border-left: 15px solid #b1abab;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    position: absolute;
    top: 0;
    right: 0;
}

.right-arrow .right-inner {
    width: 0;
    height: 0;
    border-left: 15px solid $message-bg-color;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    position: absolute;
    top: 0;
    right: 2px;
}
/////////////////////

.text-bubble {
    float: left;
    width: fit-content;
    height: auto;
    background-color: #ffffff;
    border: 1px solid #b1abab;
    padding: 6px 8px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -o-border-radius: 5px;
    border-radius: 5px;
}

.message-body p {
    margin: 0;
}

.my-message {
    float: right !important;
}
</style>
