import { Controller, Post, Body, UseGuards, UploadedFile, UnauthorizedException } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/user/user.entity';
import { GetUser } from 'src/user/get-user.decorator';
import { Express } from 'express';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AuthGuard) 
  @Post('create')
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @GetUser() user: User,
    @UploadedFile() file: Express.Multer.File
  ) {
    if (!user.isadmin) {
      throw new UnauthorizedException('คุณไม่มีสิทธิ์เข้าถึง'); 
    }

    createProductDto.image = file.buffer;
    return this.productService.createProduct(createProductDto);
  }
}
