import express from "express";
import { createListing, deleteListing, editListing } from "../controllers/listingController.js";
import { verifyToken } from "../utils/verify.js";

const router = express.Router();

router.post('/create', verifyToken, createListing)
router.put('/edit/:id', verifyToken, editListing)
router.delete('/delete/:id', verifyToken, deleteListing)

export default router;