import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';

@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Post()
  create(@Body() createIngredientDto: CreateIngredientDto) {
    return this.ingredientsService.create(createIngredientDto);
  }

  @Get()
  findAll() {
    return this.ingredientsService.findAll();
  }

  @Get(':ingredientId')
  findOne(@Param('ingredientId') ingredientId: string) {
    return this.ingredientsService.findOne(ingredientId);
  }

  @Patch(':ingredientId')
  update(
    @Param('ingredientId') ingredientId: string,
    @Body() updateIngredientDto: UpdateIngredientDto,
  ) {
    return this.ingredientsService.update(ingredientId, updateIngredientDto);
  }

  @Delete(':ingredientId')
  remove(@Param('ingredientId') ingredientId: string) {
    return this.ingredientsService.remove(ingredientId);
  }
}
