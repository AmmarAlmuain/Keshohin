import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from 'src/lib/dtos/order.dto';
import { customeRequest } from 'src/lib/interfaces';
import { Roles } from 'src/lib/decorators';
import { Role } from 'src/lib/guards/role';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}
  @Get()
  @Roles(`admin`)
  @UseGuards(Role)
  async getOrders() {
    return this.orderService.getOrders();
  }
  @Get('/:userId')
  async getUserOrders(@Param('userId') userId: string) {
    return this.orderService.getUserOrders(userId);
  }
  @Post()
  async postOrder(@Body() orderDto: OrderDto, @Req() request: customeRequest) {
    return this.orderService.postOrder(orderDto, request);
  }
  @Roles(`admin`)
  @UseGuards(Role)
  @Put('/complete/:userId')
  async putOrder(@Param('userId') userId: string) {
    return this.orderService.putOrder(userId);
  }
}
