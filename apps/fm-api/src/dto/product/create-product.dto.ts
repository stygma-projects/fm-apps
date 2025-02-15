import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  IsUUID,
} from 'class-validator'

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  label!: string

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  price!: number

  @IsString()
  @IsUrl()
  @IsOptional()
  imageUrl?: string

  @IsBoolean()
  @IsOptional()
  available?: boolean

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  productCategoryId!: string
}
