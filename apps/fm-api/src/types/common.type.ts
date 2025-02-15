import {Request} from 'express'
import {UpdateIngredientDto} from '../dto/ingredient/update-ingredient.dto'
import {CreateIngredientDto} from '../dto/ingredient/create-ingredient.dto'

export type IngredientRequest = Request<
    {
        ingredientId: string
    },
    object,
    CreateIngredientDto | UpdateIngredientDto
>

export enum INGREDIENT_ERROR {
    NOT_FOUND_BY_ID = 'IngredientId not found',
    NOT_FOUND = 'Ingredient not found',
}
