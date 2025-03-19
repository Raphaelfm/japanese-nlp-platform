import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
export declare class AuthController {
    private readonly authService;
    private readonly usersService;
    constructor(authService: AuthService, usersService: UsersService);
    register(userDto: {
        username: string;
        password: string;
    }): Promise<import("../interfaces/user.interface").User>;
    login(userDto: {
        username: string;
        password: string;
    }): Promise<{
        access_token: string;
    }>;
}
