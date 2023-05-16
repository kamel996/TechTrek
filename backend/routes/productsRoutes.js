import express from "express";
import {
  deleteProduct,
  getProductById,
  getProducts,
} from "../controllers/productsControllers.js";
import { protect, admin } from "..//middleware/authMiddleware.js"

const router = express.Router();

router.route("/").get(getProducts);

router.route("/:id").get(getProductById);

router.route("/:id").delete(protect,admin,deleteProduct)

export default router;
