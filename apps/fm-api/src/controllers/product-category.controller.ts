import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ProductCategoryService } from "../services/product-category.service";
import { CreateProductCategoryDto } from "../dto/product-category/create-product-category.dto";
import { UpdateProductCategoryDto } from "../dto/product-category/update-product-category.dto";
import { ProductCategoryExistsGuard } from "../guards/product-category-exists.guard";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { ProductCategory } from "@fm-monorepo/prisma/generated/client";

@Controller("product-categories")
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, ProductCategoryExistsGuard)
  create(
    @Body() createProductCategoryDto: CreateProductCategoryDto,
  ): Promise<ProductCategory> {
    return this.productCategoryService.create(createProductCategoryDto);
  }

  @Get()
  findAll(): Promise<ProductCategory[]> {
    return this.productCategoryService.findAll();
  }

  @Get(":productCategoryId")
  findOne(
    @Param("productCategoryId", new ParseUUIDPipe()) productCategoryId: string,
  ): Promise<ProductCategory> {
    return this.productCategoryService.findOneById(productCategoryId);
  }

  @Patch(":productCategoryId")
  @UseGuards(JwtAuthGuard, ProductCategoryExistsGuard)
  update(
    @Param("productCategoryId", new ParseUUIDPipe()) productCategoryId: string,
    @Body() updateProductCategoryDto: UpdateProductCategoryDto,
  ): Promise<ProductCategory> {
    return this.productCategoryService.update(
      productCategoryId,
      updateProductCategoryDto,
    );
  }

  @Delete(":productCategoryId")
  @UseGuards(JwtAuthGuard, ProductCategoryExistsGuard)
  remove(
    @Param("productCategoryId", new ParseUUIDPipe()) productCategoryId: string,
  ): Promise<ProductCategory> {
    return this.productCategoryService.remove(productCategoryId);
  }
}
