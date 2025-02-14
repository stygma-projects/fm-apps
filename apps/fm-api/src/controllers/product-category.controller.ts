import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductCategoryService } from '../services/product-category.service';
import { CreateProductCategoryDto } from '../dto/create-product-category.dto';
import { UpdateProductCategoryDto } from '../dto/update-product-category.dto';

@Controller('/categories')
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @Post()
  create(@Body() createProductCategoryDto: CreateProductCategoryDto) {
    return this.productCategoryService.create(createProductCategoryDto);
  }

  @Get()
  findAll() {
    return this.productCategoryService.findAll();
  }

  @Get(':productCategoryId')
  findOne(
    @Param('productCategoryId', new ParseUUIDPipe()) productCategoryId: string,
  ) {
    return this.productCategoryService.findOneById(productCategoryId);
  }

  @Patch(':productCategoryId')
  update(
    @Param('productCategoryId', new ParseUUIDPipe()) productCategoryId: string,
    @Body() updateProductCategoryDto: UpdateProductCategoryDto,
  ) {
    return this.productCategoryService.update(
      productCategoryId,
      updateProductCategoryDto,
    );
  }

  @Delete(':productCategoryId')
  remove(
    @Param('productCategoryId', new ParseUUIDPipe()) productCategoryId: string,
  ) {
    return this.productCategoryService.remove(productCategoryId);
  }
}
