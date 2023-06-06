import express, { Request, Response } from "express";
import * as db from "../db/products";
const productsRouter = express.Router();

productsRouter.get("/", (req: Request, res: Response) => {
  res.send(db.getProducts());
});

productsRouter.get(
  "/:productId",
  (req: Request<{ productId: string }, any, any, {}>, res: Response) => {
    const { productId } = req.params;
    console.log(req);
    res.send(db.getProduct(productId));
  }
);

export default productsRouter;
