"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const envConfig_1 = require("../config/envConfig");
const firebaseConfig = {
    type: envConfig_1.envConfig.FIREBASE_TYPE,
    projectId: envConfig_1.envConfig.FIREBASE_PROJECT_ID,
    privateKeyId: envConfig_1.envConfig.FIREBASE_PRIVATE_KEY_ID,
    privateKey: Buffer.from(envConfig_1.envConfig.FIREBASE_PRIVATE_KEY, 'base64')
        .toString('utf-8')
        .replace(/\\n/g, '\n'),
    clientEmail: envConfig_1.envConfig.FIREBASE_CLIENT_EMAIL,
    clientId: envConfig_1.envConfig.FIREBASE_CLIENT_ID,
    authUri: envConfig_1.envConfig.FIREBASE_AUTH_URI,
    tokenUri: envConfig_1.envConfig.FIREBASE_TOKEN_URI,
    authProviderX509CertUrl: envConfig_1.envConfig.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    clientC509CertUrl: envConfig_1.envConfig.FIREBASE_CLIENT_X509_CERT_URL,
};
admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
});
//# sourceMappingURL=firebase.js.map