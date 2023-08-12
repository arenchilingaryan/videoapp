import * as express from 'express';
import * as cors from 'cors';
import helmet from 'helmet';
import * as bodyParser from 'body-parser';
import { envConfig } from './config/envConfig';
import { loginRouter } from './routes/auth/login';
import { registerRouter } from './routes/auth/register';
import { authCommonGuards } from './middlewares/authGuards';
import { extendContextWithDb } from './db';
import { searchRouter } from './routes/search';
import { watchRouter } from './routes/watch';
import { authGuard } from './middlewares/auth';
import { recommendationRouter } from './routes/reccomendations';
import { detailsRouter } from './routes/details';
import { topRatedRouter } from './routes/topRatedRouter';
import './config/firebase';
import { metricsMiddleware } from './middlewares/prometheus';

export const app = express();

app.use(cors());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", 'https://cdn.jsdelivr.net'],
    },
  })
);
app.use(bodyParser.json());
app.use(extendContextWithDb);
app.get('/favicon.ico', (_, res) => res.status(204));
app.use(metricsMiddleware);

app.post('/auth/login', authCommonGuards, loginRouter);
app.post('/auth/register', authCommonGuards, registerRouter);
app.get('/search', searchRouter);
app.post('/watch', authGuard, watchRouter);
app.get('/recommendations', authGuard, recommendationRouter);
app.get('/details', detailsRouter);
app.get('/topRated', topRatedRouter);

app.listen(envConfig.PORT, () => {
  console.log(`Strarted on port ${envConfig.PORT}`);
});
