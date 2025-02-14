import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { IngredientTypeService } from '../services/ingredient-type.service';
import { IngredientTypeRequest } from '../types/ingredient-type.type';

@Injectable()
export class IngredientTypeExistsGuard implements CanActivate {
  constructor(private readonly ingredientTypeService: IngredientTypeService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<IngredientTypeRequest>();
    const ingredientTypeId = request.params.ingredientTypeId;
    const label = request.body.label;

    await this.ingredientTypeService.findOne(ingredientTypeId, label);
    return true;
  }
}
