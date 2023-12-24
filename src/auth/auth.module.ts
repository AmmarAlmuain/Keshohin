import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [JwtService, AuthService, ConfigService],
  controllers: [AuthController],
})
export class AuthModule {}
