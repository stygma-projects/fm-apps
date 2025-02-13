import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  label!: string;

  @IsString()
  imageUrl?: string;
}
