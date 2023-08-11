import { PrismaClient } from '@prisma/client';
import { nanoid } from 'nanoid';

class PrismaDb {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findUserByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async createUser(email: string, hashedPassword: string) {
    return await this.prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        userId: nanoid(),
      },
    });
  }
}

const prisma = new PrismaDb();

export { prisma };
