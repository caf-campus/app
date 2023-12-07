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

const secret_name =
  'arn:aws:secretsmanager:eu-west-3:542935783289:secret:prod/cafe-campus-QvSFJM'

const client = new SecretsManagerClient({
  credentials: {
    accessKeyId: 'AKIAX42L6S54XPUSTE5C',
    secretAccessKey: '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',
  },
  region: 'eu-west-3',
})

const data = () => {
  return client
    .send(
      new GetSecretValueCommand({
        SecretId: secret_name,
        VersionStage: 'AWSCURRENT', // VersionStage defaults to AWSCURRENT if unspecified
      }),
    )
    .then(data => {
      return JSON.parse(data)
    })
}

const secret = data()
console.log(secret)

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
