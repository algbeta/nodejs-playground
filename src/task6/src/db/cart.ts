import { Cart, Order, OrderData, ORDER_STATUS, Product } from "../types";
import { v4 as uuidv4 } from "uuid";
import * as productDB from "./products";

const carts: Array<Cart> = [];
const orders: Array<Order> = [];

const deleteActiveProp = (cart: Cart) => {
  delete cart.active;
  return cart;
};

export const getCart = (userId: string): Cart => {
  let cart = carts.find((cart) => cart.userId == userId && cart.active);

  if (!cart) {
    cart = { userId, id: uuidv4(), items: [], total: 0, active: true };
    carts.push(cart);
  }
  return deleteActiveProp({ ...cart });
};

export const deleteCart = (userId: string) => {
  const index = carts.findIndex((cart) => cart.userId == userId);
  if (index !== -1) {
    carts[index].active = false;
    return carts[index];
  } else {
    return {};
  }
};

export const checkout = (userId: string, data: OrderData) => {
  const cart = carts.find((cart) => cart.userId == userId);
  if (!cart) {
  }
  const order: Order = {
    id: uuidv4(),
    userId,
    cartId: cart.id,
    items: cart.items,
    total: cart.total,
    status: ORDER_STATUS.IN_PROGRESS,
    ...data,
  };

  orders.push(order);
  return order;
};

export const updateCart = (data: Cart, userId: string): Cart | {} => {
  const index = carts.findIndex(
    (cart) => cart.userId == userId && cart.id === data.id && cart.active
  );
  if (index === -1) {
    return {};
  }

  data.items.forEach((productCart) => {
    let item = carts[index].items.find(
      (pc) => pc.product.id === productCart.product.id
    );
    if (item) {
      item = { ...item, ...productCart };
    } else {
      carts[index].items.push(productCart);
      // check if product exists in products db
      productDB.updateProduct(productCart.product);
    }
  });

  // update cart total
  carts[index].total = carts[index].items.reduce(
    (accumulator, productCart) =>
      accumulator + productCart.count * productCart.product.price,
    0
  );

  return deleteActiveProp({ ...carts[index] });
};
