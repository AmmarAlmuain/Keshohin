import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class LocationDto {
  @MinLength(2)
  @MaxLength(255)
  @IsString()
  address: string;
  @MinLength(5)
  @MaxLength(5)
  @IsString()
  zipCode: string;
  @MinLength(2)
  @MaxLength(75)
  @IsString()
  city: string;
  @MinLength(2)
  @MaxLength(75)
  @IsString()
  country: string;
  @MinLength(2)
  @MaxLength(75)
  @IsOptional()
  @IsString()
  state: string;
}

export class LocationUpdateDto {
  @IsOptional()
  @MinLength(2)
  @MaxLength(255)
  @IsString()
  address: string;
  @IsOptional()
  @MinLength(5)
  @MaxLength(5)
  @IsString()
  zipCode: string;
  @IsOptional()
  @MinLength(2)
  @MaxLength(75)
  @IsString()
  city: string;
  @IsOptional()
  @MinLength(2)
  @MaxLength(75)
  @IsString()
  country: string;
  @IsOptional()
  @MinLength(2)
  @MaxLength(75)
  @IsString()
  state: string;
}
