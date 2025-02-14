import { CreateProductCategoryDto } from '../dto/create-product-category.dto';
import { UpdateProductCategoryDto } from '../dto/update-product-category.dto';
import { PrismaService } from './prisma.service';
import { PRODUCT_CATEGORY_ERROR } from '../types/errors.type';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  create(createProductCategoryDto: CreateProductCategoryDto) {
    return this.prisma.productCategory.create({
      data: createProductCategoryDto,
    });
  }

  findAll() {
    return this.prisma.productCategory.findMany();
  }

  async findOneById(productCategoryId: string) {
    const productCategory = await this.prisma.productCategory.findUnique({
      where: {
        id: productCategoryId,
      },
    });
    if (!productCategory) {
      throw new NotFoundException(PRODUCT_CATEGORY_ERROR.NOT_FOUND_BY_ID);
    }
    return productCategory;
  }

  update(
    productCategoryId: string,
    updateProductCategoryDto: UpdateProductCategoryDto,
  ) {
    return this.prisma.productCategory.update({
      where: {
        id: productCategoryId,
      },
      data: updateProductCategoryDto,
    });
  }

  remove(productCategoryId: string) {
    return this.prisma.productCategory.delete({
      where: {
        id: productCategoryId,
      },
    });
  }
}
