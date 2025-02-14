import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { ProductRequest } from '../types/product.type';

@Injectable()
export class ProductExistsGuard implements CanActivate {
  constructor(private readonly productService: ProductService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<ProductRequest>();
    const productId = request.params.productId;
    const label = request.body.label;

    await this.productService.findOne(productId, label);
    return true;
  }
}
