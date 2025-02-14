import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { CreateProductDto } from '../dto/product/create-product.dto';
import { UpdateProductDto } from '../dto/product/update-product.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ProductExistsGuard } from '../guards/product-exists.guard';
import { Product } from '@prisma/client';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(JwtAuthGuard, ProductExistsGuard)
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':productId')
  findOne(@Param('productId') productId: string): Promise<Product> {
    return this.productService.findOneById(productId);
  }

  @Patch(':productId')
  @UseGuards(JwtAuthGuard, ProductExistsGuard)
  update(
    @Param('productId') productId: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.update(productId, updateProductDto);
  }

  @Delete(':productId')
  @UseGuards(JwtAuthGuard, ProductExistsGuard)
  remove(@Param('productId') productId: string): Promise<Product> {
    return this.productService.remove(productId);
  }
}
