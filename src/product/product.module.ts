import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [ProductService, JwtService],
  controllers: [ProductController],
})
export class ProductModule {}
