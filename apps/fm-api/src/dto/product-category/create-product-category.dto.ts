import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductCategoryDto {
  @IsString()
  @IsNotEmpty()
  label!: string;

  @IsString()
  imageUrl?: string;
}
