"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = void 0;
const crypto = require("crypto");
const envConfig_1 = require("../config/envConfig");
const secretKey = envConfig_1.envConfig.SECRET_KEY;
function hashPassword(password) {
    const hmac = crypto.createHmac('sha256', secretKey);
    hmac.update(password);
    return hmac.digest('hex');
}
exports.hashPassword = hashPassword;
//# sourceMappingURL=hashPassword.js.map