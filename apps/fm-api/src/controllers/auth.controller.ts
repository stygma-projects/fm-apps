import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginResponse } from '../types/auth.type';

export interface AuthBody {
  email: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() authBody: AuthBody): Promise<LoginResponse> {
    return await this.authService.login(authBody);
  }
}
