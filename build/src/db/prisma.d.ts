import { PrismaClient } from '@prisma/client';
export declare class PrismaDb {
    prisma: PrismaClient;
    constructor();
    findUserByEmail(email: string): Promise<{
        id: string;
        email: string;
        password: string;
        userId: string;
    } | null>;
    createUser(email: string, hashedPassword: string): Promise<{
        id: string;
        email: string;
        password: string;
        userId: string;
    }>;
}
