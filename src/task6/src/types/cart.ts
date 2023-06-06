import { Product } from "./product";

declare type CartProduct = {
  product: Product;
  count: number;
};

declare type Cart = {
  userId: string;
  id: string;
  items: Array<CartProduct>;
  total: number;
  active: boolean;
};

export { Cart, CartProduct };
