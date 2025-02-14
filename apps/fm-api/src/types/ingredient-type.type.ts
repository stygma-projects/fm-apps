import { Request } from 'express';
import { CreateIngredientTypeDto } from '../dto/ingredient-type/create-ingredient-type.dto';
import { UpdateIngredientTypeDto } from '../dto/ingredient-type/update-ingredient-type.dto';

export type IngredientTypeRequest = Request<
  {
    ingredientTypeId: string;
  },
  {},
  CreateIngredientTypeDto | UpdateIngredientTypeDto
>;

export enum INGREDIENT_TYPE_ERROR {
  NOT_FOUND_BY_ID = 'IngredientTypeId not found',
  NOT_FOUND = 'IngredientType not found',
}
