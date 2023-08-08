"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = exports.encodeToken = void 0;
const jwt = require("jsonwebtoken");
const envConfig_1 = require("../config/envConfig");
const encodeToken = (data) => {
    const a = jwt.sign(data, envConfig_1.envConfig.SECRET_KEY, { algorithm: 'HS256' });
    return a;
};
exports.encodeToken = encodeToken;
const decodeToken = (token) => {
    try {
        return jwt.verify(token, envConfig_1.envConfig.SECRET_KEY);
    }
    catch {
        return null;
    }
};
exports.decodeToken = decodeToken;
//# sourceMappingURL=token.js.map