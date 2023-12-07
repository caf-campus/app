/* eslint-disable no-undef */
// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import { getDatabase } from 'firebase/database'
import Credentials from '../../credentials'
import 'firebase/compat/auth' // TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: Credentials.apiKey,
  authDomain: Credentials.authDomain,
  projectId: Credentials.projectId,
  storageBucket: Credentials.storageBucket,
  messagingSenderId: Credentials.messagingSenderId,
  appId: Credentials.appId,
  databaseURL: Credentials.databaseURL,
}

//init firebase app
const app = firebase.initializeApp(firebaseConfig, {
  persistence: firebase.browserLocalPersistence,
})

const auth = firebase.auth()
const db = getDatabase(app)
export { auth, db }
