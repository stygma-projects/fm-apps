import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthBody } from '../controllers/auth.controller';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { AUTH_ERROR, LoginResponse } from '../types/auth.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(authBody: AuthBody): Promise<LoginResponse> {
    const userFound = await this.userService.findOneByEmail(authBody.email);
    const isPasswordMatching = await compare(
      authBody.password,
      userFound.password,
    );
    if (!isPasswordMatching) {
      throw new BadRequestException(AUTH_ERROR.WRONG_PASSWORD);
    }
    const jwtPayload = { userId: userFound.id, role: userFound.role };
    return {
      access_token: this.jwtService.sign(jwtPayload),
    };
  }
}
