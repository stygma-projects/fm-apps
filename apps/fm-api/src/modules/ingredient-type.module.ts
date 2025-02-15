import { Module } from '@nestjs/common'
import { IngredientTypeService } from '../services/ingredient-type.service'
import { IngredientTypeController } from '../controllers/ingredient-type.controller'
import { PrismaService } from '../services/prisma.service'

@Module({
  controllers: [IngredientTypeController],
  providers: [IngredientTypeService, PrismaService],
})
export class IngredientTypeModule {}
