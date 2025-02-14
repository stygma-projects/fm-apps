import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  IsUUID,
} from 'class-validator';

export class CreateIngredientDto {
  @IsString()
  @IsNotEmpty()
  label!: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  price!: number;

  @IsString()
  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  ingredientTypeId!: string;
}
