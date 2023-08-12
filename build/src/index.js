"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express = require("express");
const cors = require("cors");
const helmet_1 = require("helmet");
const bodyParser = require("body-parser");
const envConfig_1 = require("./config/envConfig");
const login_1 = require("./routes/auth/login");
const register_1 = require("./routes/auth/register");
const authGuards_1 = require("./middlewares/authGuards");
const db_1 = require("./db");
const search_1 = require("./routes/search");
const watch_1 = require("./routes/watch");
const auth_1 = require("./middlewares/auth");
const reccomendations_1 = require("./routes/reccomendations");
const details_1 = require("./routes/details");
const topRatedRouter_1 = require("./routes/topRatedRouter");
require("./config/firebase");
const prometheus_1 = require("./middlewares/prometheus");
exports.app = express();
exports.app.use(cors());
exports.app.use(helmet_1.default.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", 'https://cdn.jsdelivr.net'],
    },
}));
exports.app.use(bodyParser.json());
exports.app.use(db_1.extendContextWithDb);
exports.app.get('/favicon.ico', (_, res) => res.status(204));
exports.app.use(prometheus_1.metricsMiddleware);
exports.app.post('/auth/login', authGuards_1.authCommonGuards, login_1.loginRouter);
exports.app.post('/auth/register', authGuards_1.authCommonGuards, register_1.registerRouter);
exports.app.get('/search', search_1.searchRouter);
exports.app.post('/watch', auth_1.authGuard, watch_1.watchRouter);
exports.app.get('/recommendations', auth_1.authGuard, reccomendations_1.recommendationRouter);
exports.app.get('/details', details_1.detailsRouter);
exports.app.get('/topRated', topRatedRouter_1.topRatedRouter);
exports.app.listen(envConfig_1.envConfig.PORT, () => {
    console.log(`Strarted on port ${envConfig_1.envConfig.PORT}`);
});
//# sourceMappingURL=index.js.map