"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authCommonGuards = void 0;
const express_validator_1 = require("express-validator");
exports.authCommonGuards = [
    (0, express_validator_1.check)('email').isEmail().withMessage('Must be a valid email address'),
    (0, express_validator_1.check)('password')
        .exists()
        .isLength({ min: 6, max: 20 })
        .withMessage('Password is incorrect'),
];
//# sourceMappingURL=authGuards.js.map