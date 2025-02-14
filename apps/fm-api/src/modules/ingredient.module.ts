import { Module } from '@nestjs/common';
import { IngredientService } from '../services/ingredient.service';
import { IngredientController } from '../controllers/ingredient.controller';
import { PrismaService } from '../services/prisma.service';

@Module({
  controllers: [IngredientController],
  providers: [IngredientService, PrismaService],
})
export class IngredientModule {}
