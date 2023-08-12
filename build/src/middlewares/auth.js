"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authGuard = void 0;
const token_1 = require("../utils/token");
const db_1 = require("../db");
const authGuard = async (req, _, next) => {
    const token = req.headers['token'];
    if (!token)
        return next();
    const tokenData = (0, token_1.decodeToken)(token);
    const user = await db_1.db.prisma.findUserByEmail(tokenData === null || tokenData === void 0 ? void 0 : tokenData.email);
    if (user && req.context.userData) {
        req.context.userData.email = user.email;
        req.context.userData.userId = user.userId;
    }
    next();
};
exports.authGuard = authGuard;
//# sourceMappingURL=auth.js.map