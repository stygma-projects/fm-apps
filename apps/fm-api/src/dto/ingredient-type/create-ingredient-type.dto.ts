import { IsNotEmpty, IsString } from 'class-validator';

export class CreateIngredientTypeDto {
  @IsString()
  @IsNotEmpty()
  label!: string;
}
