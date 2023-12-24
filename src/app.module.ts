import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { requestValidation } from 'src/lib/middlewares/requestValidation';
import { OrderModule } from './order/order.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    ProductModule,
    UserModule,
    AuthModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('SECRET'),
          global: true,
          signOptions: { expiresIn: '30d' },
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    OrderModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(requestValidation)
      .exclude(
        {
          path: 'auth/(.*)',
          method: RequestMethod.ALL,
        },
        {
          path: 'product/',
          method: RequestMethod.GET,
        },
      )
      .forRoutes(
        {
          path: 'user/(.*)',
          method: RequestMethod.ALL,
        },
        {
          path: 'order/',
          method: RequestMethod.ALL,
        },
        {
          path: 'order/(.*)',
          method: RequestMethod.ALL,
        },
        {
          path: 'product/(.*)',
          method: RequestMethod.ALL,
        },
      );
  }
}
