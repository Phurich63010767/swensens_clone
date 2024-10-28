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
    const userid = request.headers.userid;
    const user = await this.userService.findOneById(userid);

    if (!user) {
      console.log("ไม่ได้ login");
      throw new UnauthorizedException('คุณต้องเข้าสู่ระบบ');
    }

    if (!user.isadmin) {
      console.log("ไม่เป็น admin");
      throw new UnauthorizedException('คุณต้องมีสิทธิ์ผู้ดูแลระบบ');
    }
    console.log("เป็น admin");
    return true;
  }
}
