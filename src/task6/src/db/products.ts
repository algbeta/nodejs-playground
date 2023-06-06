import { Product } from "../types/product";
import { v4 as uuidv4 } from "uuid";

const products: Array<Product> = [
  {
    id: "hash1",
    title: "microwave",
    description: "best microwave 2023",
    price: 100,
  },
  {
    id: "hash2",
    title: "fridge",
    description: "basic model for small kitchen",
    price: 150,
  },
];

export const getProducts = (): Array<Product> => products;
export const getProduct = (id: string): Product | undefined =>
  products.find((product: Product) => product.id === id);

export const updateProduct = (product: Product): Product | undefined => {
  const existingProduct = getProduct(product.id);
  if (!existingProduct) {
    products.push({ id: uuidv4(), ...product });
  } else {
    const index = products.findIndex((pr: Product) => product.id === pr.id);
    products[index] = { ...products[index], ...product };
  }

  const updatedProduct = getProduct(product.id);
  return updatedProduct;
};
