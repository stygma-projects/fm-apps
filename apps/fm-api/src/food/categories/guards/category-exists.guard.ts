import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { CategoriesService } from '../categories.service';

@Injectable()
export class CategoryExistsGuard implements CanActivate {
  constructor(private readonly categoriesService: CategoriesService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const categoryId = request.params.categoryId || request.body.categoryId;

    await this.categoriesService.findOneById(categoryId);
    return true;
  }
}
