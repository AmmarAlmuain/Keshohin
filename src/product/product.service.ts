import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { prisma } from 'src/lib/clients/prisma';
import { Express } from 'express';
import { ProductnDto, ProductnFilterDto } from 'src/lib/dtos/product.dto';
import { deleteImage, uploadImage } from 'src/lib/clients/cloudinary';

@Injectable()
export class ProductService {
  async getBrands() {
    try {
      return await prisma.brand.findMany();
    } catch (error) {
      throw new HttpException(
        'Somethun went wrong!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async postBrand(title: string) {
    try {
      return await prisma.brand.create({
        data: {
          title: title,
        },
      });
    } catch (error) {
      throw new HttpException(
        'Somethun went wrong!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async deleteBrand(brandId: string) {
    try {
      return await prisma.brand.delete({
        where: {
          id: brandId,
        },
      });
    } catch (error) {
      throw new HttpException(
        'Somethun went wrong!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getSubCategory() {
    try {
      return await prisma.subCategory.findMany();
    } catch (error) {
      throw new HttpException(
        'Somethun went wrong!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async postSubCategory(title: string) {
    try {
      return await prisma.subCategory.create({
        data: {
          title: title,
        },
      });
    } catch (error) {
      throw new HttpException(
        'Somethun went wrong!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async deleteSubCategory(subCategoryId: string) {
    try {
      return await prisma.subCategory.delete({
        where: {
          id: subCategoryId,
        },
      });
    } catch (error) {
      throw new HttpException(
        'Somethun went wrong!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getProducts(qs: ProductnFilterDto) {
    try {
      const products = await prisma.product.findMany({
        where: {
          OR: [
            {
              brands: {
                some: {
                  title: qs.brands,
                },
              },
            },
            {
              subCategories: {
                some: {
                  title: qs.subCategories,
                },
              },
            },
          ],
        },
      });
      return products;
    } catch (error) {
      throw new HttpException(
        'Somethun went wrong!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async postProduct(
    files: Array<Express.Multer.File>,
    productnDto: ProductnDto,
  ) {
    try {
      // Plain Obj
      const productObj = {
        title: productnDto.title,
        discount: Number(productnDto.discount),
        quantity: Number(productnDto.quantity),
        price: Number(productnDto.price),
        shortDescription: productnDto.shortDescription,
        about: productnDto.about,
        howToUse: productnDto.howToUse,
      };

      // Brand part
      const brandName: string = productnDto.brand;
      const brand = await prisma.brand.findFirst({
        where: {
          title: brandName,
        },
      });
      if (!brand) {
        throw new HttpException('Brand not found!', HttpStatus.NOT_FOUND);
      }

      // SubCategory part
      const subCategoryName: string = productnDto.subCategory;
      const subCategory = await prisma.subCategory.findFirst({
        where: {
          title: subCategoryName,
        },
      });
      if (!subCategory) {
        throw new HttpException(
          'Sub Category not found!',
          HttpStatus.NOT_FOUND,
        );
      }

      // Product part
      const product = await prisma.product.create({
        data: {
          ...productObj,
          brands: {
            connect: {
              id: brand.id,
            },
          },
          subCategories: {
            connect: {
              id: subCategory.id,
            },
          },
        },
      });

      // Images part
      const urls = await Promise.all(
        files.map(async (file) => {
          const cloudinaryImage = await uploadImage(file);
          await prisma.productImage.create({
            data: {
              publicId: cloudinaryImage.public_id,
              url: cloudinaryImage.secure_url as string,
              productId: product.id,
            },
          });
          console.log(cloudinaryImage);
          return cloudinaryImage.secure_url;
        }),
      );

      let characteristics;
      if (productnDto.characteristics) {
        // Characteristics part
        characteristics = await Promise.all(
          productnDto.characteristics.map(async (characteristic: string) => {
            await prisma.characteristic.create({
              data: {
                description: characteristic,
                productId: product.id,
              },
            });
            return characteristic;
          }),
        );
      }

      let ingredients;
      if (productnDto.ingredients) {
        // Ingredients part
        ingredients = await Promise.all(
          productnDto.characteristics.map(async (ingredient: string) => {
            await prisma.ingredient.create({
              data: {
                description: ingredient,
                productId: product.id,
              },
            });
            return ingredient;
          }),
        );
      }

      return {
        ...product,
        productImages: urls,
        characteristics: characteristics,
        ingredients: ingredients,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Somethun went wrong!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async deleteProduct(productId: string) {
    try {
      const urls = await prisma.productImage.findMany({
        where: {
          productId: productId,
        },
      });
      urls.map(async (url) => {
        return await deleteImage(url.publicId);
      });
      return await prisma.product.delete({
        where: {
          id: productId,
        },
      });
    } catch (error) {
      throw new HttpException(
        'Somethun went wrong!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
