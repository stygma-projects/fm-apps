import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('food/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, CategoryExistsGuard)
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':categoryId')
  findOne(@Param('categoryId') categoryId: string) {
    return this.categoriesService.findOneById(categoryId);
  }

  @Patch(':categoryId')
  @UseGuards(JwtAuthGuard, CategoryExistsGuard)
  update(
    @Param('categoryId', new ParseUUIDPipe()) categoryId: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(categoryId, updateCategoryDto);
  }

  @Delete(':categoryId')
  @UseGuards(JwtAuthGuard, CategoryExistsGuard)
  remove(@Param('categoryId', new ParseUUIDPipe()) categoryId: string) {
    return this.categoriesService.remove(categoryId);
  }
}
