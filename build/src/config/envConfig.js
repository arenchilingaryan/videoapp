"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envConfig = void 0;
const zod_1 = require("zod");
const dotenv = require("dotenv");
dotenv.config();
const envSchema = zod_1.z.object({
    PORT: zod_1.z.string(),
    SECRET_KEY: zod_1.z.string(),
    FIREBASE_TYPE: zod_1.z.string(),
    FIREBASE_PROJECT_ID: zod_1.z.string(),
    FIREBASE_PRIVATE_KEY_ID: zod_1.z.string(),
    FIREBASE_PRIVATE_KEY: zod_1.z.string(),
    FIREBASE_CLIENT_EMAIL: zod_1.z.string(),
    FIREBASE_CLIENT_ID: zod_1.z.string(),
    FIREBASE_AUTH_URI: zod_1.z.string(),
    FIREBASE_TOKEN_URI: zod_1.z.string(),
    FIREBASE_AUTH_PROVIDER_X509_CERT_URL: zod_1.z.string(),
    FIREBASE_CLIENT_X509_CERT_URL: zod_1.z.string(),
    FIREBASE_UNIVERSE_DOMAIN: zod_1.z.string(),
    NEO4J_PORT: zod_1.z.string(),
    NEO4J_PASSWORD: zod_1.z.string(),
    ES_PORT: zod_1.z.string(),
    TMDB_API_KEY: zod_1.z.string(),
});
exports.envConfig = envSchema.parse(process.env);
//# sourceMappingURL=envConfig.js.map