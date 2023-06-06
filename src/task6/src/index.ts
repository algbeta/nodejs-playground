import express, { Express } from "express";
import bodyParser from "body-parser";
import productsRouter from "./api/product";
import cartRouter from "./api/cart";

const auth = async (req, res, next) => {
  const userId = req.headers.authorization;

  if (!userId) {
    return res
      .status(401)
      .json({ statusCode: 401, message: "No userId, authorization denied" });
  }

  next();
};

const app: Express = express();

app.use(auth);
app.use(bodyParser.json());
app.use("/products", productsRouter);
app.use("/profile/cart", cartRouter);

app.use((err, req, res, next) => {
  res.status(500).json({ statusCode: 500, message: err.message });
});

app.use((err, req, res, next) => {
  res.status(500).json({ statusCode: 500, message: err.message });
});

app.listen(3000, () => {
  console.log("Server is started");
});
