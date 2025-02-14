import { Module } from '@nestjs/common';
import { UserModule } from './modules/user.module';
import { AuthModule } from './modules/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './modules/product.module';
import { IngredientModule } from './modules/ingredient.module';
import { ProductCategoryModule } from './modules/product-category.module';
import { IngredientTypeModule } from './modules/ingredient-type.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ProductModule,
    IngredientModule,
    ProductCategoryModule,
    IngredientTypeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
