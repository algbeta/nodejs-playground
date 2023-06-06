import { CartProduct } from "./cart";

enum DELIVERY_TYPE {
  POST,
  CURIER,
}

enum PAYMENT_TYPE {
  PAYPAL,
  CARD,
  CASH,
}

declare type Delivery = {
  type: DELIVERY_TYPE;
  address: string;
};

declare type Payment = {
  type: PAYMENT_TYPE;
  address: string;
  creditCard?: string;
};

enum ORDER_STATUS {
  IN_PROGRESS,
  READY_FOR_DELIVERY,
  SHIPPED,
  RECEIVED,
}

declare type Order = {
  id: string;
  userId: string;
  cartId: string;
  items: Array<CartProduct>;
  payment: Payment;
  delivery: Delivery;
  comments: string;
  status: ORDER_STATUS;
  total: number;
};

declare type OrderData = {
  payment: Payment;
  delivery: Delivery;
  comments: string;
};

export { OrderData, Order, ORDER_STATUS };
