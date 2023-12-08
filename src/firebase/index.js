/* eslint-disable react-hooks/rules-of-hooks */
import firebase from 'firebase/compat/app'
import { getDatabase } from 'firebase/database'
import 'firebase/compat/auth'

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

let loadedCreds

const initConfig = firebaseConfig => {
  const app = firebase.initializeApp(firebaseConfig)
  const auth = firebase.auth()
  const db = getDatabase(app)
  loadedCreds = { auth, db }
}

const useDevCreds = async () => {
  try {
    const config = import.meta.env
    initConfig({
      apiKey: config.VITE_apiKey,
      appId: config.VITE_appId,
      authDomain: config.VITE_authDomain,
      databaseURL: config.VITE_databaseURL,
      messagingSenderId: config.VITE_messagingSenderId,
      projectId: config.VITE_projectId,
      storageBucket: config.VITE_storageBucket,
    })
  } catch (error) {
    console.log(error)
  }
}

const useProdCreds = async () => {
  try {
    const firebaseConfig = JSON.parse(
      await client.send(
        new GetSecretValueCommand({
          SecretId: secret_name,
          VersionStage: 'AWSCURRENT',
        }),
      ),
    )
    initConfig(firebaseConfig)
  } catch (err) {
    console.error(err)
  }
}

import.meta.env.MODE === 'production' ? useProdCreds() : await useDevCreds()

export const { auth, db } = loadedCreds
