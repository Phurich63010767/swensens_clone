import { Controller, Post, Body, Get, Param, Delete, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() data: any): Promise<User> {
    return this.userService.createUser(data);
  }

  @Get('email/:email')
  async findByEmail(@Param('email') email: string): Promise<User> {
  const user = await this.userService.findByEmail(email);
  if (!user) {
    throw new NotFoundException(`User with email ${email} not found`);
  }
  return user;
}

  @Post('login')
  async login(@Body() credentials: { email: string; password: string }): Promise<{ message: string }> {
    const { email, password } = credentials;
    const user = await this.userService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
    }

    return { message: 'เข้าสู่ระบบสำเร็จ' };
  }

  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    return await this.userService.findOneById(id);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    return await this.userService.deleteUser(id);
  }
}
