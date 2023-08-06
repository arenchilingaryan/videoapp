import * as admin from 'firebase-admin';
import { envConfig } from '../config/envConfig';

const firebaseConfig = {
  type: envConfig.FIREBASE_TYPE,
  projectId: envConfig.FIREBASE_PROJECT_ID,
  privateKeyId: envConfig.FIREBASE_PRIVATE_KEY_ID,
  privateKey: Buffer.from(envConfig.FIREBASE_PRIVATE_KEY, 'base64')
    .toString('utf-8')
    .replace(/\\n/g, '\n'),
  clientEmail: envConfig.FIREBASE_CLIENT_EMAIL,
  clientId: envConfig.FIREBASE_CLIENT_ID,
  authUri: envConfig.FIREBASE_AUTH_URI,
  tokenUri: envConfig.FIREBASE_TOKEN_URI,
  authProviderX509CertUrl: envConfig.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  clientC509CertUrl: envConfig.FIREBASE_CLIENT_X509_CERT_URL,
};

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
});
