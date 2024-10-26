import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from '../user/user.service'; 

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('คุณต้องเข้าสู่ระบบ');
    }

    const isAdmin = this.reflector.get<boolean>('isAdmin', context.getHandler());
    if (isAdmin && !user.isadmin) {
      throw new UnauthorizedException('คุณต้องมีสิทธิ์ผู้ดูแลระบบ');
    }

    return true;
  }
}
