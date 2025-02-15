import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from '../services/auth.service'
import { LoginResponse } from '../types/auth.type'
import { AuthDto } from '../dto/auth.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() authDto: AuthDto): Promise<LoginResponse> {
    return await this.authService.login(authDto)
  }
}
