import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
// import { Express } from 'express';

export class ProductnDto {
  @MinLength(2)
  @MaxLength(255)
  @IsString()
  title: string;
  @IsOptional()
  @MinLength(1)
  @MaxLength(2)
  @IsString()
  discount: string;
  @MinLength(1)
  @MaxLength(4)
  @IsString()
  quantity: string;
  @MinLength(1)
  @MaxLength(4)
  @IsString()
  price: string;
  @MinLength(2)
  @MaxLength(1000)
  @IsString()
  shortDescription: string;
  @IsOptional()
  @MinLength(2)
  @MaxLength(3500)
  @IsString()
  about: string;
  @IsOptional()
  @MinLength(2)
  @MaxLength(1500)
  @IsString()
  howToUse: string;
  // @ArrayUnique()
  // @ArrayMinSize(1)
  // @ArrayMaxSize(5)
  // @IsArray()
  // images: Express.Multer.File[];
  @IsOptional()
  @ArrayUnique()
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  @IsArray()
  characteristics: string[];
  @IsOptional()
  @ArrayUnique()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @IsArray()
  ingredients: string[];
  @MinLength(2)
  @MaxLength(35)
  @IsString()
  subCategory: string;
  @MinLength(2)
  @MaxLength(35)
  @IsString()
  brand: string;
  @IsOptional()
  preview: Express.Multer.File;
  @IsOptional()
  previewTwo: Express.Multer.File;
  @IsOptional()
  previewThree: Express.Multer.File;
}

export class ProductnFilterDto {
  @IsOptional()
  @MinLength(2)
  @MaxLength(35)
  @IsString()
  subCategories: string;
  @IsOptional()
  @MinLength(2)
  @MaxLength(35)
  @IsString()
  brands: string;
}
