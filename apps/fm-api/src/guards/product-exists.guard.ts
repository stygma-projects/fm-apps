import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ProductService } from '../services/product.service';

@Injectable()
export class ProductExistsGuard implements CanActivate {
  constructor(private readonly productService: ProductService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const productId = request.params.productId || request.body.productId;

    await this.productService.findOneById(productId);
    return true;
  }
}
