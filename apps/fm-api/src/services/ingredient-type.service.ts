import {Injectable, NotFoundException} from '@nestjs/common'
import {CreateIngredientTypeDto} from '../dto/ingredient-type/create-ingredient-type.dto'
import {UpdateIngredientTypeDto} from '../dto/ingredient-type/update-ingredient-type.dto'
import {PrismaService} from './prisma.service'
import {INGREDIENT_TYPE_ERROR} from '../types/ingredient-type.type'
import {IngredientType} from '@prisma/client'

@Injectable()
export class IngredientTypeService {
    constructor(private readonly prisma: PrismaService) {
    }

    create(
        createIngredientTypeDto: CreateIngredientTypeDto,
    ): Promise<IngredientType> {
        return this.prisma.ingredientType.create({
            data: createIngredientTypeDto,
        })
    }

    findAll(): Promise<IngredientType[]> {
        return this.prisma.ingredientType.findMany()
    }

    async findOneById(ingredientTypeId: string): Promise<IngredientType> {
        const ingredientType = await this.prisma.ingredientType.findUnique({
            where: {
                id: ingredientTypeId,
            },
        })
        if (!ingredientType) {
            throw new NotFoundException(INGREDIENT_TYPE_ERROR.NOT_FOUND_BY_ID)
        }
        return ingredientType
    }

    async findOne(
        ingredientTypeId?: string,
        label?: string,
    ): Promise<IngredientType> {
        const ingredientType = await this.prisma.ingredientType.findFirst({
            where: {
                OR: [{id: ingredientTypeId}, {label}],
            },
        })
        if (!ingredientType) {
            throw new NotFoundException(INGREDIENT_TYPE_ERROR.NOT_FOUND)
        }
        return ingredientType
    }

    update(
        ingredientTypeId: string,
        updateIngredientTypeDto: UpdateIngredientTypeDto,
    ): Promise<IngredientType> {
        return this.prisma.ingredientType.update({
            where: {
                id: ingredientTypeId,
            },
            data: updateIngredientTypeDto,
        })
    }

    remove(ingredientTypeId: string): Promise<IngredientType> {
        return this.prisma.ingredientType.delete({
            where: {
                id: ingredientTypeId,
            },
        })
    }
}
