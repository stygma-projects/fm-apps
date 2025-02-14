import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { PrismaService } from './prisma.service';
import { PRODUCT_ERROR } from '../types/errors.type';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: createProductDto,
    });
  }

  findAll() {
    return this.prisma.product.findMany();
  }

  async findOneById(productId: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });
    if (!product) {
      throw new NotFoundException(PRODUCT_ERROR.NOT_FOUND_BY_ID);
    }
    return product;
  }

  update(productId: string, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: {
        id: productId,
      },
      data: updateProductDto,
    });
  }

  remove(productId: string) {
    return this.prisma.product.delete({
      where: {
        id: productId,
      },
    });
  }
}
