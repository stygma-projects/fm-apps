export type ProductLabel = {
  id: string;
  name: string;
  category: 'frites' | 'snacks' | 'viandes' | 'sauces' | 'boissons';
  price: number;
  description?: string;
  image?: string;
  isAvailable: boolean;
  allergens?: string[];
  nutritionalInfo?: {
    calories?: number;
    proteins?: number;
    carbohydrates?: number;
    fats?: number;
  };
};

export type SSEEventType = 'product_update' | 'order_status' | 'new_order';

export type SSEEvent = {
  type: SSEEventType;
  data: ProductLabel | any;
  timestamp: number;
}; 