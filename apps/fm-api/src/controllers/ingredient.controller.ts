import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards,} from '@nestjs/common'
import {IngredientService} from '../services/ingredient.service'
import {CreateIngredientDto} from '../dto/ingredient/create-ingredient.dto'
import {UpdateIngredientDto} from '../dto/ingredient/update-ingredient.dto'
import {JwtAuthGuard} from '../guards/jwt-auth.guard'
import {IngredientExistsGuard} from '../guards/ingredient-exists.guard'
import {Ingredient} from  "@fm-monorepo/db";

@Controller('ingredients')
export class IngredientController {
    constructor(private readonly ingredientService: IngredientService) {
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    create(
        @Body() createIngredientDto: CreateIngredientDto,
    ): Promise<Ingredient> {
        return this.ingredientService.create(createIngredientDto)
    }

    @Get()
    @UseGuards(JwtAuthGuard, IngredientExistsGuard)
    findAll(): Promise<Ingredient[]> {
        return this.ingredientService.findAll()
    }

    @Get(':ingredientId')
    findOne(@Param('ingredientId') ingredientId: string): Promise<Ingredient> {
        return this.ingredientService.findOneById(ingredientId)
    }

    @Patch(':ingredientId')
    @UseGuards(JwtAuthGuard, IngredientExistsGuard)
    update(
        @Param('ingredientId') ingredientId: string,
        @Body() updateIngredientDto: UpdateIngredientDto,
    ): Promise<Ingredient> {
        return this.ingredientService.update(ingredientId, updateIngredientDto)
    }

    @Delete(':ingredientId')
    @UseGuards(JwtAuthGuard, IngredientExistsGuard)
    remove(@Param('ingredientId') ingredientId: string): Promise<Ingredient> {
        return this.ingredientService.remove(ingredientId)
    }
}
