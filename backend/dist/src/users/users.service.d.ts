import { PrismaService } from '../../prisma/prisma.service';
import { User } from '../interfaces/user.interface';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findOne(username: string): Promise<User | null>;
    createUser(username: string, password: string): Promise<User>;
}
