import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { IngredientRequest } from '../types/common.type'
import { IngredientService } from '../services/ingredient.service'

@Injectable()
export class IngredientExistsGuard implements CanActivate {
  constructor(private readonly ingredientService: IngredientService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<IngredientRequest>()
    const ingredientId = request.params.ingredientId
    const label = request.body.label

    const ingredientFound = await this.ingredientService.findOne(
      ingredientId,
      label,
    )
    return !!ingredientFound
  }
}
