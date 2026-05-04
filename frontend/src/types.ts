export type Page = 
  | 'welcome' 
  | 'menu' 
  | 'cart'
  | 'recommendations' 
  | 'entertainment' 
  | 'payment' 
  | 'confirmed' 
  | 'thankyou'
  | 'staff-kitchen'
  | 'staff-billing'
  | 'staff-analytics'
  | 'staff-floor'
  | 'staff-inventory';

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  rating?: number;
  reviews?: number;
  category: string;
  tag?: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}
