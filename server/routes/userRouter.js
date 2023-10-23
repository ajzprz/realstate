import express from "express";
import {
  getUser,
  updateUser,
  deleteUser,
  getUserListing,
} from "../controllers/userController.js";
import { verifyToken } from "../utils/verify.js";

const router = express.Router();

router.get("/:id", getUser);
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/listing/:id", verifyToken, getUserListing);

export default router;
