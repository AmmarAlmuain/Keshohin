import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Response } from 'express';
import { customeRequest } from 'src/lib/interfaces';

@Injectable()
export class requestValidation implements NestMiddleware {
  constructor(private jwtService: JwtService) {}
  use(req: customeRequest, res: Response, next: NextFunction) {
    const userId = this.jwtService.verify(req.headers['token'] as string);
    req.userId = userId['userId'];
    next();
  }
}
