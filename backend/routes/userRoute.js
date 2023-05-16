import express from "express";
import {
  authUser,
  deleteUser,
  getUserById,
  getUserProfile,
  getUsers,
  registerUser,
  updateUser,
  updateUserProfile,
} from "../controllers/userController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.route('/delete/:id').delete(protect,admin,deleteUser)
router.route("/:id").get(protect,admin,getUserById).put(protect,admin,updateUser)
router.route("/").post(registerUser);
router.route("/").get(protect,admin, getUsers);
router.route("/login").post(authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
