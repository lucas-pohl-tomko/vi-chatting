import { initializeApp } from 'firebase/app'
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    signInAnonymously,
    setPersistence,
    browserSessionPersistence
} from 'firebase/auth'
import { getFirestore, collection } from 'firebase/firestore'
import { ref, onUnmounted, computed } from 'vue'

const firebase = initializeApp({
    apiKey: 'AIzaSyCiVy10Z1wO8FOp5zEoV7YvRjqJVxuKYFU',
    authDomain: 'vi-chatting.firebaseapp.com',
    projectId: 'vi-chatting',
    storageBucket: 'vi-chatting.appspot.com',
    messagingSenderId: '225197134727',
    appId: '1:225197134727:web:8844ab56a2c842f05cf922'
})

const auth = getAuth()
export const currentUser = auth.currentUser
export function useAuth() {
    const user = ref()
    const unsubscribe = auth.onAuthStateChanged((_user) => (user.value = _user))
    const isLogin = computed(() => user.value !== null)
    const signIn = async () => {
        const googleProvider = new GoogleAuthProvider()
        await signInWithPopup(auth, googleProvider)
    }
    const logOff = () => {
        signOut(auth)
            .then(() => {
                // Sign-out successful.)
            })
            .catch((error) => {
                // An error happened.
            })
    }
    const logInAnonymously = async () => {
        await signInAnonymously(auth)
    }

    return { user, isLogin, signIn, logOff, logInAnonymously }
}
export const firestore = getFirestore(firebase)

// const messagesCollection = collection(firestore,'messages')
// const messagesQuery = messagesCollection.orderBy('createdAt', 'desc').limit(100)
// const filter = new Filter()

// export function useChat() {
//     const messages = ref([])
//     const unsubscribe = messagesQuery.onSnapshot((snapshot) => {
//         messages.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })).reverse()
//     })
//     onUnmounted(unsubscribe)

//     const { user, isLogin } = useAuth()
//     const sendMessage = (text) => {
//         if (!isLogin.value) return
//         const { photoURL, uid, displayName } = user.value
//         messagesCollection.add({
//             userName: displayName,
//             userId: uid,
//             userPhotoURL: photoURL,
//             text: filter.clean(text),
//             createdAt: firebase.firestore.FieldValue.serverTimestamp()
//         })
//     }

//     return { messages, sendMessage }
// }
