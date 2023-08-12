"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaDb = void 0;
const client_1 = require("@prisma/client");
const nanoid_1 = require("nanoid");
class PrismaDb {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async findUserByEmail(email) {
        return await this.prisma.user.findUnique({
            where: {
                email: email,
            },
        });
    }
    async createUser(email, hashedPassword) {
        return await this.prisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
                userId: (0, nanoid_1.nanoid)(),
            },
        });
    }
}
exports.PrismaDb = PrismaDb;
//# sourceMappingURL=prisma.js.map