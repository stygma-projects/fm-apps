import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { PrismaService } from '../../common/prisma.service';
import { INGREDIENTS_ERROR } from './ingredients.type';

@Injectable()
export class IngredientsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createIngredientDto: CreateIngredientDto) {
    return this.prisma.ingredient.create({
      data: createIngredientDto,
    });
  }

  findAll() {
    return this.prisma.ingredient.findMany();
  }

  async findOne(ingredientId: string) {
    const ingredient = await this.prisma.ingredient.findUnique({
      where: {
        id: ingredientId,
      },
    });
    if (!ingredient) {
      throw new NotFoundException(INGREDIENTS_ERROR.NOT_FOUND_BY_ID);
    }
    return ingredient;
  }

  update(ingredientId: string, updateIngredientDto: UpdateIngredientDto) {
    return this.prisma.ingredient.update({
      where: {
        id: ingredientId,
      },
      data: updateIngredientDto,
    });
  }

  remove(ingredientId: string) {
    return this.prisma.ingredient.delete({
      where: {
        id: ingredientId,
      },
    });
  }
}
