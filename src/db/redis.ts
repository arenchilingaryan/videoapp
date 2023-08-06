import Redis from 'ioredis';

const redis = new Redis({
  port: parseInt(process.env.REDIS_PORT!),
  host: process.env.REDIS_HOST, // Redis host
  username: process.env.REDIS_USERNAME, // needs Redis >= 6
  password: process.env.REDIS_PASSWORD,
  db: parseInt(process.env.REDIS_DB!), // Defaults to 0
});

export { redis };
