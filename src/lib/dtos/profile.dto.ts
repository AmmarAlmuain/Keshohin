import {
  IsMobilePhone,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ProfileDto {
  @IsOptional()
  @MinLength(2)
  @MaxLength(15)
  @IsString()
  firstName: string;
  @IsOptional()
  @MinLength(2)
  @MaxLength(15)
  @IsString()
  lastName: string;
  @IsOptional()
  @MaxLength(12)
  @IsMobilePhone()
  @IsString()
  phoneNumber: string;
  @IsOptional()
  @MaxLength(255)
  @IsString()
  dateOfBirth: string;
}
