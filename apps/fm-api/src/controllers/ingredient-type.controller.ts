import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards,} from '@nestjs/common'
import {IngredientTypeService} from '../services/ingredient-type.service'
import {CreateIngredientTypeDto} from '../dto/ingredient-type/create-ingredient-type.dto'
import {UpdateIngredientTypeDto} from '../dto/ingredient-type/update-ingredient-type.dto'
import {IngredientTypeExistsGuard} from '../guards/ingredient-type-exists.guard'
import {JwtAuthGuard} from '../guards/jwt-auth.guard'
import {IngredientType} from '@prisma/client'

@Controller('ingredient-types')
export class IngredientTypeController {
    constructor(private readonly ingredientTypeService: IngredientTypeService) {
    }

    @Post()
    @UseGuards(JwtAuthGuard, IngredientTypeExistsGuard)
    create(
        @Body() createIngredientTypeDto: CreateIngredientTypeDto,
    ): Promise<IngredientType> {
        return this.ingredientTypeService.create(createIngredientTypeDto)
    }

    @Get()
    findAll(): Promise<IngredientType[]> {
        return this.ingredientTypeService.findAll()
    }

    @Get(':ingredientTypeId')
    findOne(
        @Param('ingredientTypeId') ingredientTypeId: string,
    ): Promise<IngredientType> {
        return this.ingredientTypeService.findOneById(ingredientTypeId)
    }

    @Patch(':ingredientTypeId')
    @UseGuards(JwtAuthGuard, IngredientTypeExistsGuard)
    update(
        @Param('ingredientTypeId') ingredientTypeId: string,
        @Body() updateIngredientTypeDto: UpdateIngredientTypeDto,
    ): Promise<IngredientType> {
        return this.ingredientTypeService.update(
            ingredientTypeId,
            updateIngredientTypeDto,
        )
    }

    @Delete(':ingredientTypeId')
    @UseGuards(JwtAuthGuard, IngredientTypeExistsGuard)
    remove(
        @Param('ingredientTypeId') ingredientTypeId: string,
    ): Promise<IngredientType> {
        return this.ingredientTypeService.remove(ingredientTypeId)
    }
}
