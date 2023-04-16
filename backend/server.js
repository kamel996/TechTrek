import express from "express";
import products from "./data/products.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Api is running");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/product/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

app.listen(5000, console.log(`Server running on port ${PORT}`));