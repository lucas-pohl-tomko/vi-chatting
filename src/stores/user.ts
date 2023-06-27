import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const userStore = defineStore('user', {
    state: () => {
        return {
            user: {}
        }
    }, 
    actions: {
        setUser(user: any){
            this.user = user
        }
    } 
})
