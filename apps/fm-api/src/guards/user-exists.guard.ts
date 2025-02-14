import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserRequest } from '../types/user.type';

@Injectable()
export class UserExistsGuard implements CanActivate {
  constructor(private readonly usersService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<UserRequest>();
    const userId = request.params.userId;
    const email = request.body.email;

    const userFound = await this.usersService.findOne(userId, email);
    return !!userFound;
  }
}
