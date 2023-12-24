import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserDto {
  @IsEmail(
    {},
    {
      message: 'This email is not valid.',
    },
  )
  @MaxLength(255)
  @IsNotEmpty()
  @IsString()
  email: string;
  @IsOptional()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/[a-zA-Z0-9.!@#]{8,32}$/gm, {
    message: 'This password is too weak.',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsOptional()
  @IsString()
  providerId: string;
  @IsOptional()
  @IsString()
  providerType: string;
  @IsOptional()
  @IsBoolean()
  isConfirmed: boolean;
}
