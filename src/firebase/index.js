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

let firebaseConfig

const data = () => {
  let tempData = {}
  return client
    .send(
      new GetSecretValueCommand({
        SecretId: secret_name,
        VersionStage: 'AWSCURRENT', // VersionStage defaults to AWSCURRENT if unspecified
      }),
    )
    .then(data => {
      tempData = JSON.parse(data.SecretString)
      return {
        apiKey: tempData.apiKey,
        authDomain: tempData.authDomain,
        projectId: tempData.projectId,
        storageBucket: tempData.storageBucket,
        messagingSenderId: tempData.messagingSenderId,
        appId: tempData.appId,
        databaseURL: tempData.databaseURL,
      }
    })
}

firebaseConfig = data()
console.log(secret)

// Your code goes here

console.log('-----------------')
console.log(secret.apiKey)
console.log('-----------------')
console.log(typeof secret.apiKey)
console.log('-----------------')

//init firebase app
const app = firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const db = getDatabase(app)
export { auth, db }
