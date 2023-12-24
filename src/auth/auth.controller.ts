import { Body, Controller, Param, Get, Post } from '@nestjs/common';
import { UserDto } from 'src/lib/dtos/user.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}
  @Post(`register`)
  async register(@Body() User: UserDto) {
    return this.authService.regsiter(User);
  }
  @Post(`login`)
  async login(@Body() User) {
    return this.authService.login(User);
  }
  @Post(`login-via-provider`)
  async loginViaProvider() {
    return `login via provider route`;
  }
  @Get(`verify-account/:token`)
  async verifyAccount(@Param('token') token: string) {
    return this.authService.verifyAccount(token);
  }
  @Post(`super-login`)
  async superLogin(@Body() User) {
    return this.authService.superLogin(User);
  }
}
