// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import { getDatabase } from 'firebase/database'
import 'firebase/compat/auth' // TODO: Add SDKs for Firebase products that you want to use

const useCreds = () => {
  const config = import.meta.env
  const creds = {
    apiKey: config.VITE_apiKey,
    appId: config.VITE_appId,
    authDomain: config.VITE_authDomain,
    databaseURL: config.VITE_databaseURL,
    messagingSenderId: config.VITE_messagingSenderId,
    projectId: config.VITE_projectId,
    storageBucket: config.VITE_storageBucket,
  }
  return firebase.initializeApp(creds)
}

// eslint-disable-next-line react-hooks/rules-of-hooks
const app = useCreds()

const auth = firebase.auth()
const db = getDatabase(app)

export { auth, db }
