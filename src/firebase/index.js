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

const fb = { auth: null, db: null }

const initConfig = firebaseConfig => {
  const app = firebase.initializeApp(firebaseConfig)
  fb.auth = firebase.auth()
  fb.db = getDatabase(app)
}

const useDevCreds = async () => {
  await import('../../Credentials.js').then(firebaseConfig =>
    initConfig(firebaseConfig),
  )
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

await (async () =>
  import.meta.env.MODE === 'production'
    ? await useProdCreds()
    : await useDevCreds())()

export const { auth, db } = fb
