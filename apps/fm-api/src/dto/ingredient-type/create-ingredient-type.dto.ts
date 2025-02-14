import { IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";

export class CreateIngredientTypeDto {
  @IsString()
  @IsNotEmpty()
  label!: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  imageUrl?: string;
}
