import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  Body,
  UploadedFiles,
  Delete,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/lib/decorators';
import { Role } from 'src/lib/guards/role';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { ProductnDto, ProductnFilterDto } from 'src/lib/dtos/product.dto';
import { ProductService } from './product.service';

@Controller(`product`)
export class ProductController {
  constructor(private productService: ProductService) {}
  @Get()
  async getProducts(@Query() qs: ProductnFilterDto) {
    return this.productService.getProducts(qs);
  }
  @Post()
  @Roles(`admin`)
  @UseGuards(Role)
  @UseInterceptors(AnyFilesInterceptor())
  async postProduct(
    @UploadedFiles()
    files: Array<Express.Multer.File>,
    @Body() productnDto: ProductnDto,
  ) {
    return this.productService.postProduct(files, productnDto);
  }
  @Delete(`/:productId`)
  @Roles(`admin`)
  @UseGuards(Role)
  async deleteProduct(@Param('productId') productId: string) {
    return this.productService.deleteProduct(productId);
  }
  @Get(`brands`)
  async getBrands() {
    return this.productService.getBrands();
  }
  @Post(`brand`)
  @Roles(`admin`)
  @UseGuards(Role)
  async postBrand(@Body() body: { title: string }) {
    return this.productService.postBrand(body.title);
  }
  @Delete(`brand/:brandId`)
  @Roles(`admin`)
  @UseGuards(Role)
  async deleteBrand(@Param('brandId') brandId: string) {
    return this.productService.deleteBrand(brandId);
  }
  @Get(`sub-categories`)
  async getSubCategory() {
    return this.productService.getSubCategory();
  }
  @Post(`sub-category`)
  @Roles(`admin`)
  @UseGuards(Role)
  async postSubCategory(@Body() body) {
    return this.productService.postSubCategory(body.title);
  }
  @Delete(`sub-category/:subCategoryId`)
  @Roles(`admin`)
  @UseGuards(Role)
  async deleteSubCategory(@Param('subCategoryId') subCategoryId: string) {
    return this.productService.deleteSubCategory(subCategoryId);
  }
}
