import express, { Request, Response } from "express";
import * as db from "../db/cart";
const cartRouter = express.Router();

cartRouter.get("/", (req: Request<{}, any, any, {}>, res: Response) => {
  const userId = req.headers.authorization;
  res.send({
    statusCode: 200,
    message: "Cart data succesfully retrieved",
    data: db.getCart(userId),
  });
});

cartRouter.put("/", (req: Request<{}, any, any, {}>, res: Response) => {
  const userId = req.headers.authorization;
  const body = req.body;

  if (!body) {
    res.status(422);
    res.send({
      statusCode: 422,
      message: "Can not process cart data",
    });
  }

  const cart = db.updateCart(body, userId);
  if (!cart) {
    res.status(404);
    res.send({
      statusCode: 404,
      message: "Cart was not found",
    });
  }

  res.send({
    statusCode: 200,
    message: "Cart was successfully updated",
    data: cart,
  });
});

cartRouter.delete("/", (req: Request<{}, any, any, {}>, res: Response) => {
  const userId = req.headers.authorization;
  const cartData = db.deleteCart(userId);
  if (!cartData) {
    res.status(404);
    res.send({
      statusCode: 404,
      message: "Cart was not found",
    });
  }
  res.send({
    statusCode: 200,
    message: "Cart was succesfully deleted",
  });
});

cartRouter.post(
  "/checkout",
  (req: Request<{}, any, any, {}>, res: Response) => {
    const userId = req.headers.authorization;
    const orderData = req.body;

    if (!orderData) {
      res.status(422);
      res.send({
        statusCode: 422,
        message: "Can not process order data",
      });
    }

    const order = db.checkout(userId, orderData);
    if (!order) {
      res.status(404);
      res.send({
        statusCode: 404,
        message: "Cart was not found",
      });
    }

    res.send({
      statusCode: 200,
      message: "Order was succesfully created",
      data: order,
    });
  }
);

export default cartRouter;
