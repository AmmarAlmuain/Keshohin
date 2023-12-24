import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Roles } from '../decorators';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { customeRequest } from '../interfaces';

@Injectable()
export class Role implements CanActivate {
  constructor(
    private reflector: Reflector,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const role = this.reflector.get<string>(Roles, context.getHandler());
    const request: customeRequest = context.switchToHttp().getRequest();
    if (role === 'admin' && request.headers['token']) {
      const response = this.jwtService.verify(request.headers['token'], {
        secret: this.configService.get<string>('SECRET'),
      });
      return response.super;
    }
    return false;
  }
}
