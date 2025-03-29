import {
  Controller,
  Post,
  Body,
  ConflictException,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/guards/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() userDto: { username: string; password: string }) {
    try {
      return await this.usersService.createUser(
        userDto.username,
        userDto.password,
      );
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new Error('Error registering user.');
    }
  }

  @Post('login')
  async login(@Body() userDto: { username: string; password: string }) {
    return this.authService.validateLogin(userDto.username, userDto.password);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Get('users')
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }
}
