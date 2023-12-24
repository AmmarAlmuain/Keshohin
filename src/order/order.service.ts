import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { prisma } from 'src/lib/clients/prisma';
import { OrderDto, Status } from 'src/lib/dtos/order.dto';
import { customeRequest } from 'src/lib/interfaces';

@Injectable()
export class OrderService {
  async getOrders() {
    try {
      return await prisma.order.findMany();
    } catch (error) {
      throw new HttpException(
        'Somethun went wrong!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getUserOrders(userId: string) {
    try {
      return await prisma.order.findMany({
        where: {
          userId: userId,
        },
      });
    } catch (error) {
      throw new HttpException(
        'Somethun went wrong!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async postOrder(orderDto: OrderDto, request: customeRequest) {
    try {
      const order = await prisma.order.create({
        data: {
          userId: request.userId,
          totalPrice: Number(orderDto.totalPrice),
          orderStatus: orderDto.orderStatus as Status,
        },
      });
      if (orderDto.products) {
        orderDto.products.map(async (id: string) => {
          await prisma.product.update({
            where: { id: id },
            data: {
              orders: {
                connect: {
                  id: order.id,
                },
              },
            },
          });
        });
      }
      return order;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Somethun went wrong!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async putOrder(userId: string) {
    try {
      return await prisma.order.update({
        where: {
          id: userId,
        },
        data: {
          orderStatus: 'Completed',
        },
      });
    } catch (error) {
      throw new HttpException(
        'Somethun went wrong!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
