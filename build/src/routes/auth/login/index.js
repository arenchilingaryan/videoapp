"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRouter = void 0;
const express_validator_1 = require("express-validator");
const admin = require("firebase-admin");
const hashPassword_1 = require("../../../utils/hashPassword");
const token_1 = require("../../../utils/token");
const db_1 = require("../../../db");
const loginRouter = async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { email, password } = req.body;
        const user = await admin.auth().getUserByEmail(email);
        const hashedPassword = (0, hashPassword_1.hashPassword)(password);
        if (user) {
            const dbUser = await db_1.db.prisma.findUserByEmail(user.email);
            if ((dbUser === null || dbUser === void 0 ? void 0 : dbUser.password) === hashedPassword) {
                const encodeData = {
                    email: dbUser.email,
                    uid: user.uid,
                };
                const token = (0, token_1.encodeToken)(encodeData);
                return res.send({ status: 'success', token });
            }
            return res.send({ status: 'failure', error: 'Something went wrong' });
        }
    }
    catch (error) {
        return res.send({ status: 'failure', error });
    }
    return null;
};
exports.loginRouter = loginRouter;
//# sourceMappingURL=index.js.map