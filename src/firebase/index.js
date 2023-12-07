/* eslint-disable no-useless-catch */
/* eslint-disable no-undef */
// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import { getDatabase } from 'firebase/database'
import 'firebase/compat/auth' // TODO: Add SDKs for Firebase products that you want to use
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager'

const secret_name = 'prod/cafe-campus'

const client = new SecretsManagerClient({
  region: 'eu-west-3',
})

let response

const data = async () => {
  try {
    response = await client.send(
      new GetSecretValueCommand({
        SecretId: secret_name,
        VersionStage: 'AWSCURRENT', // VersionStage defaults to AWSCURRENT if unspecified
      }),
    )
  } catch (err) {
    console.log(err)
  }
}

data()

const secret = JSON.parse(response.SecretString)

// Your code goes here

console.log('-----------------')
console.log(secret.apiKey)
console.log('-----------------')
console.log(typeof secret.apiKey)
console.log('-----------------')

const firebaseConfig = {
  apiKey: secret.apiKey,
  authDomain: secret.authDomain,
  projectId: secret.projectId,
  storageBucket: secret.storageBucket,
  messagingSenderId: secret.messagingSenderId,
  appId: secret.appId,
  databaseURL: secret.databaseURL,
}

//init firebase app
const app = firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const db = getDatabase(app)
export { auth, db }
