// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import { getDatabase } from 'firebase/database'
import Credentials from '../../credentials'
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

let auth
let db

const fetchData = async () => {
  try {
    const response = await client.send(
      new GetSecretValueCommand({
        SecretId: secret_name,
        VersionStage: 'AWSCURRENT',
      }),
    )
    const secret = JSON.parse(response.SecretString)

    const firebaseConfig = {
      apiKey: secret.apiKey,
      authDomain: secret.authDomain,
      projectId: secret.projectId,
      storageBucket: secret.storageBucket,
      messagingSenderId: secret.messagingSenderId,
      appId: secret.appId,
      databaseURL: secret.databaseURL,
    }

    // Initialize Firebase app
    const app = firebase.initializeApp(firebaseConfig)

    auth = firebase.auth()
    db = getDatabase(app)
    // Export necessary Firebase objects
  } catch (err) {
    console.error(err)
  }
}

const isProduction = import.meta.env.MODE == 'production' ? true : false
if (isProduction) {
  fetchData()
} else {
  const firebaseConfig = {
    apiKey: Credentials.apiKey,
    authDomain: Credentials.authDomain,
    projectId: Credentials.projectId,
    storageBucket: Credentials.storageBucket,
    messagingSenderId: Credentials.messagingSenderId,
    appId: Credentials.appId,
    databaseURL: Credentials.databaseURL,
  }
  // Initialize Firebase app
  const app = firebase.initializeApp(firebaseConfig)
  auth = firebase.auth()
  db = getDatabase(app)
}

export { auth, db }
