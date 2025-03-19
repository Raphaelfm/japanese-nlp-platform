import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from '../interfaces/user.interface'; // Importando a interface

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(username: string): Promise<User | null> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const user = (await this.prisma.user.findUnique({
      where: { username },
    })) as User | null;
    return user;
  }

  async createUser(username: string, password: string): Promise<User> {
    const existingUser = await this.findOne(username);
    if (existingUser) {
      throw new ConflictException('The user already exists.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    return await this.prisma.user.create({
      data: { username, password: hashedPassword },
    });
  }
}
