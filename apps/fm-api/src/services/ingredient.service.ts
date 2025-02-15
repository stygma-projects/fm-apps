import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateIngredientDto } from "../dto/ingredient/create-ingredient.dto";
import { UpdateIngredientDto } from "../dto/ingredient/update-ingredient.dto";
import { PrismaService } from "./prisma.service";
import { INGREDIENT_ERROR } from "../types/common.type";
import { Ingredient } from "@fm-monorepo/prisma/generated/client";

@Injectable()
export class IngredientService {
  constructor(private readonly prisma: PrismaService) {}

  create(createIngredientDto: CreateIngredientDto): Promise<Ingredient> {
    return this.prisma.ingredient.create({
      data: createIngredientDto,
    });
  }

  findAll(): Promise<Ingredient[]> {
    return this.prisma.ingredient.findMany();
  }

  async findOneById(ingredientId: string): Promise<Ingredient> {
    const ingredient = await this.prisma.ingredient.findUnique({
      where: {
        id: ingredientId,
      },
    });
    if (!ingredient) {
      throw new NotFoundException(INGREDIENT_ERROR.NOT_FOUND_BY_ID);
    }
    return ingredient;
  }

  async findOne(ingredientId?: string, label?: string): Promise<Ingredient> {
    const ingredient = await this.prisma.ingredient.findFirst({
      where: {
        OR: [{ id: ingredientId }, { label }],
      },
    });
    if (!ingredient) {
      throw new NotFoundException(INGREDIENT_ERROR.NOT_FOUND);
    }
    return ingredient;
  }

  update(
    ingredientId: string,
    updateIngredientDto: UpdateIngredientDto,
  ): Promise<Ingredient> {
    return this.prisma.ingredient.update({
      where: {
        id: ingredientId,
      },
      data: updateIngredientDto,
    });
  }

  remove(ingredientId: string): Promise<Ingredient> {
    return this.prisma.ingredient.delete({
      where: {
        id: ingredientId,
      },
    });
  }
}
