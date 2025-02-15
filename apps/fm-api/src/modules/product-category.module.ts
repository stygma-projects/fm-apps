import { Module } from '@nestjs/common'
import { ProductCategoryService } from '../services/product-category.service'
import { ProductCategoryController } from '../controllers/product-category.controller'
import { PrismaService } from '../services/prisma.service'

@Module({
  controllers: [ProductCategoryController],
  providers: [ProductCategoryService, PrismaService],
})
export class ProductCategoryModule {}
