import {
  ArrayUnique,
  IsArray,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class OrderDto {
  @MinLength(1)
  @MaxLength(5)
  @IsString()
  totalPrice: string;
  @MinLength(9)
  @MaxLength(10)
  @IsString()
  orderStatus: string;
  @IsOptional()
  @ArrayUnique()
  @IsArray()
  products: Array<string>;
}

export type Status = 'Processing' | 'Completed';
