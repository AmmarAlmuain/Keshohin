import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [OrderController],
  providers: [OrderService, JwtService],
})
export class OrderModule {}
