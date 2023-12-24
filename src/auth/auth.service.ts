import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { prisma } from 'src/lib/clients/prisma';
import { UserDto } from 'src/lib/dtos/user.dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { transporter } from 'src/lib/clients/nodemailer';
import { mailGenerator } from 'src/lib/clients/mailGenerator';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async regsiter(User: UserDto) {
    // await prisma.user.deleteMany();
    const email = User.email.toLowerCase();
    if (!User.password) {
      throw new HttpException('Password is required!', HttpStatus.NOT_FOUND);
    }
    const userByEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (userByEmail) {
      throw new HttpException(
        'This email address is already in use.',
        HttpStatus.CONFLICT,
      );
    }
    const password = await argon2.hash(User.password);
    const user = await prisma.user.create({
      data: {
        email,
        password,
      },
    });
    await prisma.profile.create({
      data: {
        userId: user?.id,
      },
    });
    const token = await this.jwtService.signAsync(
      { userId: user?.id },
      {
        secret: this.configService.get<string>('SECRET'),
        expiresIn: '30d',
      },
    );
    const verifyToken = await this.jwtService.signAsync(
      {
        userId: user?.id,
        confirmed: true,
      },
      {
        secret: this.configService.get<string>('SECRET'),
        expiresIn: '15m',
      },
    );
    const emailBody = mailGenerator.generate({
      body: {
        name: 'Keshohin',
        intro:
          "Thank you for joining Keshohin! We're delighted to have you as part of our community.",
        action: {
          instructions:
            'To access your account and explore our products, please click the button below:',
          button: {
            color: '#FF69B4',
            text: 'Verify your email',
            link: `${this.configService.get<string>(
              'WEBSITE_ROUTE',
            )}/auth/verify-account/${verifyToken}`,
          },
        },
        outro:
          "If you have any questions or feedback, feel free to reply to this email or contact us at racooneom@gmail.com. We'd love to hear from you.",
      },
    });

    transporter.sendMail({
      from: 'racooneom@gmail.com',
      to: user.email,
      html: emailBody,
    });
    return token;
  }
  async login(User) {
    const email = User.email.toLowerCase();
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        password: true,
      },
    });
    const password = User.password;
    const verifyPassword = await argon2.verify(user.password, password);
    if (verifyPassword) {
      const token = await this.jwtService.signAsync(
        { userId: user?.id },
        {
          secret: this.configService.get<string>('SECRET'),
          expiresIn: '30d',
        },
      );
      return token;
    }
    throw new HttpException('Invalid credentials.', HttpStatus.UNAUTHORIZED);
  }
  async verifyAccount(token: string) {
    const validateToken = await this.jwtService.verifyAsync(token, {
      secret: this.configService.get<string>('SECRET'),
    });
    if (validateToken.confirmed) {
      const user = await prisma.user.findUnique({
        where: {
          id: validateToken.userId,
        },
      });
      if (user.isConfirmed)
        throw new HttpException('token is expired.', HttpStatus.NOT_FOUND);
      const updateUser = await prisma.user.update({
        where: {
          id: validateToken.userId,
        },
        data: {
          isConfirmed: true,
        },
      });
      if (updateUser) return 'user confirmed';
    }
    throw new HttpException('token is expired.', HttpStatus.NOT_FOUND);
  }
  async superLogin(User) {
    const email = User.email.toLowerCase();
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        password: true,
      },
    });
    if (user) {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          isConfirmed: true,
        },
      });
    }
    const password = User.password;
    const verifyPassword = await argon2.verify(user.password, password);
    if (verifyPassword) {
      const token = await this.jwtService.signAsync(
        { userId: user?.id, super: true },
        {
          secret: this.configService.get<string>('SECRET'),
          expiresIn: '30d',
        },
      );
      return token;
    }
    throw new HttpException('Invalid credentials.', HttpStatus.UNAUTHORIZED);
  }
}
