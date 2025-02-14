import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from '../dto/product/create-product.dto';
import { UpdateProductDto } from '../dto/product/update-product.dto';
import { PrismaService } from './prisma.service';
import { Product } from '@prisma/client';
import { PRODUCT_ERROR } from '../types/product.type';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  create(createProductDto: CreateProductDto): Promise<Product> {
    return this.prisma.product.create({
      data: createProductDto,
    });
  }

  findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async findOneById(productId: string): Promise<Product> {
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

  async findOne(productId?: string, label?: string): Promise<Product> {
    const product = await this.prisma.product.findFirst({
      where: {
        OR: [{ id: productId }, { label }],
      },
    });
    if (!product) {
      throw new NotFoundException(PRODUCT_ERROR.NOT_FOUND);
    }
    return product;
  }

  update(
    productId: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.prisma.product.update({
      where: {
        id: productId,
      },
      data: updateProductDto,
    });
  }

  remove(productId: string): Promise<Product> {
    return this.prisma.product.delete({
      where: {
        id: productId,
      },
    });
  }
}
