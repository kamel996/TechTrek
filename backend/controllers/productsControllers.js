import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.json(products);
});

export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.json({ message: "Product Removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
