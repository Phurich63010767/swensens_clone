import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity'; // แก้ไขเป็น path ของ entity ของคุณ

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // เพิ่ม entity User ใน TypeOrmModule
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}