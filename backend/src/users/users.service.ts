import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from '../interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(username: string): Promise<User | null> {
    return (await this.prisma.user.findUnique({
      where: { username },
    })) as User | null;
  }

  async createUser(
    username: string,
    password: string,
    role: string = 'USER',
  ): Promise<User> {
    const existingUser = await this.findOne(username);
    if (existingUser) {
      throw new ConflictException('The user already exists.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return (await this.prisma.user.create({
      data: { username, password: hashedPassword, role },
    })) as User;
  }

  async getAllUsers(): Promise<User[]> {
    return (await this.prisma.user.findMany()) as User[];
  }
}
