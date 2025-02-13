import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TodosModule } from './todos/todos.module';
import { ProductsModule } from './food/products/products.module';
import { IngredientsModule } from './food/ingredients/ingredients.module';
import { CategoriesModule } from './food/categories/categories.module';

@Module({
  imports: [
    TodosModule,
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ProductsModule,
    IngredientsModule,
    CategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
