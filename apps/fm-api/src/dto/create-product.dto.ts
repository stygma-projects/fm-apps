export class CreateProductDto {
  label: string;
  price: number;
  imageUrl?: string;
  available: boolean;
  productCategoryId: string;
  ingredients: string[];
}
