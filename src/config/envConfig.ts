import { z } from 'zod';
import * as dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env',
});

const envSchema = z.object({
  PORT: z.string(),
  SECRET_KEY: z.string(),
  FIREBASE_TYPE: z.string(),
  FIREBASE_PROJECT_ID: z.string(),
  FIREBASE_PRIVATE_KEY_ID: z.string(),
  FIREBASE_PRIVATE_KEY: z.string(),
  FIREBASE_CLIENT_EMAIL: z.string(),
  FIREBASE_CLIENT_ID: z.string(),
  FIREBASE_AUTH_URI: z.string(),
  FIREBASE_TOKEN_URI: z.string(),
  FIREBASE_AUTH_PROVIDER_X509_CERT_URL: z.string(),
  FIREBASE_CLIENT_X509_CERT_URL: z.string(),
  FIREBASE_UNIVERSE_DOMAIN: z.string(),
  NEO4J_PORT: z.string(),
  NEO4J_PASSWORD: z.string(),
  ES_PORT: z.string(),
  TMDB_API_KEY: z.string(),
  ES_SERVICE: z.string(),
});

export const envConfig = envSchema.parse(process.env);
