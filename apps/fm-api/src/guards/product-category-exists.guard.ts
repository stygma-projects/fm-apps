import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { ProductCategoryService } from '../services/product-category.service'
import { ProductCategoryRequest } from '../types/product-category.type'

@Injectable()
export class ProductCategoryExistsGuard implements CanActivate {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<ProductCategoryRequest>()
    const productCategoryId = request.params.productCategoryId
    const label = request.body.label

    const productCategoryFound = await this.productCategoryService.findOne(
      productCategoryId,
      label,
    )
    return !!productCategoryFound
  }
}
