import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ProductCategoryService } from '../services/product-category.service';

@Injectable()
export class ProductCategoryExistsGuard implements CanActivate {
  constructor(private readonly productCategoryService: ProductCategoryService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const categoryId = request.params.categoryId || request.body.categoryId;

    await this.productCategoryService.findOneById(categoryId);
    return true;
  }
}
