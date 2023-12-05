// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import { getDatabase } from 'firebase/database'
import 'firebase/compat/auth' // TODO: Add SDKs for Firebase products that you want to use
import Credentials from '../../credentials'
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: Credentials.apiKey,
  authDomain: Credentials.authDomain,
  projectId: Credentials.projectId,
  storageBucket: Credentials.storageBucket,
  messagingSenderId: Credentials.messagingSenderId,
  appId: Credentials.appId,
}

//init firebase app
const app = firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const db = getDatabase(app)
export { auth, db }
