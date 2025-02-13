import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../../common/prisma.service';
import { CATEGORIES_ERROR } from './categories.type';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: createCategoryDto,
    });
  }

  findAll() {
    return this.prisma.category.findMany();
  }

  async findOneById(categoryId: string) {
    const todo = await this.prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });
    if (!todo) {
      throw new NotFoundException(CATEGORIES_ERROR.NOT_FOUND_BY_ID);
    }
    return todo;
  }

  update(categoryId: string, updateCategoryDto: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: {
        id: categoryId,
      },
      data: updateCategoryDto,
    });
  }

  remove(categoryId: string) {
    return this.prisma.category.delete({
      where: {
        id: categoryId,
      },
    });
  }
}
