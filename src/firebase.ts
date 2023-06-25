import { initializeApp } from 'firebase/app'
import { getFirestore }  from 'firebase/firestore'

const firebaseConfig = {
    apiKey: 'AIzaSyCiVy10Z1wO8FOp5zEoV7YvRjqJVxuKYFU',
    authDomain: 'vi-chatting.firebaseapp.com',
    projectId: 'vi-chatting',
    storageBucket: 'vi-chatting.appspot.com',
    messagingSenderId: '225197134727',
    appId: '1:225197134727:web:8844ab56a2c842f05cf922'
}

// init firebase
initializeApp(firebaseConfig)

// init & export firestore service
export const db = getFirestore()