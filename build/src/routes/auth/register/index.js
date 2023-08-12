"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRouter = void 0;
const express_validator_1 = require("express-validator");
const admin = require("firebase-admin");
const hashPassword_1 = require("../../../utils/hashPassword");
const token_1 = require("../../../utils/token");
const db_1 = require("../../../db");
const registerRouter = async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { email, password } = req.body;
        const userExists = await db_1.db.prisma.findUserByEmail(email);
        if (userExists) {
            return res
                .status(400)
                .send({ status: 'failure', error: 'User already exists' });
        }
        const hashedPassword = (0, hashPassword_1.hashPassword)(password);
        const newUser = await admin.auth().createUser({ email, password });
        await db_1.db.prisma.createUser(email, hashedPassword);
        const encodeData = {
            email,
            uid: newUser.uid,
        };
        const token = (0, token_1.encodeToken)(encodeData);
        return res.send({
            status: 'success',
            message: 'User registered successfully',
            token,
        });
    }
    catch (error) {
        return res.status(400).send({ status: 'failure', error });
    }
};
exports.registerRouter = registerRouter;
//# sourceMappingURL=index.js.map