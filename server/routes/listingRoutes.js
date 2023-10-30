import express from "express";
import {
  createListing,
  deleteListing,
  getListing,
  updateListing,
  getListings
} from "../controllers/listingController.js";
import { verifyToken } from "../utils/verify.js";

const router = express.Router();

router.get("/get", getListings);
router.get("/get/:id", verifyToken, getListing);
router.post("/create", verifyToken, createListing);
router.post("/update/:id", verifyToken, updateListing);
router.delete("/delete/:id", verifyToken, deleteListing);

export default router;
